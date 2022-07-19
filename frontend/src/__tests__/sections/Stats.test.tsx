import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import { Stats } from '../../sections';

import { useFetchEvents } from '../../hooks/useFetchData';
import { createWrapper } from '../../utils/queryHelpers';
import { mockedEvents } from '../../__mocks__';

jest.mock('../../hooks/useFetchData');
const mockUseFetchEvents = useFetchEvents as jest.Mock;

describe('The Stats section is working properly', () => {
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
		render(<Stats />, { wrapper: createWrapper() });

		const statsCards = screen.getByTestId('stats-cards');
		const statCards = screen.getAllByTestId('stats-card');

		expect(statsCards).toBeInTheDocument();
		expect(statsCards.childElementCount).toBe(3);
		expect(statCards[0]).toBeVisible();
		expect(statCards[1]).toBeVisible();
		expect(statCards[2]).toBeVisible();
		expect(statCards[0]).toHaveTextContent('Task completed');
		expect(statCards[1]).toHaveTextContent('Visit completed');
		expect(statCards[2]).toHaveTextContent('Alert raised');
		expect(statCards[0]).toHaveTextContent('0');
		expect(statCards[1]).toHaveTextContent('0');
		expect(statCards[2]).toHaveTextContent('0');
	});

	test('displays cards with data', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			data: mockedEvents
		}));

		render(<Stats />, { wrapper: createWrapper() });

		const statsCards = screen.getByTestId('stats-cards');
		const statCards = screen.getAllByTestId('stats-card');

		expect(statsCards).toBeInTheDocument();
		expect(statsCards.childElementCount).toBe(3);
		expect(statCards[0]).toBeVisible();
		expect(statCards[1]).toBeVisible();
		expect(statCards[2]).toBeVisible();
		expect(statCards[0]).toHaveTextContent('Task completed');
		expect(statCards[1]).toHaveTextContent('Visit completed');
		expect(statCards[2]).toHaveTextContent('Alert raised');
		expect(statCards[0]).toHaveTextContent('2');
		expect(statCards[1]).toHaveTextContent('0');
		expect(statCards[2]).toHaveTextContent('1');
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
