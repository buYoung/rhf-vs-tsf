import type React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

export interface AppLayoutProps {
  currentPage: 'simple' | 'nested';
  onChangePage: (page: 'simple' | 'nested') => void;
  children: React.ReactNode;
}

export default function AppLayout({ currentPage, onChangePage, children }: AppLayoutProps) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            onClick={() => onChangePage('simple')}
            variant={currentPage === 'simple' ? 'contained' : 'text'}
            color="inherit"
            sx={{ mr: 1 }}
          >
            Simple Data
          </Button>
          <Button
            onClick={() => onChangePage('nested')}
            variant={currentPage === 'nested' ? 'contained' : 'text'}
            color="inherit"
          >
            Nested Data
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100dvh - 64px)',
          px: 2,
        }}
      >
        {children}
      </Box>
    </>
  );
}

