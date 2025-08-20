import { Cell, ShortestPathHeuristic } from "./types"
import { getNeighbors, cellEqual } from "./util"
import { ShortestPathAlgorithm } from "./types"

const manhattanDistance: ShortestPathHeuristic = {
  id: 'manhattan-distance',
  calculate: (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]),
  name: 'Manhattan Distance',
  description: 'The Manhattan Distance is the sum of the absolute differences of the coordinates.',
  weight: 0.5
}

const euclideanDistance: ShortestPathHeuristic = {
  id: 'euclidean-distance',
  calculate: (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2)),
  name: 'Euclidean Distance',
  description: 'The Euclidean Distance is the square root of the sum of the squared differences of the coordinates.',
}


export default {
  name: 'A*',
  description: 'A* is a graph search algorithm that finds the shortest path between two nodes in a graph.',
  run(start: Cell, goal: Cell, grid: boolean[][], heuristic = manhattanDistance): { bestPath: Cell[], visitedOrder: Cell[] } {
    const bestPath: Cell[] = []
    let queue: Cell[] = [start]
    const visited = new Set<string>()
    const visitedOrder: Cell[] = []
    const distances = new Map<string, number>()
    const previous = new Map<string, string>()
  distances.set(start.toString(), 0)

  while (queue.length > 0) {
    const current = queue.shift()!
    visitedOrder.push(current)

    if (cellEqual(current, goal)) {
      break
    }

    // Add neighbors to queue
    const neighbors = getNeighbors(current, grid)
    for (const neighbor of neighbors) {
      const neighborKey = neighbor.toString()
      if (visited.has(neighborKey)) {
        continue
      }
      visited.add(neighborKey)
      queue.push(neighbor)
      previous.set(neighborKey, current.toString())
      distances.set(neighborKey, distances.get(current.toString())! + 1 + heuristic.calculate(neighbor, goal))
    }
    

    // Very inefficient way to order the queue, should use a min heap
    queue = queue.sort((a, b) => {
      const distanceA = distances.get(a.toString()) ?? Infinity + heuristic.calculate(a, goal)
      const distanceB = distances.get(b.toString()) ?? Infinity + heuristic.calculate(b, goal)
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