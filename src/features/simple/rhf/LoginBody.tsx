import * as React from 'react';
import LoginBodyCommon from '@/features/simple/common/LoginBody';
import { LIB_FULL_NAMES } from '@/features/simple/constants';
import { LoginForm } from '@/features/simple/rhf/LoginForm';

export default function LoginBodyRHF() {
    return (
        <LoginBodyCommon title={LIB_FULL_NAMES.rhf}>
            <LoginForm />
        </LoginBodyCommon>
    );
}
