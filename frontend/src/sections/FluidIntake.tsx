import { useState, useEffect } from 'react';
// utils
import moment from 'moment';
// hooks
import useDate from '../hooks/useDate';
import { useFetchEvents } from '../hooks/useFetchData';
// components
import EmptyBox from '../components/EmptyBox';
import DailyChart from '../components/chart/DailyChart';

// ----------------------------------------------------------------------

export default function FluidIntakeSection() {
	const { date } = useDate();
	const { data } = useFetchEvents(date);

	const timeOfDay = new Array(24).fill(0).map((_, i) => i.toString());
	const [fluidIntakes, setFluidIntakes] = useState<{
		data: any[];
		labels: string[];
	}>({ data: [], labels: timeOfDay });

	useEffect(() => {
		const fluid = data
			.filter((item) => item.event_type === 'fluid_intake_observation')
			.map((item) => ({
				timestamp: moment(item.timestamp).format('HH'),
				value: JSON.parse(item.payload_as_text).consumed_volume_ml
			}))
			.reduce((acc, curr) => {
				const timestamp: string | number =
					Number(curr.timestamp) < 10 ? curr.timestamp.replace('0', '') : curr.timestamp;
				if (acc[Number(timestamp)]) {
					acc[Number(timestamp)] += curr.value;
				} else {
					acc[Number(timestamp)] = curr.value;
				}
				return acc;
			}, {} as { [key: number]: number });

		const fluidLabels = timeOfDay.slice(
			Number(Object.keys(fluid)[0]),
			Number(Object.keys(fluid)[Object.keys(fluid).length - 1]) + 1
		);

		const fluidData = fluidLabels.map((time: string) => (fluid[Number(time)] ? fluid[Number(time)] : 0));
		setFluidIntakes({ data: fluidData, labels: fluidLabels });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return fluidIntakes.data.length > 0 ? (
		<DailyChart
			title='Fluid intakes'
			chartLabels={fluidIntakes.labels}
			chartData={[
				{
					name: 'Fluid intake',
					type: 'column',
					fill: 'solid',
					data: fluidIntakes.data
				}
			]}
		/>
	) : (
		<EmptyBox title='Fluid intakes' message='No fluid intake today' />
	);
}
