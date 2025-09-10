import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FIELD_LABELS } from '@/features/loginForm/constants';
import * as React from 'react';

export function LoginForm() {
    return (
        <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField fullWidth label={FIELD_LABELS.id} margin="normal" />
            <TextField fullWidth label={FIELD_LABELS.password} type="password" margin="normal" />
        </Box>
    );
}
