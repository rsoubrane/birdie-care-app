import axios from 'axios';

export async function fetchAllEvents() {
	try {
		const { data } = await axios.get(`${process.env.API_URL}/events`);
		return data;
	} catch (error) {
		return error;
	}
}

export async function fetchEventById(id: string) {
	try {
		const { data } = await axios.get(`${process.env.API_URL}/events/${id}`);
		return data;
	} catch (error) {
		return error;
	}
}

export async function fetchEventByReceiverId(receiverId: string) {
	try {
		const { data } = await axios.get(`${process.env.API_URL}/events/receiver/${receiverId}`);
		return data;
	} catch (error) {
		return error;
	}
}

export async function fetchEventsDatesByReceiverId(receiverId: string) {
	try {
		const { data } = await axios.get(`${process.env.API_URL}/events/dates/receiver/${receiverId}`);
		return data;
	} catch (error) {
		return error;
	}
}

export async function fetchEventByReceiverIdAndTimestamp(receiverId: string, timestamp: string) {
	try {
		const { data } = await axios.get(`${process.env.API_URL}/events/receiver/${receiverId}/${timestamp}`);
		return data;
	} catch (error) {
		return error;
	}
}
