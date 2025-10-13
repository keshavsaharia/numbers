'use client'

import { useState } from 'react'
import { Interactive } from '@/components/number/interactive'
import { Input } from '@/components/ui/input'

const DEFAULT_INPUTS = [1, 2]
const DEFAULT_WEIGHTS = [3, 4]
const DEFAULT_BIAS = 0

export function InteractiveNeuron(initial: { bias?: number, inputs?: number[], weights?: number[] }) {
  const [ inputs, setInputs ] = useState<number[]>(initial.inputs ?? DEFAULT_INPUTS)
  const [ inputValues, setInputValues ] = useState<string[]>(initial.inputs?.map((input) => input.toString()) ?? DEFAULT_INPUTS.map((input) => input.toString()))
  const [ weightValues, setWeightValues ] = useState<string[]>(initial.weights?.map((weight) => weight.toString()) ?? DEFAULT_WEIGHTS.map((weight) => weight.toString()))
  const [ weights, setWeights ] = useState<number[]>(initial.weights ?? DEFAULT_WEIGHTS)
  const [ bias, setBias ] = useState<number>(initial.bias ?? DEFAULT_BIAS)
  const [ biasValue, setBiasValue ] = useState<string>(initial.bias?.toString() ?? DEFAULT_BIAS.toString())

  function setInputNeuron(index: number, newValue: string) {
    setInputValues(inputValues.map((value, i) => i === index ? newValue : value))
    
    const value = parseFloat(newValue.replace(/[^0-9.]/g, ''))
    if (isNaN(value)) return
    setInputs(inputs.map((input, i) => i === index ? value : input))
  }

  function setWeightFromInput(index: number, newValue: string) {
    setWeightValues(weightValues.map((value, i) => i === index ? newValue : value))
    
    const value = parseFloat(newValue.replace(/[^0-9.]/g, ''))
    if (isNaN(value)) return
    setWeights(weights.map((weight, i) => i === index ? value : weight))
  }

  function setBiasFromInput(newValue: string) {
    setBiasValue(newValue)
    const value = parseFloat(newValue.replace(/[^0-9.]/g, ''))
    if (isNaN(value)) return
    setBias(value)
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
          <EditableNeuron index={2} inputValue={"0"} setInputValue={() => {}} />
        </div>
        <div className="z-10 flex flex-col justify-center gap-12">
            <HorizontalLine />
        </div>
        <div className="z-10 flex flex-col justify-center gap-12 w-24">
          <EditableValue value={biasValue} prefix="+" setValue={setBiasFromInput} />
        </div>
        <div className="z-10 flex flex-col justify-center gap-12">
          <p className="text-center mx-2">=</p>
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

function HorizontalLine() {
  return (
    <div className="w-10 h-1 bg-zinc-400 dark:bg-zinc-600">&nbsp;</div>
  )
}