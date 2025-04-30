import clsx from 'clsx'
import { decodeFP8, getBackgroundFP8, getColorFP8, isSubnormalFP8, subnormalValueFP8, valueFP8 } from './fp8'

import { fp8, FP8 } from '@/data/fp8'
import { Interactive } from '../number/interactive'

interface FP8Props {
    signed?: boolean        // default true
    exponent: number
    mantissa: number
    bias: number
}

const nibbles = new Array(16).fill(0).map((_, i) => i)

// bias = 7 E4M3

export function FP8E4M3Table() {
    return (<FP8Table fp={ fp8.e4m3 } />)
}

export function FP8Table({ 
    fp = fp8.e4m3, 
    instructions = "Each row is the first four bits, and each column is the second four bits."
}: { fp: FP8, instructions?: string }) {
    const range = (2 ** fp.mantissa)

    /**
     * first and second byte
     * @param x 
     * @param y 
     */
    function compute(first: number, second: number) {
        const decoded = decodeFP8((first << 4) | second, fp)
        const value = isSubnormalFP8(decoded) ? 
                        subnormalValueFP8(decoded, fp) : 
                        valueFP8(decoded, fp)
        const color = getColorFP8(value, decoded)
        const background = getBackgroundFP8(value, decoded)
        
        return { color, background, value, ...decoded }
    }

    return (
    <Interactive instructions={<>
        &nbsp;&nbsp;<span className='font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-800 rounded-md px-2 py-1 font-mono mr-2'>
            { fp.name }
        </span> 
        { instructions }
    </>} padding='pt-2'>
        <div className="w-full overflow-x-scroll pb-2">
            <div className="flex">
            <div key='head' className='flex flex-col text-sm'>
                <div key='corner'>&nbsp;</div>
                { nibbles.map((row) => {
                    const bits = row.toString(2).padStart(4, '0')
                    return (
                        <div key={'row' + row}
                            className='px-2 text-right font-bold text-green-500'>
                            <span className='text-red-500'>{ bits.charAt(0) }</span>
                            { bits.slice(1) }
                            <span className='text-gray-500'>...</span>
                        </div>
                    )
                }) }
            </div>
            { nibbles.map((secondNibble) => {
                const bits = secondNibble.toString(2).padStart(4, '0')
                return (
                    <div key={'col' + secondNibble} className="flex flex-col w-20 text-sm">
                        <div key='head'
                            className='font-bold text-center'>
                            <span className='text-gray-500'>...</span>
                            <span className='text-green-500'>{ bits.slice(0, fp.exponent - 3) }</span>
                            <span className='text-blue-500'>{ bits.slice(fp.exponent - 3) }</span>
                        </div>
                        { nibbles.map((firstNibble) => {
                            const { sign, value, color, inf, nan } = compute(firstNibble, secondNibble)
                            return (
                                <div key={'row' + firstNibble}
                                    // style={{ background }}
                                    className={clsx(
                                        "w-20 text-center",
                                        value == 0 || nan || inf ? 'font-bold' : '', 
                                        nan || inf ? 'bg-blue-400 dark:bg-blue-800' : color
                                    )}>
                                    { (value == 0 || nan || inf) && ! fp.unsignedZero && <span className='font-bold'>
                                        { (sign == 1 ? '+' : '-') }
                                    </span> }
                                    { nan ? 'NaN' : (
                                      inf ? 'Infinity' : value.toFixed(6).replace(/\.?0+$/g, '')) }
                                </div>
                            )

                        })}
                    </div>
                )
            }) }
            </div>
        </div>
    </Interactive>)
}