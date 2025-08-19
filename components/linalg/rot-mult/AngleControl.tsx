import React from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { Interactive } from '@/components/number/interactive';

interface AngleControlProps {
  angle: number;
  onAngleChange: (angle: number) => void;
  className?: string;
}

const AngleControl: React.FC<AngleControlProps> = ({ 
  angle, 
  onAngleChange, 
  className = '' 
}) => {
  const handleSliderChange = (value: number[]) => {
    onAngleChange(value[0]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      onAngleChange(Math.max(-360, Math.min(360, value)));
    }
  };

  const resetAngle = () => {
    onAngleChange(0);
  };

  const presetAngles = [0, 30, 45, 60, 90, 120, 180, 270];

  return (
    <Interactive instructions="Adjust the angle of the rotation.">
      <div className="space-y-4">

        <div className="space-y-3">
          <div>
            <Label htmlFor="angle-input" className="text-sm font-medium">
              Degrees (θ)
            </Label>
            <Input
              id="angle-input"
              type="number"
              value={angle.toFixed(1)}
              onChange={handleInputChange}
              min={-360}
              max={360}
              step={0.1}
              className="mt-1"
            />
          </div>

          <div>
            <div className="mt-2">
              <Slider
                value={[angle]}
                onValueChange={handleSliderChange}
                min={-180}
                max={180}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>-180°</span>
              <span>0°</span>
              <span>180°</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Presets</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {presetAngles.map((presetAngle) => (
                <Button
                  key={presetAngle}
                  variant={angle === presetAngle ? "default" : "outline"}
                  size="sm"
                  onClick={() => onAngleChange(presetAngle)}
                  className="text-xs"
                >
                  {presetAngle}°
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-math-accent">
            {angle.toFixed(1)}°
          </div>
          <div className="text-xs text-muted-foreground">
            {(angle * Math.PI / 180).toFixed(3)} radians
          </div>
        </div>
      </div>
    </Interactive>
  );
};

export default AngleControl;