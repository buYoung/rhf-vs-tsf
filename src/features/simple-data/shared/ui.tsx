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

export function getErrorMessage(err: unknown): string | undefined {
    if (!err) return undefined;
    if (typeof err === 'string') return err;
    if (Array.isArray(err) && err.length > 0) return getErrorMessage(err[0]);
    if (typeof err === 'object' && err !== null && 'message' in err) return String((err as any).message);
    try {
        return String(err);
    } catch {
        return undefined;
    }
}

export const FieldErrorText: React.FC<{ error?: unknown }> = ({ error }) => {
    const msg = getErrorMessage(error);
    return msg ? <FormHelperText error>{msg}</FormHelperText> : null;
};
