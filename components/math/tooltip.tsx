'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export function MathTooltip({ tooltip, children }: React.PropsWithChildren & { tooltip?: any }) {
    const [ visible, setVisible ] = useState(false)

    function hideTooltip() {
        setVisible(false)
    }

    return (<span className='relative' 
        onMouseEnter={ () => setVisible(true) }
        onMouseLeave={ hideTooltip }>
        { children }
        <AnimatePresence>
        { visible && <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: '14px' }}
            className={clsx(
                'absolute z-100 top-0 -left-24 -mt-12 w-96 min-h-12',
                'bg-zinc-200 dark:bg-zinc-800 bg-opacity-20 text-md text-wrap',
                'border border-zinc-300 dark:border-zinc-700',
                'rounded-lg overflow-hidden shadow-sm' )}>
            <div className='flex justify-end'>
                <div className='flex flex-col justify-center px-2 py-1'>
                    { tooltip }
                </div>
                <div className='bg-zinc-100 px-2 dark:bg-zinc-900 flex flex-col text-3xl justify-center text-center'>
                    { children }
                </div>
            </div>
        </motion.div>}
        </AnimatePresence>
    </span>)
}