import { useState, ChangeEvent } from 'react';
// utils
import moment from 'moment';
import { sentenceCase } from 'change-case';
// mui
import {
	Paper,
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow
} from '@mui/material';
// types
import { Data } from '../types';

interface Column {
	id: 'timestamp' | 'caregiver_id' | 'event_type' | 'value' | 'note';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'timestamp', label: 'Timestamp', minWidth: 100 },
	{ id: 'caregiver_id', label: 'Care Giver', minWidth: 170 },
	{
		id: 'event_type',
		label: 'Event',
		minWidth: 170
	},
	{
		id: 'note',
		label: 'Note',
		minWidth: 170
	}
];

function createData(timestamp: string, caregiver_id: string, event_type: string, note: string) {
	const date = moment(timestamp).format('MM/DD/YYYY h:mm a');

	return {
		timestamp: date,
		caregiver_id,
		event_type,
		note
	};
}

export default function Table({ data }: { data: Data[] }) {
	const rows = data?.map((event: Data) => {
		const { timestamp, caregiver_id, event_type, payload_as_text } = event;
		const { note, medication_failure_reason, task_schedule_note, fluid, consumed_volume_ml } =
			JSON.parse(payload_as_text);

		const description = note
			? note
			: task_schedule_note
			? task_schedule_note
			: medication_failure_reason
			? medication_failure_reason
			: fluid && consumed_volume_ml
			? sentenceCase(`${fluid} ${consumed_volume_ml}ml`)
			: 'No note was recorded';

		return createData(timestamp, caregiver_id || '', sentenceCase(event_type), description);
	});

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper
			sx={{
				width: '100%',
				overflow: 'hidden',
				maxWidth: '90vw',
				my: 3,
				mx: 'auto'
			}}>
			<TableContainer sx={{ maxHeight: '85vh' }} data-testid='table-container'>
				<MuiTable stickyHeader aria-label='table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody data-testid='table-body'>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
							<TableRow hover role='checkbox' tabIndex={-1} key={index}>
								{columns.map((column) => {
									const value = row[column.id];
									return (
										<TableCell key={column.id} align={column.align}>
											{column.format && typeof value === 'number' ? column.format(value) : value}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableBody>
				</MuiTable>
			</TableContainer>

			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				data-testid='table-pagination'
			/>
		</Paper>
	);
}
