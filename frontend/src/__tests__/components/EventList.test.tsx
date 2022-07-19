import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import EventList from '../../components/EventList';
import { mockedAlertList } from '../../__mocks__';

describe('The EventList component is working properly', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	test('renders EventList component', () => {
		act(() => {
			render(<EventList title='Alert list' list={mockedAlertList} />, container);
		});

		const eventList = screen.getByTestId('event-list');
		const eventListTitle = screen.getByText('Alert list');
		const eventListItemCount = screen.getAllByTestId('event-list-item').length;
		const eventListItem = screen.getByText('No medication observation received');
		const eventListItemDescription = screen.getByText(
			"Didn't receive any medication observations in the last 24 hours"
		);

		expect(eventList).toBeInTheDocument();
		expect(eventList.childElementCount).toBe(2);
		expect(eventListTitle).toBeVisible();
		expect(eventListItemCount).toBe(2);
		expect(eventListItem).toBeVisible();
		expect(eventListItemDescription).toBeVisible();
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});
});
