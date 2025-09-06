import { useEffect, useRef } from 'react';
import type { NestedFormValues, SectionAValues, SectionBValues } from '../shared/types';
import NestedRHFSectionA from './NestedRHFSectionA';
import NestedRHFSectionB from './NestedRHFSectionB';

export interface NestedRHFSectionManagedProps {
    defaultValues: NestedFormValues;
    onReady?: (api: { submit: () => Promise<NestedFormValues | null>; validate: () => Promise<boolean> }) => void;
}

export default function NestedRHFSectionManaged({ defaultValues, onReady }: NestedRHFSectionManagedProps) {
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
            <NestedRHFSectionA defaultValues={defaultValues.sectionA} onReady={(api) => (aRef.current = api)} />
            <NestedRHFSectionB defaultValues={defaultValues.sectionB} onReady={(api) => (bRef.current = api)} />
        </div>
    );
}
