'use client'

import clsx from 'clsx'
import { useMemo, useState } from 'react'

export function FloatingPointNumber({ title, base, exponent, significand }: { 
    title: string
    signed?: boolean            // default true
    base: number 
    exponent: number
    significand: number
}) {
    const [ signBit, setSignBit ] = useState(0)
    const [ expBits, setExpBits ] = useState<Array<0 | 1>>(new Array(exponent).fill(0)) //.map(() => (Math.random() < 0.5 ? 0 : 1)))
    const [ sigBits, setSigBits ] = useState<Array<0 | 1>>(new Array(significand).fill(0)) //.map(() => (Math.random() < 0.5 ? 0 : 1)))

    function setExpBit(index: number, value: 0 | 1) {
        expBits[index] = value
        setExpBits([ ...expBits ])
    }

    function setSigBit(index: number, value: 0 | 1) {
        sigBits[index] = value
        setSigBits([ ...sigBits ])
    }

    function recomputeValue() {

    }

    return (<NumberContainer>
        <BinaryLabel color="text-red-600" text="sign" left="-left-2" top/>
        <FloatingPointBit bit={ signBit } setBit={ (sign: number) => {
            setSignBit(sign)
            
        } } key='sign' bg="bg-red-600" />
        <span className="absolute text-emerald-500 left-4 -bottom-1 text-sm md:text-md lg:text-lg font-mono">exponent</span>
        { expBits.map((bit, index) => (<FloatingPointBit bit={ bit } setBit={ (value) => setExpBit(index, value) } key={'base' + index} bg='bg-emerald-600' />)) }
        <span className="absolute text-emerald-300 right-0 -top-1 text-sm md:text-md lg:text-lg font-mono">significand</span>
        { sigBits.map((bit, index) => (<FloatingPointBit bit={ bit } setBit={ (value) => setSigBit(index, value) } key={'base' + index} bg='bg-emerald-300' />)) }
    </NumberContainer>)
}

export function FloatingPointIntuition({ title, base, exponent, significand, initialValue = 0 }: { 
    title: string
    signed?: boolean            // default true
    base: number 
    exponent: number
    significand: number
    initialValue?: number
}) {
    const decomp = decomposeFloat(initialValue)
    const [ float, setFloat ] = useState(initialValue)
    const [ sign, setSign ] = useState(decomp.sign)
    const [ exp, setExp ] = useState(decomp.exponent)
    const [ sig, setSig ] = useState(decomp.significand)

    function decomposeFloat(num: number) {
        const buffer = new ArrayBuffer(8); // 64 bits
        const floatView = new Float64Array(buffer);
        const intView = new BigUint64Array(buffer);
      
        floatView[0] = num;
        const bits = intView[0];
      
        const sign = (bits >> BigInt(63)) & BigInt(1)
        const exponentBits = (bits >> BigInt(52)) & BigInt(0x7FF)
        const significandBits = bits & BigInt('0xFFFFFFFFFFFFF')
      
        let exponent;
        let significand;
      
        if (exponentBits === BigInt(0)) {
            // Subnormal number
            exponent = -1022;
            significand = Number(significandBits) / Math.pow(2, 52);
        }
        else if (exponentBits === BigInt(0x7FF)) {
          // Inf or NaN
            return {
                sign: Number(sign),
                exponent: Infinity,
                significand: Number(significandBits)
            };
        }
        else {
            exponent = Number(exponentBits) - 1023;
            significand = 1 + Number(significandBits) / Math.pow(2, 52);
        }
      
        return {
            sign: Number(sign),
            exponent,
            significand
        };
    }

    function composeFloat({ sign, exponent, significand }: { sign: number, exponent: number, significand: number }) {
        const buffer = new ArrayBuffer(8)
        const floatView = new Float64Array(buffer)
        const intView = new BigUint64Array(buffer)
      
        let exponentBits;
        let significandBits;
      
        if (significand === 0) {
          // Zero
          exponentBits = BigInt(0);
          significandBits = BigInt(0);
        } else if (significand < 1) {
          // Subnormal number (exponent is -1022, no leading 1)
          exponentBits = BigInt(0);
          significandBits = BigInt(Math.floor(significand * Math.pow(2, 52)));
        } else {
          // Normalized number
          exponentBits = BigInt(exponent + 1023);
          significandBits = BigInt(Math.floor((significand - 1) * Math.pow(2, 52)));
        }
      
        let signBit = BigInt(sign) << BigInt(63);
        let expBits = exponentBits << BigInt(52);
        let bits = signBit | expBits | significandBits;
      
        intView[0] = bits;
        return floatView[0];
      }

    return (
        <div className="w-full">
            <div className="flex justify-center gap-4 pb-4">
                <FloatingPointInput label="value" value={ float } onChange={ (value) => {
                    setFloat(value)
                    const decomp = decomposeFloat(value)
                    setSign(decomp.sign)
                    setSig(decomp.significand)
                    setExp(decomp.exponent)
                    console.log('decomposed', decomp)
                } }/>
                <span className="text-xl font-mono pt-7">=</span>
                <FloatingPointInput label="sign" limit={ 1 } sign value={ sign } onChange={ (sign) => {
                    setSign(sign)
                    // Calculate new value from existing
                } }/>
                <FloatingPointInput label="exponent" limit={ exponent } value={ exp } onChange={ (exponent) => {
                    setExp(exponent)
                    const value = composeFloat({ sign, exponent: exponent - 1023, significand: sig + 1 })
                    setFloat(value)
                } }/>
                <FloatingPointInput label="significand" limit={ significand } value={ sig } onChange={ (significand) => {
                    setSig(significand)
                    // Calculate new value from existing
                } }/>
            </div>
            <div className="w-full relative pb-8">
                <div className="absolute left-[50%] right-0 top-0 h-0.5 bg-emerald-500"></div>
                <div className="absolute right-[50%] left-0 top-0 h-0.5 bg-red-500"></div>
                <div className="absolute -right-1 -top-2 w-0 h-0 border-y-8 border-y-transparent border-l-[16px] border-l-emerald-500"></div>
                <div className="absolute -left-1 -top-2 w-0 h-0 border-y-8 border-y-transparent border-r-[16px] border-r-red-500"></div>
                <div className="absolute left-[50%] -top-1.5 -ml-0.5 w-0.5 h-3.5 bg-emerald-500"></div>
            </div>
        </div>)
}

