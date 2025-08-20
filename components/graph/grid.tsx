'use client'

import clsx from "clsx";
import { useRef, useState } from "react"

import djikstra from "./shortest/djikstras"
import aStar from "./shortest/a-star"
import bfs from "./shortest/bfs"
import dfs from "./shortest/dfs"
import { ShortestPathAlgorithm } from "./shortest/types"
import { cellEqual } from "./shortest/util";
interface GridGraphProps {
  width?: number
  height?: number
  size?: number
  start?: Cell
  goal?: Cell
  algorithm?: Algorithm
  speed?: number
}

type Cell = [ number, number ]
type Algorithm = 'djikstra' | 'a-star' | 'bfs' | 'dfs'

function getAlgorithm(algorithm: Algorithm): ShortestPathAlgorithm {
  switch (algorithm) {
    case 'djikstra':
      return djikstra
    case 'a-star':
      return aStar
    case 'bfs':
      return bfs
    case 'dfs':
      return dfs
  }
  throw new Error(`Unknown algorithm: ${algorithm}`)
}

export function GridGraph({ 
  width = 30, height = 20, 
  start = [0, 0], 
  size = 20,
  goal = [width - 1, height - 1],
  algorithm = 'a-star',
  speed = 20
}: GridGraphProps) {

  const shortestPath = getAlgorithm(algorithm)

  const [grid, setGrid] = useState<boolean[][]>(
    new Array(width).fill(0).map(() => new Array(height).fill(false))
  );

  const [visitedGrid, setVisitedGrid] = useState<boolean[][]>(
    new Array(width).fill(0).map(() => new Array(height).fill(false))
  );

  const [bestPath, setBestPath] = useState<Cell[]>([])

  function runAlgorithm() {
    const { bestPath, visitedOrder } = shortestPath.run(start, goal, grid)

    const animation = setInterval(() => {
      if (visitedOrder.length > 0) {
        const next = visitedOrder.shift()!
        visitedGrid[next[0]][next[1]] = true
        setVisitedGrid([ ...visitedGrid ])
      }
      else {
        setBestPath(bestPath)
        clearInterval(animation)
      }
    }, speed)
    return () => clearInterval(animation)
  }

  function toggleCell(col: number, row: number) {
    grid[col][row] = !grid[col][row]
    setGrid([ ...grid ])
  }

  return (<>
    <div className="flex gap-2 justify-center">
      <button onClick={() => runAlgorithm()}>Run</button>


    </div>
    <div className="text-center">
      <div className={clsx("inline-flex overflow-auto border-4 border-zinc-300 dark:border-zinc-600 rounded-lg")}>
        { grid.map((column, col) => (
          <div key={'col' + col} className="flex flex-col">
            { column.map((cell, row) => {
              const color = 
                cellEqual(start, [col, row]) ? 'bg-green-500' : (
                cellEqual(goal, [col, row]) ? 'bg-red-500' : (
                  (visitedGrid[col][row] && !cell) ? 'bg-blue-500' : (
                    cell ? 'bg-zinc-400 dark:bg-zinc-900' : 'bg-zinc-300 dark:bg-zinc-700'
                  )
                )
              )

              return(
              <div key={'row' + row} 
                className={clsx(
                  "w-4 h-4 border dark:border-gray-600", 
                  color)}
                onClick={() => toggleCell(col, row) }>
                </div>
              )
            }) }
          </div>
        )) } 
      </div>
    </div>
  </>)
}