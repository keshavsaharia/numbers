import React, { useState, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Interactive } from '@/components/number/interactive';

export interface Point {
  x: number;
  y: number;
}

interface PolygonCanvasProps {
  points: Point[];
  onPointsChange: (points: Point[]) => void;
  rotatedPoints: Point[];
  rotationAngle: number;
  width?: number;
  height?: number;
}

const PolygonCanvas: React.FC<PolygonCanvasProps> = ({
  points,
  onPointsChange,
  rotatedPoints,
  rotationAngle,
  width = 400,
  height = 400,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const handleCanvasClick = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert to centered coordinates (origin at center)
    const centerX = x - width / 2;
    const centerY = -(y - height / 2); // Flip Y axis for mathematical coordinates

    const newPoint: Point = { x: centerX, y: centerY };
    onPointsChange([...points, newPoint]);
  }, [points, onPointsChange, width, height]);

  const handlePointDelete = useCallback((index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newPoints = points.filter((_, i) => i !== index);
    onPointsChange(newPoints);
  }, [points, onPointsChange]);

  // Convert mathematical coordinates to SVG coordinates
  const toSVG = (point: Point) => ({
    x: point.x + width / 2,
    y: -point.y + height / 2,
  });

  // Generate grid lines
  const gridLines = [];
  const gridSpacing = 20;
  
  // Vertical lines
  for (let x = 0; x <= width; x += gridSpacing) {
    gridLines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        className="grid-pattern"
      />
    );
  }
  
  // Horizontal lines
  for (let y = 0; y <= height; y += gridSpacing) {
    gridLines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        className="grid-pattern"
      />
    );
  }

  // Create polygon path for original points
  const createPolygonPath = (pts: Point[]) => {
    if (pts.length < 3) return '';
    const svgPoints = pts.map(toSVG);
    return `M ${svgPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
  };

  return (
    <Interactive instructions="Click to add points to the 2D plane, then adjust the slider to rotate your polygon.">
      <div className="space-y-2">
        <div className="canvas-container rounded-lg overflow-hidden">
          <svg
            ref={svgRef}
            width={width}
            height={height}
            onClick={handleCanvasClick}
            className="cursor-crosshair"
          >
            {/* Grid pattern */}
            <defs>
              <pattern id="grid" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
                <path d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`} fill="none" className="grid-pattern" />
              </pattern>
            </defs>
            <rect width={width} height={height} fill="url(#grid)" />
            
            {/* Center axes */}
            <line x1={width/2} y1={0} x2={width/2} y2={height} stroke="gray" strokeWidth="1" />
            <line x1={0} y1={height/2} x2={width} y2={height/2} stroke="gray" strokeWidth="1" />
            
            {/* Original polygon */}
            {points.length > 2 && (
              <path
                d={createPolygonPath(points)}
                fillOpacity="0.6"
                fill="oklch(48.8% 0.243 264.376)"
              />
            )}
            
            {/* Rotated polygon */}
            {rotatedPoints.length > 2 && (
              <path
                d={createPolygonPath(rotatedPoints)}
                className="rotated-polygon"
                fillOpacity="0.6"
                fill="oklch(52.7% 0.154 150.069)"
              />
            )}
            
            {/* Original points */}
            {points.map((point, index) => {
              const svgPoint = toSVG(point);
              return (
                <g key={`original-${index}`}>
                  <circle
                    cx={svgPoint.x}
                    cy={svgPoint.y}
                    r="6"
                    fill="oklch(62.3% 0.214 259.815)"
                    onMouseEnter={() => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    onContextMenu={(e) => handlePointDelete(index, e)}
                  />
                  {hoveredPoint === index && (
                    <text
                      x={svgPoint.x - 3}
                      y={svgPoint.y - 15}
                      textAnchor="middle"
                      fill="#4477aa"
                      className="text-xs font-medium fill-current"
                    >
                      P{index + 1}({point.x.toFixed(0)}, {point.y.toFixed(0)})
                    </text>
                  )}
                </g>
              );
            })}
            
            {/* Rotated points */}
            {rotatedPoints.map((point, index) => {
              const svgPoint = toSVG(point);
              return (
                <circle
                  key={`rotated-${index}`}
                  cx={svgPoint.x}
                  cy={svgPoint.y}
                  r="4"
                  fill="oklch(72.3% 0.219 149.579)"
                />
              );
            })}
            
            {/* Center origin indicator */}
            <circle
              cx={width/2}
              cy={height/2}
              r="3"
              fill="hsl(var(--border))"
            />
          </svg>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Points: {points.length}</span>
          <span>Rotation: {rotationAngle.toFixed(1)}°</span>
        </div>
      </div>
    </Interactive>
  );
};

export default PolygonCanvas;