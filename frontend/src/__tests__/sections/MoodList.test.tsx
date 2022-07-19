import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import { MoodList } from '../../sections';

import { useFetchEvents } from '../../hooks/useFetchData';
import { createWrapper } from '../../utils/queryHelpers';
import { mockedEvents } from '../../__mocks__';

jest.mock('../../hooks/useFetchData');
const mockUseFetchEvents = useFetchEvents as jest.Mock;

describe('The MoodList section is working properly', () => {
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

	test('displays cards with no data', () => {
		render(<MoodList />, { wrapper: createWrapper() });

		const moodList = screen.getByTestId('icon-list');
		const moodListItem = screen.getAllByTestId('icon-list-item');

		expect(moodList).toBeInTheDocument();
		expect(moodList.childElementCount).toBe(2);
		expect(moodListItem[0]).toBeVisible();
		expect(moodListItem[1]).toBeVisible();
		expect(moodListItem[2]).toBeVisible();
		expect(moodListItem[0]).toHaveTextContent('Happy');
		expect(moodListItem[1]).toHaveTextContent('Okay');
		expect(moodListItem[2]).toHaveTextContent('Sad');
		expect(moodListItem[0]).toHaveTextContent('0');
		expect(moodListItem[1]).toHaveTextContent('0');
		expect(moodListItem[2]).toHaveTextContent('0');
	});

	test('displays cards with data', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			data: mockedEvents
		}));

		render(<MoodList />, { wrapper: createWrapper() });

		const moodList = screen.getByTestId('icon-list');
		const moodListItem = screen.getAllByTestId('icon-list-item');

		expect(moodList).toBeInTheDocument();
		expect(moodList.childElementCount).toBe(2);
		expect(moodListItem[0]).toBeVisible();
		expect(moodListItem[1]).toBeVisible();
		expect(moodListItem[2]).toBeVisible();
		expect(moodListItem[0]).toHaveTextContent('Happy');
		expect(moodListItem[1]).toHaveTextContent('Okay');
		expect(moodListItem[2]).toHaveTextContent('Sad');
		expect(moodListItem[0]).toHaveTextContent('1');
		expect(moodListItem[1]).toHaveTextContent('0');
		expect(moodListItem[2]).toHaveTextContent('0');
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
