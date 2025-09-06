import { Grid } from '@mui/material';
import type { ReactNode } from 'react';

interface FieldRowProps {
  children: ReactNode;
  spacing?: number;
}

export default function FieldRow({ children, spacing = 2 }: FieldRowProps) {
  return (
    <Grid container spacing={spacing} sx={{ mb: 2 }}>
      {children}
    </Grid>
  );
}
