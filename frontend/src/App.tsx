// utils
import { QueryClient, QueryClientProvider } from 'react-query';
// contexts
import { DateProvider } from './contexts/DateContext';
// components
import DashboardApp from './pages/DashboardApp';
import DashboardLayout from './layouts/DashboardLayout';

// ----------------------------------------------------------------------

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity
		}
	}
});

export default function App() {
	return (
		<DateProvider>
			<QueryClientProvider client={queryClient}>
				<DashboardLayout>
					<DashboardApp />
				</DashboardLayout>
			</QueryClientProvider>
		</DateProvider>
	);
}
