import { useState, useEffect } from 'react';
// hooks
import useDate from '../hooks/useDate';
import { useFetchEvents } from '../hooks/useFetchData';
// components
import EmptyBox from '../components/EmptyBox';
import TimelineList from '../components/TimelineList';
// types
import { Data } from '../types';

// ----------------------------------------------------------------------

export default function EventsTimeline() {
	const { date } = useDate();
	const { data } = useFetchEvents(date);

	const [filteredList, setFilteredList] = useState<Data[]>(data);

	const colors = {
		task_completed: 'success',
		mood_observation: 'warning',
		general_observation: 'info',
		physical_health_observation: 'error'
	};

	useEffect(() => {
		const selectedEvents = [
			'task_completed',
			'mood_observation',
			'general_observation',
			'physical_health_observation'
		];

		if (data) setFilteredList(data.filter((item: Data) => selectedEvents.includes(item.event_type)));
	}, [data]);

	return data && filteredList.length > 0 ? (
		// @ts-ignore
		<TimelineList title='Events timeline' list={filteredList} colors={colors} />
	) : (
		<EmptyBox title='Events timeline' message='No event today' />
	);
}
