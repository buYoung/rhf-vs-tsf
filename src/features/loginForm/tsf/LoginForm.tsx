import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { ACTION_LABELS, FIELD_LABELS, LIB_FULL_NAMES } from '@/features/loginForm/constants';

export default function LoginForm() {
    return (
        <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField fullWidth label={FIELD_LABELS.id} margin="normal" />
            <TextField fullWidth label={FIELD_LABELS.password} type="password" margin="normal" />
        </Box>
    );
}
