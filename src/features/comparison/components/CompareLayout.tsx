import React, { useRef, useState } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Snackbar, 
  Alert,
  Typography,
  Divider
} from '@mui/material';
import Toolbar from './Toolbar';
import ValidationSummary from './ValidationSummary';
import type { SectionHandle, SimpleFormValues } from '../../shared/schema/types';

// Import form components
import RHFSectionManaged from '../simple/rhf/SectionManaged';
import RHFParentManaged from '../simple/rhf/ParentManaged';
import TSFSectionManaged from '../simple/tsf/SectionManaged';
import TSFParentManaged from '../simple/tsf/ParentManaged';

type FormType = 'simple' | 'nested';
type ManagementMode = 'section' | 'parent';

interface ValidationError {
  field: string;
  message: string;
}

export default function CompareLayout() {
  const [formType, setFormType] = useState<FormType>('simple');
  const [managementMode, setManagementMode] = useState<ManagementMode>('section');
  const [validating, setValidating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leftErrors, setLeftErrors] = useState<ValidationError[]>([]);
  const [rightErrors, setRightErrors] = useState<ValidationError[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Refs for form components
  const leftFormRef = useRef<SectionHandle<SimpleFormValues>>(null);
  const rightFormRef = useRef<SectionHandle<SimpleFormValues>>(null);

  const handleValidate = async () => {
    setValidating(true);
    setLeftErrors([]);
    setRightErrors([]);
    
    try {
      const [leftValid, rightValid] = await Promise.all([
        leftFormRef.current?.validate() || Promise.resolve(false),
        rightFormRef.current?.validate() || Promise.resolve(false)
      ]);
      
      // In a real scenario, we would collect actual validation errors
      // For now, we'll just show a success message if validation passes
      if (leftValid && rightValid) {
        setSuccessMessage('Validation successful on both forms!');
      } else {
        setErrorMessage('Validation failed. Please check the form fields.');
      }
    } catch (error) {
      setErrorMessage('Validation error occurred.');
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // First validate
      await handleValidate();
      
      // Then get values and submit
      const leftValues = leftFormRef.current?.getValues();
      const rightValues = rightFormRef.current?.getValues();
      
      console.log('Left Form Values:', leftValues);
      console.log('Right Form Values:', rightValues);
      
      setSuccessMessage('Forms submitted successfully!');
    } catch (error) {
      setErrorMessage('Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    leftFormRef.current?.reset();
    rightFormRef.current?.reset();
    setLeftErrors([]);
    setRightErrors([]);
    setSuccessMessage('Forms reset successfully!');
  };

  const handleLeftSubmit = (data: SimpleFormValues) => {
    console.log('Left form submitted:', data);
  };

  const handleRightSubmit = (data: SimpleFormValues) => {
    console.log('Right form submitted:', data);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Toolbar
        formType={formType}
        onFormTypeChange={setFormType}
        managementMode={managementMode}
        onManagementModeChange={setManagementMode}
        onValidate={handleValidate}
        onSubmit={handleSubmit}
        onReset={handleReset}
        validating={validating}
        submitting={submitting}
      />
      
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Validation Summary */}
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <ValidationSummary errors={leftErrors} title="React Hook Form Errors" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ValidationSummary errors={rightErrors} title="TanStack Form Errors" />
          </Grid>
        </Grid>
        
        {/* Form Comparison */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Left Side - React Hook Form
              </Typography>
              {formType === 'simple' && managementMode === 'section' && (
                <RHFSectionManaged 
                  ref={leftFormRef} 
                  onSubmit={handleLeftSubmit} 
                />
              )}
              {formType === 'simple' && managementMode === 'parent' && (
                <RHFParentManaged 
                  onSubmit={handleLeftSubmit}
                  onValidate={() => {}}
                  onReset={() => {}}
                />
              )}
              {formType === 'nested' && (
                <Typography variant="h6" color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
                  Nested Forms Coming Soon...
                </Typography>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Right Side - TanStack Form
              </Typography>
              {formType === 'simple' && managementMode === 'section' && (
                <TSFSectionManaged 
                  ref={rightFormRef} 
                  onSubmit={handleRightSubmit} 
                />
              )}
              {formType === 'simple' && managementMode === 'parent' && (
                <TSFParentManaged 
                  onSubmit={handleRightSubmit}
                  onValidate={() => {}}
                  onReset={() => {}}
                />
              )}
              {formType === 'nested' && (
                <Typography variant="h6" color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
                  Nested Forms Coming Soon...
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Success/Error Snackbars */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
