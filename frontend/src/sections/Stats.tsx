// utils
import { Grid } from '@mui/material';
import { sentenceCase } from 'change-case';
// hooks
import useDate from '../hooks/useDate';
import { useFetchEvents } from '../hooks/useFetchData';
// components
import StatsCard from '../components/StatsCard';

export default function StatsSection() {
	const eventList = ['task_completed', 'visit_completed', 'alert_raised'];

	const { date } = useDate();
	const { data } = useFetchEvents(date);

	const eventTypesCount = eventList.reduce((acc, event) => {
		const count =
			data?.reduce((acc, item) => {
				if (item.event_type === event) acc++;
				return acc;
			}, 0) || 0;
		acc[event] = count;
		return acc;
	}, {} as { [key: string]: number });

	const eventColors = {
		task_completed: '#00bcd4',
		visit_completed: '#ff9800',
		alert_raised: '#f44336'
	} as { [key: string]: string };

	const eventIcons = {
		task_completed: 'mdi:calendar-check',
		visit_completed: 'mdi:store-check',
		alert_raised: 'mdi:alert-octagon'
	} as { [key: string]: string };

	return (
		<Grid container spacing={3} sx={{ mt: 3 }} data-testid='stats-cards'>
			{Object.keys(eventTypesCount).map((eventType) => (
				<Grid item key={eventType} xs={12} sm={4}>
					<StatsCard
						title={sentenceCase(eventType)}
						total={eventTypesCount[eventType]}
						color={eventColors[eventType]}
						icon={eventIcons[eventType]}
					/>
				</Grid>
			))}
		</Grid>
	);
}
