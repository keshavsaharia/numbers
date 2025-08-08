import { eigs, matrix, multiply, add, subtract } from 'mathjs';

export interface Vector2D {
  x: number;
  y: number;
}

export interface Matrix2D {
  a: number; // Top-left
  b: number; // Top-right  
  c: number; // Bottom-left
  d: number; // Bottom-right
}

export interface EigenResult {
  eigenvalues: number[];
  eigenvectors: Vector2D[];
}

export function createMatrix(a: number, b: number, c: number, d: number): Matrix2D {
  return { a, b, c, d };
}

export function transformVector(matrix: Matrix2D, vector: Vector2D): Vector2D {
  return {
    x: matrix.a * vector.x + matrix.b * vector.y,
    y: matrix.c * vector.x + matrix.d * vector.y
  };
}

export function calculateEigenvaluesAndVectors(matrix: Matrix2D): EigenResult | null {
  try {
    const mathMatrix = [
      [matrix.a, matrix.b],
      [matrix.c, matrix.d]
    ];
    
    const result = eigs(mathMatrix);
    
    // Extract real eigenvalues and eigenvectors
    const eigenvalues: number[] = [];
    const eigenvectors: Vector2D[] = [];
    
    if (result.eigenvectors && Array.isArray(result.eigenvectors)) {
      for (let i = 0; i < result.eigenvectors.length; i++) {
        const eigenItem = result.eigenvectors[i];
        const eigenvalue = eigenItem.value;
        const eigenvector = eigenItem.vector;
        
        // Only process real eigenvalues
        if (typeof eigenvalue === 'number' && Array.isArray(eigenvector)) {
          eigenvalues.push(eigenvalue);
          eigenvectors.push({
            x: typeof eigenvector[0] === 'number' ? eigenvector[0] : 0,
            y: typeof eigenvector[1] === 'number' ? eigenvector[1] : 0
          });
        }
      }
    }
    
    return { eigenvalues, eigenvectors };
  } catch (error) {
    console.warn('Could not calculate eigenvalues/eigenvectors:', error);
    return null;
  }
}

export function normalizeVector(vector: Vector2D): Vector2D {
  const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  if (magnitude === 0) return { x: 0, y: 0 };
  return { x: vector.x / magnitude, y: vector.y / magnitude };
}

export function scaleVector(vector: Vector2D, scale: number): Vector2D {
  return { x: vector.x * scale, y: vector.y * scale };
}

// Predefined interesting matrices
export const PRESET_MATRICES = {
  identity: createMatrix(1, 0, 0, 1),
  scale: createMatrix(2, 0, 0, 0.5),
  rotation: createMatrix(Math.cos(Math.PI/6), -Math.sin(Math.PI/6), Math.sin(Math.PI/6), Math.cos(Math.PI/6)),
  reflection: createMatrix(1, 0, 0, -1),
  shear: createMatrix(1, 0.5, 0, 1),
  diagonal: createMatrix(2, 0, 0, 3)
};