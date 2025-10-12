'use client';

import { useEffect, useRef, useState } from "react";
import { createMatrix2D } from "@/lib/matrix/create";
import { Button } from "@/components/ui/button";

const CANVAS_SIZE = 280;
const GRID_SIZE = 10;
const PIXEL_SIZE = CANVAS_SIZE / GRID_SIZE;

export function MNISTDigitInput() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixelData, setPixelData] = useState(new Array(28 * 28).fill(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    ctx.strokeStyle = '#333333';
    for (let i = 1; i < GRID_SIZE; i++) {
      const pos = i * PIXEL_SIZE;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, CANVAS_SIZE);
      ctx.moveTo(0, pos);
      ctx.lineTo(CANVAS_SIZE, pos);
      ctx.stroke();
    }
  }, []);

  const updatePixelData = (ctx: CanvasRenderingContext2D, x: number, y: number, intensity: number) => {
    const gridX = Math.floor(x / PIXEL_SIZE);
    const gridY = Math.floor(y / PIXEL_SIZE);
    if (gridX >= 0 && gridX < GRID_SIZE && gridY >= 0 && gridY < GRID_SIZE) {
      const index = gridY * GRID_SIZE + gridX;
      const newPixelData = [...pixelData];
      newPixelData[index] = Math.min(1, newPixelData[index] + intensity);
      setPixelData(newPixelData);
      
      ctx.fillStyle = `rgba(255, 255, 255, ${newPixelData[index]})`;
      ctx.fillRect(gridX * PIXEL_SIZE, gridY * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      
      ctx.strokeStyle = '#333333';
      ctx.strokeRect(gridX * PIXEL_SIZE, gridY * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    updatePixelData(ctx, x, y, 0.2);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    ctx.strokeStyle = '#333333';
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        ctx.strokeRect(i * PIXEL_SIZE, j * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
    
    setPixelData(new Array(64).fill(0));
  };

  return (
    <div className="w-full bg-zinc-900 flex flex-col gap-4 p-4 text-white items-center">

      <div className="flex gap-4 items-start justify-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="border border-gray-600 cursor-crosshair"
          onMouseDown={(e) => {
            setIsDrawing(true);
            handleMouseMove(e);
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
        />
      </div>
      <div className="flex gap-2">
      <Button
              variant="outline"
              onClick={clearCanvas}
              className="cursor-pointer"
            >
              Random
            </Button>
        <Button
              variant="outline"
              onClick={clearCanvas}
              className="cursor-pointer"
            >
              Clear
            </Button>
      </div>
    </div>
  );
};