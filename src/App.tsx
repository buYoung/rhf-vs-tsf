import { useState } from 'react'
import AppLayout from './layout/AppLayout'
import SimpleDataPage from './pages/SimpleDataPage'
import NestedDataPage from './pages/NestedDataPage'

type Page = 'simple' | 'nested'

export default function App() {
  const [page, setPage] = useState<Page>('simple')

  return (
    <AppLayout currentPage={page} onChangePage={setPage}>
      {page === 'simple' ? <SimpleDataPage /> : <NestedDataPage />}
    </AppLayout>
  )
}
