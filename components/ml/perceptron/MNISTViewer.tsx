'use client';

import { useEffect } from "react";
import { useMNIST } from "@/lib/dataset/mnist";
import { useNeuralNetwork } from "@/lib/nn/neural-network";
import { MNISTDigitInput } from "@/components/mnist/digit-input";

export default function MNISTViewer() {

  // const mnist = useMNIST("t10k");
  // const neuralNetwork = useNeuralNetwork([784, 128, 64, 10]);

  // useEffect(() => {
    
  // }, []);

  return (
    <div>
      <h1>MNIST Viewer</h1>
      <MNISTDigitInput />
    </div>
  );
}