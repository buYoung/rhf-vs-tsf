import * as React from 'react';
import LoginBodyCommon from '@/features/simple/common/LoginBody';
import { LIB_FULL_NAMES } from '@/features/simple/constants';
import LoginForm from '@/features/simple/tsf/LoginForm';

export default function LoginBodyTSF() {
    return (
        <LoginBodyCommon title={LIB_FULL_NAMES.tsf}>
            <LoginForm />
        </LoginBodyCommon>
    );
}
