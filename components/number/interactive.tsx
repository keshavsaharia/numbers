import clsx from 'clsx'
import { Instructions } from './instruction'

interface InteractiveProps {
    padding?: string;
    instructions?: React.ReactNode;
    children: React.ReactNode;
}

export function Interactive({ padding = 'px-3 py-2', children, instructions }: InteractiveProps) {
    return (
        <div className={clsx(
            padding, 'rounded-lg',
            'bg-zinc-100 dark:bg-zinc-900',
            'border border-zinc-200 dark:border-zinc-800'
        )}>
            { instructions && <Instructions className='mb-3'>{ instructions }</Instructions> }
            { children }
        </div>
    )
}

export function Divider() {
    return (
        <hr className='my-4 border-zinc-300 dark:border-zinc-700'/>
    )
}