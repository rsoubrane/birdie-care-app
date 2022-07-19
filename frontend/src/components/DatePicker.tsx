// utils
import moment from 'moment';
// mui
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, Box } from '@mui/material';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
// hooks
import useDate from '../hooks/useDate';
import { useFetchEventsDatesByReceiverId } from '../hooks/useFetchData';

export default function DatePicker() {
	const { date, setDate } = useDate();
	const { dates } = useFetchEventsDatesByReceiverId();

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Box data-testid='date-picker'>
				{/* Allow selection only between first and last date */}
				<MUIDatePicker
					label='Care Date'
					value={date}
					minDate={moment(dates?.firstDate || '2019-04-01')}
					maxDate={moment(dates?.lastDate || '2019-05-30')}
					onChange={(date) => setDate(moment(date).format('YYYY-MM-DD') || '2019-04-26')}
					renderInput={(params: any) => <TextField {...params} color='info' />}
				/>
			</Box>
		</LocalizationProvider>
	);
}
