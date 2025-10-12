export function createMatrix2D(width: number, height: number): number[][] {
  const matrix = new Array(width);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(height).fill(0);
  }
  return matrix;
}