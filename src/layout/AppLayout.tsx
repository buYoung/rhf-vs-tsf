import { AppBar, Box, Tab, Tabs } from '@mui/material';

export type PageId = 'simple-section' | 'simple-top' | 'nested-section' | 'nested-top';

export interface AppLayoutProps {
    currentPage: PageId;
    onChangePage: (page: PageId) => void;
    children: React.ReactNode;
}

const pages: { id: PageId; label: string }[] = [
    { id: 'simple-section', label: 'SimpleData (Section)' },
    { id: 'simple-top', label: 'SimpleData (Top)' },
    { id: 'nested-section', label: 'NestedData (Section)' },
    { id: 'nested-top', label: 'NestedData (Top)' },
];

export default function AppLayout({ currentPage, onChangePage, children }: AppLayoutProps) {
    const value = pages.findIndex((p) => p.id === currentPage);

    return (
        <>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={(_, idx: number) => onChangePage(pages[idx].id)}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {pages.map((p) => (
                        <Tab key={p.id} label={p.label} />
                    ))}
                </Tabs>
            </AppBar>

            <Box
                component="main"
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    minHeight: 'calc(100dvh - 64px)',
                    px: 2,
                    py: 3,
                    width: '100%',
                }}
            >
                {children}
            </Box>
        </>
    );
}
