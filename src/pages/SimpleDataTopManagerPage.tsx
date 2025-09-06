import { useMemo, useRef, useState } from 'react';
import CompareLayout from '../components/CompareLayout';
import JsonViewerDialog from '../components/JsonViewerDialog';
import SimpleRHFTopManaged from '../features/simple-data/rhf/SimpleRHFTopManaged';
import { makeSimpleInitialValues } from '../features/simple-data/shared/faker';
import type { SimpleFormValues } from '../features/simple-data/shared/types';
import SimpleTSFTopManaged from '../features/simple-data/tsf/SimpleTSFTopManaged';

export default function SimpleDataTopManagerPage() {
    const initial = useMemo(() => makeSimpleInitialValues(), []);

    const leftRef = useRef<{
        submit: () => Promise<SimpleFormValues | null>;
        validate?: () => Promise<boolean>;
    } | null>(null);
    const rightRef = useRef<{
        submit: () => Promise<SimpleFormValues | null>;
        validate?: () => Promise<boolean>;
    } | null>(null);

    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);
    const [leftData, setLeftData] = useState<unknown>(null);
    const [rightData, setRightData] = useState<unknown>(null);

    return (
        <>
            <CompareLayout
                left={<SimpleRHFTopManaged defaultValues={initial} onReady={(api) => (leftRef.current = api)} />}
                right={<SimpleTSFTopManaged defaultValues={initial} onReady={(api) => (rightRef.current = api)} />}
                onLeftValidate={async () => {
                    await leftRef.current?.validate?.();
                }}
                onRightValidate={async () => {
                    await rightRef.current?.validate?.();
                }}
                onLeftSubmit={async () => {
                    const data = await leftRef.current?.submit();
                    if (data) {
                        // eslint-disable-next-line no-console
                        console.log('[RHF] Simple Top submit:', data);
                        setLeftData(data);
                        setLeftOpen(true);
                    }
                }}
                onRightSubmit={async () => {
                    const data = await rightRef.current?.submit();
                    if (data) {
                        // eslint-disable-next-line no-console
                        console.log('[TSF] Simple Top submit:', data);
                        setRightData(data);
                        setRightOpen(true);
                    }
                }}
            />

            <JsonViewerDialog
                open={leftOpen}
                onClose={() => setLeftOpen(false)}
                title="RHF — Simple Top Result"
                data={leftData}
            />
            <JsonViewerDialog
                open={rightOpen}
                onClose={() => setRightOpen(false)}
                title="TSF — Simple Top Result"
                data={rightData}
            />
        </>
    );
}
