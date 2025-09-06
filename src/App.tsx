import { useState } from 'react';
import AppLayout, { type PageId } from './layout/AppLayout';
import NestedDataSectionManagerPage from './pages/NestedDataSectionManagerPage';
import NestedDataTopManagerPage from './pages/NestedDataTopManagerPage';
import SimpleDataSectionManagerPage from './pages/SimpleDataSectionManagerPage';
import SimpleDataTopManagerPage from './pages/SimpleDataTopManagerPage';

export default function App() {
    const [page, setPage] = useState<PageId>('simple-section');

    return (
        <AppLayout currentPage={page} onChangePage={setPage}>
            {page === 'simple-section' && <SimpleDataSectionManagerPage />}
            {page === 'simple-top' && <SimpleDataTopManagerPage />}
            {page === 'nested-section' && <NestedDataSectionManagerPage />}
            {page === 'nested-top' && <NestedDataTopManagerPage />}
        </AppLayout>
    );
}
