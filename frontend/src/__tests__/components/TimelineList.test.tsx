import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import TimelineList from '../../components/TimelineList';
import { mockedEvents, mockedEventsColors } from '../../__mocks__/index';

describe('The TimelineList component is working properly', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	test('renders TimelineList component', () => {
		act(() => {
			// @ts-ignore
			render(<TimelineList title='Events timeline' list={mockedEvents} colors={mockedEventsColors} />, container);
		});

		const timelineList = screen.getByText('Events timeline');
		const timelineListItems = screen.getAllByTestId('timeline-list-items');
		const timelineListItem = screen.getAllByTestId('timeline-list-item');

		expect(timelineList).toBeInTheDocument();
		expect(timelineListItems.length).toBe(1);
		expect(timelineListItem.length).toBe(mockedEvents.length);
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});
});
