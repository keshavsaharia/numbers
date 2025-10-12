export interface ImageClassificationDataset {
	
	label(index: number): number;
	value(index: number): number[][];
	
	value3D(index: number): number[][][];
	is3D(): boolean;
	
	size(): number;
	
	getWidth(): number;
	getHeight(): number;
	
}