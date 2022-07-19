import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import { EventsTable } from '../../sections';

import { useFetchEventsByReceiverId } from '../../hooks/useFetchData';
import { createWrapper } from '../../utils/queryHelpers';
import { mockedEvents } from '../../__mocks__';

jest.mock('../../hooks/useFetchData');
const mockUseFetchEvents = useFetchEventsByReceiverId as jest.Mock;

describe('The EventsTable section is working properly', () => {
	let container: any = null;

	beforeAll(() => {
		mockUseFetchEvents.mockImplementation(() => ({
			isLoading: true,
			isError: false,
			data: null
		}));

		container = document.createElement('div');
		document.body.appendChild(container);
	});

	test('displays the loading spinner', async () => {
		render(<EventsTable isOpen={true} onClose={() => null} />, { wrapper: createWrapper() });

		expect(screen.getByTestId('data-loader')).toBeInTheDocument();
	});

	test('displays the error message', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			isLoading: false,
			isError: true,
			error: { message: 'Unable to fetch the events list.' }
		}));

		render(<EventsTable isOpen={true} onClose={() => null} />, { wrapper: createWrapper() });

		const errorMessage = screen.getByTestId('data-error');

		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveTextContent('Unable to fetch the events list.');
	});

	test('displays no data found', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			isLoading: false,
			isError: false,
			data: null
		}));

		render(<EventsTable isOpen={true} onClose={() => null} />, { wrapper: createWrapper() });

		const errorMessage = screen.getByTestId('data-error');

		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveTextContent('No data found for this user');
	});

	test('displays the dialog opened with the table', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			isLoading: false,
			isError: false,
			data: mockedEvents
		}));

		render(<EventsTable isOpen={true} onClose={() => null} />, { wrapper: createWrapper() });

		const dialog = screen.getByTestId('dialog');
		const tableContainer = screen.getByTestId('table-container');
		const tableBody = screen.getByTestId('table-body');
		const tablePagination = screen.getByTestId('table-pagination');

		expect(dialog).toBeInTheDocument();
		expect(dialog).toContainElement(screen.getByText('Events List'));
		expect(dialog).toContainElement(screen.getByText('Close'));
		expect(dialog).toContainElement(tableContainer);

		expect(tableContainer).toBeInTheDocument();
		expect(tableContainer).toContainElement(screen.getByText('Timestamp'));
		expect(tableContainer).toContainElement(screen.getByText('Care Giver'));
		expect(tableContainer).toContainElement(screen.getByText('Event'));
		expect(tableContainer).toContainElement(screen.getByText('Note'));

		expect(tableBody).toBeInTheDocument();
		expect(tableBody).toContainElement(screen.getByText('04/26/2019 9:08 am'));
		expect(tableBody).toContainElement(screen.getByText('Fluid intake observation'));

		expect(tablePagination).toBeInTheDocument();
		expect(tablePagination).toContainElement(screen.getByText('25'));

		expect(tableBody.children.length).toBe(6);
	});

	test('able to close the dialog page', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			isLoading: false,
			isError: false,
			data: mockedEvents
		}));

		render(<EventsTable isOpen={true} onClose={() => null} />, { wrapper: createWrapper() });

		const dialog = screen.getByTestId('dialog');
		const closeButton = screen.getByText('Close');

		expect(dialog).toBeInTheDocument();
		expect(dialog).toContainElement(closeButton);

		act(() => {
			closeButton.click();
		});
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
