import { Layer, ConvolutionLayer } from "..";

export class OutputLayer extends ConvolutionLayer {

	// The number of classes in this output layer
	private classes: number;
	
	constructor(classes: number) {
		super(0, classes);
		this.setSize(1, 1);
		this.classes = classes;
	}

	public initialize(previous?: Layer): void {
    if (! previous) return;
		// Set the kernel to 
		this.setKernelSize(previous.getWidth());
		this.initializeKernel(previous.getDepth(), this.classes);
		
		this.initializeActivations();
		this.initializeError();
	}
	
	public maxClass(): number {
		let max = 0;
    if (! this.value) return max;
		for (let i = 1 ; i < this.classes ; i++) {
			if (this.value[max][0][0] < this.value[i][0][0]) {
				max = i;
			}
		}
		return max;
	}
	
	/**
	 * Given the correct index of the 
	 * @param label
	 */
	public setError(label: number): void {
    if (! this.value || ! this.error) return;
		for (let i = 0 ; i < this.getDepth() ; i++) {
			// Get the target value and the actual value
			const target = (label == i) ? 1 : 0;
			const outputValue = this.value[i][0][0];
			
			// Set the error at the given index to the value
			this.error[i][0][0] = outputValue * (1 - outputValue) * (target - outputValue);
		}
	}

	/**
	 * The output layer does not need to backpropagate since its errors are
	 * directly calculated in the setError method above as the gradient of the
	 * error curve.
	 */
	public backpropagate(next: Layer): void {
		// Unimplemented
	}

}