'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { Digit } from './digit'
import { NumberSum } from './sum'
import { Instructions } from './instruction'
import { Interactive } from './interactive'

export function HumanNumber({ value = 0, length = 4 }: { value?: number, length?: number }) {
    const [ digits, setDigits ] = useState(
        value.toString().padStart(length, '0')
             .split('').map((p) => parseInt(p)))
    const [ clicked, setClicked ] = useState(-1)

    function incrementDigit(index: number): void {
        digits[index] = (digits[index] + 1) % 10
        setDigits([ ...digits ])
        setClicked(index)
    }

    return (<Interactive>
        <Instructions className='mb-3'>
            Try clicking the digits below to update the formula.
        </Instructions>
        <div className='flex gap-2'>
            { digits.map((digit, index) => (
                <div key={'digit' + index} 
                    className='flex flex-col'>
                    
                    <Digit digit={ digit } onClick={ () => incrementDigit(index) }/>

                    <span className={clsx(
                        'text-center text-sm',
                        'text-zinc-500'
                    )}>
                        10<sup>{ length - index - 1 }</sup>
                    </span>
                </div>)) }
            <span className='pt-2.5 text-lg text-zinc-500 dark:text-zinc-400'>
                =
            </span>
            <NumberSum className='pt-2' size='xl' digits={ digits } highlight={ clicked }/>
            
        </div>
    </Interactive>)
}