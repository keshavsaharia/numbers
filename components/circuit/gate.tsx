'use client'

import clsx from 'clsx';
import { useState } from 'react';
import { Interactive } from '../number/interactive';

type BooleanGateType = 'not' | 'and' | 'or' | 'nand' | 'nor' | 'xor' | 'xnor'

interface LogicGateProps {
  type: BooleanGateType;
  className?: string;
}

export const BooleanGate: React.FC<LogicGateProps> = ({ type, className }) => {
  const [inputs, setInputs] = useState<boolean[]>(type === 'not' ? [false] : [false, false]);
  const [output, setOutput] = useState<boolean>(calculateOutput(type, inputs));

  const toggleInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = !newInputs[index];
    setInputs(newInputs);
    setOutput(calculateOutput(type, newInputs));
  };

  return (
    <Interactive instructions={<>
      <GateName type={ type }/>
      Click the inputs to change the gate's output.
    </>}>
    <div className={clsx("flex flex-col items-center px-4 pt-2", className)}>
      <div className="flex items-center justify-center space-x-4">
        <div className="flex flex-col space-y-2">
          {inputs.map((input, index) => (
            <button
              key={index}
              onClick={() => toggleInput(index)}
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                input ? "bg-binary-true text-white" : "bg-binary-false text-white"
              )}
            >
              {input ? "1" : "0"}
            </button>
          ))}
        </div>
        <div className="text-gray-500">{renderGateSymbol(type)}</div>
        <div>
          <div
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center",
              output ? "bg-binary-true text-white" : "bg-binary-false text-white"
            )}
          >
            {output ? "1" : "0"}
          </div>
        </div>
      </div>
    </div>
    <TruthTable gateType={ type }/>
  </Interactive>);
};


