export type Matrix = number[][]

export interface GaussianSolution {
  augmented: number[][]
  diagonalized: number[][]
  substituted: number[][]
  extracted: number[]
}

// First step is to make the augmented matrix, which creates a 
// deep copy of the source matrix and appends the vector b as the last column
function makeAugmentedMatrix(A: Matrix, b: number[]) {
  return A.map((row, i) => row.concat([b[i]]))
}

// For deep copying the matrix in later steps
function deepCopy(A: Matrix) {
  return A.map(row => row.slice())
}

// Second step is to diagonalize the matrix and return a new diagonalized matrix
export function diagonalize(M: Matrix): Matrix {
  M = deepCopy(M)
  const m = M.length;
  const n = M[0].length;

  for(let k = 0 ; k < Math.min(m, n) ; k++) {
    // Find the k-th pivot
    const i_max = findPivot(M, k)
    if (M[i_max][k] == 0)
      throw new Error("Matrix is singular")

    swap_rows(M, k, i_max)
    // Do for all rows below pivot
    for(let i = k + 1 ; i < m ; i++) {
      // Do for all remaining elements in current row:
      const c = M[i][k] / M[k][k]
      for(let j = k + 1 ; j < n ; j++) {
        M[i][j] = M[i][j] - M[k][j] * c;
      }
      // Fill lower triangular matrix with zeros
      M[i][k] = 0
    }
  }
  return M
}

// This function finds the pivot, which is the largest element in the column
function findPivot(M: Matrix, k: number ) {
  let i_max = k;
  for(let i = k + 1 ; i < M.length ; i++) {
    if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
      i_max = i;
    }
  }
  return i_max;
}

// This function swaps the rows of the matrix
function swap_rows(A: Matrix, i_max: number, k: number) {
  if (i_max != k) {
    const temp = A[i_max];
    A[i_max] = A[k];
    A[k] = temp;
  }
}

// Third step is to substitute the values
function substitute(M: Matrix) {
  M = deepCopy(M)
  const m = M.length;
  for (let i = m - 1 ; i >= 0 ; i--) {
    const x = M[i][m] / M[i][i]

    for (let j = i - 1 ; j >= 0 ; j--) {
      M[j][m] -= x * M[j][i]
      M[j][i] = 0
    }
    M[i][m] = x
    M[i][i] = 1
  }
  return M
}

// Fourth step is to extract the solution
function extractX(M: Matrix) {
  const x = []
  const m = M.length
  const n = M[0].length
  for (let i = 0 ; i < m ; i++) {
    x.push( M[i][n - 1] )
  }
  return x
}

// This function solves the system of linear equations using Gaussian elimination
export function gaussianSolver(A: Matrix, b: number[]) {
  const augmented = makeAugmentedMatrix(A, b)
  const diagonalized = diagonalize(augmented)
  const substituted = substitute(diagonalized)
  const extracted = extractX(substituted)

  return {
    augmented,
    diagonalized,
    substituted,
    extracted
  }
}

// // sample from: http://mathworld.wolfram.com/GaussianElimination.html

// A = [
//   [9,3,4],
//   [4,3,4],
//   [1,1,1]
// ]

// b = [7,8,3]

// print(A, " A ");
// print(b, " b ");

// var x = solve(A, b);

// print(x, " x ");