import clsx from 'clsx'

export function Instructions({ children, className }: React.PropsWithChildren & { className?: string }) {
    return (
        <p className={clsx('text-zinc-500 text-sm', className)}>
            { children }
        </p>
    )
}