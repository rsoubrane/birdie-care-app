import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import DatePicker from '../../components/DatePicker';

import { useFetchEventsDatesByReceiverId } from '../../hooks/useFetchData';
import { createWrapper } from '../../utils/queryHelpers';

jest.mock('../../hooks/useFetchData');
const mockUseFetchEventsDates = useFetchEventsDatesByReceiverId as jest.Mock;

describe('The DatePicker component is working properly', () => {
	let container: any = null;

	beforeEach(() => {
		mockUseFetchEventsDates.mockImplementation(() => ({
			dates: {
				startDate: null,
				endDate: null
			}
		}));

		container = document.createElement('div');
		document.body.appendChild(container);

		act(() => {
			render(<DatePicker />, { wrapper: createWrapper() });
		});
	});

	test('renders DatePicker', () => {
		const datePicker = screen.getByTestId('date-picker');
		expect(datePicker).toBeInTheDocument();
	});

	test('updates DatePicker value', () => {
		const datePickerInput: HTMLInputElement = screen.getByLabelText('Care Date');
		expect(datePickerInput.value).toBe('04/26/2019');

		act(() => {
			datePickerInput.value = '04/27/2019';
			datePickerInput.dispatchEvent(new Event('change'));
		});

		expect(datePickerInput.value).toBe('04/27/2019');
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
