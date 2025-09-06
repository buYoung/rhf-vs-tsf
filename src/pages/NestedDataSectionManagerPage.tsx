import { useMemo, useRef, useState } from 'react';
import CompareLayout from '../components/CompareLayout';
import JsonViewerDialog from '../components/JsonViewerDialog';
import NestedRHFSectionManaged from '../features/nested-data/rhf/NestedRHFSectionManaged';
import { makeNestedInitialValues } from '../features/nested-data/shared/faker';
import type { NestedFormValues } from '../features/nested-data/shared/types';
import NestedTSFSectionManaged from '../features/nested-data/tsf/NestedTSFSectionManaged';

export default function NestedDataSectionManagerPage() {
    const initial = useMemo(() => makeNestedInitialValues(), []);

    const leftRef = useRef<{
        submit: () => Promise<NestedFormValues | null>;
        validate?: () => Promise<boolean>;
    } | null>(null);
    const rightRef = useRef<{
        submit: () => Promise<NestedFormValues | null>;
        validate?: () => Promise<boolean>;
    } | null>(null);

    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);
    const [leftData, setLeftData] = useState<unknown>(null);
    const [rightData, setRightData] = useState<unknown>(null);

    return (
        <>
            <CompareLayout
                left={<NestedRHFSectionManaged defaultValues={initial} onReady={(api) => (leftRef.current = api)} />}
                right={<NestedTSFSectionManaged defaultValues={initial} onReady={(api) => (rightRef.current = api)} />}
                onLeftValidate={async () => {
                    await leftRef.current?.validate?.();
                }}
                onRightValidate={async () => {
                    await rightRef.current?.validate?.();
                }}
                onLeftSubmit={async () => {
                    const data = await leftRef.current?.submit();
                    if (data) {
                        console.log('[RHF] Nested Section submit:', data);
                        setLeftData(data);
                        setLeftOpen(true);
                    }
                }}
                onRightSubmit={async () => {
                    const data = await rightRef.current?.submit();
                    if (data) {
                        console.log('[TSF] Nested Section submit:', data);
                        setRightData(data);
                        setRightOpen(true);
                    }
                }}
            />

            <JsonViewerDialog
                open={leftOpen}
                onClose={() => setLeftOpen(false)}
                title="RHF — Nested Section Result"
                data={leftData}
            />
            <JsonViewerDialog
                open={rightOpen}
                onClose={() => setRightOpen(false)}
                title="TSF — Nested Section Result"
                data={rightData}
            />
        </>
    );
}
