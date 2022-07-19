import { useState, useEffect } from 'react';
// hooks
import useDate from '../hooks/useDate';
import { useFetchEvents } from '../hooks/useFetchData';
// components
import Iconify from '../components/Iconify';
import IconList from '../components/IconList';
// types
import { Data } from '../types';

// ----------------------------------------------------------------------

export default function MoodList() {
	const { date } = useDate();
	const { data } = useFetchEvents(date);

	const [moodList, setMoodList] = useState<Data[]>([]);
	const [moodValues, setMoodValues] = useState({
		happy: 0,
		okay: 0,
		sad: 0
	});

	useEffect(() => {
		if (data) setMoodList(data.filter((item) => item.event_type === 'mood_observation'));
	}, [data]);

	useEffect(() => {
		const moodValues =
			moodList.reduce(
				(acc, item) => {
					const { payload_as_text } = item;
					const { mood } = JSON.parse(payload_as_text);
					if (mood === 'happy') {
						acc.happy += 1;
					} else if (mood === 'okay') {
						acc.okay += 1;
					} else if (mood === 'sad') {
						acc.sad += 1;
					}
					return acc;
				},
				{ happy: 0, okay: 0, sad: 0 }
			) || ({ happy: 0, okay: 0, sad: 0 } as { happy: number; okay: number; sad: number });

		setMoodValues(moodValues);
	}, [moodList]);

	return (
		<IconList
			title='Mood summary'
			list={[
				{
					name: 'Happy',
					value: moodValues.happy,
					icon: <Iconify icon={'mdi:emoticon-happy'} color='#00bcd4' width={32} height={32} />
				},
				{
					name: 'Okay',
					value: moodValues.okay,
					icon: <Iconify icon={'mdi:emoticon-neutral'} color='#ff9800' width={32} height={32} />
				},
				{
					name: 'Sad',
					value: moodValues.sad,
					icon: <Iconify icon={'mdi:emoticon-sad'} color='#f44336' width={32} height={32} />
				}
			]}
		/>
	);
}
