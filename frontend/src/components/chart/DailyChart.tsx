import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, CardProps } from '@mui/material';
// components
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------

interface Props extends CardProps {
	title?: string;
	subheader?: string;
	chartLabels: string[];
	chartData: {
		name: string;
		type: string;
		fill?: string;
		data: number[];
	}[];
}

export default function DailyChart({ title, subheader, chartLabels, chartData, ...other }: Props) {
	const chartOptions = merge(BaseOptionChart(), {
		plotOptions: { bar: { columnWidth: '40%' } },
		fill: { type: chartData.map((i) => i.fill) },
		labels: chartLabels,
		xaxis: { type: 'time' },
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: (y: number) => {
					if (typeof y !== 'undefined') {
						return `${y.toFixed(0)} ml consumed`;
					}
					return y;
				}
			}
		}
	});

	return (
		<Card {...other}>
			<CardHeader title={title} subheader={subheader} />

			<Box sx={{ p: 3, pb: 1 }}>
				<ReactApexChart type='line' series={chartData} options={chartOptions} height={364} />
			</Box>
		</Card>
	);
}
