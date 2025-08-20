'use client'

import { useState } from 'react';
import clsx from 'clsx';
import { Interactive } from '../number/interactive';

interface KarnaughMapProps {
  variables?: number;
  className?: string;
}

interface Group {
  size: number;
  cells: [number, number][];
}

export const KarnaughMap: React.FC<KarnaughMapProps> = ({ variables = 2, className }) => {
  const [cells, setCells] = useState<boolean[][]>(Array(variables).fill(0).map(() => Array(variables).fill(false)));
  const [simplified, setSimplified] = useState<string>("");
  
  const toggleCell = (row: number, col: number) => {
    const newCells = [...cells];
    newCells[row][col] = !newCells[row][col];
    setCells(newCells);
    setSimplified(simplifyLogic(newCells, variables));
  };

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


const simplifyLogic = (cells: boolean[][], variables: number): string => {
  const numRows = cells.length;
  const numCols = cells[0].length;

  // Handle special cases
  const totalCells = numRows * numCols;
  const trueCellCount = cells.flat().filter(cell => cell).length;
  if (trueCellCount === 0) return "0";
  if (trueCellCount === totalCells) return "1";

  // Find groups of adjacent 1s (powers of 2: 1, 2, 4, 8)
  const groups = findGroups(cells);
  
  // Convert groups to boolean expressions
  const terms = groups.map(group => groupToExpression(group, numRows, numCols, variables));
  
  return terms.join(' + ');
};

// Helper function to find groups of adjacent 1s
const findGroups = (cells: boolean[][]): Group[] => {
  const numRows = cells.length;
  const numCols = cells[0].length;
  const groups: Group[] = [];
  
  // Check for groups of different sizes (1, 2, 4, 8)
  const groupSizes = [1, 2, 4, 8].filter(size => size <= numRows * numCols);
  
  // Track cells that have been covered by groups
  const covered = Array(numRows).fill(0).map(() => Array(numCols).fill(false));
  
  // Start with largest groups
  for (const size of groupSizes.sort((a, b) => b - a)) {
    // Look for groups of the current size
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        // Check if this cell can be the top-left corner of a group
        const group = checkGroup(cells, covered, r, c, size, numRows, numCols);
        if (group) {
          groups.push(group);
          // Mark cells in this group as covered
          for (const [gr, gc] of group.cells) {
            covered[gr][gc] = true;
          }
        }
      }
    }
  }
  
  // Add any remaining uncovered 1s as individual cells
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (cells[r][c] && !covered[r][c]) {
        groups.push({
          size: 1,
          cells: [[r, c] as [number, number]]
        });
      }
    }
  }
  
  return groups;
};

// Check if a valid group can be formed starting at (r,c)
const checkGroup = (
  cells: boolean[][],
  covered: boolean[][],
  r: number,
  c: number,
  size: number,
  numRows: number,
  numCols: number
): Group | null => {
  // For simplicity, only handle rectangular groups
  // In a real K-map implementation, we would need to handle wrapping around edges
  
  // Determine dimensions of the group
  let width, height;
  if (size === 1) {
    width = height = 1;
  } else if (size === 2) {
    // 2x1 or 1x2
    width = numCols > 1 ? 2 : 1;
    height = width === 2 ? 1 : 2;
  } else if (size === 4) {
    // 2x2 or 4x1 or 1x4
    if (numRows >= 2 && numCols >= 2) {
      width = height = 2;
    } else if (numCols >= 4) {
      width = 4;
      height = 1;
    } else {
      width = 1;
      height = 4;
    }
  } else if (size === 8) {
    // 4x2 or 2x4
    width = numCols >= 4 ? 4 : 2;
    height = width === 4 ? 2 : 4;
  }
  
  // Check if the group fits within the grid
  if (r + height! > numRows || c + width! > numCols) {
    return null;
  }
  
  // Check if all cells in the group are 1s
  const groupCells: [number, number][] = [];
  for (let i = 0; i < height!; i++) {
    for (let j = 0; j < width!; j++) {
      if (!cells[r + i][c + j]) {
        return null;
      }
      groupCells.push([r + i, c + j] as [number, number]);
    }
  }
  
  return {
    size,
    cells: groupCells
  };
};

// Convert a group to a boolean expression
const groupToExpression = (group: Group, numRows: number, numCols: number, variables: number): string => {
  // For a group, we only include variables that don't change within the group
  
  // Determine which variables are constant across the group
  const varValues = new Map();
  
  // Initialize all variables as potentially constant
  for (let i = 0; i < variables; i++) {
    varValues.set(i, null); // null means not yet determined
  }
  
  // For each cell in the group
  for (const [r, c] of group.cells) {
    // Convert row and column to binary
    const rowBits = r.toString(2).padStart(Math.log2(numRows), '0');
    const colBits = c.toString(2).padStart(Math.log2(numCols), '0');
    const bits = rowBits + colBits;
    
    // Check each variable
    for (let i = 0; i < bits.length; i++) {
      const bit = bits[i] === '1';
      
      if (varValues.get(i) === null) {
        // First cell, set the initial value
        varValues.set(i, bit);
      } else if (varValues.get(i) !== bit) {
        // This variable changes within the group, so it's not constant
        varValues.set(i, undefined);
      }
    }
  }
  
  // Build the expression using only constant variables
  const terms: string[] = [];
  varValues.forEach((value, i) => {
    if (value !== undefined) { // Only include constant variables
      const varName = String.fromCharCode(65 + i); // A, B, C, ...
      terms.push(value ? varName : `¬${varName}`);
    }
  });
  
  return terms.length > 0 ? terms.join(' · ') : "1";
};