// mui
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// assets
import Logo from '../assets/logo-birdie.svg';

export default function Header() {
	const StyledHeader = styled(AppBar)({
		backgroundColor: '#fff',
		boxShadow: 'none',
		color: '#000',
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 10
	});

	return (
		<StyledHeader position='static'>
			<Container maxWidth='xl' data-testid='header'>
				<Toolbar disableGutters>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						<img
							data-testid='logo'
							src={Logo}
							alt='logo'
							style={{
								width: '100px'
							}}
						/>
					</Typography>
				</Toolbar>
			</Container>
		</StyledHeader>
	);
}
