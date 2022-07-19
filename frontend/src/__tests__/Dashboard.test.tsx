import { unmountComponentAtNode } from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';

import DashboardLayout from '../layouts/DashboardLayout';
import DashboardApp from '../pages/DashboardApp';

import { useFetchEvents } from '../hooks/useFetchData';
import { createWrapper } from '../utils/queryHelpers';

jest.mock('../hooks/useFetchData');
const mockUseFetchEvents = useFetchEvents as jest.Mock;

describe('The Dashboard Layout is rendering properly', () => {
	test('displays the Dashboard Layout', () => {
		render(
			<DashboardLayout>
				<h1>It works!</h1>
			</DashboardLayout>
		);

		expect(screen.getByText('It works!')).toBeInTheDocument();
	});
});

describe('The Dashboard App is rendering accordingly', () => {
	let container: any = null;

	beforeAll(() => {
		mockUseFetchEvents.mockImplementation(() => ({
			isLoading: true
		}));

		container = document.createElement('div');
		document.body.appendChild(container);
	});

	test('displays the loading spinner', async () => {
		render(<DashboardApp />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByTestId('data-loader')).toBeInTheDocument();
		});
	});

	test('displays the error message', () => {
		mockUseFetchEvents.mockImplementation(() => ({
			isLoading: false,
			isError: true,
			error: { message: 'Unable to fetch the events list.' }
		}));

		render(<DashboardApp />, { wrapper: createWrapper() });

		const errorMessage = screen.getByTestId('data-error');
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveTextContent('Unable to fetch the events list.');
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
