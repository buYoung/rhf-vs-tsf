import * as React from 'react';
import LoginBodyCommon from '@/features/loginForm/common/LoginBody';
import { LIB_FULL_NAMES } from '@/features/loginForm/constants';
import { LoginForm, type RhfLoginFormRef } from '@/features/loginForm/rhf/LoginForm';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginSchemaType } from '@/features/loginForm/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';

export default function LoginBodyRHF() {
    const formRef = useRef<RhfLoginFormRef>(null);

    const handleOnValidate = () => {
        formRef.current!.handleSubmit();
    };

    return (
        <LoginBodyCommon title={LIB_FULL_NAMES.rhf} handleOnValidate={handleOnValidate}>
            <LoginForm ref={formRef} />
        </LoginBodyCommon>
    );
}
