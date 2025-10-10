import { Layer, InputLayer, OutputLayer, Matrix } from ".";
import { Dataset } from "./dataset";

export class CNN {
	
	// learning rate and momentum
	public static learningRate = 0.1;
	public static momentum = 0;
	
	// For drawing layers
	public static padding = 10;
	
	// Array of Layer objects
	private layer: Layer[];
	
	// Input and output layer
	private inputLayer: InputLayer;
	private outputLayer: OutputLayer;
	
	/**
	 * Initialize the convolution neural network with the given set of layers.
	 * @param layers - an array of Layer objects representing each layer in the CNN
	 */
	constructor(layers: Layer[]) {
		this.layer = layers;
		this.inputLayer = layers[0] as InputLayer;
		this.outputLayer = layers[layers.length - 1] as OutputLayer;
		
		this.inputLayer.initialize();
		
		// Initialize each layer with a reference to the previous layer
		for (let i = 1 ; i < layers.length ; i++) {
			layers[i].initialize(layers[i - 1]);
		}
	}
	
	/**
	 * Set the learning rate of the CNN.
	 * @param rate
	 */
	public setLearningRate(rate: number): void {
		CNN.learningRate = rate;
	}
	
	// Train the CNN with a default batch size of 50 and without drawing the kernels
	public train(dataset: Dataset, epochs: number) {
		this.trainBatchWithVisualization(dataset, 50, epochs, false, 0);
	}
	
	// Train the dataset with the given batch size
	public trainBatch(dataset: Dataset, batchSize: number, epochs: number) {
		this.trainBatchWithVisualization(dataset, batchSize, epochs, false, 0);
	}
	
	public trainBatchWithVisualization(dataset: Dataset, batchSize: number, epochs: number, draw: boolean, scale: number) {
		
		// Array of all indexes in the dataset. This array gets shuffled and the
		// subarray from index 0 to index batchSize is passed through the network,
		// then the weights and kernels are updated.
		const index = Matrix.range(dataset.size());
		
		// Repeat the training process for the given number of epochs
		for (let e = 0 ; e < epochs ; e++) {
			
			// Store the number of correct 
			let correct = 0, total = 0;
			
			// Repeatedly take a permutation of the index array and push it through
			const repetitions = Math.ceil(dataset.size() / batchSize);
			for (let r = 0 ; r < repetitions ; r++) {
				Matrix.shuffle(index);
				
				// For each randomly chosen index in this batch
				for (let i = 0 ; i < batchSize ; i++) {
					const result = (dataset.is3D()) ? 
							this.compute3D(dataset.value3D(index[i])) :
							this.compute2D(dataset.value(index[i]));
					this.backpropagate(dataset.label(index[i]));
					
					if (result == dataset.label(index[i])) {
						correct++;
					}
					total++;
				}
				
				// Update kernels and weights
				this.update();
				if (draw) {
					this.draw(scale);
				}
				
				if (r % 100 == 0)
					console.log("Completed repetition " + r + " out of " + repetitions);
			}
			
			console.log("Completed epoch " + (e + 1));
			console.log(" with accuracy " + (100.0 * correct / total) + "%");
			
			if (1.0 * correct / total > 0.95) {
				CNN.learningRate = CNN.learningRate * 0.9 + 0.01;
				console.log("New learning rate: " + CNN.learningRate);
			}
		}
	}
	
	/**
	 * 
	 * @param input
	 * @return
	 */
	public compute3D(input: number[][][]): number {
		// Copy the input matrix into the input layer
		this.inputLayer.setInput3D(input);
		
		// Compute each hidden layer and output layer
		for (let i = 1; i < this.layer.length ; i++) {
			this.layer[i].compute(this.layer[i - 1]);
		}
		
		// Return the softmax class of the output layer
		return this.outputLayer.maxClass();
	}
	
	/**
	 * 
	 * @param input
	 * @return
	 */
	public compute2D(input: number[][]) {
		// Copy the input matrix into the input layer
		this.inputLayer.setInput(input);
		
		// Compute each hidden layer and output layer
		for (let i = 1; i < this.layer.length ; i++) {
			this.layer[i].compute(this.layer[i - 1]);
		}
		
		// Return the softmax class of the output layer
		return this.outputLayer.maxClass();
	}
	
	/**
	 * Backpropagate based on the correct class
	 * @param correctClass
	 */
	public backpropagate(correctClass: number) {
		// Set the error for the output layer
		this.outputLayer.setError(correctClass);
		
		// Set the errors for each hidden layer with a reference to the
		// layer after it (used in backpropagation)
		for (let i = this.layer.length - 2 ; i > 0 ; i--) {
			this.layer[i].backpropagate(this.layer[i + 1]);
		}
	}
	
	/**
	 * 
	 */
	private update() {
		for (let l = 1; l < this.layer.length ; l++) {
			this.layer[l].update(this.layer[l - 1]);
		}
	}
	
	public draw(scale: number) {
		this.drawScale(this.layer.length, scale);
	}
	
	public drawScale(maxLayer: number, scale: number) {
		let startx = 0;
		for (let i = 0 ; i < maxLayer ; i++) {
			const width = this.layer[i].draw(CNN.padding + startx, CNN.padding, scale);
			if (width > 0) {
				startx += width + CNN.padding;
			}
		}
		// Window.frame();
	}
}