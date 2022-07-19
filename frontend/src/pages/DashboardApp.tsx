import { useState } from 'react';
// @mui
import { Grid, Container, Typography, CircularProgress, Button } from '@mui/material';
// hooks
import useDate from '../hooks/useDate';
import useResponsive from '../hooks/useResponsive';
import { useFetchEvents, RECEIVER_ID } from '../hooks/useFetchData';
// layouts
import FullScreen from '../layouts/FullScreen';
// components
import DatePicker from '../components/DatePicker';
// sections
import {
	AlertList,
	EventsTimeline,
	EventsTable,
	FluidIntake,
	FoodIntakes,
	MoodList,
	ObservationTypes,
	Stats
} from '../sections';
import ErrorBox from '../components/ErrorBox';

// ----------------------------------------------------------------------

export default function DashboardApp() {
	const isMobile = useResponsive('down', 'lg');
	const { date } = useDate();
	const { data, error, isError, isLoading } = useFetchEvents(date);

	const [isTimelineOpen, setIsTimelineOpen] = useState(false);

	if (isLoading || isError || !data) {
		return (
			<FullScreen>
				{isLoading ? (
					<CircularProgress data-testid='data-loader' size={125} />
				) : isError ? (
					<ErrorBox message={error?.message} />
				) : (
					<ErrorBox
						message={`No data found for user ${RECEIVER_ID}
                        `}
					/>
				)}
			</FullScreen>
		);
	}

	return (
		<>
			{isTimelineOpen ? (
				<EventsTable isOpen={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} />
			) : (
				<Container maxWidth='xl' data-testid='data-success'>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Typography variant='h4'>Hi, Welcome back!</Typography>
							<Typography variant='h5' sx={{ my: 2 }}>
								This is the dashboard page of John Doe.
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: isMobile ? 'flex-start' : 'flex-end',
								justifyContent: 'center'
							}}>
							<DatePicker />
							<Button
								variant='contained'
								color='primary'
								onClick={() => setIsTimelineOpen(true)}
								sx={{ mt: 2, maxWidth: 230 }}
								data-testid='dialog-button'>
								View All Events
							</Button>
						</Grid>

						<Grid item xs={12}>
							<Stats />
						</Grid>

						<Grid item xs={12} md={6} lg={7}>
							<EventsTimeline />
						</Grid>

						<Grid item xs={12} md={6} lg={5}>
							<ObservationTypes />
						</Grid>

						<Grid item xs={12} md={6} lg={4}>
							<MoodList />
							{!isMobile && <AlertList />}
						</Grid>

						{isMobile && (
							<Grid item xs={12} md={6}>
								<AlertList />
							</Grid>
						)}

						<Grid item xs={12} md={6} lg={4}>
							<FluidIntake />
						</Grid>

						<Grid item xs={12} md={6} lg={4}>
							<FoodIntakes />
						</Grid>
					</Grid>
				</Container>
			)}
		</>
	);
}
