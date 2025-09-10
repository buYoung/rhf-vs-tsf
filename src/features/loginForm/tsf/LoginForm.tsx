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
import Grid from '@mui/material/Grid';

export default function LoginForm() {
    return (
        <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField fullWidth label={FIELD_LABELS.id} sx={{ mb: 1 }} />
            <TextField fullWidth label={FIELD_LABELS.password} type="password" sx={{ mb: 1 }} />

            <Grid container spacing={2}>
                <Grid
                    size={{
                        xs: 3,
                        sm: 3,
                        md: 6,
                        lg: 6,
                        xl: 6,
                    }}
                ></Grid>
                <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                    <TextField fullWidth label={FIELD_LABELS.verificationCode} />
                </Grid>
                <Grid size={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                    <Button fullWidth variant="outlined" sx={{ height: '100%' }}>
                        {ACTION_LABELS.fieldValidation}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
