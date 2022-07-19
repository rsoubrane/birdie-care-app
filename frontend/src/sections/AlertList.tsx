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

export default function AlertList() {
	const { date } = useDate();
	const { data } = useFetchEvents(date);

	const [alertList, setAlertList] = useState<Data[]>([]);

	useEffect(() => {
		if (data) setAlertList(data.filter((item) => item.event_type === 'alert_raised'));
	}, [data]);

	return data && alertList.length > 0 ? (
		<EventList
			title='Alert list'
			list={alertList.map((item: Data) => {
				const { id, payload_as_text, timestamp } = item;
				const { observation_event_id } = JSON.parse(payload_as_text);

				const observationEvent = data.find((item) => item.id === observation_event_id);

				if (!observationEvent) {
					return {
						id,
						title: 'Alert raised',
						description: 'No observation associated to this alert',
						icon: 'mdi:alert-octagon',
						timestamp: moment(timestamp)
					};
				}

				const { medication_type, medication_failure_reason, note } = JSON.parse(
					observationEvent.payload_as_text
				);

				return {
					id,
					title: sentenceCase(observationEvent.event_type),
					description: note || medication_failure_reason || medication_type,
					icon: 'mdi:alert-octagon',
					timestamp: moment(timestamp)
				};
			})}
		/>
	) : (
		<EmptyBox title='Alert list' message='No alert today' />
	);
}
