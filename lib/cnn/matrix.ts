export class Matrix {

  static create2D(width: number, height: number): number[][] {
    const matrix = new Array(width);
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(height).fill(0);
    }
    return matrix;
  }

  static create3D(width: number, height: number, depth: number): number[][][] {
    const matrix = new Array(width);
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(height);
      for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = new Array(depth).fill(0);
      }
    }
    return matrix;
  }
	
	/**
	 * @exercise
	 * @id range
	 * @type implement_method
	 * @desc Create an integer array of the given `size` where each element is the same as its index in the array (e.g. `range(4)` produces `{ 0, 1, 2, 3 }`).  
	 * @param size - the length of the array
	 * @return a new array where each element is the same as its index
	 */
	public static range(size: number) {
		const r = new Array(size);
		for (let i = 0 ; i < r.length ; i++) {
			r[i] = i;
		}
		return r;
	}
	
	/**
	 * @lesson
	 * @id fischer_yates
	 * Fischer-Yates shuffle
	 * @param array
	 * @return
	 */
	public static shuffle(array: number[]): number[] {
		for (let i = array.length - 1 ; i > 0 ; i--) {
			const j = (Math.random() * (i + 1));

			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	
	/**
	 * @exercise
	 * @id copy
	 * @type implement_method
	 * @desc Create a range of 
	 * @param size - the length of the array
	 * @return
	 */
	public static copy(matrix: number[][]): number[][] {
		const copy = new Array(matrix.length);
		for (let i = 0; i < copy.length; i++) {
			copy[i] = new Array(matrix[i].length);
			for (let j = 0; j < copy[i].length; j++) {
				copy[i][j] = matrix[i][j];
			}
		}
		
		return copy;
	}
	
	public static oneMinus(matrix: number[][]): number[][] {
		for (let x = 0 ; x < matrix.length ; x++) {
			for (let y = 0 ; y < matrix[0].length ; y++) {
				matrix[x][y] = 1 - matrix[x][y];
			}
		}
		return matrix;
	}
	
	public static randomize(matrix: number[][]): number[][] {
		return Matrix.randomizeBetween(matrix, 0, 1);
	}
	
	public static randomizeBetween(matrix: number[][], min: number, max: number): number[][] {
		const range = max - min;
		for (let x = 0 ; x < matrix.length ; x++) {
			for (let y = 0 ; y < matrix[0].length ; y++) {
				matrix[x][y] = Math.random() * range + min;
			}
		}
		return matrix;
	}

  public static addMatrix(matrixa: number[][], matrixb: number[][]): number[][] {
		for (let x = 0 ; x < matrixa.length ; x++) {
			for (let y = 0 ; y < matrixa[0].length ; y++) {
				matrixa[x][y] += matrixb[x][y];
			}
		}
		return matrixa;
	}
	
	public static addScalar(matrix: number[][], value: number): number[][] {
		for (let i = 0 ; i < matrix.length ; i++) {
			for (let j = 0 ; j < matrix[0].length ; j++) {
				matrix[i][j] += value;
			}
		}
		return matrix;
	}
	
	public static rotate180(matrix: number[][]): number[][] {
		matrix = Matrix.copy(matrix);
		const width = matrix.length;
		const height = matrix[0].length;
		
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height / 2; y++) {
				const temp = matrix[x][y];
				matrix[x][y] = matrix[x][height - y - 1];
				matrix[x][height - y - 1] = temp;
			}
		}
		
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width / 2; x++) {
				const temp = matrix[x][y];
				matrix[x][y] = matrix[width - x - 1][y];
				matrix[width - x - 1][y] = temp;
			}
		}
		
		return matrix;
	}
	
	public static multiplyScalar(matrix: number[][], value: number): number[][] {
		for (let i = 0 ; i < matrix.length ; i++) {
			for (let j = 0 ; j < matrix[0].length ; j++) {
				matrix[i][j] = matrix[i][j] * value;
			}
		}
		return matrix;
	}
	
	public static multiplyMatrix(matrixa: number[][], matrixb: number[][]): number[][] {
		for (let x = 0 ; x < matrixa.length ; x++) {
			for (let y = 0 ; y < matrixa[0].length ; y++) {
				matrixa[x][y] = matrixa[x][y] * matrixb[x][y];
			}
		}
		return matrixa;
	}
	
	public static sigmoid(matrix: number[][]): number[][] {
		for (let i = 0 ; i < matrix.length ; i++) {
			for (let j = 0 ; j < matrix[0].length ; j++) {
				matrix[i][j] = Matrix.sigmoidValue(matrix[i][j]);
			}
		}
		return matrix;
	}
	
	public static sigmoidValue(value: number): number {
		return 1 / (1 + Math.pow(Math.E, -value));
	}
	
	public static scale(matrix: number[][], scale: number): number[][] {
		const width = matrix.length;
		const height = matrix[0].length;
		const outputWidth = width / scale;
		const outputHeight = height / scale;
		const outMatrix = Matrix.create2D(outputWidth, outputHeight);
		
		if (outputWidth * scale != width || outputHeight * scale != height) {
			throw new Error("Matrix size doesn't match.");
		}
		
		const size = scale * scale;
		
		for (let x = 0; x < outputWidth; x++) {
			for (let y = 0; y < outputHeight; y++) {
				let sum = 0.0;
				for (let i = x * scale; i < (x + 1) * scale; i++) {
					for (let j = y * scale ; j < (y + 1) * scale; j++) {
						sum += matrix[i][j];
					}
				}
				outMatrix[x][y] = sum / size;
			}
		}
		return outMatrix;
	}
	
	public static maxPool(matrix: number[][], scaleWidth: number, scaleHeight: number): number[][] {
		const width = matrix.length;
		const height = matrix[0].length;
		const outputWidth = width / scaleWidth;
		const outputHeight = height / scaleHeight;
		const outMatrix = Matrix.create2D(outputWidth, outputHeight);
		
		if (outputWidth * scaleWidth != width || outputHeight * scaleHeight != height) {
			throw new Error("Matrix size doesn't match.");
		}
		
		for (let x = 0; x < outputWidth; x++) {
			for (let y = 0; y < outputHeight; y++) {
				let max = Number.MIN_VALUE;
				for (let i = x * scaleWidth; i < (x + 1) * scaleWidth; i++) {
					for (let j = y * scaleHeight ; j < (y + 1) * scaleHeight; j++) {
						if (matrix[i][j] > max) {
							max = matrix[i][j];
						}
					}
				}
				outMatrix[x][y] = max;
			}
		}
		return outMatrix;
	}

	/**
	 * Extends this matrix back to the size it would be before a convolution over the given
	 * kernel, then apply the convolution to the extended matrix to produce a post-convolution
	 * matrix of the kernel applied to the matrix.
	 * 
	 * @param matrix
	 * @param kernel
	 * @return
	 */
	public static fullConvolution(matrix: number[][], kernel: number[][]): number[][] {
		const width = matrix.length;
		const height = matrix[0].length;
		const kernelWidth = kernel.length;
		const kernelHeight = kernel[0].length;
		
		const extendMatrix = Matrix.create2D(width + 2 * (kernelWidth - 1), height + 2 * (kernelHeight - 1));
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				extendMatrix[x + kernelWidth - 1][y + kernelHeight - 1] = matrix[x][y];
			}
		}
		return Matrix.convolution(extendMatrix, kernel);
	}

	/**
	 * Compute the convolution of the given kernel across the given matrix, and return the
	 * resulting matrix after the convolution.
	 * 
	 * @param matrix - the matrix being convolved
	 * @param kernel - the kernel that is doing the convolving
	 * @return the matrix where the resulting convolution has been performed
	 */
	public static convolution(matrix: number[][], kernel: number[][]): number[][] {
		// Width and height of the matrix
		const width = matrix.length;
		const height = matrix[0].length;
		
		// Width and height of the kernel
		const kernelWidth = kernel.length;
		const kernelHeight = kernel[0].length;
		
		// The size of the output after the convolution
		const outputWidth = width - kernelWidth + 1;
		const outputHeight = height - kernelHeight + 1;
		
		// Create an output matrix for storing the result
		const outMatrix = Matrix.create2D(outputWidth, outputHeight);

		// For each output element, calculate the convolution
		for (let x = 0; x < outputWidth ; x++) {
			for (let y = 0; y < outputHeight ; y++) {
				
				// Sum each pixel
				let sum = 0.0;
				
				// Go to each position in the kernel and add the matrix value scaled
				// by the kernel value at the corresponding position
				for (let kx = 0; kx < kernelWidth ; kx++) {
					for (let ky = 0; ky < kernelHeight ; ky++) {
						sum += matrix[x + kx][y + ky] * kernel[kx][ky];
					}
				}
				
				// Set the sum in the output matrix
				outMatrix[x][y] = sum;
			}
		}
		return outMatrix;

	}
	
	/**
	 * Scale up the matrix by the given width and height factor.
	 * @param matrix
	 * @param scaleWidth
	 * @param scaleHeight
	 * @return
	 */
	public static scaleUp(matrix: number[][], scale: number): number[][] {
		// If the matrix is going to be unchanged by this operation
		if (scale == 1) {
			return matrix;
		}
		
		// Get the width and height of the matrix, and use it to calculate
		// the size of the resulting matrix
		const width = matrix.length;
		const height = matrix[0].length;
		const outMatrix = Matrix.create2D(width * scale, height * scale);

		// Go to each position in the matrix
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				
				// Extend onto the resulting matrix 
				for (let kx = x * scale ; kx < (x + 1) * scale ; kx++) {
					for (let ky = y * scale ; ky < (y + 1) * scale ; ky++) {
						outMatrix[kx][ky] = matrix[x][y];
					}
				}
			}
		}
		
		// Return the matrix
		return outMatrix;
	}
}