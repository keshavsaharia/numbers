import clsx from 'clsx'

export function Digit({ digit, size = 'lg', className, onClick }: { 
    digit: any
    size?: 'xs' | 'sm' | 'md' | 'lg'
    onClick: () => any
    className?: string
}) {
    return (
        <span className={clsx(
            {
                lg: 'px-3 py-2',
                md: 'px-2 py-1',
                sm: 'px-1 py-0.5',
                xs: 'px-0.5 py-0.2'
            }[size],
            'border rounded-md',
            'text-' + size, 'text-center font-bold select-none',
            'bg-zinc-100 dark:bg-zinc-800',
            'border-zinc-200 dark:border-zinc-700',
            'cursor-pointer',
            className
        )}
        onClick={ onClick }>
        { digit }
    </span>
    )
}