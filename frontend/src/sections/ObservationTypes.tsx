import { useState, useEffect } from 'react';
// utils
import { sentenceCase } from 'change-case';
// hooks
import useDate from '../hooks/useDate';
import { useFetchEvents } from '../hooks/useFetchData';
// @mui
import { useTheme } from '@mui/material/styles';
// components
import EmptyBox from '../components/EmptyBox';
import PieChart from '../components/chart/PieChart';

// ----------------------------------------------------------------------

export default function ObservationTypes() {
	const theme = useTheme();
	const { date } = useDate();
	const { data } = useFetchEvents(date);

	const [eventTypes, setEventTypes] = useState<{ label: string; value: number }[]>([]);

	useEffect(() => {
		if (data) {
			const eventTypes = Object.entries(
				data?.reduce((acc, item) => {
					const eventType = sentenceCase(item.event_type);
					if (!acc[eventType] && eventType.includes('observation')) {
						acc[eventType] = 0;
					}
					if (eventType.includes('observation')) acc[eventType]++;
					return acc;
				}, {} as Record<string, number>)
			)
				.sort((a, b) => b[1] - a[1])
				.map(([key, value]) => ({
					label: key,
					value
				}));

			setEventTypes(eventTypes);
		}
	}, [data]);

	return data && eventTypes.length > 0 ? (
		<PieChart
			data-testid='observation-types'
			title='Observation types'
			chartData={eventTypes}
			chartColors={[theme.palette.primary.main]}
		/>
	) : (
		<EmptyBox title='Observation types' message='No event today' />
	);
}
