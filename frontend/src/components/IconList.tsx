// @mui
import { Box, Card, Paper, Typography, CardHeader, CardContent, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '../utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
	title?: string;
	subheader?: string;
	list: {
		name: string;
		value: number;
		icon: React.ReactElement;
	}[];
}

export default function IconList({ title, subheader, list, ...other }: Props) {
	return (
		<Card data-testid='icon-list' {...other} sx={{ mb: 3 }}>
			<CardHeader title={title} subheader={subheader} />

			<CardContent>
				<Box
					sx={{
						display: 'grid',
						gap: 2,
						gridTemplateColumns: 'repeat(3, 1fr)'
					}}>
					{list.map((site) => (
						<Paper
							data-testid='icon-list-item'
							key={site.name}
							variant='outlined'
							sx={{ py: 2.5, textAlign: 'center' }}>
							<Box sx={{ mb: 0.5 }}>{site.icon}</Box>

							<Typography variant='h6'>{fShortenNumber(site.value)}</Typography>

							<Typography variant='body2' sx={{ color: 'text.secondary' }}>
								{site.name}
							</Typography>
						</Paper>
					))}
				</Box>
			</CardContent>
		</Card>
	);
}
