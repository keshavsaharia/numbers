'use client'

import { useReducer, useRef, useState } from 'react'
import { Interactive } from '../number/interactive'
import { Digit } from '../number/digit'
import clsx from 'clsx'
import { fp8 as fp8s, FP8 } from '@/data/fp8'
import { fp8IsInfinity, fp8isNaN } from './fp8'

type Bit = 0 | 1
const inverse = (bit: Bit): Bit => (bit === 0 ? 1 : 0)

interface FP8EditorProps { 
    instructions?: string
    fp8?: FP8
    slider?: boolean
}

export function FP8Editor({ 
    instructions = 'Try editing the 8 bit floating point value below.',
    fp8 = fp8s.e4m3,
    slider = false
}: FP8EditorProps) {
    const [ sign, setSign ] = useState<Bit>(0)
    const [ exp, setExp ] = useState<Bit[]>(new Array(fp8.exponent).fill(0))
    const [ expInput, setExpInput ] = useState<string>('0')
    const expValue = useRef<number>(0)

    const [ sig, setSig ] = useState<Bit[]>(new Array(fp8.mantissa).fill(0))
    const [ sigInput, setSigInput ] = useState<string>('0')
    const sigValue = useRef<number>(0)

    // For calculations
    const range = 2 ** fp8.mantissa

    function invertExpBit(index: number) {
        exp[index] = inverse(exp[index])
        setExp([ ...exp ])
        computeExp()
    }

    function computeExp() {
        expValue.current = exp.reduce((t, b, i) => 
            (t + (b == 0 ? 0 : 2 ** (fp8.exponent - i - 1))), 0 as number)
        setExpInput(expValue.current.toString())
    }

    function inputExpValue(input: string) {
        setExpInput(input)
        let parsed = parseInt(input)
        if (! isNaN(parsed)) {
            const bounded = Math.max(0, Math.min(parsed, 2 ** fp8.exponent - 1))
            expValue.current = bounded

            // Update state
            setExp(bounded.toString(2).padStart(fp8.exponent, '0')
                    .split('').map((b) => parseInt(b) as Bit))
            if (parsed != bounded)
                setExpInput(bounded.toString())
        }
    }

    function computeSig() {
        sigValue.current = sig.reduce((t, b, i) => 
            (t + (b == 0 ? 0 : 2 ** (fp8.mantissa - i - 1))), 0 as number)
        setSigInput(sigValue.current.toString())
    }

    function invertSigBit(index: number) {
        sig[index] = inverse(sig[index])
        setSig([ ...sig ])
        computeSig()
    }

    function inputSigValue(input: string) {
        setSigInput(input)
        let parsed = parseInt(input)
        if (! isNaN(parsed)) {
            const bounded = Math.max(0, Math.min(parsed, range - 1))
            sigValue.current = bounded

            // Update state
            setSig(bounded.toString(2).padStart(fp8.mantissa, '0')
                    .split('').map((b) => parseInt(b) as Bit))
            if (parsed != bounded)
                setSigInput(bounded.toString())
        }
    }

    return (<Interactive instructions={instructions}>
        <div className="flex flex-wrap gap-1">
            <span className='flex flex-col'>
                <div className='flex'>
                    <Digit 
                        key='sign' 
                        className='text-red-500'
                        size='md'
                        digit={ sign } 
                        onClick={() => setSign(inverse(sign)) }
                    />
                </div>
                <div className='text-gray-500 text-xs mt-1'>
                    sign
                </div>
            </span>
            <span className='flex flex-col'>
                <div className='flex gap-1'>
                    { exp.map((expBit, i) => (<Digit
                        key={'exp' + i }
                        className='text-green-500'
                        size='md'
                        digit={ expBit }
                        onClick={ () => invertExpBit(i) }
                    />))}
                </div>
                <div className='text-center'>
                    <div className='text-gray-500 text-xs mt-1'>
                        exponent
                    </div>
                    <input className='w-20 text-md text-center rounded-md border border-zinc-700'
                        placeholder='exponent'
                        value={ expInput }
                        onChange={ (e) => inputExpValue(e.target.value) }/>
                </div>
            </span>
            <span className='flex flex-col'>
                <div className='flex gap-1'>
                    { sig.map((sigBit, i) => (<Digit
                        key={'sig' + i }
                        className='text-blue-500'
                        size='md'
                        digit={ sigBit }
                        onClick={ () => invertSigBit(i) }
                    />))}
                </div>
                <div className='text-center'>
                    <div className='text-gray-500 text-xs mt-1'>
                        mantissa
                    </div>
                    <input className='w-20 text-md text-center rounded-md border border-zinc-700'
                        placeholder='exponent'
                        value={ sigInput }
                        onChange={ (e) => inputSigValue(e.target.value) }/>
                </div>
            </span>
            <MathText color='text-gray-500'>=</MathText>
            { sign == 1 && <>
                <MathText color='text-red-500'>-1</MathText>
                <MathText color='text-gray-700 dark:text-gray-300'>&times;</MathText>
            </> }
            <MathText color='text-gray-500 flex align-middle'>
                <span className='text-3xl -mt-2 font-light'>(</span>
                { expValue.current != 0 && <>1 +&nbsp;</> }
                <span className='inline-flex flex-col gap-1 text-xs mx-1 -mt-1 text-center'>
                    <span className='pb-1 border-b border-gray-500 text-blue-500'>{ sigValue.current }</span>
                    <span className='text-gray-700 dark:text-gray-300'>2<sup className='font-bold'>{ fp8.mantissa }</sup></span>
                </span>
                <span className='text-3xl -mt-2 font-light'>)</span>
                <sup>(
                    <span className='text-green-500'>{ expValue.current == 0 ? 1 : expValue.current }</span>
                    <span>&nbsp;-&nbsp;</span>
                    <span className='text-gray-700 dark:text-gray-300 font-bold'>{ fp8.bias }</span>
                )</sup>
            </MathText>
            <MathText color='text-gray-500 text-sm pt-2 px-1'>≈</MathText>
            <MathText color='text-gray-700 dark:text-gray-300'>{ 
                ((expValue.current == 0 ? 0 : 1) + (sigValue.current / range)).toFixed(5).replace(/\.?0+$/, '') 
            }
            <sup className='text-gray-700 dark:text-gray-300'>{ expValue.current - fp8.bias }</sup>
            </MathText>
            <MathText color='text-gray-500 text-sm pt-2 px-1'>≈</MathText>
            <MathText color='text-gray-700 dark:text-gray-300'>{
                (fp8IsInfinity(sign == 1, expValue.current, sigValue.current, fp8) ? 'Infinity' :
                (fp8isNaN(sign == 1, expValue.current, sigValue.current, fp8) ? 'NaN' : (
                    (expValue.current == 0 ? 
                        (sign == 1 ? -1 : 1) * (sigValue.current / range) * Math.pow(2, (1 - fp8.bias))  : // subnormal
                        (sign == 1 ? -1 : 1) * (1 + sigValue.current / range) * Math.pow(2, (expValue.current - fp8.bias))
                    ).toFixed(8)
                ))).replace(/\.?0+$/g, '')
            }</MathText>
        </div>
        
    </Interactive>)
}

function MathText({ color, children }: React.PropsWithChildren & { color: string }) {
    return (
        <span className={clsx(color, 'pt-1 text-lg font-mono')}>{ children }</span>
    )
}