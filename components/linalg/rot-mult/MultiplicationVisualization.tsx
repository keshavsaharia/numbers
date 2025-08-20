import React from 'react';
import { Card } from '@/components/ui/card';
import { Point } from './PolygonCanvas';
import { ArrowRight, EqualIcon, X } from 'lucide-react';
import { Interactive } from '@/components/number/interactive';
import { MatrixDisplay } from '../matrix-display';

interface MultiplicationVisualizationProps {
  rotationAngle: number;
  originalPoints: Point[];
  rotatedPoints: Point[];
  className?: string;
}

const MultiplicationVisualization: React.FC<MultiplicationVisualizationProps> = ({
  rotationAngle,
  originalPoints,
  rotatedPoints,
  className = ''
}) => {
  const radians = (rotationAngle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  if (originalPoints.length === 0) {
    return (
      <Interactive instructions="Add points to see the matrix multiplication.">
        <div>
          Click the 2D plane above to add points to a polygon.
        </div>
      </Interactive>
    );
  }

  return (
    <Interactive instructions="The matrix multiplication of the rotation matrix R(θ) and the points matrix P is the rotated points matrix R(θ) &times; P.">
      <div className="space-y-6">
        {/* Formula display */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <MatrixDisplay matrix={originalPoints.map(p => [p.x, p.y])} />
          <X className="h-4 w-4 text-math-primary" />
          <MatrixDisplay matrix={[[cos, -sin], [sin, cos]]} />
          <EqualIcon className="h-4 w-4 text-math-primary" />
          <MatrixDisplay matrix={rotatedPoints.map(p => [p.x, p.y])} />
        </div>
      </div>
    </Interactive>
  );
};

export default MultiplicationVisualization;