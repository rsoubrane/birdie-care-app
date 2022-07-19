import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import { AlertList } from '../../sections';

import { useFetchEvents } from '../../hooks/useFetchData';
import { createWrapper } from '../../utils/queryHelpers';
import { mockedEvents } from '../../__mocks__';

jest.mock('../../hooks/useFetchData');
const mockUseFetchEvents = useFetchEvents as jest.Mock;

describe('The AlertList section is working properly', () => {
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
		render(<AlertList />, { wrapper: createWrapper() });

		const emptyBox = screen.getByTestId('empty-box');
		expect(emptyBox).toBeInTheDocument();
		expect(emptyBox).toHaveTextContent('No alert today');
	});

	test('displays the data', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			data: mockedEvents
		}));

		render(<AlertList />, { wrapper: createWrapper() });

		const eventsList = screen.getByTestId('event-list');
		const eventsTimeline = screen.getByText('Alert list');
		const eventsTimelineItems = screen.getAllByTestId('event-list-items');
		const eventsTimelineItem = screen.getAllByTestId('event-list-item');

		expect(eventsList).toBeInTheDocument();
		expect(eventsTimelineItems.length).toBe(1);
		expect(eventsTimeline.childElementCount).toBe(0);
		expect(eventsList).toHaveTextContent('Alert list');
		expect(eventsTimelineItem.length).toBe(1);
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
