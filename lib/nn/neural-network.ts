import { useMemo } from "react";
import { createMatrix2D } from "../matrix/create";

export class NeuralNetwork {
  neuron: number[][];
  bias: number[][];
  biasDelta: number[][];
  error: number[][];
  weight: number[][][];
  weightDelta: number[][][];
  
  constructor(size: number[]) {
      this.neuron = new Array(size.length);
      this.bias = new Array(size.length);
      this.biasDelta = new Array(size.length);
      this.error = new Array(this.neuron.length);
      
      for (let i = 0 ; i < size.length ; i++) {
        this.neuron[i] = new Array(size[i]);
        this.bias[i] = new Array(size[i]);
        this.biasDelta[i] = new Array(size[i]);
        this.error[i] = new Array(size[i]);
        
        for (let k = 0 ; k < size[i] ; k++) {
          this.bias[i][k] = Math.random() * 2 - 1;
        }
      }
      
      this.weight = new Array(size.length);
      this.weightDelta = new Array(size.length);
      
      for (let i = 1 ; i < size.length ; i++) {
          this.weight[i] = createMatrix2D(size[i], size[i - 1]);
          this.weightDelta[i] = createMatrix2D(size[i], size[i - 1]);
          
          for (let j = 0 ; j < size[i] ; j++) {
              for (let k = 0 ; k < size[i - 1] ; k++) {
                  this.weight[i][j][k] = Math.random() * 2 - 1;
              }
          }
      }
  }
  
  compute(input: number[]) {
      for (let i = 0 ; i < input.length ; i++) {
          this.neuron[0][i] = input[i];
      }
      for (let l = 1 ; l < this.neuron.length ; l++) {
          for (let n = 0 ; n < this.neuron[l].length ; n++) {
              let total = this.bias[l][n];
              for (let p = 0 ; p < this.neuron[l - 1].length ; p++) {
                  total += this.neuron[l - 1][p] * this.weight[l][n][p];
              }
              
              this.neuron[l][n] = 1 / (1 + Math.pow(Math.E, -total));
          }
      }
      
      return this.neuron[this.neuron.length - 1];
  }
  
  backpropagate(expected: number[], rate: number, momentum: number = 0) {
      let output = this.neuron.length - 1;
      for (let o = 0 ; o < this.neuron[output].length ; o++) {
          let outval = this.neuron[output][o];
          //error[output][o] = (expected[o] - outval) * (1 - Math.pow(Math.tanh(outval), 2)); //outval * (1 - outval);
          this.error[output][o] = (expected[o] - outval) * outval * (1 - outval);
      }
      
      for (let l = this.neuron.length - 2 ; l > 0 ; l--) {
          for (let n = 0 ; n < this.neuron[l].length ; n++) {
              let sum = 0;
              for (let f = 0 ; f < this.neuron[l + 1].length ; f++) {
                  sum += this.weight[l + 1][f][n] * this.error[l + 1][f];
              }
              //error[l][n] = (1 - Math.pow(Math.tanh(neuron[l][n]), 2)) * sum;
              this.error[l][n] = this.neuron[l][n] * (1 - this.neuron[l][n]) * sum;
          }
      }
      
      for (let l = this.neuron.length - 1 ; l > 0 ; l--) {
          for (let n = 0 ; n < this.neuron[l].length ; n++) {
              this.biasDelta[l][n] = rate * this.error[l][n] + momentum * this.biasDelta[l][n];
              this.bias[l][n] += this.biasDelta[l][n];
                      
              for (let w = 0 ; w < this.weight[l][n].length ; w++) {
                  this.weightDelta[l][n][w] = rate * this.error[l][n] * this.neuron[l - 1][w] + 
                          momentum * this.weightDelta[l][n][w]; 
                  this.weight[l][n][w] += this.weightDelta[l][n][w];
              }
          }
      }
  }
}

export function useNeuralNetwork(size: number[]) {
  return useMemo(() => new NeuralNetwork(size), []);
}