// @mui
import { Button, Dialog, DialogTitle, DialogContent, Typography, CircularProgress, Box } from '@mui/material';
// hooks
import { useFetchEventsByReceiverId } from '../hooks/useFetchData';
// layouts
import FullScreen from '../layouts/FullScreen';
// components
import Table from '../components/Table';
import ErrorBox from '../components/ErrorBox';

export default function EventsTable({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const { data, error, isError, isLoading } = useFetchEventsByReceiverId();

	if (isLoading || isError || !data) {
		return (
			<FullScreen>
				{isLoading ? (
					<CircularProgress data-testid='data-loader' size={125} />
				) : isError ? (
					<ErrorBox message={error?.message} />
				) : (
					<ErrorBox message={`No data found for this user`} />
				)}
			</FullScreen>
		);
	}

	return (
		<Dialog open={isOpen} onClose={() => onClose()} fullScreen data-testid='dialog'>
			<DialogTitle>
				<Box
					sx={{
						width: '100%',
						display: 'inline-flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
					<Typography variant='h6'>Events List</Typography>
					<Button variant='contained' onClick={() => onClose()}>
						Close
					</Button>
				</Box>
			</DialogTitle>

			<DialogContent>
				<Table data={data} />
			</DialogContent>
		</Dialog>
	);
}
