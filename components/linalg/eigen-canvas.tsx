import React, { useRef, useEffect } from 'react';
import { Matrix2D, Vector2D, transformVector, EigenResult } from '@/components/linalg/matrix-math';

interface EigenCanvasProps {
  matrix: Matrix2D;
  eigenResult: EigenResult | null;
  showTransformation: boolean;
  selectedVector: Vector2D | null;
  onVectorClick: (vector: Vector2D) => void;
}

export function EigenCanvas({ 
  matrix, 
  eigenResult, 
  showTransformation, 
  selectedVector,
  onVectorClick 
}: EigenCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scale = 40; // pixels per unit
  const centerX = 250;
  const centerY = 250;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawAxes(ctx);
    drawUnitCircle(ctx);
    drawSampleVectors(ctx);
    if (eigenResult) {
      drawEigenvectors(ctx);
    }
    if (selectedVector) {
      drawSelectedVector(ctx);
    }
  }, [matrix, eigenResult, showTransformation, selectedVector]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    ctx.strokeStyle = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--math-grid').trim()})`;
    ctx.lineWidth = 0.5;
    
    for (let i = -10; i <= 10; i++) {
      if (i === 0) continue;
      ctx.beginPath();
      ctx.moveTo(centerX + i * scale, 0);
      ctx.lineTo(centerX + i * scale, canvas.height);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, centerY + i * scale);
      ctx.lineTo(canvas.width, centerY + i * scale);
      ctx.stroke();
    }
  };

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    ctx.strokeStyle = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--math-axis').trim()})`;
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    
    // Axis labels
    ctx.fillStyle = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--math-axis').trim()})`;
    ctx.font = '12px monospace';
    ctx.fillText('x', canvas.width - 20, centerY - 10);
    ctx.fillText('y', centerX + 10, 15);
  };

  const drawUnitCircle = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--math-grid').trim()})`;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, scale, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.setLineDash([]);
  };

  const drawVector = (ctx: CanvasRenderingContext2D, vector: Vector2D, color: string, width: number = 2) => {
    const endX = centerX + vector.x * scale;
    const endY = centerY - vector.y * scale; // Flip Y for screen coordinates
    
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    
    // Draw vector line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Draw arrowhead
    const angle = Math.atan2(vector.y, vector.x);
    const headLength = 10;
    
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - headLength * Math.cos(angle - Math.PI / 6),
      endY + headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - headLength * Math.cos(angle + Math.PI / 6),
      endY + headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  };

  const drawSampleVectors = (ctx: CanvasRenderingContext2D) => {
    const sampleVectors = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 0.5 }
    ];
    
    const vectorColor = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--math-vector').trim()})`;
    const transformedColor = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--math-transformed').trim()})`;
    
    sampleVectors.forEach(vector => {
      // Draw original vector
      drawVector(ctx, vector, vectorColor, 1.5);
      
      // Draw transformed vector if enabled
      if (showTransformation) {
        const transformed = transformVector(matrix, vector);
        drawVector(ctx, transformed, transformedColor, 2);
        
        // Draw connection line
        ctx.strokeStyle = transformedColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(centerX + vector.x * scale, centerY - vector.y * scale);
        ctx.lineTo(centerX + transformed.x * scale, centerY - transformed.y * scale);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  };

  const drawEigenvectors = (ctx: CanvasRenderingContext2D) => {
    if (!eigenResult) return;
    
    const eigenvectorColor = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--math-eigenvector').trim()})`;
    
    eigenResult.eigenvectors.forEach((eigenvector, index) => {
      const eigenvalue = eigenResult.eigenvalues[index];
      
      // Draw eigenvector in both directions
      drawVector(ctx, eigenvector, eigenvectorColor, 3);
      drawVector(ctx, { x: -eigenvector.x, y: -eigenvector.y }, eigenvectorColor, 3);
      
      // Draw scaled eigenvector to show eigenvalue effect
      if (showTransformation && Math.abs(eigenvalue) > 0.01) {
        const scaled = { x: eigenvector.x * eigenvalue, y: eigenvector.y * eigenvalue };
        ctx.strokeStyle = eigenvectorColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 4]);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + scaled.x * scale, centerY - scaled.y * scale);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      // Label eigenvalue
      ctx.fillStyle = eigenvectorColor;
      ctx.font = '14px monospace';
      const labelX = centerX + eigenvector.x * scale * 1.2;
      const labelY = centerY - eigenvector.y * scale * 1.2;
      ctx.fillText(`λ${index + 1} = ${eigenvalue.toFixed(2)}`, labelX, labelY);
    });
  };

  const drawSelectedVector = (ctx: CanvasRenderingContext2D) => {
    if (!selectedVector) return;
    
    const primaryColor = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()})`;
    
    // Draw selected vector with highlight
    ctx.shadowColor = primaryColor;
    ctx.shadowBlur = 10;
    drawVector(ctx, selectedVector, primaryColor, 4);
    ctx.shadowBlur = 0;
    
    // Draw transformed version
    if (showTransformation) {
      const transformed = transformVector(matrix, selectedVector);
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 10;
      drawVector(ctx, transformed, primaryColor, 4);
      ctx.shadowBlur = 0;
    }
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to mathematical coordinates
    const mathX = (x - centerX) / scale;
    const mathY = -(y - centerY) / scale; // Flip Y
    
    onVectorClick({ x: mathX, y: mathY });
  };

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      onClick={handleCanvasClick}
      className="border border-border rounded-lg cursor-crosshair bg-card shadow-card"
    />
  );
}