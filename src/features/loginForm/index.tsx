import * as React from 'react';
import Grid from '@mui/material/Grid';
import LoginBodyRHF from '@/features/loginForm/rhf/LoginBody';
import LoginBodyTSF from '@/features/loginForm/tsf/LoginBody';

export default function LoginForm() {
    return (
        <Grid container spacing={2}>
            <Grid
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <LoginBodyRHF />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <LoginBodyTSF />
            </Grid>
        </Grid>
    );
}
