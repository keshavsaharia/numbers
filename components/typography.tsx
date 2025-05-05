import clsx from 'clsx'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export function a({ children, href }: React.PropsWithChildren & { href: string }) {
    // Rewrite github links
    if (href.startsWith('@github')) {
        href = href.replace(/^\@github/, 'https://github.com/keshavsaharia/number-rest')
    }
    // Attempt to look up concepts from string
    // TODO: look up from concept list
    else if (href == '#concept' && typeof children === 'string') {
        href = '/concept/' + children.trim().toLowerCase().replace(/\s+/g, '-')
    }
    return (
        <Link href={ href } className='text-md border-b border-indigo-800 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300 font-normal cursor-pointer'>
            { children }
        </Link>
    )
}

export function h1({ children }: React.PropsWithChildren) {
    return (
        <h1 className='text-2xl text-gray-900 dark:text-gray-100 font-bold mt-12 mb-4'>
            { children }
        </h1>
    )
}

export function h2({ children }: React.PropsWithChildren) {
    return (
        <h2 className='text-xl text-gray-800 dark:text-gray-200 font-bold mt-8 mb-4'>
            { children }
        </h2>
    )
}

export function h3({ children }: React.PropsWithChildren) {
    return (
        <h2 className='text-lg text-gray-800 dark:text-gray-200 font-bold mt-8 mb-4'>
            { children }
        </h2>
    )
}

export function p({ children }: React.PropsWithChildren) {
    return (
        <p className='text-md text-gray-700 dark:text-gray-300 font-normal my-4'>
            { children }
        </p>
    )
}

export function ul({ children }: React.PropsWithChildren) {
    return (
        <ul className={clsx(
            'text-md text-gray-700 dark:text-gray-300 font-normal my-4',
            'list-disc pl-4'
        )}>
            { children }
        </ul>
    )
}

export function li({ children }: React.PropsWithChildren) {
    return (
        <li className='text-md text-gray-700 dark:text-gray-300 font-normal my-2 pl-2'>
            { children }
        </li>
    )
}

export function blockquote({ children }: React.PropsWithChildren) {
    return (
        <div className={clsx(
            'pl-3 pr-1 py-0.5 border-l-2 border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900',
            'rounded-r-lg',
            'text-md text-gray-600 dark:text-gray-400 font-normal my-4'
        )}>
            { children }
        </div>
    )
}

// TODO: show keywords in special font, or automatically create into a link
export function code({ children, className }: React.PropsWithChildren & { className?: string }) {
    return (
        <code className={clsx(twMerge(
            'text-md bg-zinc-100 dark:bg-zinc-800 font-normal my-4',
            'rounded-md px-1 py-0.5',
            className ?? 'text-gray-900 dark:text-gray-100'
        ))}>
            { children }
        </code>
    )
}


export function Note({ children, className }: React.PropsWithChildren & { className?: string }) {
    return (<>
        <small className={clsx('block text-sm mb-2', className ?? 'text-gray-500')}>
            { children }
        </small>
    </>)
}
