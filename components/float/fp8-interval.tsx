'use client'

import { FP8 } from '@/data/fp8'
import { motion } from 'framer-motion'
import { Interactive } from '../number/interactive';
import { useRef, useState } from 'react';
import { enumerateFP8 } from './fp8'

export function FP8Interval({ fp }: { fp: FP8 }) {
    const values = enumerateFP8(fp).sort((a, b) => a.value - b.value)
    const [ index, setIndex ] = useState(values.findIndex(({ value }) => value == 0))
    const delta = useRef<number>(0)
    const canUpdate = useRef<boolean>(true)
    const updateTimeout = useRef<any>(null)
    
    function moveSlider(increment: number) {
        if (! canUpdate.current) return
        canUpdate.current = false
        setIndex(Math.max(0, Math.min(index + increment, values.length - 1)))
        updateTimeout.current = setTimeout(() => {
            canUpdate.current = true
        }, 100)
    }

    return (
        <Interactive>
            <div className="flex justify-center items-center">
                <motion.div
                    drag="x"
                    dragElastic={0.3} // how far you can stretch it
                    dragConstraints={{ left: 0, right: 0 }} // lock to center
                    onDrag={(event, info) => {
                        delta.current = info.offset.x
                        if (Math.abs(delta.current) > 10)
                            moveSlider(Math.ceil(delta.current / 100))
                    }}
                    className="h-8 px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-xl"
                    animate={{ x: 0 }} // this makes it return to center
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    { values[index].value }
                </motion.div>
            </div>
        </Interactive>
    )
};