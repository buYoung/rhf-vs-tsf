import { Dialog, DialogContent, DialogTitle } from '@mui/material';

export interface JsonViewerDialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    data: unknown;
}

export default function JsonViewerDialog({ open, onClose, title = 'Submitted Data', data }: JsonViewerDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <pre
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    }}
                >
                    {JSON.stringify(data, null, 2)}
                </pre>
            </DialogContent>
        </Dialog>
    );
}
