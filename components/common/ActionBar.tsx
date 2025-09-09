import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

export default function ActionBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 48 }}>
      <Chip label="RHF" size="small" color="primary" variant="outlined" />

      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
        <Chip label="TSF" size="small" variant="outlined" />
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Button size="small" variant="contained">
          전체검토
        </Button>
        <Box sx={{ width: 8 }} />
      </Box>
    </Box>
  );
}

