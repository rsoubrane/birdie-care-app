import { useState, useEffect } from 'react';
// utils
import moment from 'moment';
import { sentenceCase } from 'change-case';
// hooks
import useDate from '../hooks/useDate';
import { useFetchEvents } from '../hooks/useFetchData';
// components
import EmptyBox from '../components/EmptyBox';
import EventList from '../components/EventList';
// types
import { Data } from '../types/index';

// ----------------------------------------------------------------------

export default function FoodIntakes() {
	const { date } = useDate();
	const { data } = useFetchEvents(date);

	const [foodIntakes, setFoodIntakes] = useState<Data[]>([]);

	useEffect(() => {
		if (data) setFoodIntakes(data.filter((item) => item.event_type === 'food_intake_observation'));
	}, [data]);

	return data && foodIntakes.length > 0 ? (
		<EventList
			title='Food intakes'
			list={foodIntakes.map((item: Data) => {
				const { id, payload_as_text, timestamp } = item;
				const { meal, note } = JSON.parse(payload_as_text);
				return {
					id,
					title: sentenceCase(meal),
					description: note,
					icon: meal === 'meal' ? 'mdi:food-turkey' : 'mdi:food-apple',
					timestamp: moment(timestamp)
				};
			})}
		/>
	) : (
		<EmptyBox title='Food intakes' message='No food intake today' />
	);
}
