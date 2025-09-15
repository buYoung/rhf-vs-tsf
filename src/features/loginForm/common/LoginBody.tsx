import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { ACTION_LABELS } from '@/features/loginForm/constants';

export type LoginBodyCommonProps = {
    title: string;
    children: React.ReactNode;
    handleOnValidate: () => void;
};

export default function LoginBodyCommon({ title, children, handleOnValidate }: LoginBodyCommonProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1">{title}</Typography>
                <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" onClick={handleOnValidate}>
                        {ACTION_LABELS.validate}
                    </Button>
                    <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
                        {ACTION_LABELS.code}
                    </Button>
                </Box>
            </Box>
            {/* Metrics below title, left-aligned */}
            <Box sx={{ mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                    {ACTION_LABELS.metrics}
                </Typography>
                <Box sx={{ mt: 0.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="caption" color="text.secondary">
                        Render: —
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Validate: —
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Submit: —
                    </Typography>
                </Box>
            </Box>

            {/* Body: Login form (UI only) */}
            {children}

            {/* Code View modal (scaffold only) */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>{ACTION_LABELS.code}</DialogTitle>
                <DialogContent dividers>{/* TODO: Add code preview content later */}</DialogContent>
            </Dialog>
        </Paper>
    );
}
