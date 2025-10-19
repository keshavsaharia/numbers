import { CNN, Matrix } from ".";

export abstract class Layer {

	// Size of the 3D volume of the layer
	private width: number;
	private height: number;
	private depth: number;
	
	// For layers with kernel maps
	protected kernelSize: number = 0;
	
	// For pooling layers
	public scale = 1;
	
	// Current record in the batch
	public static current = 0;
	
	// Output of network for each member of the batch
	protected value?: number[][][];
	protected kernel?: number[][][][];
	protected error?: number[][][];
	
	/**
	 * Initialize the layer with the given width, height and depth.
	 * @param width - width of the layer
	 * @param height - height of the layer
	 * @param depth - depth of the layer (number of output maps)
	 */
	constructor(width: number, height: number, depth: number = 1) {
		this.width = width;
    this.height = height;
    this.depth = depth;
	}

	protected setSize(width: number, height: number, depth: number = 1): void {
		this.width = width;
		this.height = height;
		this.depth = depth;
	}

	protected initializeActivations(): void {
		this.value = Matrix.create3D(this.depth, this.width, this.height);
	}
	
	protected setKernelSize(kernelSize: number): void {
		this.kernelSize = kernelSize;
	}

	protected initializeKernel(fromSize: number, toSize: number): void {
    this.kernel = new Array(fromSize);
    for (let i = 0; i < this.kernel.length; i++) {
      this.kernel[i] = new Array(toSize);
      for (let j = 0; j < this.kernel[i].length; j++) {
        this.kernel[i][j] = new Array(this.kernelSize);
        for (let k = 0; k < this.kernel[i][j].length; k++) {
          this.kernel[i][j][k] = new Array(this.kernelSize);
        }
      }
    }

    for (let i = 0; i < this.kernel.length; i++) {
      for (let j = 0; j < this.kernel[i].length; j++) {
        Matrix.randomizeBetween(this.kernel[i][j], -0.01, 0.1);
      }
    }
	}
	
	protected initializeError() {
    this.error = Matrix.create3D(this.depth, this.width, this.height);
	}
	
	/**
	 * Initialize the layer with a reference to the previous layer and the
	 * batch size used in training the network.
	 */
	public abstract initialize(previous?: Layer): void;
	
	/**
	 * Feed forward from the previous layer.
	 * @param previous
	 */
	public abstract compute(previous: Layer): void;
	
	/**
	 * Backpropagate errors from the next layer to this one.
	 */
	public abstract backpropagate(next: Layer): void;
	
	/**
	 * 
	 */
	public abstract update(previous: Layer, learningRate: number): void;
	
	
	public getLevel(index: number): number[][] {
		return this.value?.[index] ?? [];
	}
	
	public getKernel(from: number, to: number): number[][] {
		return this.kernel?.[from][to] ?? [];
	}
	
	public setKernel(from: number, to: number, kernel: number[][]): void {
    if (! this.kernel) return;
		this.kernel[from][to] = kernel;
	}
	
	public getError(index: number): number[][] {
		return this.error?.[index] ?? [];
	}
	
	public setLevel(index: number, map: number[][]): void {
    if (! this.value) return;
		this.value[index] = map;
	}
	
	public setError(index: number, error: number[][]): void {
    if (! this.error) return;
		this.error[index] = error;
	}
	
	public getWidth(): number {
		return this.width;
	}
	
	public getHeight(): number {
		return this.height;
	}
	
	public getDepth(): number {
		return this.depth;
	}
}