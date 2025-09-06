import { FormHelperText } from '@mui/material';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export function isoToDayjs(value?: string | null): Dayjs | null {
    if (!value) return null;
    const d = dayjs(value);
    return d.isValid() ? d : null;
}

export function dayjsToIso(value: Dayjs | null): string | '' {
    if (!value) return '';
    return value.toISOString();
}

export const FieldErrorText: React.FC<{ error?: string | null }> = ({ error }) =>
    error ? <FormHelperText error>{error}</FormHelperText> : null;
