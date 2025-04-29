import clsx from 'clsx'
import { decodeFP8, getBackgroundFP8, getColorFP8, isSubnormalFP8, subnormalValueFP8, valueFP8 } from './fp8'

import { fp8, FP8 } from '@/data/fp8'

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

export function FP8Table({ fp }: { fp: FP8 }) {
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
        <div className="w-full overflow-auto">
            <div className="flex">
            <div key='head' className='flex flex-col text-sm'>
                <div key='corner'>&nbsp;</div>
                { nibbles.map((row) => {
                    return (
                        <div key={'row' + row}
                            className='px-2 text-right font-bold'>
                            { row.toString(2).padStart(4, '0') }
                            <span className='text-gray-500'>...</span>
                        </div>
                    )
                }) }
            </div>
            { nibbles.map((secondNibble) => {
                return (
                    <div key={'col' + secondNibble} className="flex flex-col w-20 text-sm">
                        <div key='head'
                            className='font-bold text-center'>
                            <span className='text-gray-500'>...</span>
                            { secondNibble.toString(2).padStart(4, '0') }
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
    )
}