import { Cell, ShortestPathAlgorithm } from "./types"
import { getNeighbors, cellEqual } from "./util"

export default {
  name: 'DFS',
  description: 'Depth-First Search is a graph search algorithm that explores as far as possible along each branch before backtracking.',
  
  run(start: Cell, goal: Cell, grid: boolean[][]): { bestPath: Cell[], visitedOrder: Cell[] } {
    const bestPath: Cell[] = []
    const queue: Cell[] = [start]
    const visited = new Set<string>()
    const distances = new Map<string, number>()
    const previous = new Map<string, string>()
    distances.set(start.toString(), 0)
    const visitedOrder: Cell[] = []
    while (queue.length > 0) {
      const current = queue.pop()!
      visitedOrder.push(current)
      if (current === goal) {
        break
      }
      const neighbors = getNeighbors(current, grid)
      for (const neighbor of neighbors) {
        if (visited.has(neighbor.toString())) {
          continue
        }
        visited.add(neighbor.toString())
        queue.push(neighbor)
        distances.set(neighbor.toString(), distances.get(current.toString())! + 1)
        previous.set(neighbor.toString(), current.toString())
      }
    }

    let current = goal
    while (! cellEqual(current, start) && visited.has(current.toString())) {
      bestPath.push(current)
      current = previous.get(current.toString())!.split(',').map(Number) as Cell
    }
    return { bestPath, visitedOrder } 
  }
} satisfies ShortestPathAlgorithm