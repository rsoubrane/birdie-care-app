import SimpleBarReact, { Props as ScrollbarProps } from 'simplebar-react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
	flexGrow: 1,
	height: '100%',
	overflow: 'hidden'
}));

// ----------------------------------------------------------------------

interface Props extends ScrollbarProps {
	sx?: SxProps;
	children?: React.ReactNode;
}

export default function Scrollbar({ children, sx, ...other }: Props) {
	const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

	if (isMobile) {
		return (
			<Box sx={{ overflowX: 'auto', ...sx }} {...other}>
				{children}
			</Box>
		);
	}

	return (
		<RootStyle>
			<SimpleBarReact timeout={500} clickOnTrack={false} data-testid='scrollbar' {...other}>
				{children}
			</SimpleBarReact>
		</RootStyle>
	);
}
