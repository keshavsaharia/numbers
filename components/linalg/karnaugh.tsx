'use client'

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Interactive } from '../number/interactive';
import { Karnaugh } from './karnaugh-map';

interface KarnaughMapProps {
  variables?: number;
  className?: string;
}

interface Group {
  size: number;
  cells: [number, number][];
}

const variableNames = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const KarnaughMap: React.FC<KarnaughMapProps> = ({ variables = 2, className }) => {
  const [cells, setCells] = useState<boolean[][]>(
    Array(variables).fill(0).map(() => Array(variables).fill(false)));
  const [simplified, setSimplified] = useState<string>("");

  const [ vars, setVars ] = useState<string[]>(variableNames.slice(0, variables));
  const karnaugh = useMemo(() => new Karnaugh(
    [], [], [], 
    vars.length, vars, "f"
  ), [ vars ]);

  const k = new Karnaugh(
    [0, 1, 2, 3],
    [],
    [],
    2,
    ["A", "B"],
    "F"
  );
  const toggleCell = (row: number, col: number) => {
    const newCells = [...cells];
    newCells[row][col] = !newCells[row][col];
    setCells(newCells);
  };

  function addVariable() {
    setVars([...vars, variableNames[vars.length]]);
  }

  function removeVariable() {
    setVars(vars.slice(0, -1));
  }

  return (
    <Interactive instructions={<>Click on the cells in the Karnaugh map to toggle their values between 0 and 1.
          The simplified Boolean expression will update accordingly.</>}>
    <div className={clsx("p-2", className)}>
      
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-1">
          <div className="absolute -left-6 top-10 -rotate-90">B</div>
          <div className="absolute -top-6 left-10">A</div>
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="w-6 h-6"></th>
                { new Array(variables).fill(0).map((_, v) => (
                  <th key={v} className="w-12 h-6 text-center">{ v }</th>
                ))}
              </tr>
            </thead>
            <tbody>
            { new Array(variables).fill(0).map((_, row) => (
              <tr key={row}>
                <td className="h-12 text-center">{ row }</td>
                { new Array(variables).fill(0).map((_, col) => (
                  <td 
                    key={col}
                    className={clsx(
                      "w-12 h-12 border border-border text-center cursor-pointer transition-colors",
                      cells[row][col] ? "bg-binary-true/20" : "bg-binary-false/20"
                    )}
                    onClick={() => toggleCell(row, col)}
                  >
                    {cells[row][col] ? "1" : "0"}
                  </td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">Simplified Boolean Expression</h4>
        <div className="bg-background p-3 rounded text-center">
          <span className="text-lg">{simplified}</span>
        </div>
        <p className="text-sm mt-3 text-muted-foreground">
        </p>
      </div>
    </div>
  </Interactive>);
};