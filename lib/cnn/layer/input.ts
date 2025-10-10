import { Layer } from "..";

export class InputLayer extends Layer {
	
	constructor(width: number, height: number, depth: number = 1) {
		super(width, height, depth);
	}
	
	public initialize(previous?: Layer): void {
		this.initializeActivations();
	}

	public compute(previous: Layer): void {
		// Unimplemented
	}

	public backpropagate(next: Layer): void {
		// Unimplemented
	}

	public update(previous: Layer): void {
		// Unimplemented
	}
	
	public setInput(matrix: number[][]): void {
		const inputMap = this.getLevel(0);
		
		for (let x = 0 ; x < this.getWidth() ; x++) {
			for (let y = 0 ; y < this.getHeight() ; y++) {
				inputMap[x][y] = matrix[x][y];
			}
		}
	}
	
	public setInput3D(matrix: number[][][]): void {
		if (! this.value) return;
		for (let i = 0 ; i < this.getDepth() ; i++) {
			for (let x = 0 ; x < this.getWidth() ; x++) {
				for (let y = 0 ; y < this.getHeight() ; y++) {
					this.value[i][x][y] = matrix[i][x][y];
				}
			}
		}
	}

	public draw(x: number, y: number, scale: number): number {
		const inputScale = 5 * scale / this.getWidth();
    if (! this.value) return 0;
		
		if (this.getDepth() == 1) {
			for (let ix = 0 ; ix < this.getWidth() ; ix++) {
				for (let iy = 0; iy < this.getHeight() ; iy++) {
					const c = Math.round(this.value[0][ix][iy] * 255);
					// Window.out.color(c, c, c);
					// Window.out.square(x + ix * inputScale, y + iy * inputScale, inputScale);
				}
			}
		}
		else if (this.getDepth() == 3) {
			for (let ix = 0 ; ix < this.getWidth() ; ix++) {
				for (let iy = 0; iy < this.getHeight() ; iy++) {
					// Window.out.color((int) (value[0][ix][iy] * 255), (int) (value[1][ix][iy] * 255), (int) (value[2][ix][iy] * 255));
					// Window.out.square(x + ix * inputScale, y + iy * inputScale, inputScale);
				}
			}
		}
		else {
			for (let i = 0 ; i < this.getDepth() ; i++) {
				for (let ix = 0 ; ix < this.getWidth() ; ix++) {
					for (let iy = 0; iy < this.getHeight() ; iy++) {
						const c = Math.round(this.value[i][ix][iy] * 255);
						// Window.out.color(c, c, c);
						// Window.out.square(x + ix * inputScale, y + iy * inputScale + i * (scale + 2), inputScale);
					}
				}
			}
		}
		
		return scale * 5;
	}
	
}