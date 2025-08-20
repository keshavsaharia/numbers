import React from 'react';
import { Card } from '@/components/ui/card';

interface RotationMatrixProps {
  angle: number; // in degrees
  className?: string;
}

const RotationMatrix: React.FC<RotationMatrixProps> = ({ angle, className = '' }) => {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-math-primary mb-4">
        Rotation Matrix R({angle.toFixed(1)}°)
      </h3>
      
      <div className="matrix-container flex justify-center">
        <div className="matrix">
          {/* First row: cos θ, -sin θ */}
          <div className="matrix-row">
            <div className="matrix-element">
              {cos.toFixed(3)}
            </div>
            <div className="matrix-element">
              {(-sin).toFixed(3)}
            </div>
          </div>
          
          {/* Second row: sin θ, cos θ */}
          <div className="matrix-row">
            <div className="matrix-element">
              {sin.toFixed(3)}
            </div>
            <div className="matrix-element">
              {cos.toFixed(3)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-center text-muted-foreground space-y-1">
        <div>cos({angle.toFixed(1)}°) = {cos.toFixed(3)}</div>
        <div>sin({angle.toFixed(1)}°) = {sin.toFixed(3)}</div>
      </div>
    </Card>
  );
};

export default RotationMatrix;