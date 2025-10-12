import React, { useRef, useEffect } from "react";

export function MNISTDigitViewer({ image }: { image: number[][] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!image || image.length === 0 || image[0].length === 0) return;
    const width = image.length;
    const height = image[0].length;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(width, height);
    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
        // Get value, scale to [0,255], clamp in-case of over/under, flip y axis if needed.
        let value = image[x][y];
        // Assuming input values are 0 (white) to 1 (black): invert to get correct grayscale
        // If already 0..255 or inverted, skip this.
        if (typeof value === "number") {
          value = Math.max(0, Math.min(1, value));
          const gray = Math.floor((1.0 - value) * 255); // MNIST is white=background
          const idx = (y * width + x) * 4;
          imgData.data[idx] = gray;
          imgData.data[idx + 1] = gray;
          imgData.data[idx + 2] = gray;
          imgData.data[idx + 3] = 255; // opaque
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }, [image]);

  const displayWidth = Math.max(128, (image?.length ?? 28) * 6);
  const displayHeight = Math.max(128, (image?.[0]?.length ?? 28) * 6);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: displayWidth,
        height: displayHeight,
        border: "1px solid #ccc",
        imageRendering: "pixelated",
        background: "#fff",
        display: "block"
      }}
      tabIndex={0}
    />
  );
}