const renderGateSymbol = (type: BooleanGateType) => {
  switch (type) {
    case 'and':
      return (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 20H50C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80H25V20Z" 
                stroke="currentColor" strokeWidth="3" fill="none" />
          <line x1="10" y1="35" x2="25" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="10" y1="65" x2="25" y2="65" stroke="currentColor" strokeWidth="3" />
          <line x1="80" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case 'or':
      return (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 20C40 20 80 20 80 50C80 80 40 80 25 80C40 65 40 35 25 20Z" 
                stroke="currentColor" strokeWidth="3" fill="none" />
          <line x1="10" y1="35" x2="25" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="10" y1="65" x2="25" y2="65" stroke="currentColor" strokeWidth="3" />
          <line x1="80" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case 'not':
      return (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 20L75 50L25 80V20Z" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="82" cy="50" r="7" stroke="currentColor" strokeWidth="3" fill="none" />
          <line x1="10" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="3" />
          <line x1="89" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case 'nand':
      return (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 20H50C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80H25V20Z" 
                stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="87" cy="50" r="7" stroke="currentColor" strokeWidth="3" fill="none" />
          <line x1="10" y1="35" x2="25" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="10" y1="65" x2="25" y2="65" stroke="currentColor" strokeWidth="3" />
          <line x1="80" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="3" />
          <line x1="94" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case 'nor':
      return (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 20C40 20 80 20 80 50C80 80 40 80 25 80C40 65 40 35 25 20Z" 
                stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="87" cy="50" r="7" stroke="currentColor" strokeWidth="3" fill="none" />
          <line x1="10" y1="35" x2="25" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="10" y1="65" x2="25" y2="65" stroke="currentColor" strokeWidth="3" />
          <line x1="94" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case 'xor':
      return (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 20C40 20 80 20 80 50C80 80 40 80 25 80C40 65 40 35 25 20Z" 
                stroke="currentColor" strokeWidth="3" fill="none" />
          <path d="M15 20C30 35 30 65 15 80" stroke="currentColor" strokeWidth="3" fill="none" />
          <line x1="10" y1="35" x2="25" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="10" y1="65" x2="25" y2="65" stroke="currentColor" strokeWidth="3" />
          <line x1="80" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case 'xnor':
      return (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 20C40 20 80 20 80 50C80 80 40 80 25 80C40 65 40 35 25 20Z" 
                stroke="currentColor" strokeWidth="3" fill="none" />
          <path d="M15 20C30 35 30 65 15 80" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="87" cy="50" r="7" stroke="currentColor" strokeWidth="3" fill="none" />
          <line x1="10" y1="35" x2="25" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="10" y1="65" x2="25" y2="65" stroke="currentColor" strokeWidth="3" />
          <line x1="94" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    default:
      return null;
  }
};

const calculateOutput = (gateType: BooleanGateType, inputs: boolean[]): boolean => {
  switch (gateType) {
    case 'and':
      return inputs[0] && inputs[1];
    case 'or':
      return inputs[0] || inputs[1];
    case 'not':
      return !inputs[0];
    case 'nand':
      return !(inputs[0] && inputs[1]);
    case 'nor':
      return !(inputs[0] || inputs[1]);
    case 'xor':
      return inputs[0] !== inputs[1];
    case 'xnor':
      return inputs[0] === inputs[1];
    default:
      return false;
  }
};


export function GateName({ type }: { type: BooleanGateType }) {
  return (
      <span className='font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 rounded-md px-2 py-1 font-mono mr-2 uppercase'>
          { type }
      </span>
  )
}

interface TruthTableProps {
  gateType: BooleanGateType;
  className?: string;
}

export const TruthTable: React.FC<TruthTableProps> = ({ gateType, className }) => {
  const isSingleInput = gateType === 'not';

  const renderTruthTable = () => {
    if (isSingleInput) {
      return (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-zinc-200 dark:border-zinc-700 p-2">Input (A)</th>
              <th className="border border-zinc-200 dark:border-zinc-700 p-2">Output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">0</td>
              <td className={clsx("border border-zinc-200 dark:border-zinc-700 p-2 text-center", 
                calculateOutput(gateType, [false]) ? "bg-binary-true/20" : "bg-binary-false/20")}>
                {calculateOutput(gateType, [false]) ? '1' : '0'}
              </td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">1</td>
              <td className={clsx("border border-zinc-200 dark:border-zinc-700 p-2 text-center", 
                calculateOutput(gateType, [true]) ? "bg-binary-true/20" : "bg-binary-false/20")}>
                {calculateOutput(gateType, [true]) ? '1' : '0'}
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="w-full">
          <thead>
            <tr className="bg-muted">
              <th className="border border-zinc-200 dark:border-zinc-700 p-2">Input (A)</th>
              <th className="border border-zinc-200 dark:border-zinc-700 p-2">Input (B)</th>
              <th className="border border-zinc-200 dark:border-zinc-700 p-2">Output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">0</td>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">0</td>
              <td className={clsx("border border-zinc-200 dark:border-zinc-700 p-2 text-center", 
                calculateOutput(gateType, [false, false]) ? "bg-binary-true/20" : "bg-binary-false/20")}>
                {calculateOutput(gateType, [false, false]) ? '1' : '0'}
              </td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">0</td>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">1</td>
              <td className={clsx("border border-zinc-200 dark:border-zinc-700 p-2 text-center", 
                calculateOutput(gateType, [false, true]) ? "bg-binary-true/20" : "bg-binary-false/20")}>
                {calculateOutput(gateType, [false, true]) ? '1' : '0'}
              </td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">1</td>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">0</td>
              <td className={clsx("border border-zinc-200 dark:border-zinc-700 p-2 text-center", 
                calculateOutput(gateType, [true, false]) ? "bg-binary-true/20" : "bg-binary-false/20")}>
                {calculateOutput(gateType, [true, false]) ? '1' : '0'}
              </td>
            </tr>
            <tr>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">1</td>
              <td className="border border-zinc-200 dark:border-zinc-700 p-2 text-center">1</td>
              <td className={clsx("border border-zinc-200 dark:border-zinc-700 p-2 text-center", 
                calculateOutput(gateType, [true, true]) ? "bg-binary-true/20" : "bg-binary-false/20")}>
                {calculateOutput(gateType, [true, true]) ? '1' : '0'}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className={clsx("rounded-lg", className)}>
      {renderTruthTable()}
    </div>
  );
};
