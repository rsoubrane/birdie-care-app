import { useContext } from 'react';
// context
import { DateContext } from '../contexts/DateContext';

export default function useDate() {
	const context = useContext(DateContext);

	if (!context) {
		throw new Error('useDate must be used within a DateProvider');
	}

	return context;
}
