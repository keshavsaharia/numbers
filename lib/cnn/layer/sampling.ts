import { Matrix, Layer } from "..";

export class SamplingLayer extends Layer {
	
	constructor(scale: number) {
		super(0, 0, 0);
		this.scale = scale;
	}

	public initialize(previous?: Layer): void {
    if (! previous) return;
		this.setSize(previous.getWidth() / this.scale, previous.getHeight() / this.scale, previous.getDepth());
		this.initializeError();
		this.initializeActivations();
	}

	public compute(previous: Layer): void {
		for (let i = 0 ; i < previous.getDepth() ; i++) {
			this.setLevel(i, Matrix.scale(previous.getLevel(i), this.scale));
		}
	}

	public backpropagate(next: Layer): void {
		for (let i = 0 ; i < this.getDepth() ; i++) {
			let sum: number[][] | null = null;
			for (let j = 0; j < next.getDepth() ; j++) {
				const error = next.getError(j);
				let kernel = next.getKernel(i, j);
				
				// Rotate the kernel 180 degrees
				kernel = Matrix.rotate180(kernel);
				
				if (sum == null)
					sum = Matrix.fullConvolution(error, kernel);
				else
					sum = Matrix.addMatrix(Matrix.fullConvolution(error, kernel), sum);
			}
			if (sum) this.setError(i, sum);
		}
	}

	public update(previous: Layer): void {
		// Unimplemented
	}

	public draw(x: number, y: number, scale: number): number {
		//return drawKernel(x, y, scale);
		return 0;
	}
	
}