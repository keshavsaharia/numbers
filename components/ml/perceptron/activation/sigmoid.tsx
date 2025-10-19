import { useMemo } from 'react';
import { ActivationFunctionTitle } from './shared';

export function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

// Generate points from -10 to 10
const sigmoidPoints = Array.from({ length: 200 }, (_, i) => {
  const x = -10 + (i / 200) * 20;
  const y = sigmoid(x);
  return { x, y };
});
const sigmoidTicks = [-10, -5, 0, 5, 10];

export function SigmoidCurve({ width = 160, height = 100, padding = 15, currentX = 0 }: { width?: number, height?: number, padding?: number, currentX?: number }) {
  currentX = Math.max(Math.min(currentX, 10), -10);
  const currentY = sigmoid(currentX);

  // Scale functions
  const scaleX = (x: number) => ((x + 10) / 20) * (width - 2 * padding) + padding;
  const scaleY = (y: number) => (1 - y) * (height / 2) + padding;

  const pathData = useMemo(() => sigmoidPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${scaleX(p.x)},${scaleY(p.y)}`)
    .join(' '), [width, padding]);

  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg">
      <ActivationFunctionTitle name="sigmoid" />
    <svg width={width} height={height} className="w-full h-auto">
      {sigmoidTicks.map(t => (
        <g key={t}>
          <line className="stroke-zinc-500 opacity-30" x1={scaleX(t)} y1={height / 2 + padding - 5} x2={scaleX(t)} y2={height / 2 + padding + 5} />
          <text className="fill-zinc-500 dark:fill-zinc-400" x={scaleX(t)} y={height / 2 + padding + 15} fontSize={10} textAnchor="middle">{t}</text>
        </g>
      ))}
      <line className="stroke-zinc-500 opacity-30" x1={width/2 - 5} y1={padding} x2={width/2 + 5} y2={padding} />
      <text className="fill-zinc-500 dark:fill-zinc-400" x={width/2 - 12} y={padding + 5} fontSize={10} textAnchor="middle">1</text>
      <line className="stroke-zinc-500 opacity-30" x1={padding} y1={height / 2 + padding} x2={width - padding} y2={height / 2 + padding} strokeWidth={1} />
      <line className="stroke-zinc-500 opacity-30" x1={width / 2} y1={padding} x2={width / 2} y2={height - padding} strokeWidth={1} />
      <path d={pathData} fill="none" className="stroke-indigo-500 opacity-50" strokeWidth={2} />
      <circle className="fill-indigo-300 dark:fill-indigo-500" cx={scaleX(currentX)} cy={scaleY(currentY)} r={5} />
    </svg>
    </div>
  );
}