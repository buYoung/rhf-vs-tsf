import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography } from '@mui/material';
import RHFSectionA from './SectionA';
import RHFSectionB from './SectionB';
import type { 
  NestedFormValues, 
  SectionAValues, 
  SectionBValues,
  SectionHandle 
} from '../../../shared/schema/types';

interface RHFNestedSectionManagedProps {
  onSubmit?: (data: NestedFormValues) => void;
}

const RHFNestedSectionManaged = forwardRef<
  SectionHandle<NestedFormValues>, 
  RHFNestedSectionManagedProps
>(({ onSubmit }, ref) => {
  const sectionARef = useRef<SectionHandle<SectionAValues>>(null);
  const sectionBRef = useRef<SectionHandle<SectionBValues>>(null);

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const [sectionAValid, sectionBValid] = await Promise.all([
        sectionARef.current?.validate() ?? false,
        sectionBRef.current?.validate() ?? false
      ]);
      return sectionAValid && sectionBValid;
    },
    getValues: () => ({
      sectionA: sectionARef.current?.getValues() ?? {} as SectionAValues,
      sectionB: sectionBRef.current?.getValues() ?? {} as SectionBValues
    }),
    reset: () => {
      sectionARef.current?.reset();
      sectionBRef.current?.reset();
    }
  }));

  const handleSectionASubmit = (data: SectionAValues) => {
    const formData: NestedFormValues = {
      sectionA: data,
      sectionB: sectionBRef.current?.getValues() ?? {} as SectionBValues
    };
    onSubmit?.(formData);
  };

  const handleSectionBSubmit = (data: SectionBValues) => {
    const formData: NestedFormValues = {
      sectionA: sectionARef.current?.getValues() ?? {} as SectionAValues,
      sectionB: data
    };
    onSubmit?.(formData);
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        React Hook Form - Nested (Section Managed)
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Each section manages its own form state independently.
      </Typography>
      
      <RHFSectionA ref={sectionARef} onSubmit={handleSectionASubmit} />
      <RHFSectionB ref={sectionBRef} onSubmit={handleSectionBSubmit} />
    </Box>
  );
});

RHFNestedSectionManaged.displayName = 'RHFNestedSectionManaged';

export default RHFNestedSectionManaged;
