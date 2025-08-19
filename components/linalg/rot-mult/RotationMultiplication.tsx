'use client'

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, RotateCcw } from 'lucide-react';
import PolygonCanvas, { Point } from './PolygonCanvas';
import AngleControl from './AngleControl';
import MultiplicationVisualization from './MultiplicationVisualization';

const RotationMultiplication = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Calculate rotated points using rotation matrix
  const rotatedPoints = useMemo(() => {
    const radians = (rotationAngle * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    return points.map(point => ({
      x: cos * point.x - sin * point.y,
      y: sin * point.x + cos * point.y,
    }));
  }, [points, rotationAngle]);

  const clearPoints = () => {
    setPoints([]);
  };

  const resetTransformation = () => {
    setRotationAngle(0);
  };

  return (
    <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          {/* Left Column - Interactive Elements */}
          <div className="space-y-6 col-span-3">
            <PolygonCanvas
              points={points}
              onPointsChange={setPoints}
              rotatedPoints={rotatedPoints}
              rotationAngle={rotationAngle}
              width={500}
              height={400}
            />
          </div>
          <div className="col-span-1">
          <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                onClick={clearPoints}
                disabled={points.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Points
              </Button>
              <Button 
                variant="outline" 
                onClick={resetTransformation}
                disabled={rotationAngle === 0}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Rotation
              </Button>
              <AngleControl
              angle={rotationAngle}
              onAngleChange={setRotationAngle}
            />
          </div>
          </div>
        </div>
          <MultiplicationVisualization
            rotationAngle={rotationAngle}
            originalPoints={points}
            rotatedPoints={rotatedPoints}
          />
    </div>
  );
};

export default RotationMultiplication;