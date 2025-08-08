'use client'

import React, { useState, useEffect } from 'react';
import { Matrix2D, Vector2D, calculateEigenvaluesAndVectors, PRESET_MATRICES, EigenResult } from '@/components/linalg/matrix-math';
import { EigenCanvas } from '@/components/linalg/eigen-canvas';
import { MatrixControls } from '@/components/linalg/matrix-controls';
import { EigenInfo } from '@/components/linalg/eigen-info';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function EigenvectorVisualizer() {
  const [matrix, setMatrix] = useState<Matrix2D>(PRESET_MATRICES.diagonal);
  const [eigenResult, setEigenResult] = useState<EigenResult | null>(null);
  const [showTransformation, setShowTransformation] = useState(true);
  const [selectedVector, setSelectedVector] = useState<Vector2D | null>({ x: 1, y: 0.5 });

  useEffect(() => {
    const result = calculateEigenvaluesAndVectors(matrix);
    setEigenResult(result);
  }, [matrix]);

  const handleVectorClick = (vector: Vector2D) => {
    setSelectedVector(vector);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">

        {/* Controls */}
        <Card className="mb-3 bg-zinc-800 border border-zinc-700 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-mono">Visualization Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="transformation"
                  checked={showTransformation}
                  onCheckedChange={setShowTransformation}
                />
                <Label htmlFor="transformation" className="font-mono text-sm">
                  Show Transformations
                </Label>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setSelectedVector(null)}
                size="sm"
              >
                Clear Selection
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Click on the canvas to select a vector
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex justify-center">
                <EigenCanvas
                  matrix={matrix}
                  eigenResult={eigenResult}
                  showTransformation={showTransformation}
                  selectedVector={selectedVector}
                  onVectorClick={handleVectorClick}
                />
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Grid shows unit vectors. Click anywhere to select a vector and see its transformation.</p>
                <p className="mt-1">
                  <span className="text-math-eigenvector">Green vectors</span> are eigenvectors - they only scale, never rotate!
                </p>
              </div>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            <MatrixControls matrix={matrix} onMatrixChange={setMatrix} />
            <EigenInfo eigenResult={eigenResult} selectedVector={selectedVector} />
          </div>
        </div>
      </div>
    </div>
  );
}