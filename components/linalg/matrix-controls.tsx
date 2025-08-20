import React from 'react';
import { Matrix2D, PRESET_MATRICES } from '@/components/linalg/matrix-math';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface MatrixControlsProps {
  matrix: Matrix2D;
  onMatrixChange: (matrix: Matrix2D) => void;
}

export function MatrixControls({ matrix, onMatrixChange }: MatrixControlsProps) {
  const updateMatrix = (field: keyof Matrix2D, value: number) => {
    onMatrixChange({ ...matrix, [field]: value });
  };

  const loadPreset = (preset: Matrix2D) => {
    onMatrixChange(preset);
  };

  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-zinc-100">
          Matrix Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Matrix Display */}
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">Transformation Matrix</div>
          <div className="font-mono text-lg border border-border rounded-lg p-4 bg-gradient-surface">
            <div className="grid grid-cols-2 gap-4 max-w-32 mx-auto">
              <span className="text-primary">{matrix.a.toFixed(2)}</span>
              <span className="text-primary">{matrix.b.toFixed(2)}</span>
              <span className="text-primary">{matrix.c.toFixed(2)}</span>
              <span className="text-primary">{matrix.d.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Matrix Sliders */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-mono">a (top-left): {matrix.a.toFixed(2)}</Label>
            <Slider
              value={[matrix.a]}
              onValueChange={([value]) => updateMatrix('a', value)}
              min={-3}
              max={3}
              step={0.1}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-sm font-mono">b (top-right): {matrix.b.toFixed(2)}</Label>
            <Slider
              value={[matrix.b]}
              onValueChange={([value]) => updateMatrix('b', value)}
              min={-3}
              max={3}
              step={0.1}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-sm font-mono">c (bottom-left): {matrix.c.toFixed(2)}</Label>
            <Slider
              value={[matrix.c]}
              onValueChange={([value]) => updateMatrix('c', value)}
              min={-3}
              max={3}
              step={0.1}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-sm font-mono">d (bottom-right): {matrix.d.toFixed(2)}</Label>
            <Slider
              value={[matrix.d]}
              onValueChange={([value]) => updateMatrix('d', value)}
              min={-3}
              max={3}
              step={0.1}
              className="mt-2"
            />
          </div>
        </div>

        {/* Preset Matrices */}
        <div>
          <Label className="text-sm font-mono mb-3 block">Preset Matrices</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset(PRESET_MATRICES.identity)}
              className="text-xs"
            >
              Identity
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset(PRESET_MATRICES.scale)}
              className="text-xs"
            >
              Scale
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset(PRESET_MATRICES.rotation)}
              className="text-xs"
            >
              Rotation
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset(PRESET_MATRICES.reflection)}
              className="text-xs"
            >
              Reflection
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset(PRESET_MATRICES.shear)}
              className="text-xs"
            >
              Shear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset(PRESET_MATRICES.diagonal)}
              className="text-xs"
            >
              Diagonal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}