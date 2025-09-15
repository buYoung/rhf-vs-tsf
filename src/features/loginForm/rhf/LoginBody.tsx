import LoginBodyCommon from '@/features/loginForm/common/LoginBody';
import { LIB_FULL_NAMES } from '@/features/loginForm/constants';
import { LoginForm, type RhfLoginFormRef } from '@/features/loginForm/rhf/LoginForm';
import type { LoginSchemaType } from '@/features/loginForm/schemas/loginSchema';
import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function LoginBodyRHF() {
    const [result, setResult] = useState<string>('');

    const formRef = useRef<RhfLoginFormRef>(null);

    const handleOnValidate = () => {
        formRef.current!.handleSubmit();
    };

    const handleOnSubmit = (results: LoginSchemaType) => {
        setResult(JSON.stringify(results, null, 2));
    };

    return (
        <LoginBodyCommon title={LIB_FULL_NAMES.rhf} handleOnValidate={handleOnValidate}>
            <LoginForm ref={formRef} handleOnSubmit={handleOnSubmit} />
            {result && (
                <>
                    <Divider
                        sx={{
                            mt: 4,
                        }}
                    />
                    <Typography variant="h6" component="h2" sx={{ mt: 4 }}>
                        Submitted Data:
                    </Typography>
                    <Box
                        component="pre"
                        sx={{
                            m: 0,
                            mt: 1,
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.paper',
                            fontFamily:
                                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                            fontSize: 13,
                            lineHeight: 1.6,
                            overflow: 'auto',
                            whiteSpace: 'pre', // 줄바꿈 허용하려면 "pre-wrap"
                        }}
                    >
                        <code>{result}</code>
                    </Box>
                </>
            )}
        </LoginBodyCommon>
    );
}
