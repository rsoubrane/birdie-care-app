// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '../utils/formatNumber';
// components
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
	margin: 'auto',
	display: 'flex',
	borderRadius: '50%',
	alignItems: 'center',
	width: theme.spacing(10),
	height: theme.spacing(10),
	justifyContent: 'center'
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
	title: string;
	total: number;
	color: string;
	icon: string;
}

export default function StatsCard({ title, total, icon, color, sx, ...other }: Props) {
	return (
		<Card
			data-testid='stats-card'
			sx={{
				py: 3,
				display: 'flex',
				textAlign: 'center',
				justifyContent: 'space-around',
				alignItems: 'center'
			}}
			{...other}>
			<IconWrapperStyle
				sx={{
					color: color,
					backgroundImage: `linear-gradient(135deg, ${alpha(color, 0)} 0%, ${alpha(color, 0.24)} 100%)`
				}}>
				<Iconify icon={icon} width={40} height={40} />
			</IconWrapperStyle>

			<Box
				sx={{
					width: '50%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column'
				}}>
				<Typography variant='h3'>{fShortenNumber(total)}</Typography>

				<Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
					{title}
				</Typography>
			</Box>
		</Card>
	);
}
