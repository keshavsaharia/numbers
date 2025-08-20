import { Matrix2D } from "./matrix-math"

export function MatrixMultiplication({ matrix1, matrix2 }: { matrix1: Matrix2D, matrix2: Matrix2D }) {
  const result = {
    a: matrix1.a * matrix2.a + matrix1.b * matrix2.c,
    b: matrix1.a * matrix2.b + matrix1.b * matrix2.d,
    c: matrix1.c * matrix2.a + matrix1.d * matrix2.c,
    d: matrix1.c * matrix2.b + matrix1.d * matrix2.d,
  }
  return result
}