// material
import { styled } from '@mui/material/styles';
// components
import Header from '../components/Header';

// ----------------------------------------------------------------------

const APP_BAR_HEIGHT = 64;

const RootStyle = styled('div')({
	display: 'flex',
	minHeight: '100%',
	overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
	flexGrow: 1,
	overflow: 'auto',
	minHeight: '100%',
	paddingTop: APP_BAR_HEIGHT + 24,
	paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<RootStyle>
			<Header />

			<MainStyle data-typeid='dashboard-app'>{children}</MainStyle>
		</RootStyle>
	);
}
