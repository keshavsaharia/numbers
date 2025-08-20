import React from 'react';
import { Card } from '@/components/ui/card';
import { Point } from './PolygonCanvas';

interface MatrixDisplayProps {
  title: string;
  points: Point[];
  className?: string;
}

const MatrixDisplay: React.FC<MatrixDisplayProps> = ({ title, points, className = '' }) => {
  if (points.length === 0) {
    return (
      <Card className={`p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-math-primary mb-4">{title}</h3>
        <div className="text-center text-muted-foreground">
          No points to display
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-math-primary mb-4">{title}</h3>
      
      <div className="matrix-container flex justify-center">
        <div className="matrix">
          {/* X coordinates row */}
          <div className="matrix-row">
            {points.map((point, index) => (
              <div key={`x-${index}`} className="matrix-element">
                {point.x.toFixed(1)}
              </div>
            ))}
          </div>
          
          {/* Y coordinates row */}
          <div className="matrix-row">
            {points.map((point, index) => (
              <div key={`y-${index}`} className="matrix-element">
                {point.y.toFixed(1)}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-center text-muted-foreground">
        {points.length} point{points.length !== 1 ? 's' : ''} • 2×{points.length} matrix
      </div>
    </Card>
  );
};

export default MatrixDisplay;