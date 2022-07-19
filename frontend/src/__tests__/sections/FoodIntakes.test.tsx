import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import { FoodIntakes } from '../../sections';

import { useFetchEvents } from '../../hooks/useFetchData';
import { createWrapper } from '../../utils/queryHelpers';
import { mockedEvents } from '../../__mocks__';

jest.mock('../../hooks/useFetchData');
const mockUseFetchEvents = useFetchEvents as jest.Mock;

describe('The FoodIntakes section is working properly', () => {
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
		render(<FoodIntakes />, { wrapper: createWrapper() });

		const emptyBox = screen.getByTestId('empty-box');
		expect(emptyBox).toBeInTheDocument();
		expect(emptyBox).toHaveTextContent('No food intake today');
	});

	test('displays the data', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			data: mockedEvents
		}));

		render(<FoodIntakes />, { wrapper: createWrapper() });

		const eventsList = screen.getByTestId('event-list');
		const eventsTimeline = screen.getByText('Food intakes');
		const eventsTimelineItems = screen.getAllByTestId('event-list-items');
		const eventsTimelineItem = screen.getAllByTestId('event-list-item');

		expect(eventsList).toBeInTheDocument();
		expect(eventsTimelineItems.length).toBe(1);
		expect(eventsTimeline.childElementCount).toBe(0);
		expect(eventsList).toHaveTextContent('Food intakes');
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
