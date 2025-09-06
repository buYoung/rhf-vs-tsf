import { 
  AppBar, 
  Toolbar as MUIToolbar, 
  Typography, 
  ToggleButtonGroup, 
  ToggleButton, 
  Button, 
  Box,
  Divider
} from '@mui/material';
import { PlayArrow, CheckCircle, Refresh } from '@mui/icons-material';

type FormType = 'simple' | 'nested';
type ManagementMode = 'section' | 'parent';

interface ToolbarProps {
  formType: FormType;
  onFormTypeChange: (type: FormType) => void;
  managementMode: ManagementMode;
  onManagementModeChange: (mode: ManagementMode) => void;
  onValidate: () => void;
  onSubmit: () => void;
  onReset: () => void;
  validating?: boolean;
  submitting?: boolean;
}

export default function Toolbar({
  formType,
  onFormTypeChange,
  managementMode,
  onManagementModeChange,
  onValidate,
  onSubmit,
  onReset,
  validating = false,
  submitting = false
}: ToolbarProps) {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <MUIToolbar>
        <Typography variant="h6" component="h1" sx={{ mr: 4 }}>
          Form Comparison
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Form Type:
            </Typography>
            <ToggleButtonGroup
              value={formType}
              exclusive
              onChange={(_, value) => value && onFormTypeChange(value)}
              size="small"
            >
              <ToggleButton value="simple">Simple</ToggleButton>
              <ToggleButton value="nested">Nested</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          <Divider orientation="vertical" flexItem />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Management:
            </Typography>
            <ToggleButtonGroup
              value={managementMode}
              exclusive
              onChange={(_, value) => value && onManagementModeChange(value)}
              size="small"
            >
              <ToggleButton value="section">Section</ToggleButton>
              <ToggleButton value="parent">Parent</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CheckCircle />}
            onClick={onValidate}
            disabled={validating || submitting}
            size="small"
          >
            {validating ? 'Validating...' : 'Validate'}
          </Button>
          
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={onSubmit}
            disabled={validating || submitting}
            size="small"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
          
          <Button
            variant="text"
            startIcon={<Refresh />}
            onClick={onReset}
            disabled={validating || submitting}
            size="small"
          >
            Reset
          </Button>
        </Box>
      </MUIToolbar>
    </AppBar>
  );
}
