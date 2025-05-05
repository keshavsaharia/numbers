import clsx from "clsx";
import { FP } from "@/data/fp";
import { FP8 } from "@/data/fp8";
import { Divider, Interactive } from "../number/interactive";
import { FPFormatName } from "./instructions";
import { code as CodeText } from '../typography'

import { 
    SubnormalValueFormula,
    NormalizedValueFormula
} from './formula'

export function FloatSpecification({ fp }: { fp: FP }) {

    return (
        <Interactive instructions={<>
            <FPFormatName name={ fp.id }/>

        </>}>
            <FPBitSpecification fp={ fp }/>
            <FPExponentRange fp={ fp }/>
            <Divider/>
            
            <WithThreeCases left={<p>
                sign bit <CodeText className='text-red-500'>s</CodeText>
            </p>} right={<p>
                mantissa <CodeText className='text-blue-500'>m</CodeText>
            </p>}>
                given an exponent <CodeText className='text-green-500'>e</CodeText>
            </WithThreeCases>
            
            <ThreeCases first={<>
                <WithTwoCases>
                    <CaseText variable='e' operator='=' value={0}/>
                </WithTwoCases>
                <TwoCases first={<>
                    <CaseText variable='m' operator='=' value={0} comment='signed zero'/>
                    <span className='flex justify-center align-middle'>
                        <span className="text-red-500">&plusmn;</span>
                        <span className="text-xl">0</span>
                    </span>
                </>} second={<>
                    <CaseText variable='m' operator='>' value={0} comment='subnormal'/>
                    <SubnormalValueFormula fp={ fp }/>
                </>}/>
            </>} second={<>
                <CaseText variable='e' operator='<' value={<>E<sub>max</sub></>} comment='normalized value'/>
                <NormalizedValueFormula fp={ fp }/>
            </>}
            third={<>
                <WithTwoCases>
                    <CaseText variable='e' operator='=' value={<>E<sub>max</sub></>}/>
                </WithTwoCases>
                <TwoCases first={<>
                    <CaseText variable='m' operator='=' value={0} comment='signed infinity'/>
                    <span className='flex justify-center align-middle'>
                        <span className="text-red-500">&plusmn;</span>
                        <span className="text-2xl">&infin;</span>
                    </span>
                </>} second={<>
                    <CaseText variable='m' operator='>' value={0} comment='not a number'/>
                    <span>NaN</span>
                </>}/>
            </>}/>
        </Interactive>
    )
}

/**
 * A specification display that works for all floating point formats.
 */
export function FPBitSpecification({ fp }: { fp: FP | FP8 }) {
    return (
        <div className='grid grid-cols-4 gap-1 text-center'>
            <SpecificationMetric name='sign' value={ fp.signed ? '1 bit' : 'unsigned' }/>
            <SpecificationMetric name='exponent' value={ fp.exponent } units='bits'/>
            <SpecificationMetric name='bias' value={ fp.bias }/>
            <SpecificationMetric name='mantissa' value={ fp.mantissa } units='bits'/>
        </div>
    )
}

/**
 * Common range specification display
 */
export function FPExponentRange({ fp }: { fp: FP | FP8 }) {
    return (
        <div className='grid grid-cols-4 gap-1 text-center mt-4'>
            <div></div>
            <div className='col-span-2 relative'>
                <div className='absolute h-1 w-[50%] top-0 left-[25%] bg-zinc-400 dark:bg-zinc-600 justify-center'></div>
                <div className='absolute h-5 w-1 -top-4 left-[25%] bg-zinc-400 dark:bg-zinc-600 justify-center'></div>
                <div className='absolute h-5 w-1 -top-4 left-[75%] bg-zinc-400 dark:bg-zinc-600 justify-center'></div>
                <p className='pt-2 font-mono'>
                    E<sub>min</sub> = { fp.exponentRange[0] }, E<sub>max</sub> = { fp.exponentRange[1] }
                </p>

            </div>
            <div></div>
        </div>
    )
}

export function SpecificationMetric({ name, value, units }: { name: string, value: string | number, units?: string }) {
    return (
        <div>
            <p className='text-sm text-zinc-600 dark:text-zinc-400'>{ name }</p>
            <p className='text-xl font-bold text-zinc-800 dark:text-zinc-200'>{ value } { units }</p>
        </div>
    )
}

