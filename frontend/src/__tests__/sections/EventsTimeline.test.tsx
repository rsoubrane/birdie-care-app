import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import { EventsTimeline } from '../../sections';

import { useFetchEvents } from '../../hooks/useFetchData';
import { createWrapper } from '../../utils/queryHelpers';
import { mockedEvents } from '../../__mocks__';

jest.mock('../../hooks/useFetchData');
const mockUseFetchEvents = useFetchEvents as jest.Mock;

describe('The EventsTimeline section is working properly', () => {
	let container: any = null;

	beforeAll(() => {
		mockUseFetchEvents.mockImplementation(() => ({
			isLoading: false,
			isError: false,
			data: null
		}));

		container = document.createElement('div');
		document.body.appendChild(container);
	});

	test('displays the empty box', () => {
		render(<EventsTimeline />, { wrapper: createWrapper() });

		const emptyBox = screen.getByTestId('empty-box');
		expect(emptyBox).toBeInTheDocument();
		expect(emptyBox).toHaveTextContent('No event today');
	});

	test('displays the data', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			data: mockedEvents
		}));

		render(<EventsTimeline />, { wrapper: createWrapper() });

		const eventsList = screen.getByTestId('timeline-list');
		const eventsTimeline = screen.getByText('Events timeline');
		const eventsTimelineItems = screen.getAllByTestId('timeline-list-items');
		const eventsTimelineItem = screen.getAllByTestId('timeline-list-item');

		expect(eventsList).toBeInTheDocument();
		expect(eventsTimelineItems.length).toBe(1);
		expect(eventsTimeline.childElementCount).toBe(0);
		expect(eventsList).toHaveTextContent('Events timeline');
		expect(eventsTimelineItem.length).toBe(3);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});
});
