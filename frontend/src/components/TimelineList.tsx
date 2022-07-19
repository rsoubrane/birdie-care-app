import moment from 'moment';
import { sentenceCase } from 'change-case';
// @mui
import { Card, Typography, CardHeader, CardContent, CardProps } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { Data } from '../types';

// ----------------------------------------------------------------------

interface Props extends CardProps {
	title?: string;
	list: Data[];
	colors: {
		[index: string]: 'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	};
}

export default function TimelineList({ title, list, colors, ...other }: Props) {
	return (
		<Card {...other} sx={{ maxHeight: '500px', overflow: 'scroll' }} data-testid='timeline-list'>
			<CardHeader title={title} />

			<CardContent
				sx={{
					'& .MuiTimelineItem-missingOppositeContent:before': {
						display: 'none'
					}
				}}>
				<Timeline data-testid='timeline-list-items'>
					{list.map((item, index) => (
						<TimelineListItem
							key={item.id}
							item={item}
							color={colors[item.event_type]}
							isLast={index === list.length - 1}
						/>
					))}
				</Timeline>
			</CardContent>
		</Card>
	);
}

// ----------------------------------------------------------------------

type TimelineListItemProps = {
	item: Data;
	isLast: boolean;
	color: 'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
};

function TimelineListItem({ item, color, isLast }: TimelineListItemProps) {
	const { event_type, payload_as_text, timestamp } = item;
	const payload = JSON.parse(payload_as_text);
	const description = payload.mood ? sentenceCase(payload.mood) : payload.note || payload.task_schedule_note;

	return (
		<TimelineItem data-testid='timeline-list-item'>
			<TimelineSeparator>
				<TimelineDot color={color} />
				{isLast ? null : <TimelineConnector />}
			</TimelineSeparator>

			<TimelineContent>
				<Typography variant='subtitle2'>
					{event_type ? sentenceCase(event_type) : 'Unknown event type'}
					{description && ': '}
					{description}
				</Typography>

				<Typography variant='caption' sx={{ color: 'text.secondary' }}>
					{moment(timestamp).format('h:mm a')}
				</Typography>
			</TimelineContent>
		</TimelineItem>
	);
}
