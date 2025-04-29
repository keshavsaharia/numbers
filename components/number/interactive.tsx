import clsx from 'clsx'
import { Instructions } from './instruction'

export function Interactive({ children, instructions }: React.PropsWithChildren & { instructions?: string }) {
    return (
        <div className={clsx(
            'px-3 py-2',
            'rounded-lg',
            'bg-zinc-100 dark:bg-zinc-900',
            'border border-zinc-200 dark:border-zinc-800'
        )}>
            { instructions && <Instructions className='mb-3'>{ instructions }</Instructions> }
            { children }
        </div>
    )
}