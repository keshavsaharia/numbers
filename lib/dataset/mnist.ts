import { useMemo } from "react";
import { ImageClassificationDataset } from "./types";
import { createMatrix2D } from "../matrix/create";

export class MNIST implements ImageClassificationDataset {
	// Size of each image.
	private width: number = 0;
	private height: number = 0;
	
	private loaded: boolean = false;
	private loading: boolean = false;
	
	// Training data.
	private imagePath: string;
	private labelPath: string;
	private imageData?: DataView;
	private labelData?: DataView;
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
		if (this.loaded || this.loading) return;
		this.loading = true;
		console.log("Loading MNIST data.");
			
		// Read all training images and labels.
		const imageData = await this.readData(this.imagePath);
		const labelData = await this.readData(this.labelPath);
		this.imageData = new DataView(imageData);
		this.labelData = new DataView(labelData);

		console.log("Image data length: " + this.imageData.byteLength);
		console.log("Label data length: " + this.labelData.byteLength);
		// Get the length, width, and height.
		this.length = this.readIntFromImageData(4);
		this.height = this.readIntFromImageData(8);
		this.width = this.readIntFromImageData(12);
		console.log("Read " + this.length + " digits (" + this.width + " x " + this.height + ").");
		this.loaded = true;
		this.loading = false;
	}

	private async readData(fileName: string): Promise<ArrayBuffer> {
		const response = await fetch(`${ process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' }/mnist/${ fileName }`)
		return response.arrayBuffer()
	}

	/**
	 * Reads an integer from the byte buffer at the given offset.
	 * @param image - image byte array
	 * @param offset - byte offset
	 * @return the integer at the given offset.
	 */
	private readIntFromImageData(offset: number): number {
		return this.imageData?.getUint32(offset, false) ?? 0;
	}
	
	/**
	 * Returns an integer array representing the handwriting sample at the given index.
	 *  
	 * @param index
	 * @return
	 */
	getImage(index: number): number[][] {
    if (!this.imageData) throw new Error("Dataset not loaded");

    // Pixel data starts at byte 16
    const initialOffset = 16 + index * this.width * this.height;

		const image = createMatrix2D(this.width, this.height);
    for (let y = 0; y < this.height; y++) {
      const row: number[] = [];
      for (let x = 0; x < this.width; x++) {
				const offset = initialOffset + y * this.width + x;
        const value = this.imageData.getUint8(offset);
        image[x][y] = value / 255; // normalize to 0-1
      }
    }
    return image;
  }
	
	/**
	 * Returns an integer array representing the handwriting sample at the given index.
	 *  
	 * @param index
	 * @return
	 */
	getBinaryImage(index: number): boolean[][] {
		if (! this.imageData) return [];
		const output: boolean[][] = new Array(this.width);
		for (let i = 0; i < output.length; i++) {
			output[i] = new Array(this.height).fill(false);
		}
		for (let y = 0, xy = 16 + index * this.width * this.height ; y != this.height ; y++) {
			for (let x = 0 ; x != this.width ; x++) {
				const g = 255 - (this.imageData.getUint8(xy++) ?? 0);
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
	getLabel(index: number) {
		return this.labelData?.getUint8(index + 8) ?? 0;
	}
	
	/**
	 * Returns the number of samples in this MNIST dataset.
	 * @return
	 */
	size() {
		return length;
	}
	
	/**
	 * Returns the width of each sample.
	 */
	getWidth() {
		return this.width;
	}
	
	/**
	 * Returns the height of each sample.
	 */
	getHeight() {
		return this.height;
	}

	label(index: number) {
		return this.getLabel(index);
	}

	value(index: number) {
		return this.getImage(index);
	}

	value3D(index: number): number[][][] {
		throw new Error("MNIST is not a 3D dataset");
	}

	isLoaded() {
		return this.loaded;
	}

	public is3D() {
		return false;
	}
}

export function useMNIST(name: string) {
  return useMemo(() => new MNIST(`${name}-images.idx3-ubyte`, `${name}-labels.idx1-ubyte`), []);
}