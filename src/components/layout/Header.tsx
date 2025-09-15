import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useRouter } from 'next/router';
import ColorModeToggle from '../common/ColorModeToggle';

export default function Header() {
  const router = useRouter();
  const centerLabel = React.useMemo(() => {
    switch (router.pathname) {
      case '/':
      case '/simple':
        return 'Simple';
      case '/nested':
        return 'Nested';
      default:
        return '';
    }
  }, [router.pathname]);

  return (
    <AppBar position="sticky" color="default" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" sx={{ mr: 2 }}>
          RHF vs TSF
        </Typography>

        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="subtitle1">{centerLabel}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ColorModeToggle />
          <IconButton color="inherit" component="a" href="#" aria-label="GitHub">
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

