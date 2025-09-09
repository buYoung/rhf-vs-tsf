import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { ACTION_LABELS, FIELD_LABELS, LIB_FULL_NAMES } from '../constants';

export default function LoginBoxTSF() {
  const [open, setOpen] = React.useState(false);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1">{LIB_FULL_NAMES.tsf}</Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined">{ACTION_LABELS.review}</Button>
          <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
            {ACTION_LABELS.code}
          </Button>
          <Button size="small" variant="outlined">{ACTION_LABELS.metrics}</Button>
        </Box>
      </Box>

      {/* Body: Login form (UI only) */}
      <Box component="form" noValidate sx={{ mt: 2 }}>
        <TextField fullWidth label={FIELD_LABELS.id} margin="normal" />
        <TextField fullWidth label={FIELD_LABELS.password} type="password" margin="normal" />
      </Box>

      {/* Code View modal (scaffold only) */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{ACTION_LABELS.code}</DialogTitle>
        <DialogContent dividers>{/* TODO: Add code preview content later */}</DialogContent>
      </Dialog>
    </Paper>
  );
}
