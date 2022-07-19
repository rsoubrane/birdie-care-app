import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function BaseOptionChart(): ApexOptions {
	const theme = useTheme();

	const LABEL_TOTAL = {
		show: true,
		label: 'Total',
		color: theme.palette.text.secondary,
		fontSize: theme.typography.subtitle2.fontSize as string,
		fontWeight: theme.typography.subtitle2.fontWeight,
		lineHeight: theme.typography.subtitle2.lineHeight
	};

	const LABEL_VALUE = {
		offsetY: 8,
		color: theme.palette.text.primary,
		fontSize: theme.typography.h3.fontSize as string,
		fontWeight: theme.typography.h3.fontWeight,
		lineHeight: theme.typography.h3.lineHeight
	};

	return {
		// Colors
		colors: [
			theme.palette.primary.main,
			theme.palette.secondary.main,
			theme.palette.success.main,
			theme.palette.info.main,
			theme.palette.error.main,
			theme.palette.warning.main
		],

		// Chart
		chart: {
			toolbar: { show: false },
			zoom: { enabled: false },
			foreColor: theme.palette.text.disabled,
			fontFamily: theme.typography.fontFamily
		},

		// States
		states: {
			hover: {
				filter: {
					type: 'lighten',
					value: 0.04
				}
			},
			active: {
				filter: {
					type: 'darken',
					value: 0.88
				}
			}
		},

		// Fill
		fill: {
			opacity: 1,
			gradient: {
				type: 'vertical',
				shadeIntensity: 0,
				opacityFrom: 0.4,
				opacityTo: 0,
				stops: [0, 100]
			}
		},

		dataLabels: { enabled: false },

		// Stroke
		stroke: {
			width: 3,
			curve: 'smooth',
			lineCap: 'round'
		},

		// Grid
		grid: {
			strokeDashArray: 3,
			borderColor: theme.palette.divider
		},

		// Xaxis
		xaxis: {
			axisBorder: { show: false },
			axisTicks: { show: false }
		},

		// Legend
		legend: {
			show: true,
			fontSize: String(13),
			position: 'top',
			horizontalAlign: 'right',
			markers: {
				radius: 12
			},
			fontWeight: 500,
			itemMargin: { horizontal: 12 },
			labels: {
				colors: theme.palette.text.primary
			}
		},

		// plotOptions
		plotOptions: {
			// Bar
			bar: {
				columnWidth: '28%',
				borderRadius: 4
			},
			// Pie + Donut
			pie: {
				donut: {
					size: '50%',
					labels: {
						show: true,
						value: LABEL_VALUE,
						total: LABEL_TOTAL
					}
				}
			}
		},

		// Responsive
		responsive: [
			{
				// sm
				breakpoint: theme.breakpoints.values.sm,
				options: {
					plotOptions: { bar: { columnWidth: '40%' } }
				}
			},
			{
				// md
				breakpoint: theme.breakpoints.values.md,
				options: {
					plotOptions: { bar: { columnWidth: '32%' } }
				}
			}
		]
	};
}
