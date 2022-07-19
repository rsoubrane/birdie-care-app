import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import Scrollbar from '../../components/Scrollbar';

describe('The Scrollbar component is working properly', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);

		act(() => {
			render(<Scrollbar />, container);
		});
	});

	test('renders Scrollbar component', () => {
		const scrollbar = screen.getByTestId('scrollbar');

		expect(scrollbar).toBeInTheDocument();
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});
});
