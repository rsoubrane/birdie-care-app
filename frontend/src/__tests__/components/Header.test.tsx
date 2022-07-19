import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import Header from '../../components/Header';

describe('The Header component is working properly', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	test('renders Header component with the logo', () => {
		act(() => {
			render(<Header />, container);
		});

		const header = screen.getByTestId('header');
		const logo = screen.getByTestId('logo');

		expect(header).toBeInTheDocument();
		expect(logo).toBeInTheDocument();
		expect(logo).toBeVisible();
		expect(logo).toBeInstanceOf(HTMLImageElement);
		expect(logo).toHaveStyle('width: 100px');
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});
});
