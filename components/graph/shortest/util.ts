import { Cell } from "./types"

export function cellEqual(a: Cell, b: Cell) {
  return a[0] === b[0] && a[1] === b[1]
}

export function getNeighbors([row, col]: Cell, grid: boolean[][]): Cell[] {
  const neighbors: Cell[] = []

  if (col > 0 && !grid[col - 1][row]) neighbors.push([row, col - 1])
  if (col < grid.length - 1 && !grid[col + 1][row]) neighbors.push([row, col + 1])
  if (row > 0 && !grid[col][row - 1]) neighbors.push([row - 1, col])
  if (row < grid[0].length - 1 && !grid[col][row + 1]) neighbors.push([row + 1, col])
  return neighbors
}
