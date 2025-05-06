'use client'

import { useEffect, useState } from 'react'
import { Interactive } from '../number/interactive'
import clsx from 'clsx'
import { PlusCircleIcon, XCircleIcon } from 'lucide-react'

import { gaussianSolver, Matrix, GaussianSolution } from './solver'

interface LinearEquation {
  coefficient: number[]
  constant: number
}

const variables: string[][] = [
  [],
  ['x'],
  ['x', 'y'],
  ['x', 'y', 'z'],
  ['v', 'x', 'y', 'z'],
  ['u', 'v', 'x', 'y', 'z']
]

export function GaussianElimination() {
  const [equations, setEquations] = useState<LinearEquation[]>([
    { coefficient: [1, -2, 1], constant: 0 },
    { coefficient: [2, 1, -3], constant: 5 },
    { coefficient: [4, -7, 1], constant: -1 }
  ])
  const vars = variables[equations.length]

  const [solution, setSolution] = useState<GaussianSolution | null>(null)

  useEffect(() => {
    computeSolution()
  }, [ equations ])

  function computeSolution() {
    try {
      const solution = gaussianSolver(
        equations.map(({ coefficient }) => coefficient), // matrix
        equations.map(({ constant }) => constant)        // vector
      )
      setSolution(solution)
    }
    catch (error) {
      // show error
      console.log('error', error)
    }
  }

  function addEquation() {
    const length = equations.length + 1
    if (length > 5) return

    setEquations(equations.map((e) => ({ ...e, coefficient: e.coefficient.concat([ 0 ]) })).concat([
      { coefficient: new Array(length).fill(0), constant: 0 }
    ]))
    // computeSolution()
  }

  function changeEquation(index: number, equation: LinearEquation) {
    setEquations(equations.map((e, i) => i === index ? equation : e))
    // Recompute
    // computeSolution()
  }

  function removeEquation(index: number) {
    const length = equations.length - 1
    if (length < 1) return

    setEquations(equations.filter((_, i) => i !== index).map((e, i) => ({ 
      ...e, 
      coefficient: e.coefficient.slice(0, length) 
    })))
    // computeSolution()
  }

  return (
    <Interactive instructions='Try changing the system of equations below to see the result of the elimination process.'>
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col gap-2">
          {equations.map((equation, i) => (
            <LinearEquationEditor key={i} {...equation} 
              onChange={(equation) => changeEquation(i, equation)}
              onRemove={() => removeEquation(i)} />
          ))}
        </div>
      </div>
      <div className='mt-2 font-mono font-bold'>
        <button onClick={() => addEquation()} className='flex w-full justify-center leading-4 gap-2 text-green-700'>
        <PlusCircleIcon className='text-green-700 w-4 h-4' /> add equation 
        </button>
      </div>

      { solution && <>
        <div className={clsx(
          'flex justify-center gap-2 mt-4',
          'border-t border-zinc-300 dark:border-zinc-700',
          'pt-4 text-center text-sm'
        )}>
          <div className='col-span-1 pr-6 relative'>
            <p className='text-sm text-zinc-500'>augmented</p>
            <MatrixDisplay matrix={solution.augmented} />
            <span className='absolute top-[60%] right-0 -translate-y-1/2'>&rarr;</span>
          </div>
          <div className='col-span-1 pr-6 relative'>
          <p className='text-sm text-zinc-500'>diagonalized</p>
            <MatrixDisplay matrix={solution.diagonalized} />
            <span className='absolute top-[60%] right-0 -translate-y-1/2'>&rarr;</span>
          </div>
          <div className='col-span-1'>
          <p className='text-sm text-zinc-500'>substituted</p>
            <MatrixDisplay matrix={solution.substituted} />
          </div>
        </div>
        <p className='text-sm text-center mt-4 text-zinc-500'>solution</p>
        <div className='flex justify-center gap-4 font-mono'>
          { solution.extracted.map((value, i) => {
              const isLast = (i + 1 === solution.extracted.length)
              const display = value.toFixed(3).replace(/\.?0+$/, '')

              return (
              <span key={i} className='flex gap-1 text-md'>
                <span className='text-zinc-900 dark:text-zinc-100'>{ vars[i] }</span>
                <span>=</span>
                <span className='text-zinc-900 dark:text-zinc-100'>{ display }</span>
                { !isLast && <span>,</span> }
              </span>
            )
          })}
        </div>
      </>}
    </Interactive>
  );
}

