'use client'

import { useTheme } from 'next-themes'
import React, { useEffect, useRef } from 'react'

interface MatrixRainProps {
  fontSize?: number
  color?: string
  characters?: string
  width?: number
  height?: number
  fadeOpacity?: number
  speed?: number
}

export const MatrixRain: React.FC<MatrixRainProps> = ({
  fontSize = 20,
  characters = '01',
  fadeOpacity = 0.1,
  width = 800,
  height = 250,
  speed = 1 // Default speed multiplier
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme()

  const color = theme === 'light' ? '#0f0f0f' : '#f0f0f0';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = characters.split('');
    const drops: number[] = [];
    const columnCount = Math.floor(canvas.width / fontSize);

    for (let i = 0; i < columnCount; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = theme === 'light' ? `rgba(255, 255, 255, ${ fadeOpacity })` : `rgba(9, 9, 11, ${fadeOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed; // Apply speed multiplier
      }
    };

    // Adjust interval based on speed (faster speed = lower interval)
    const interval = setInterval(draw, 33 / speed);

    return () => {
      clearInterval(interval);
    };
  }, [fontSize, color, characters, fadeOpacity, speed]);

  return (
    <canvas
        style={{
            marginLeft: '-25px'
        }}
      ref={canvasRef}
    />
  );
};