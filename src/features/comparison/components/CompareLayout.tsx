import { useRef, useState } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Snackbar, 
  Alert,
  Typography
} from '@mui/material';
import Toolbar from './Toolbar';
import ValidationSummary from './ValidationSummary';
import type { SectionHandle, SimpleFormValues, NestedFormValues } from '../../shared/schema/types';

// Import form components
import RHFSectionManaged from '../simple/rhf/SectionManaged';
import RHFParentManaged from '../simple/rhf/ParentManaged';
import TSFSectionManaged from '../simple/tsf/SectionManaged';
import TSFParentManaged from '../simple/tsf/ParentManaged';
import RHFNestedSectionManaged from '../nested/rhf/SectionManaged';
import TSFNestedSectionManaged from '../nested/tsf/SectionManaged';

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
  const leftSimpleFormRef = useRef<SectionHandle<SimpleFormValues>>(null);
  const rightSimpleFormRef = useRef<SectionHandle<SimpleFormValues>>(null);
  const leftNestedFormRef = useRef<SectionHandle<NestedFormValues>>(null);
  const rightNestedFormRef = useRef<SectionHandle<NestedFormValues>>(null);

  const handleValidate = async () => {
    setValidating(true);
    setLeftErrors([]);
    setRightErrors([]);
    
    try {
      let leftFormPromise, rightFormPromise;
      
      if (formType === 'simple') {
        leftFormPromise = leftSimpleFormRef.current?.validate() || Promise.resolve(false);
        rightFormPromise = rightSimpleFormRef.current?.validate() || Promise.resolve(false);
      } else {
        leftFormPromise = leftNestedFormRef.current?.validate() || Promise.resolve(false);
        rightFormPromise = rightNestedFormRef.current?.validate() || Promise.resolve(false);
      }
      
      const [leftValid, rightValid] = await Promise.all([leftFormPromise, rightFormPromise]);
      
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
      let leftValues, rightValues;
      if (formType === 'simple') {
        leftValues = leftSimpleFormRef.current?.getValues();
        rightValues = rightSimpleFormRef.current?.getValues();
      } else {
        leftValues = leftNestedFormRef.current?.getValues();
        rightValues = rightNestedFormRef.current?.getValues();
      }
      
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
    if (formType === 'simple') {
      leftSimpleFormRef.current?.reset();
      rightSimpleFormRef.current?.reset();
    } else {
      leftNestedFormRef.current?.reset();
      rightNestedFormRef.current?.reset();
    }
    setLeftErrors([]);
    setRightErrors([]);
    setSuccessMessage('Forms reset successfully!');
  };

  const handleLeftSubmit = (data: SimpleFormValues | NestedFormValues) => {
    console.log('Left form submitted:', data);
  };

  const handleRightSubmit = (data: SimpleFormValues | NestedFormValues) => {
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
          <Grid size={{ xs: 12, md: 6 }}>
            <ValidationSummary errors={leftErrors} title="React Hook Form Errors" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ValidationSummary errors={rightErrors} title="TanStack Form Errors" />
          </Grid>
        </Grid>
        
        {/* Form Comparison */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative' }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Left Side - React Hook Form
              </Typography>
              {formType === 'simple' && managementMode === 'section' && (
                <RHFSectionManaged 
                  ref={leftSimpleFormRef} 
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
              {formType === 'nested' && managementMode === 'section' && (
                <RHFNestedSectionManaged 
                  ref={leftNestedFormRef} 
                  onSubmit={handleLeftSubmit} 
                />
              )}
              {formType === 'nested' && managementMode === 'parent' && (
                <Typography variant="h6" color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
                  Nested Parent Managed Coming Soon...
                </Typography>
              )}
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative' }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Right Side - TanStack Form
              </Typography>
              {formType === 'simple' && managementMode === 'section' && (
                <TSFSectionManaged 
                  ref={rightSimpleFormRef} 
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
              {formType === 'nested' && managementMode === 'section' && (
                <TSFNestedSectionManaged 
                  ref={rightNestedFormRef} 
                  onSubmit={handleRightSubmit} 
                />
              )}
              {formType === 'nested' && managementMode === 'parent' && (
                <Typography variant="h6" color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
                  Nested Parent Managed Coming Soon...
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
