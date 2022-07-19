import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, CardProps } from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';
// components
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 410;
const LEGEND_HEIGHT = 112;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
	height: CHART_HEIGHT,
	marginTop: theme.spacing(3),
	'& .apexcharts-canvas svg': { height: CHART_HEIGHT },
	'& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
		overflow: 'visible'
	},
	'& .apexcharts-legend': {
		height: LEGEND_HEIGHT,
		alignContent: 'center',
		position: 'relative !important' as 'relative',
		borderTop: `solid 1px ${theme.palette.divider}`,
		top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
	},
	'& .apexcharts-datalabel-label': {
		offsetY: theme.spacing(10),
		y: theme.spacing(10)
	}
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
	title?: string;
	subheader?: string;
	chartData: {
		label: string;
		value: number;
	}[];
	chartColors?: string[];
}

export default function PieChart({ title, subheader, chartData, chartColors, ...other }: Props) {
	const theme = useTheme();

	const chartLabels = chartData.map((i) => i.label);
	const chartSeries = chartData.map((i) => i.value);

	const chartOptions = merge(BaseOptionChart(), {
		colors: chartColors,
		labels: chartLabels,
		stroke: { colors: [theme.palette.background.paper] },
		legend: { floating: true, horizontalAlign: 'center' },
		tooltip: {
			fillSeriesColor: false,
			y: {
				formatter: (seriesName: string) => fNumber(seriesName),
				title: {
					formatter: (seriesName: string) => `${seriesName}`
				}
			}
		},
		plotOptions: {
			pie: {
				donut: {
					size: '90%',
					labels: {
						show: true,
						name: {
							offsetY: -25
						},
						value: {
							formatter: (val: number | string) => fNumber(val)
						},
						total: {
							formatter: (w: { globals: { seriesTotals: number[] } }) => {
								const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
								return fNumber(sum);
							}
						}
					}
				}
			}
		}
	});

	return (
		<Card data-testid='pie-chart-container' {...other}>
			<CardHeader title={title} />

			<ChartWrapperStyle data-testid='pie-chart'>
				<ReactApexChart type='donut' series={chartSeries} options={chartOptions} height={280} />
			</ChartWrapperStyle>
		</Card>
	);
}
