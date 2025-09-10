import * as React from 'react';
import LoginBodyCommon from '@/features/loginForm/common/LoginBody';
import { LIB_FULL_NAMES } from '@/features/loginForm/constants';
import { LoginForm } from '@/features/loginForm/rhf/LoginForm';

export default function LoginBodyRHF() {
    return (
        <LoginBodyCommon title={LIB_FULL_NAMES.rhf}>
            <LoginForm />
        </LoginBodyCommon>
    );
}
