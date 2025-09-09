import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default function PageContainer({ children }: Props) {
    return (
        <Box sx={{ mt: 2, mb: 4, mx: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ mt: 2 }}>{children}</Box>
            </Paper>
        </Box>
    );
}
