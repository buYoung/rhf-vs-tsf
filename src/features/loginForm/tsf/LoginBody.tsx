import * as React from 'react';
import LoginBodyCommon from '@/features/loginForm/common/LoginBody';
import { LIB_FULL_NAMES } from '@/features/loginForm/constants';
import { LoginForm, type TsfLoginFormRef } from '@/features/loginForm/tsf/LoginForm';
import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function LoginBodyTSF() {
    const [result, setResult] = useState<string>('');

    const formRef = useRef<TsfLoginFormRef>(null);

    const handleOnValidate = () => {
        formRef.current!.handleSubmit();
    };

    return (
        <LoginBodyCommon title={LIB_FULL_NAMES.tsf} handleOnValidate={handleOnValidate}>
            <LoginForm ref={formRef} handleOnSubmit={(results) => setResult(JSON.stringify(results, null, 2))} />
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
                            whiteSpace: 'pre',
                        }}
                    >
                        <code>{result}</code>
                    </Box>
                </>
            )}
        </LoginBodyCommon>
    );
}
