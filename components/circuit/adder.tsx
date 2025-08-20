'use client'

import React, { useState } from 'react';
import clsx from 'clsx';
import { Interactive } from '../number/interactive';

interface AdderCircuitProps {
  type: 'half' | 'full';
  className?: string;
}

export const AdderCircuit: React.FC<AdderCircuitProps> = ({ type = 'half', className }) => {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [inputCin, setInputCin] = useState(false);
  
  // Half adder logic
  const calculateHalfAdder = (a: boolean, b: boolean) => {
    const sum = a !== b;  // XOR operation
    const carry = a && b; // AND operation
    return { sum, carry };
  };
  
  // Full adder logic
  const calculateFullAdder = (a: boolean, b: boolean, cin: boolean) => {
    const halfAdder1 = calculateHalfAdder(a, b);
    const halfAdder2 = calculateHalfAdder(halfAdder1.sum, cin);
    const carry = halfAdder1.carry || halfAdder2.carry; // OR operation
    const sum = halfAdder2.sum;
    return { sum, carry };
  };
  
  const result = type === 'half' 
    ? calculateHalfAdder(inputA, inputB)
    : calculateFullAdder(inputA, inputB, inputCin);

  return (
    <Interactive instructions={`Click the inputs to change the ${ type } adder circuit.`}>
      
    <div className="flex flex-col md:flex-row justify-center items-center mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="font-mono mb-1">Input A</span>
          <button
            onClick={() => setInputA(!inputA)}
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center border",
              inputA ? "bg-green-500 border-green-600 text-white" : "bg-red-500 border-red-600 text-white"
            )}
          >
            {inputA ? "1" : "0"}
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="font-mono mb-1">Input B</span>
          <button
            onClick={() => setInputB(!inputB)}
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center",
              inputB ? "bg-green-500 text-white" : "bg-binary-false text-white"
            )}
          >
            {inputB ? "1" : "0"}
          </button>
        </div>
        
        {type === 'full' && (
          <div className="flex flex-col items-center">
            <span className="mb-1">Carry In</span>
            <button
              onClick={() => setInputCin(!inputCin)}
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                inputCin ? "bg-binary-true text-white" : "bg-binary-false text-white"
              )}
            >
              {inputCin ? "1" : "0"}
            </button>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="mb-1">Sum</span>
          <div
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center",
              result.sum ? "bg-binary-true text-white" : "bg-binary-false text-white"
            )}
          >
            {result.sum ? "1" : "0"}
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="mb-1">Carry Out</span>
          <div
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center",
              result.carry ? "bg-binary-true text-white" : "bg-binary-false text-white"
            )}
          >
            {result.carry ? "1" : "0"}
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-4">
      {type === 'half' ? (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm">
            The Half Adder uses an XOR gate to calculate the sum and an AND gate to calculate the carry.
          </p>
          <pre className="mt-2 bg-background p-2 rounded text-sm">
            Sum = A ⊕ B (XOR)<br />
            Carry = A · B (AND)
          </pre>
        </div>
      ) : (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm">
            The Full Adder extends the Half Adder to include a carry input. It uses two half adders and an OR gate.
          </p>
          <pre className="mt-2 bg-background p-2 rounded text-sm">
            Sum = A ⊕ B ⊕ Cin (XOR)<br />
            Carry = (A · B) + (Cin · (A ⊕ B))
          </pre>
        </div>
      )}
    </div>
  </Interactive>);
};
