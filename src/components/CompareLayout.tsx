import { Box, Button, Card, CardContent, Typography } from '@mui/material';

export interface CompareLayoutProps {
    left: React.ReactNode;
    right: React.ReactNode;
    onLeftSubmit: () => void | Promise<void>;
    onRightSubmit: () => void | Promise<void>;
    onLeftValidate?: () => void | Promise<void>;
    onRightValidate?: () => void | Promise<void>;
    leftTitle?: string;
    rightTitle?: string;
}

export default function CompareLayout({
    left,
    right,
    onLeftSubmit,
    onRightSubmit,
    onLeftValidate,
    onRightValidate,
    leftTitle = 'React Hook Form',
    rightTitle = 'TanStack Form',
}: CompareLayoutProps) {
    return (
        <Box sx={{ width: '100%', maxWidth: 1600, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 500px', minWidth: 300 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {leftTitle}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{left}</Box>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={onLeftValidate} disabled={!onLeftValidate}>
                                Validate
                            </Button>
                            <Button variant="contained" onClick={onLeftSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Box sx={{ flex: '1 1 500px', minWidth: 300 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {rightTitle}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{right}</Box>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={onRightValidate}
                                disabled={!onRightValidate}
                            >
                                Validate
                            </Button>
                            <Button variant="contained" color="secondary" onClick={onRightSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
