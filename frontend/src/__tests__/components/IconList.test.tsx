import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import IconList from '../../components/IconList';
import Iconify from '../../components/Iconify';

describe('The IconList component is working properly', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	test('renders IconList component', () => {
		act(() => {
			render(
				<IconList
					title='Mood summary'
					list={[
						{
							name: 'Happy',
							value: 5,
							icon: <Iconify icon={'mdi:emoticon-happy'} color='#18f294' width={32} height={32} />
						},
						{
							name: 'Okay',
							value: 10,
							icon: <Iconify icon={'mdi:emoticon-neutral'} color='#fff652' width={32} height={32} />
						}
					]}
				/>,
				container
			);
		});

		const iconList = screen.getByTestId('icon-list');
		const iconListTitle = screen.getByText('Mood summary');
		const iconListItem = screen.getByText('Happy');
		const iconListItemValue = screen.getByText('5');

		expect(iconList).toBeInTheDocument();
		expect(iconList.childElementCount).toBe(2);
		expect(iconListTitle).toBeVisible();
		expect(iconListItem).toBeVisible();
		expect(iconListItemValue).toBeVisible();
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});
});
