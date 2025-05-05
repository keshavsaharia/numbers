export type Cell = [number, number]


export interface ShortestPathAlgorithm {
  name: string
  description: string
  run: (start: Cell, goal: Cell, grid: boolean[][], heuristic?: ShortestPathHeuristic) => { 
    bestPath: Cell[]
    visitedOrder: Cell[]
  }
}

export type ShortestPathHeuristic = {
  id: string
  calculate: (a: Cell, b: Cell) => number
  name: string
  description: string
  weight?: number
}