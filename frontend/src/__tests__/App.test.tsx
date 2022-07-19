import { render, screen } from '@testing-library/react';

import App from '../App';

describe('Build the App', () => {
	it('renders without crashing', () => {
		render(<App />);

		expect(screen.getByTestId('data-loader')).toBeInTheDocument();
	});
});