function FloatingPointInput({ label, limit, sign, value, onChange }: { 
    label: string 
    limit?: number 
    sign?: boolean
    value: number
    onChange: (value: number) => any
}) {
    const threshold: number = (limit == null) ? Infinity : 2 ** limit
    const [ negative, setNegative ] = useState(false)
    const [ decimal, setDecimal ] = useState(false)

    function changed(update: string) {
        update = update.trim()

        // Allow negative and decimal entry for the main value
        if (limit == null) {
            if (update.startsWith('-')) {
                setNegative(true)
            }
            else setNegative(false)

            if (update.endsWith('.') && update.indexOf('.') === update.lastIndexOf('.')) {
                setDecimal(true)
                return
            }
            else setDecimal(false)
        }

        let val: number = (update == '' || update == '-') ? 0 : parseFloat(update)
        if (val > threshold)
            val = threshold
        if (! isNaN(val)) {
            onChange(val)
        }
    }

    return (
        <span className="text-center">
            <label className="text-xs font-mono">
                <span className="font-bold">{ label }</span>
                { sign && <span> &#40;0 or 1&#41;</span>}
                { limit != null && !sign && <span>&#40;0 ... 2<sup>{ limit }</sup>&#41;</span> }
            </label><br/>
            <input className={clsx(
                    sign ? "w-20" : "w-40",
                    "rounded-md text-center",
                    "bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                )} 
                value={ ((negative && value >= 0) ? '-' : '') + value + (decimal ? '.' : '') }
                inputMode='decimal'
                onChange={ (e) => changed(e.target.value) }
                placeholder={ label }/>
            { !sign && <span className="inline-block align-middle">
                <span className="flex flex-col">
                    <button className="px-2 py-0 text-sm/3 cursor-pointer">+</button>
                    <button className="px-2 py-0 text-sm/3 cursor-pointer">-</button>
                </span>
            </span> }
        </span>
    )
}

function FloatingPointBit({ bg, bit, setBit, large }: { 
    bit: number, 
    setBit: (newBit: 0 | 1) => any, 
    bg: string,
    large?: boolean
}) {

    return (
        <span className="relative flex items-center justify-center cursor-pointer"
            onClick={ () => setBit(bit == 0 ? 1 : 0) }>
            <span aria-hidden="true" className={clsx("absolute flex", 
                large ? "size-2 sm:size-3 md:size-3.5 lg:size-4" : "size-1 sm:size-2 md:size-2.5 lg:size-3")}>
                <span className={clsx(
                    "size-full rounded-full",
                    "text-center font-bold text-black",
                    large ? "text-xs/5" : "text-2xs/6",
                    bg
                )}>
                    { bit.toString() }
                </span>
            </span>
        </span>
    )
}


function BinaryLabel({ top, bottom, left, text, color }: { left: string, top?: boolean, bottom?: boolean, text: string, color: string }) {
    return (<span className={clsx(
        "absolute text-emerald-500", left, (bottom) ? "-bottom-1": "-top-1",
        "text-sm md:text-md lg:text-lg font-mono", color
    )}>
        { text }
    </span>)
}

function NumberContainer({ padding = "py-8", large, children }: React.PropsWithChildren & { padding?: string, large?: boolean }) {
    return (
        <p className={clsx("relative flex items-center select-none", "px-2", padding,
            large ? "space-x-2.5 sm:space-x-3 md:space-x-4 lg:space-x-4.5" : "space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-3.5")}>
            { children }
        </p>
    )
}