import clsx from 'clsx'
import { Instructions } from './instruction'

export function Interactive({ padding = 'px-3 py-2', children, instructions }: React.PropsWithChildren & { padding?: string, instructions?: any }) {
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