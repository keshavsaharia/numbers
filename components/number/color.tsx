'use client'

import { useCallback, useRef, useState } from 'react'
import {
    ColorPicker,
    ColorPickerSelection,
    ColorPickerHue
  } from './color-picker'
import { ColorLike } from 'color'
import { Digit } from './digit'
import { NumberSum } from './sum'
import clsx from 'clsx'
import { Instructions } from './instruction'
import { Interactive } from './interactive'
  
export function ColorPickerNumber({ initialValue }: { initialValue?: string }) {
    const [ rgb, setRGB ] = useState<number[]>([])
    const [ hex, setHex ] = useState(initialValue || '#000000')
    const [ digits, setDigits ] = useState<string[]>([])
    const [ highlight, setHighlight ] = useState(-1)

    const colorChange = useCallback((value: ColorLike) => {
        if (Array.isArray(value)) {
            setHighlight(-1)
            const channels = value.slice(0, 3).map((c) => Math.round(c))
            setRGB(channels)

            const channelHexes: string[] = []
            const digits: string[] = new Array(6)
            for (let i = 0 ; i < 3 ; i++) {
                const channelHex = channels[i].toString(16).padStart(2, '0')
                channelHexes.push(channelHex)

                const channel = channelHex.split('')
                digits[i * 2] = channel[0]
                digits[i * 2 + 1] = channel[1]
            }

            setDigits(digits)
            setHex('#' + channelHexes.join(''))
        }
    }, [])

    function incrementDigit(index: number) {
        digits[index] = ((parseInt(digits[index], 16) + 1) % 16).toString(16)
        setDigits([ ...digits ])
        setHex('#' + digits.join(''))
        setHighlight(index)
    }

    return (<Interactive>
        <div className='flex flex-wrap justify-between'>
            <div className="flex flex-col">
                <Instructions key='instructions'>
                    Click the digits or change the color to update the <strong>hex code</strong>.
                </Instructions>
                { rgb.map((channel, index) => {
                    const d1 = index * 2
                    const d2 = index * 2 + 1

                    return (<div key={ 'channel' + index }>
                        <ChannelLabel name={ ['red', 'green', 'blue'][index] }/>
                        <div className="flex gap-1">
                            <Digit digit={digits[ d1 ]} size="md" onClick={ () => incrementDigit(d1) }/>
                            <Digit digit={digits[ d2 ]} size="md" onClick={ () => incrementDigit(d2) }/>
                            <span className="text-zinc-500 px-2 pt-1">=</span>
                            <NumberSum className='pt-1' size='md' 
                                digits={ digits.slice(d1, d1 + 2) } 
                                radix={ 16 } highlight={ highlight - index * 2 }/>
                            <span className="text-zinc-500 px-2 pt-1">=</span>
                            <span className="font-bold pt-1">{ channel }</span>
                        </div>
                    </div>)
                }) }
                <div key='hex' className='mt-4'>
                    <span className={clsx(
                            'inline-flex h-8',
                            'border rounded-md',
                            'text-md text-center font-bold select-none',
                            'bg-zinc-100 dark:bg-zinc-800',
                            'border-zinc-200 dark:border-zinc-700',
                            'cursor-pointer'
                        )}>
                        <span className='h-8 w-8 rounded-l-md'
                            style={{ background: hex }}>&nbsp;</span>
                        <span className='px-2 py-1'>{ hex }</span>
                    </span>
                </div>
            </div>
            <div className="w-[300px]">
                <ColorPicker 
                    className="w-[300px] max-w-[300px] mx-auto rounded-md bg-background p-4 shadow-sm"
                    // value={ color.current }
                    defaultValue={ hex }
                    onChange={ colorChange }>
                    <ColorPickerSelection />
                    <ColorPickerHue />
                </ColorPicker>
            </div>
        </div>
    </Interactive>)
}

export function ChannelLabel({ name }: { name: string }) {
    return (
        <p className="text-zinc-500 text-sm mt-2 mb-1">{ name }</p>
    )
}