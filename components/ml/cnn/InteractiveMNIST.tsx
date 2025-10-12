'use client'

import { useState, useEffect, useMemo } from "react"
import { MNISTDigitViewer } from "../MNIST"
import { MNIST } from "@/lib/dataset/mnist"
import { Button } from "@/components/ui/button"

export default function InteractiveMNIST() {
  const [ image, setImage ] = useState<number[][]>([])
  const [ label, setLabel ] = useState<number>(0)
  const [ index, setIndex ] = useState(0)
  const mnist = useMemo(() => new MNIST("t10k-images.idx3-ubyte", "t10k-labels.idx1-ubyte"), [])

  useEffect(() => {
    mnist.load().then(() => {
      setImage(mnist.getImage(index))
      setLabel(mnist.getLabel(index))
    })
  }, [])

  function setImageIndex(index: number) {
    setIndex(index)
    if (mnist.isLoaded()) {
      setImage(mnist.getImage(index))
      setLabel(mnist.getLabel(index))
    }
  }
  
  return (
    <div>
      <MNISTDigitViewer image={image} />
      <Button onClick={() => setImageIndex(index - 1)}>Previous</Button>
      <span>{label}</span>
      <Button onClick={() => setImageIndex(index + 1)}>Next</Button>
    </div>
  )
}