// @mui
import { Card, Typography, CardHeader, CardContent, CardProps, Paper } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends CardProps {
	title?: string;
	message: string;
}

export default function EmptyBox({ title, message, ...other }: Props) {
	return (
		<Card {...other} sx={{ overflow: 'scroll' }} data-testid='empty-box'>
			<CardHeader title={title} />

			<CardContent
				sx={{
					height: '100%',
					'& .MuiTimelineItem-missingOppositeContent:before': {
						display: 'none'
					}
				}}>
				<Paper
					elevation={2}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						p: 6
					}}>
					<Typography variant='h6' gutterBottom>
						{message}
					</Typography>
				</Paper>
			</CardContent>
		</Card>
	);
}
