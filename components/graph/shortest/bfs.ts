import { ShortestPathAlgorithm } from "./types"
import { Cell } from "./types"
import { getNeighbors, cellEqual } from "./util" 

export default {
  name: 'BFS',
  description: 'Breadth-First Search is a graph search algorithm that explores all the nodes at the present depth prior to moving on to the nodes at the next depth level.',
  run(start: Cell, goal: Cell, grid: boolean[][]): { bestPath: Cell[], visitedOrder: Cell[] } {
    const bestPath: Cell[] = []
    const queue: Cell[] = [start]
    const visitedOrder: Cell[] = []
  
    const visited = new Set<string>()
    const previous = new Map<string, string>()
  
    while (queue.length > 0) {
      const current = queue.shift()!
      visitedOrder.push(current)
      if (current === goal) {
        break
      }
  
      const neighbors = getNeighbors(current, grid)
      for (const neighbor of neighbors) {
        const neighborKey = neighbor.toString()
        if (visited.has(neighborKey)) {
          continue
        }
  
        visited.add(neighborKey)
        visitedOrder.push(neighbor)
        queue.push(neighbor)
        previous.set(neighborKey, current.toString())
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
