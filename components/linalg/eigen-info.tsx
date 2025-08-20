import React from 'react';
import { EigenResult, Vector2D } from '@/components/linalg/matrix-math';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EigenInfoProps {
  eigenResult: EigenResult | null;
  selectedVector: Vector2D | null;
}

export function EigenInfo({ eigenResult, selectedVector }: EigenInfoProps) {
  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-mono bg-gradient-primary bg-clip-text text-transparent">
          Eigen Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Explanation */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong className="text-math-eigenvector">Eigenvectors</strong> are special vectors that don't change direction when transformed by a matrix.
          </p>
          <p>
            <strong className="text-math-eigenvector">Eigenvalues</strong> tell us how much the eigenvector gets scaled.
          </p>
        </div>

        {/* Eigenvalues and Eigenvectors */}
        {eigenResult && eigenResult.eigenvalues.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-mono text-sm font-semibold">Results:</h3>
            {eigenResult.eigenvalues.map((eigenvalue, index) => {
              const eigenvector = eigenResult.eigenvectors[index];
              return (
                <div key={index} className="border border-border rounded-lg p-3 bg-gradient-surface">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-math-eigenvector border-math-eigenvector">
                      λ{index + 1}
                    </Badge>
                    <span className="font-mono text-sm">
                      = {eigenvalue.toFixed(3)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Eigenvector: ({eigenvector.x.toFixed(3)}, {eigenvector.y.toFixed(3)})
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {eigenvalue > 1 && "Stretches the vector"}
                    {eigenvalue === 1 && "Preserves vector length"}
                    {eigenvalue > 0 && eigenvalue < 1 && "Shrinks the vector"}
                    {eigenvalue === 0 && "Collapses to zero"}
                    {eigenvalue < 0 && "Flips and scales the vector"}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {eigenResult === null 
              ? "No real eigenvalues found (complex eigenvalues indicate rotation)"
              : "This matrix has no eigenvalues"
            }
          </div>
        )}

        {/* Selected Vector Info */}
        {selectedVector && (
          <div className="border-t border-border pt-4">
            <h3 className="font-mono text-sm font-semibold mb-2">Selected Vector:</h3>
            <div className="bg-gradient-surface rounded-lg p-3">
              <div className="font-mono text-sm">
                ({selectedVector.x.toFixed(3)}, {selectedVector.y.toFixed(3)})
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Click on the canvas to select a different vector
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="border-t border-border pt-4">
          <h3 className="font-mono text-sm font-semibold mb-2">Legend:</h3>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-math-vector"></div>
              <span>Original vectors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-math-transformed"></div>
              <span>Transformed vectors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-math-eigenvector"></div>
              <span>Eigenvectors</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}