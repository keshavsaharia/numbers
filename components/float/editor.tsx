'use client'

import { Interactive } from '../number/interactive'
import clsx from 'clsx'

interface FloatEditorProps {
    instructions?: string;
}

interface GridColumn {
    label: string;
    span: {
        default: number;
        md: number;
    };
    className?: string;
}

const columns: GridColumn[] = [
    { label: 'sign', span: { default: 1, md: 1 } },
    { label: 'exponent', span: { default: 3, md: 4 }, className: 'bg-red-500' },
    { label: 'mantissa', span: { default: 3, md: 4 }, className: 'bg-green-500' }
];

export function FloatEditor({ 
    instructions = 'Try editing the underlying numbers or bits of the floating point number.'
}: FloatEditorProps) {
    return (
        <Interactive instructions={instructions}>
            <div className="grid grid-cols-7 md:grid-cols-9">
                {columns.map((col, index) => (
                    <div 
                        key={col.label}
                        className={clsx(
                            `col-span-${col.span.default} md:col-span-${col.span.md}`,
                            col.className
                        )}
                    >
                        {col.label}
                    </div>
                ))}
            </div>
        </Interactive>
    )
}