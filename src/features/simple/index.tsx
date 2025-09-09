import * as React from 'react';
import Grid from '@mui/material/Grid';
import LoginBoxRHF from './rhf/LoginBox';
import LoginBoxTSF from './tsf/LoginBox';

export default function SimpleCompare() {
    return (
        <Grid container spacing={2}>
            <Grid
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <LoginBoxRHF />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <LoginBoxTSF />
            </Grid>
        </Grid>
    );
}
