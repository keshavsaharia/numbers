import { ShortestPathAlgorithm } from "./types"
import { Cell } from "./types"
import { getNeighbors, cellEqual } from "./util"

export default {
  name: 'Djikstra\'s',
  description: 'Djikstra\'s algorithm is a graph search algorithm that finds the shortest path between two nodes in a graph.',
  
  
  run(start: Cell, goal: Cell, grid: boolean[][]): { bestPath: Cell[], visitedOrder: Cell[] } {
    console.log('djikstra')
    const bestPath: Cell[] = []
    let queue: Cell[] = [start]
    const visitedOrder: Cell[] = []

    const visited = new Set<string>()
    const distances = new Map<string, number>()
    const previous = new Map<string, string>()
    distances.set(start.join(','), 0)

    while (queue.length > 0) {
      const current = queue.shift()!
      const currentKey = current.join(',')
      visitedOrder.push(current)

      if (cellEqual(current, goal)) {
        break
      }

      // Add neighbors to queue
      const neighbors = getNeighbors(current, grid)
      for (const neighbor of neighbors) {
        const neighborKey = neighbor.join(',')
        if (visited.has(neighborKey)) {
          continue
        }
        
        visited.add(neighborKey)
        queue.push(neighbor)
        distances.set(neighborKey, (distances.get(currentKey) ?? 0) + 1)
        previous.set(neighborKey, currentKey)
      }

      // Very inefficient way to order the queue, should use a min heap
      queue.sort((a, b) => {
        const distanceA = distances.get(a.join(','))!
        const distanceB = distances.get(b.join(','))!
        return distanceA - distanceB
      })
    }

    let current = goal
    while (! cellEqual(current, start) && visited.has(current.toString())) {
      bestPath.push(current)
      current = previous.get(current.toString())!.split(',').map(Number) as Cell
    }
    return { bestPath, visitedOrder }
  }

} satisfies ShortestPathAlgorithm