import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import StatsCard from '../../components/StatsCard';

describe('The StatsCard component is working properly', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	test('renders StatsCard component', () => {
		act(() => {
			render(
				<StatsCard title='Task completed' total={112} color='#00bcd4' icon='mdi:calendar-check' />,
				container
			);
		});

		const statsCard = screen.getByTestId('stats-card');
		const statsCardTitle = screen.getByText('Task completed');
		const statsCardValue = screen.getByText('112');

		expect(statsCard).toBeVisible();
		expect(statsCard.childElementCount).toBe(2);
		expect(statsCardTitle).toBeVisible();
		expect(statsCardValue).toBeVisible();
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});
});