export function ThreeCases({ first, second, third }: { first: React.ReactNode, second: React.ReactNode, third: React.ReactNode }) {
    return (
        <div className='grid grid-cols-3 gap-1 text-center pt-2 font-mono'>
            <div>{ first }</div>
            <div>{ second }</div>
            <div>{ third }</div>
        </div>
    )
}

export function TwoCases({ first, second }: { first: React.ReactNode, second: React.ReactNode }) {
    return (
        <div className='grid grid-cols-2 gap-1 text-center pt-2 font-mono'>
            <div>{ first }</div>
            <div>{ second }</div>
        </div>
    )
}

export function CaseText({ variable, operator, value, comment }: {
    variable: 'e' | 'm'
    operator: '=' | '>' | '>=' | '<' | '<='
    value: any
    comment?: string
}) {
    return (<>
        <p className='font-mono'>
            <CodeText className={{
                e: 'text-green-500',
                m: 'text-blue-500'
            }[variable]}>
                { variable }
            </CodeText> { operator } { value }
        </p>
        <p className='text-sm font-sans text-zinc-600 dark:text-zinc-400'>
            { comment }
        </p>
    </>)
}

export function WithTwoCases({ children, left, right, top }: { children?: React.ReactNode } & { 
    left?: React.ReactNode      // fill space on left
    right?: React.ReactNode     // fill space on right
    top?: boolean
}) {
    return (
        <p className={clsx(
            'text-center relative',
            'mb-4 pb-6', top && 'pt-4 mt-4' // spacing for top line
        ) }>
            { top && <TopLine /> }
            <div className='grid grid-cols-4 gap-1 font-mono'>
                <div>{ left }</div>    
                <div className='col-span-2'>
                    { children }
                </div>
                <div>{ right }</div>
            </div>
            <TwoCasesLines />
        </p>
    )
}

export function WithThreeCases({ children, left, right, top }: { children?: React.ReactNode } & { 
    left?: React.ReactNode      // fill space on left
    right?: React.ReactNode     // fill space on right
    top?: boolean
}) {
    return (
        <p className={clsx(
            'text-center relative',
            'mb-4 pb-6', top && 'pt-4 mt-4' // spacing for top line
        ) }>
            { top && <TopLine /> }
            <div className='grid grid-cols-6 gap-1 font-mono'>
                <div>{ left }</div>    
                <div className='col-span-4'>
                    { children }
                </div>
                <div>{ right }</div>
            </div>
            <ThreeCasesLines />
        </p>
    )
}

function ThreeCasesLines() {
    return (<>
        <div className='absolute bottom-0 left-[50%] w-1 h-4 bg-zinc-400 dark:bg-zinc-600'></div>
        <div className='absolute bottom-0 left-[16.66%] w-[66.66%] h-1 bg-zinc-400 dark:bg-zinc-600'></div>
        <div className='absolute -bottom-4 left-[16.66%] w-1 h-4 bg-zinc-400 dark:bg-zinc-600'></div>
        <div className='absolute -bottom-4 left-[83.34%] w-1 h-5 bg-zinc-400 dark:bg-zinc-600'></div>
        <div className='absolute -bottom-4 left-[50%] w-1 h-4 bg-zinc-400 dark:bg-zinc-600'></div>
    </>)
}

function TwoCasesLines() {
    return (<>
        <div className='absolute bottom-0 left-[50%] w-1 h-4 bg-zinc-400 dark:bg-zinc-600'></div>
        <div className='absolute bottom-0 left-[25%] w-[50%] h-1 bg-zinc-400 dark:bg-zinc-600'></div>
        <div className='absolute -bottom-4 left-[25%] w-1 h-4 bg-zinc-400 dark:bg-zinc-600'></div>
        <div className='absolute -bottom-4 left-[75%] w-1 h-5 bg-zinc-400 dark:bg-zinc-600'></div>
    </>)
}

function TopLine() {
    return (
        <div className='absolute -top-4 left-[50%] w-1 h-4 bg-zinc-400 dark:bg-zinc-600'></div>
    )
}