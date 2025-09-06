import { useEffect, useRef } from 'react';
import type { NestedFormValues, SectionAValues, SectionBValues } from '../shared/types';
import NestedTSFSectionA from './NestedTSFSectionA';
import NestedTSFSectionB from './NestedTSFSectionB';

export interface NestedTSFSectionManagedProps {
    defaultValues: NestedFormValues;
    onReady?: (api: { submit: () => Promise<NestedFormValues | null>; validate: () => Promise<boolean> }) => void;
}

export default function NestedTSFSectionManaged({ defaultValues, onReady }: NestedTSFSectionManagedProps) {
    const aRef = useRef<{ submit: () => Promise<SectionAValues | null>; validate?: () => Promise<boolean> } | null>(
        null,
    );
    const bRef = useRef<{ submit: () => Promise<SectionBValues | null>; validate?: () => Promise<boolean> } | null>(
        null,
    );

    useEffect(() => {
        onReady?.({
            submit: async () => {
                const a = await aRef.current?.submit();
                const b = await bRef.current?.submit();
                if (a && b) {
                    return { sectionA: a, sectionB: b };
                }
                return null;
            },
            validate: async () => {
                const va = await aRef.current?.validate?.();
                const vb = await bRef.current?.validate?.();
                return (va ?? true) && (vb ?? true);
            },
        });
    }, [onReady]);

    return (
        <div style={{ display: 'grid', gap: 16 }}>
            <NestedTSFSectionA defaultValues={defaultValues.sectionA} onReady={(api) => (aRef.current = api)} />
            <NestedTSFSectionB defaultValues={defaultValues.sectionB} onReady={(api) => (bRef.current = api)} />
        </div>
    );
}
