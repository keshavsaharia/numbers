import { CNN, Matrix, Layer } from "..";

export class ConvolutionLayer extends Layer {

	/**
	 * Create the convolution layer without setting the width and height yet. This is
	 * needed since the convolution layer is usually part of a network where the width 
	 * and height are chosen during initialization.
	 * 
	 * @param kernelSize - size of the kernel
	 * @param depth - depth of this layer
	 */
	constructor(kernelSize: number, depth: number) {
		super(0, 0, depth);
		this.setKernelSize(kernelSize);
	}

	public initialize(previous?: Layer): void {
    if (! previous) return;
		// Compute the width and height after convoluting the previous layer
		this.setSize(previous.getWidth() - this.kernelSize + 1, previous.getHeight() - this.kernelSize + 1);

		// Initialize the activation and error volume
		this.initializeActivations();
		this.initializeError();

		// Create the kernel mappings between the previous volume and this one
		this.initializeKernel(previous.getDepth(), this.getDepth());
	}

	public compute(previous: Layer): void {
		// For each outmap, sum the convolution output
		for (let j = 0 ; j < this.getDepth() ; j++) {
			let sum: number[][] | null = null;

			for (let i = 0; i < previous.getDepth() ; i++) {
				// Generate the first sum
				if (sum == null)
					sum = Matrix.convolution(previous.getLevel(i), this.getKernel(i, j));
				// Add to the previous sum
				else
					sum = Matrix.addMatrix(sum, Matrix.convolution(previous.getLevel(i), this.getKernel(i, j)));
			}

			// Add the layer bias to the sum
			// sum = Matrix.add(sum, bias[j]);
			// Sigmoid the result and save it as the output map
			if (sum) this.setLevel(j, Matrix.sigmoid(sum));
		}
	}

	public backpropagate(next: Layer): void {
		for (let i = 0 ; i < this.getDepth() ; i++) {
			const nextError = next.getError(i);
			const map = this.getLevel(i);
			const outMatrix = Matrix.multiplyMatrix(map, Matrix.oneMinus(Matrix.copy(map)));

			this.setError(i, Matrix.multiplyMatrix(outMatrix, Matrix.scaleUp(nextError, next.scale)));
		}
	}

	public update(previous: Layer): void {
		// For each pair of outmaps
		for (let j = 0 ; j < this.getDepth() ; j++) {
			for (let i = 0 ; i < previous.getDepth() ; i++) {
				// Generate a delta kernel by convoluting the previous level by the
				// error matrix, producing a kernel that can be added to the existing one
				let delta = Matrix.convolution(previous.getLevel(i), this.getError(j));

				// Add to the existing kernel the delta scaled by learning rate
				delta = Matrix.addMatrix(this.getKernel(i, j), Matrix.multiplyScalar(delta, CNN.learningRate));

				// Store the new kernel
				this.setKernel(i, j, delta);
			}
		}
	}

	public draw(x: number, y: number, scale: number): number {
		const kernelScale = scale / this.kernelSize;
		const kernelScalePad = scale + 2;
    if (! this.kernel) return 0;

		for (let i = 0 ; i < this.kernel.length ; i++) {
			for (let j = 0 ; j < this.kernel[0].length ; j++) {
				let kernelMin = Number.MAX_VALUE, kernelMax = Number.MIN_VALUE;

				for (let kx = 0 ; kx < this.kernelSize ; kx++) {
					for (let ky = 0; ky < this.kernelSize ; ky++) {
						const kernelValue = this.kernel[i][j][kx][ky];
						if (kernelValue < kernelMin) {
							kernelMin = kernelValue;
						}
						if (kernelValue > kernelMax) {
							kernelMax = kernelValue;
						}
					}
				}
				const kernelRange = kernelMax - kernelMin;
				for (let kx = 0 ; kx < this.kernelSize ; kx++) {
					for (let ky = 0; ky < this.kernelSize ; ky++) {
						const c = Math.round((this.kernel[i][j][kx][ky] - kernelMin) * 255 / kernelRange);
						// Window.out.color(c, c, c);
						// Window.out.square(x + i * kernelScalePad + kx * kernelScale, y + j * kernelScalePad + ky * kernelScale, kernelScale);
					}
				}

			}
		}
		return this.kernel.length * kernelScalePad;
	}



}