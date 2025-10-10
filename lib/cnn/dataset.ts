import { Matrix } from ".";

export interface Dataset {
	
	label(index: number): number;
	value(index: number): number[][];
	
	value3D(index: number): number[][][];
	is3D(): boolean;
	
	size(): number;
	
	getWidth(): number;
	getHeight(): number;
	
}

export class MNIST implements Dataset {
	// Size of each image.
	private width: number = 0;
	private height: number = 0;
	
	// Training data.
	private imagePath: string;
	private labelPath: string;
	private imageData: Buffer = Buffer.alloc(0);
	private labelData: Buffer = Buffer.alloc(0);
	private length: number = 0;
	
	// Randomize placement and rotation of the digit
	private randomize: boolean = true;
	private static maxValue: number = Math.pow(2, 24);
	
	/**
	 * Reads the image and label data from the given paths, and stores their data.
	 * @param imagePath
	 * @param labelPath
	 */
	constructor(imagePath: string, labelPath: string) {
		this.imagePath = imagePath;
		this.labelPath = labelPath;
	}

	async load() {
		console.log("Loading MNIST data.");
			
			// // Read all training images and labels.
			// imageData = Files.readAllBytes(Paths.get(imagePath));
			// labelData = Files.readAllBytes(Paths.get(labelPath));
			
			// Get the length, width, and height.
			this.length = this.readIntFromImageData(4);
			this.width = this.readIntFromImageData(8);
			this.height = this.readIntFromImageData(12);
			console.log("Read " + this.length + " digits (" + this.width + " x " + this.height + ").");
	}

	/**
	 * Reads an integer from the byte buffer at the given offset.
	 * @param image - image byte array
	 * @param offset - byte offset
	 * @return the integer at the given offset.
	 */
	private readIntFromImageData(offset: number): number {
		return this.imageData.readInt32LE(offset);
	}
	
	
	/**
	 * Returns an integer array representing the handwriting sample at the given index.
	 *  
	 * @param index
	 * @return
	 */
	public getImage(index: number): number[][] {
		const output = Matrix.create2D(this.width, this.height);
		for (let y = 0, xy = 16 + index * this.width * this.height ; y != this.height ; y++) {
			for (let x = 0 ; x != this.width ; x++) {
				const g = 255 - (this.imageData[xy++] & 0xff);
				output[x][y] = (0xff000000 | g | ( g << 8 ) | ( g << 16 )) / -MNIST.maxValue;
			}
		}
		return output;
	}
	
	/**
	 * Returns an integer array representing the handwriting sample at the given index.
	 *  
	 * @param index
	 * @return
	 */
	public getBinaryImage(index: number): boolean[][] {
		const output: boolean[][] = new Array(this.width);
		for (let i = 0; i < output.length; i++) {
			output[i] = new Array(this.height).fill(false);
		}
		for (let y = 0, xy = 16 + index * this.width * this.height ; y != this.height ; y++) {
			for (let x = 0 ; x != this.width ; x++) {
				const g = 255 - (this.imageData[xy++] & 0xff);
				output[x][y] = (0xff000000 | g | ( g << 8 ) | ( g << 16 )) < -1;
			}
		}
		return output;
	}
	
	/**
	 * Returns the label for the sample at the given index.
	 * @param index
	 * @return
	 */
	public getLabel(index: number) {
		return this.labelData.readUInt8(index + 8);
	}
	
	/**
	 * Returns the number of samples in this MNIST dataset.
	 * @return
	 */
	public size() {
		return length;
	}
	
	/**
	 * Returns the width of each sample.
	 */
	public getWidth() {
		return this.width;
	}
	
	/**
	 * Returns the height of each sample.
	 */
	public getHeight() {
		return this.height;
	}

	public label(index: number) {
		return this.getLabel(index);
	}

	public value(index: number) {
		return this.getImage(index);
	}

	public value3D(index: number): number[][][] {
		throw new Error("MNIST is not a 3D dataset");
	}

	public is3D() {
		return false;
	}
}