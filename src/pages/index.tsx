import * as React from 'react';
import PageContainer from '../components/layout/PageContainer';
import LoginForm from '@/features/loginForm';

export default function IndexPage() {
    return (
        <PageContainer>
            <LoginForm />
        </PageContainer>
    );
}
