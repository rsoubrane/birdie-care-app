import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import Table from '../../components/Table';
import { mockedEvents } from '../../__mocks__/index';

describe('The Table component is working properly', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	test('renders Table component', () => {
		act(() => {
			render(<Table data={mockedEvents} />, container);
		});

		const tableContainer = screen.getByTestId('table-container');
		const tableBody = screen.getByTestId('table-body');
		const tablePagination = screen.getByTestId('table-pagination');

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

	test('able to change the amount of element per page', () => {
		act(() => {
			render(<Table data={mockedEvents} />, container);
		});

		const tablePagination = screen.getByTestId('table-pagination');
		const tablePaginationSelectOption = screen.getByText('25');

		expect(tablePagination).toBeInTheDocument();

		act(() => {
			tablePaginationSelectOption.click();
		});
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});
});
