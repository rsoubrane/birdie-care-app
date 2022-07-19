import { ReactNode, createContext, useState } from 'react';

const DateContext = createContext({
	date: '2019-04-26',
	setDate: (date: string) => {}
});

function DateProvider({ children }: { children: ReactNode }) {
	const [date, setDate] = useState('2019-04-26');

	const changeDate = (newDate: string) => {
		setDate(newDate);
	};

	return (
		<DateContext.Provider
			value={{
				date,
				setDate: changeDate
			}}>
			{children}
		</DateContext.Provider>
	);
}

export { DateProvider, DateContext };
