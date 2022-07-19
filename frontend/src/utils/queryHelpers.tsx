import { rest } from 'msw';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const handlers = [
	rest.get('*/react-query', (req, res, ctx) =>
		res(
			ctx.status(200),
			ctx.json({
				name: 'mocked-react-query'
			})
		)
	)
];

export function createWrapper() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 3,
				staleTime: Infinity
			}
		}
	});
	return ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
