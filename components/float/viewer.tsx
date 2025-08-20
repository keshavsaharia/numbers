'use client'

import {
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from './select'
import clsx from 'clsx'
import { fp as multiByteFPs, FP, FPFormat } from '@/data/fp'
import { fp8 as singleByteFPs, FP8, FP8Format } from '@/data/fp8'
import { useState } from 'react'
import { FP8Table } from '@/components/float/table'

import { parseBits } from './util/fp'
import { Interactive } from '../number/interactive'
import { FPFormatName } from './instructions'
import { motion } from 'motion/react'

type Bit = 0 | 1
type DisplaySize = 'sm' | 'md' | 'lg'
type DisplayColor = 's' | 'e' | 'm' // sign, exponent, mantissa

export function FloatViewer({ format, fp }: { format?: FPFormat | FP8Format, fp?: FP | FP8 }) {
    const [ formatId, setFormatId ] = useState<FPFormat | FP8Format>(format || 'fp64')
    const [ fpFormat, setFpFormat ] = useState<FP | FP8>(fp || multiByteFPs.fp64)
    const [ bytes, setBytes ] = useState<number>(fp ? fp.length / 8 : 8)
    const [ bits, setBits ] = useState<Bit[]>(expandBits([], fp ? fp.length : 64))

    function expandBits(bits: Bit[], length: number) {
        if (bits.length < length)
            return bits.concat(new Array(length - bits.length).fill(0))
        else
            return bits.slice(0, length)
    }

    function changeFormat(format: string) {
        setFormatId(format as FPFormat)
        if (multiByteFPs[format as FPFormat]) {
            const multiFormat = multiByteFPs[format as FPFormat]
            setFpFormat(multiFormat)
            setBytes(multiFormat.length / 8)
            setBits(expandBits(bits, multiFormat.length))
        }
        else {
            const singleFormat = singleByteFPs[format as FP8Format]
            setFpFormat(singleFormat)
            setBytes(singleFormat.length / 8)
            setBits(expandBits(bits, singleFormat.length))
        }
    }
        
    return (<Interactive instructions={<>
        <FPFormatName name={ formatId } />
        Click on individual bits to toggle them, or directly edit the underlying values.
    </>}>
        <div key='full-width'>
            { !fp && <div className='flex'>
                <FPSelect onChange={changeFormat}/>
                <div className='w-full px-2 overflow-hidden flex'>
                    <motion.div 
                        className='border-2 border-red-700 text-red-500 bg-zinc-300 dark:bg-zinc-700 h-9 rounded-l-md text-center leading-8 font-bold text-sm truncate'
                        animate={{ width: `${100 / fpFormat.length}%` }}
                        transition={{ duration: 0.3 }}
                    >
                        ±
                    </motion.div>
                    <motion.div 
                        className='border-2 border-green-700 text-green-500 bg-zinc-300 dark:bg-zinc-700 h-9 text-center'
                        animate={{ 
                            left: `${100 / fpFormat.length}%`,
                            width: `${100 * fpFormat.exponent / fpFormat.length}%`
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className='text-white/70 text-xs font-semibold'>exponent</p>
                        <p className='text-white text-sm font-bold leading-3'>{ fpFormat.exponent } bits</p>
                    </motion.div>
                    <motion.div 
                        className='border-2 border-blue-700 text-blue-500 bg-zinc-300 dark:bg-zinc-700 h-9 rounded-r-md text-center'
                        animate={{
                            left: `${100 * (1 + fpFormat.exponent) / fpFormat.length}%`,
                            width: `${100 * fpFormat.mantissa / fpFormat.length}%`
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className='text-white/70 text-xs font-semibold'>mantissa</p>
                        <p className='text-white text-sm font-bold leading-3'>{ fpFormat.mantissa } bits</p>
                    </motion.div>
                </div>
            </div> }
            { bytes == 1 ? 
                <div className='py-2 text-center'>
                    <Byte bits={ bits } colors={ ['s']
                      .concat(new Array(fpFormat.exponent).fill('e'))
                      .concat(new Array(fpFormat.mantissa).fill('m')) as DisplayColor[] 
                    } size='lg'/>
                </div>
            :
                <div className='py-2 text-center'>
                    { new Array(bytes / 2).fill(0).map((_, doubleByteIndex) => {
                        const bitIndex = doubleByteIndex * 16
                        let b1Colors: DisplayColor[] = new Array(8).fill('e')
                        let b2Colors: DisplayColor[] = new Array(8).fill('e')

                        if (bitIndex == 0) {
                            b1Colors[0] = 's'
                        }
                        for (let b = bitIndex ; b < bitIndex + 8 ; b++) {
                            if (b >= fpFormat.length - fpFormat.mantissa)
                              b1Colors[b - bitIndex] = 'm'
                        }
                        for (let b = bitIndex + 8 ; b < bitIndex + 16 ; b++) {
                            if (b >= fpFormat.length - fpFormat.mantissa)
                              b2Colors[b - bitIndex - 8] = 'm'
                        }

                        return (
                            <DoubleByte key={ doubleByteIndex }>
                                <Byte bits={ bits.slice(bitIndex, bitIndex + 8) } colors={b1Colors} size={ 'md' }/>
                                <Byte bits={ bits.slice(bitIndex + 8, bitIndex + 16) } colors={b2Colors} size={ 'md' }/>
                            </DoubleByte>
                        )
                    }) }
                </div>
            }

            {/* FP8 table of values */}
            { bytes == 1 && <div className='py-2'>
                <FP8Table fp={ fpFormat as FP8}/>
            </div> }
        </div>
    </Interactive>)
}

function DoubleByte({ children }: React.PropsWithChildren) {
    return (<span className='inline-block'>
        { children }
    </span>)
}

function Byte({ bits, colors, size }: { bits: Bit[], colors: DisplayColor[], size: DisplaySize }) {
    return (
        <span className='inline-block byte border border-zinc-800 rounded-md p-1 mr-1 mb-1'>
            <div className='flex gap-1'>
            { bits.map((bit, index) => {
                return (<Bit key={ index } color={ colors[index] } value={ bit } size={ size }/>)
            }) }
            </div>
        </span>
    )
}

function Bit({ color, value, size }: { color: DisplayColor, value: Bit, size: DisplaySize }) {
    return (
        <span className={clsx(
            'border rounded-md',
            { 
                sm: 'text-sm px-1 py-0.5', 
                md: 'text-lg px-2 py-1', 
                lg: 'text-2xl px-3 py-2'
            }[size],
            {
              s: 'text-red-500',
              e: 'text-green-500',
              m: 'text-blue-500'
            }[color],
            'text-center font-bold select-none',
            'bg-zinc-100 dark:bg-zinc-800',
            'border-zinc-200 dark:border-zinc-700',
            'cursor-pointer'
        )}>{ value }</span>
    )
}

function FPSelect({ onChange }: { onChange: (format: string) => void }) {
  return (
    <div className="space-y-2 w-60">
      <Select defaultValue={ 'fp64' } onValueChange={onChange}>
        <SelectTrigger
          className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0"
        >
          <SelectValue placeholder="Select floating point format" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectGroup>
          <SelectLabel className="">Single byte formats</SelectLabel>
            { Object.entries(singleByteFPs).map(([format, fp]) => (
            <SelectItem key={ format } value={ format }>
                <BitLength color='bg-indigo-500' length={8}/>
                <span className="truncate">FP8 ({ fp.name })</span>
            </SelectItem>
            )) }
            <SelectLabel className="ps-2">Multi-byte formats</SelectLabel>
            { Object.entries(multiByteFPs).map(([format, fp]) => (
                <SelectItem key={ format } value={ format }>
                    <BitLength color='bg-pink-500' length={ fp.length }/>
                    <span className="truncate">{ fp.name }</span>
                </SelectItem>
            )) }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

function BitLength({ color, length }: { color: string, length: number }) {
    return (
        <span className={ clsx(color, "text-white h-7 w-7 py-1 text-sm font-bold rounded-md text-center rounded-md") }>
            { length }
        </span>
    );
}