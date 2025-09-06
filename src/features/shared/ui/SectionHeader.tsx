import { Typography, Divider, Box } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
      <Divider />
    </Box>
  );
}
