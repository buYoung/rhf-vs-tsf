import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ActionBar from '../common/ActionBar';

type Props = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: Props) {
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <ActionBar />
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Paper>
    </Container>
  );
}

