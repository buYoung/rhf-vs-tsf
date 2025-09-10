import * as React from 'react';
import LoginBodyCommon from '@/features/loginForm/common/LoginBody';
import { LIB_FULL_NAMES } from '@/features/loginForm/constants';
import LoginForm from '@/features/loginForm/tsf/LoginForm';

export default function LoginBodyTSF() {
    return (
        <LoginBodyCommon title={LIB_FULL_NAMES.tsf}>
            <LoginForm />
        </LoginBodyCommon>
    );
}
