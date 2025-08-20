import React from 'react';
import { getStraightPath } from '@xyflow/react';
 
function CustomConnectionLine({ fromX, fromY, toX, toY, connectionLineStyle }: { 
  fromX: number, fromY: number, 
  toX: number, toY: number, 
  connectionLineStyle?: React.CSSProperties
}) {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });
 
  return (
    <g>
      <path style={connectionLineStyle} fill="none" d={edgePath} />
    </g>
  );
}
 
export default CustomConnectionLine;