'use client'

import { useState } from 'react'
import clsx from 'clsx'

export function BinaryNumber({ unsigned, length, showTotal, showSum }: { 
    unsigned?: boolean, 
    length: number,
    showTotal?: boolean
    showSum?: boolean
}) {
    const [ signBit, setSignBit ] = useState<0 | 1 | null>(unsigned ? null : 0)
    const [ bits, setBits ] = useState<Array<0 | 1>>(new Array(length - (unsigned ? 0 : 1)).fill(0)) //.map(() => (Math.random() < 0.5 ? 0 : 1)))

    function setBit(index: number, bit: 0 | 1) {
        bits[index] = bit
        setBits([...bits])
    }

    function setSign(bit: 0 | 1) {
        setSignBit(bit)
        // recompute
    }

    return (<>
        <NumberContainer padding="pt-4 pb-0" large>
            { !unsigned && <BinaryLabel color="text-red-600" text="sign" left="-left-2" top/> }
            { unsigned ? null : <BinaryBit 
                key='sign'
                bit={ signBit || 0 } 
                setBit={ (value) => setSign(value) } 
                bg='bg-red-500'
                large />}
            
            { bits.map((bit, index) => (<BinaryBit 
                key={'bit' + index}
                bit={ bit } 
                setBit={ (value) => setBit(index, value) } 
                bg='bg-emerald-500'
                large />)) }
            { showSum && <BinarySum bits={ bits } sign={ signBit }/> }
            { showTotal && <BinaryTotal bits={ bits } sign={ signBit }/> }
        </NumberContainer>
    </>)
}

function BinaryBit({ bg, bit, setBit, large }: { 
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
                    large ? "text-xs/4" : "text-2xs/3",
                    bg
                )}>
                    { bit.toString() }
                </span>
            </span>
        </span>
    )
}

function BinaryTotal({ bits, sign }: { bits: number[], sign: number | null }) {
    function getTotal(): string {
        const total = (sign === null) ? unsignedTotal(bits) : signedTotal()
        return total.toString()
    }

    function unsignedTotal(unsignedBits: number[]) {
        return unsignedBits.reduce((t, b, i) => t + (b << (unsignedBits.length - 1 - i)), 0)
    }

    // 2's complement total
    function signedTotal() {
        if (sign === 0)
            return unsignedTotal(bits)

        let total = 0
        
        const inverted: number[] = [...bits].map((bit) => (bit == 0 ? 1 : 0))
        let carry = 1, shift = 0
        for (let i = inverted.length - 1 ; i >= 0 ; i--) {
            const sum = inverted[i] + carry
            inverted[i] = sum % 2
            carry = sum > 1 ? 1 : 0
            total += (inverted[i] << shift)
        }
        if (carry == 1)
            return -1 * 2 ** bits.length
        return -1 * unsignedTotal(inverted)
    }

    return (<>
        <span className="font-mono text-md text-gray-500">=</span>
        <span className="font-mono text-md text-emerald-500">{ getTotal() }</span>
    </>)
}

function BinarySum({ bits, sign }: { bits: number[], sign: number | null }) {
    const bitIndexes = [...bits].reverse()
        .map((bit, index) => (((sign === 1 && bit === 0) || (sign !== 1 && bit != 0)) ? index : null))
        .filter((b) => b != null)

    return (<>
        { bitIndexes.length > 0 && 
        <span className="font-mono text-md text-gray-500" key='equal'>= </span> }
        <span className="font-mono text-md text-emerald-600">
            { sign === 1 && <span key='inv0'>-1 &#215; &#40;1</span> }
            { bitIndexes.map((index, i) => <span key={ 'bit' + index }>
                <span>{ sign == null ? (i > 0 ? ' + ' : '') : ' + ' }</span>2<sup>{ index }</sup>
            </span>) }
            { sign === 1 && <span key='inv1'>&#41;</span> }
        </span>
    </>)
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