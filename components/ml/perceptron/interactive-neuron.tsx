'use client'

import { useMemo, useState } from 'react'
import { Interactive } from '@/components/number/interactive'
import { Input } from '@/components/ui/input'
import { sigmoid, SigmoidCurve } from './activation/sigmoid'
import { tanh, TanhCurve } from './activation/tanh'

const DEFAULT_INPUTS = [1.1, 2.2]
const DEFAULT_WEIGHTS = [0.3, 0.4]
const DEFAULT_BIAS = 0.5

export function InteractiveNeuron(initial: { bias?: number, inputs?: number[], weights?: number[], activationFunction?: 'sigmoid' | 'tanh' }) {
  const [ inputs, setInputs ] = useState<number[]>(initial.inputs ?? DEFAULT_INPUTS)
  const [ inputValues, setInputValues ] = useState<string[]>(initial.inputs?.map((input) => input.toString()) ?? DEFAULT_INPUTS.map((input) => input.toString()))
  const [ weights, setWeights ] = useState<number[]>(initial.weights ?? DEFAULT_WEIGHTS)
  const [ weightValues, setWeightValues ] = useState<string[]>(initial.weights?.map((weight) => weight.toString()) ?? DEFAULT_WEIGHTS.map((weight) => weight.toString()))
  const [ bias, setBias ] = useState<number>(initial.bias ?? DEFAULT_BIAS)
  const [ biasValue, setBiasValue ] = useState<string>(initial.bias?.toString() ?? DEFAULT_BIAS.toString())

  const { total: initialTotal, output: initialOutput } = computeOutput(inputs, weights, bias)
  const [ total, setTotal ] = useState<number>(initialTotal)
  const [ output, setOutput ] = useState<number>(initialOutput)

  function setInputNeuron(index: number, newValue: string) {
    setInputValues(inputValues.map((value, i) => i === index ? newValue : value))
    
    const value = parseFloat(newValue.replace(/[^\-0-9.]/g, ''))
    if (isNaN(value)) return
    const newInputs = inputs.map((input, i) => i === index ? value : input)
    setInputs(newInputs)
    setNewComputedOutput(newInputs, weights, bias)
  }

  function setWeightFromInput(index: number, newValue: string) {
    setWeightValues(weightValues.map((value, i) => i === index ? newValue : value))
    const value = parseFloat(newValue.replace(/[^\-0-9.]/g, ''))
    if (isNaN(value)) return
    const newWeights = weights.map((weight, i) => i === index ? value : weight)
    setWeights(newWeights)
    setNewComputedOutput(inputs, newWeights, bias)
  }

  function setBiasFromInput(newValue: string) {
    setBiasValue(newValue)
    const value = parseFloat(newValue.replace(/[^\-0-9.]/g, ''))
    if (isNaN(value)) return
    setBias(value)
    setNewComputedOutput(inputs, weights, value)
  }

  function setNewComputedOutput(inputs: number[], weights: number[], bias: number) {
    const { total, output } = computeOutput(inputs, weights, bias)
    setTotal(total)
    setOutput(output)
  }

  function computeOutput(inputs: number[], weights: number[], bias: number): { total: number, output: number } {
    const total = inputs.reduce((acc, input, index) => acc + input * weights[index], 0)
    let output = total + bias
    if (initial.activationFunction === 'sigmoid') {
      return { total, output: sigmoid(output) }
    }
    if (initial.activationFunction === 'tanh') {
      return { total, output: tanh(output) }
    }
    return { total, output }
  }

  return (
    <Interactive instructions='Change the inputs and weights to see how the neuron computes its output.'>
      <div className="flex flex-row">
        <div className="flex flex-col gap-2 z-100">
          { inputs.map((_, index) => (
            <EditableNeuron key={index} index={index} inputValue={inputValues[index]} setInputValue={setInputNeuron} />
          ))}
        </div>
        <div className="z-10 w-8">
          <div className="flex flex-col justify-center h-full">
            {inputs.map((_, index) => (
              <div 
                key={index}
                className="w-1 h-24 bg-zinc-400 dark:bg-zinc-600 transform origin-left"
                style={{
                  transform: `rotate(${index === 0 ? -60 : 60}deg) translateX(5px)`
                }}
              />
            ))}
          </div>
        </div>
        <div className="z-10 w-16 flex flex-col justify-center gap-2">
          { weights.map((_, index) => (
            <EditableValue key={index} value={weightValues[index]} prefix="x" setValue={(newValue) => setWeightFromInput(index, newValue)} />
          ))}
        </div>
        <div className="z-10 flex flex-col justify-center gap-12">
            <HorizontalLine />
            <HorizontalLine />
        </div>
        <div className="flex flex-col justify-center z-100 ml-[-16px]">
          <EditableNeuron index={2} inputValue={total.toFixed(3)} setInputValue={() => {}} />
        </div>
        <div className="z-10 w-4 flex flex-col justify-center">
            <HorizontalLine />
        </div>
        <div className="z-10 flex flex-col justify-center gap-12 w-18">
          <EditableValue value={biasValue} prefix="+" setValue={setBiasFromInput} />
        </div>
        { initial.activationFunction && (<>
          <div className="z-10 w-4 flex flex-col justify-center">
            <HorizontalLine />
          </div>
          <div className="z-10 flex flex-col justify-center gap-12">
            { initial.activationFunction === 'sigmoid' && <SigmoidCurve currentX={total} /> }
            { initial.activationFunction === 'tanh' && <TanhCurve currentX={total} /> }
          </div>
        </>)}
        <div className="z-10 flex flex-col justify-center">
          <HorizontalLine arrow />
        </div>
        <div className="z-10 flex flex-col justify-center">
          <p className="text-md text-center font-mono px-2">
            {output.toFixed(6).replace(/\.?0+$/, '')}
          </p>
        </div>
      </div>
    </Interactive>
  )
}

function EditableNeuron({ index, inputValue, setInputValue }: { index: number, inputValue: string, setInputValue: (index: number, value: string) => void }) {
  return (
    <div className="w-[96px] h-[96px] rounded-full px-[16px] py-[16px] bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
      <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 pb-1">neuron { index + 1 }</p>
      <Input className="text-center" value={ inputValue } onChange={ (e) => setInputValue(index, e.target.value) } />
    </div>
  )
}

function EditableValue({ value, prefix, setValue }: { value: string, prefix?: string, setValue: (value: string) => void }) {
  return (
    <div className="relative">
      { prefix && <span className="text-xs text-center text-zinc-500 dark:text-zinc-400 absolute top-3 left-2">{prefix}</span> }
      <Input className="text-center" value={value} onChange={ (e) => setValue(e.target.value) } />
    </div>
  )
}

function HorizontalLine({ arrow = false }: { arrow?: boolean }) {
  return (
    <div className="relative w-6 h-1 bg-zinc-400 dark:bg-zinc-600">
      { arrow && <div className="absolute -top-1 right-0 w-3 h-3 border-b-4 border-r-4 border-zinc-400 dark:border-zinc-600 -rotate-45"></div> }
      &nbsp;
    </div>
  )
}
