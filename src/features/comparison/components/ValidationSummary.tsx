import { Alert, AlertTitle, List, ListItem, ListItemText, Collapse } from '@mui/material';

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationSummaryProps {
  errors: ValidationError[];
  title?: string;
}

export default function ValidationSummary({ 
  errors, 
  title = "Validation Errors" 
}: ValidationSummaryProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Collapse in={errors.length > 0}>
      <Alert severity="error" sx={{ mb: 2 }}>
        <AlertTitle>{title} ({errors.length})</AlertTitle>
        <List dense>
          {errors.map((error, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={error.field}
                secondary={error.message}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      </Alert>
    </Collapse>
  );
}
