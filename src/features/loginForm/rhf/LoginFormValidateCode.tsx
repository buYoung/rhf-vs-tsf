import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ACTION_LABELS, FIELD_LABELS } from '@/features/loginForm/constants';
import Button from '@mui/material/Button';
import {
    type Control,
    Controller,
    type UseFormWatch,
    type UseFormSetValue,
    type UseFormTrigger,
} from 'react-hook-form';
import type { LoginSchemaType } from '@/features/loginForm/schemas/loginSchema';

export interface LoginFormValidateCodeProps {
    control: Control<LoginSchemaType>;
    watch: UseFormWatch<LoginSchemaType>;
    trigger: UseFormTrigger<LoginSchemaType>;
    setValue: UseFormSetValue<LoginSchemaType>;
}

export function LoginFormValidateCode({ control, watch, trigger, setValue }: LoginFormValidateCodeProps) {
    return (
        <Controller
            name="verificationCode"
            control={control}
            render={({ field, fieldState: { error } }) => {
                console.log('field', field);
                return (
                    <Grid container spacing={2}>
                        <Grid
                            size={{
                                xs: 3,
                                sm: 3,
                                md: 6,
                                lg: 6,
                                xl: 6,
                            }}
                        ></Grid>
                        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                            <TextField
                                type={'number'}
                                fullWidth
                                label={FIELD_LABELS.verificationCode}
                                helperText={error?.message}
                                {...field}
                            />
                        </Grid>
                        <Grid size={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ height: '100%' }}
                                onClick={async () => {
                                    const result = await trigger('verificationCode');
                                    console.log('result', result);
                                }}
                            >
                                {ACTION_LABELS.fieldValidation}
                            </Button>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}
