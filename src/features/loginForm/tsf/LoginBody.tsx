import * as React from 'react';
import LoginBodyCommon from '@/features/loginForm/common/LoginBody';
import { LIB_FULL_NAMES } from '@/features/loginForm/constants';
import { LoginForm, type TsfLoginFormRef } from '@/features/loginForm/tsf/LoginForm';
import { useRef } from 'react';

export default function LoginBodyTSF() {
    const formRef = useRef<TsfLoginFormRef>(null);

    const handleOnValidate = () => {
        formRef.current!.handleSubmit();
    };

    return (
        <LoginBodyCommon title={LIB_FULL_NAMES.tsf} handleOnValidate={handleOnValidate}>
            <LoginForm ref={formRef} handleOnSubmit={(results) => console.log(results)} />
        </LoginBodyCommon>
    );
}
