import { getStraightPath, useInternalNode } from '@xyflow/react';
 
import { getEdgeParams } from './utils';
 
function FloatingEdge({ id, source, target, markerEnd, style, data, type }: { 
  id: string, 
  source: string, 
  target: string, 
  markerEnd?: any, 
  style?: React.CSSProperties,
  data?: any,
  type?: string
}) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
 
  if (!sourceNode || !targetNode) {
    return null;
  }
 
  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
 
  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });
 
  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      // markerEnd={markerEnd}
      style={style}
    />
  );
}
 
export default FloatingEdge;