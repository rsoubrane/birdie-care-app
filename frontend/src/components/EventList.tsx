// @mui
import moment, { Moment } from 'moment';
import { Box, Stack, Link, Card, Typography, CardHeader, CardProps } from '@mui/material';
// components
import Iconify from './Iconify';
import Scrollbar from './Scrollbar';

// ----------------------------------------------------------------------

type ItemProps = {
	id: string;
	title: string;
	description: string;
	timestamp: Moment | Date;
	icon: string;
};

interface Props extends CardProps {
	title?: string;
	subheader?: string;
	list: ItemProps[];
}

export default function EventList({ title, subheader, list, ...other }: Props) {
	return (
		<Card sx={{ mb: 3 }} data-testid='event-list' {...other}>
			<CardHeader title={title} subheader={subheader} />

			<Scrollbar>
				<Stack spacing={3} sx={{ p: 3, pr: 0 }} data-testid='event-list-items'>
					{list.map((item) => (
						<EventItem key={item.id} events={item} />
					))}
				</Stack>
			</Scrollbar>
		</Card>
	);
}

// ----------------------------------------------------------------------

type EventItemProps = {
	events: ItemProps;
};

function EventItem({ events }: EventItemProps) {
	const { icon, title, description, timestamp } = events;

	return (
		<Stack direction='row' alignItems='center' spacing={2} display='inline-flex' data-testid='event-list-item'>
			<Iconify icon={icon} width={48} height={48} />

			<Box sx={{ width: '100%' }}>
				<Link color='inherit' variant='subtitle2' noWrap>
					{title}
				</Link>

				<Typography variant='body2' sx={{ color: 'text.secondary' }}>
					{description}
				</Typography>
			</Box>

			<Typography variant='caption' sx={{ px: 3, flexShrink: 0, color: 'text.secondary' }} justifySelf='flex-end'>
				{moment(timestamp).format('h:mm a')}
			</Typography>
		</Stack>
	);
}
