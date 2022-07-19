import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function ErrorBox({ message }: { message: string }) {
	const theme = useTheme();

	return (
		<Paper
			sx={{
				width: '60%',
				border: '1px solid',
				borderColor: theme.palette.divider,
				borderRadius: theme.shape.borderRadius,
				padding: theme.spacing(5)
			}}>
			<Typography variant='h3' textAlign='center' data-testid='data-error'>
				{message}
			</Typography>
		</Paper>
	);
}
