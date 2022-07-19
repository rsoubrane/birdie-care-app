import { useQuery } from 'react-query';
// utils
import {
	fetchEventByReceiverId,
	fetchEventByReceiverIdAndTimestamp,
	fetchEventsDatesByReceiverId
} from '../utils/fetchApi';
// types
import { Data } from '../types';

// --------------------------------------------------

export interface FetchEventsInterface {
	data: Data[];
	error: Error;
	isError: boolean;
	isLoading: boolean;
}

export const RECEIVER_ID = process.env.RECEIVER_ID || ('df50cac5-293c-490d-a06c-ee26796f850d' as string);

// --------------------------------------------------

export const useFetchEventsDatesByReceiverId = (receiverId: string = RECEIVER_ID) => {
	const { data, error, isLoading, isError } = useQuery(['events-dates', receiverId], async () => {
		try {
			const events = await fetchEventsDatesByReceiverId(receiverId);
			return events;
		} catch (error) {
			console.error(error);
			return error;
		}
	});
	return { dates: data, error, isLoading, isError };
};

export const useFetchEventsByReceiverId = (receiverId: string = RECEIVER_ID) => {
	const { data, error, isError, isLoading } = useQuery(
		['all-events'],
		async () => {
			try {
				const events = await fetchEventByReceiverId(receiverId || RECEIVER_ID);
				return events;
			} catch (error) {
				console.error(error);
				return error;
			}
		},
		{
			retry: (failureCount, error) => (error.name === 'Network Error' && failureCount <= 3 ? true : false),
			retryDelay: (retryCount) => (retryCount === 0 ? 1000 : 5000)
		}
	) as FetchEventsInterface;

	return { data, error, isError, isLoading };
};

export const useFetchEvents = (selectedDate: string) => {
	const { data, error, isLoading, isError } = useQuery(
		['events', selectedDate],
		async () => {
			try {
				const events = await fetchEventByReceiverIdAndTimestamp(RECEIVER_ID, selectedDate);
				return events;
			} catch (error) {
				console.error(error);
				return [];
			}
		},
		{
			retry: (failureCount, error) => (error.name === 'Network Error' && failureCount <= 3 ? true : false),
			retryDelay: (retryCount) => (retryCount === 0 ? 1000 : 5000)
		}
	) as FetchEventsInterface;

	return { data, error, isLoading, isError };
};
