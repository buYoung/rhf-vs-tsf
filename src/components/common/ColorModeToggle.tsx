import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorScheme } from '@mui/material/styles';

export default function ColorModeToggle() {
    const { mode, setMode } = useColorScheme();
    if (!mode) return null; // avoid SSR mismatch
    const isDark = mode === 'dark';
    const next = isDark ? 'light' : 'dark';

    return (
        <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton color="inherit" onClick={() => setMode(next)} aria-label="toggle dark mode" size="small">
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
}