function MatrixDisplay({ matrix }: { matrix: number[][] }) {
  const width = matrix[0].length
  const height = matrix.length
  const precision = Math.max(2, width - 6);

  return (
    <div className={clsx(
      'grid gap-2 relative px-2 font-mono',
      ['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6'][width]
    )}>
      <MatrixBrackets/>

      {new Array(width).fill(0).map((_, j) => (
        <div key={j}
          className='flex flex-col gap-2'>
          { new Array(height).fill(0).map((_, i) => {
            const value = matrix[i][j].toFixed(precision).replace(/\.?0+$/, '')
            return (
              <div key={j} className='text-center'>
                { value }
              </div>
            )
          }) }
        </div>
      ))}
    </div>
  )
}

function LinearEquationEditor({ coefficient, constant, onChange, onRemove }: LinearEquation & { 
  onChange: (equation: LinearEquation) => void
  onRemove: () => void
}) {
  const [ coefficientInput, setCoefficientInput ] = useState<string[]>(coefficient.map((c) => c.toString()))
  const [ constantInput, setConstantInput ] = useState<string>(String(constant))

  const vars = variables[coefficient.length]

  function changeCoefficient(index: number, value: string) {
    setCoefficientInput(coefficientInput.map((c, i) => i === index ? value : c))

    const parsed = parseFloat(value)
    if (isNaN(parsed)) return
    coefficient[index] = parsed
    onChange({ coefficient, constant })
  }

  function changeConstant(value: string) {
    setConstantInput(value)

    const parsed = parseFloat(value)
    if (isNaN(parsed)) return
    onChange({ coefficient, constant: parsed })
  }

  return (
    <span className="flex gap-4 flex-nowrap">
      {coefficient.map((c, i) => (<span key={i} className='flex gap-4'>
        <span className='flex gap-2 leading-6 font-mono'>
          <input type="number" 
            className={clsx(
              'inline-block w-12 text-center border',
              'dark:bg-zinc-800 bg-zinc-200',
              'dark:border-zinc-700 border-zinc-300',
              'outline-none focus:ring-1 focus:ring-offset-0 ring-blue-500',
              'rounded-md'
            )}
            value={coefficientInput[i]}
            onChange={(e) => changeCoefficient(i, e.target.value) } />
          <span>
            <span className='text-lg'>{ vars[i] }</span>
          </span>
        </span>
        {i < coefficient.length - 1 && <span>+</span>}
      </span>))}
      <span>=</span>
      <span>
        <input type="number" 
          className={clsx(
            'inline-block w-12 text-center border',
            'dark:bg-zinc-800 bg-zinc-200',
            'dark:border-zinc-700 border-zinc-300',
            'outline-none focus:ring-1 focus:ring-offset-0 ring-blue-500',
            'rounded-md'
          )}
          value={constantInput}
          onChange={(e) => changeConstant(e.target.value)} />
      </span>
      <button onClick={onRemove} className='text-red-700'>
        <XCircleIcon className='text-red-700 w-4 h-4' />
      </button>
    </span>
  )
}

const MatrixBrackets = () => {
  return (<>
    <div className='absolute top-0 left-0 bottom-0 h-full w-0.5 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute top-0 left-0 h-0.5 w-2 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute bottom-0 left-0 h-0.5 w-2 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute top-0 right-0 bottom-0 h-full w-0.5 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute top-0 right-0 h-0.5 w-2 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute bottom-0 right-0 h-0.5 w-2 bg-zinc-400 dark:bg-zinc-600'></div>
  </>)
}