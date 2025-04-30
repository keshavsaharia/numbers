'use client'

import clsx from 'clsx'

export function NumberSum({
    className, size, highlight, digits, radix = 10
}: { 
    size: 'sm' | 'md' | 'lg' | 'xl',
    digits: any[],
    highlight?: number,
    radix?: number,
    className?: string
}) {
    function displayDigit(digit: any) {
        if (typeof digit === 'number')
            return digit
        if (typeof digit === 'string') {
            return parseInt(digit, 16)
        }
    }

    return (
        <span className={clsx('text-zinc-800 dark:text-zinc-200', 'text-' + size, className)}>
            { digits.map((digit, index) => (
                <span key={'sum' + index}
                    className={clsx(
                        'font-semibold font-mono',
                        highlight === index ? 'text-green-600 dark:text-green-400' : ''
                    )}>
                    { displayDigit(digit) } &times; { radix }<sup>{ digits.length - index - 1 }</sup>
                    { index + 1 < digits.length && 
                        <span className='mx-2 text-zinc-800 dark:text-zinc-200'>+</span> }
                </span>)) }
        </span>
    )
}