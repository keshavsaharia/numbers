'use client'

import clsx from "clsx"

export function ASCIIViewer({ text, width = 12 }: { text: string, width?: number }) {
    const rows: number[][] = []
    for (let i = 0; i < text.length; i += width) {
        rows.push(text.slice(i, i + width).split('').flatMap(c => {
            const code = c.charCodeAt(0)
            return Array.from({ length: 8 }, (_, i) => (code >> (7 - i)) & 1)
        }))
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex flex-col gap-0">
                { rows.map((row, index) => (
                    <div key={index} className="flex gap-0">
                        { row.map((bit, index) => {
                            return (
                            <div key={index} className={clsx("w-1 h-1", bit ? "dark:bg-black bg-white" : "dark:bg-white bg-black")}>
                                &nbsp;
                            </div>
                        )
                    })}
                    </div>
                ))}
            </div>
            <div>
                <pre className="text-xs whitespace-pre-wrap">{ text }</pre>
            </div>
        </div>
    )
}