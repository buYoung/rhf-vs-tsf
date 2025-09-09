import * as React from 'react';
import Grid from '@mui/material/Grid';
import LoginBodyRHF from '@/features/simple/rhf/LoginBody';
import LoginBodyTSF from '@/features/simple/tsf/LoginBody';

export default function SimpleCompare() {
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
