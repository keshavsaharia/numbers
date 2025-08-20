import { Handle, Position, useConnection } from '@xyflow/react';
 
export default function CustomNode({ id, data }: { id: string, data: any }) {
  const connection = useConnection();
 
  const isTarget = connection.inProgress && connection.fromNode.id !== id;
 
  const label = isTarget ? 'Drop here' : 'Drag to connect';
 
  return (
    <div className="bg-zinc-700 rounded-full w-20 h-20">
      <div
        className="relative w-full h-full flex items-center justify-center align-middle font-bold text-white"
      >
        {/* If handles are conditionally rendered and not present initially, you need to update the node internals https://reactflow.dev/docs/api/hooks/use-update-node-internals/ */}
        {/* In this case we don't need to use useUpdateNodeInternals, since !isConnecting is true at the beginning and all handles are rendered initially. */}
        {!connection.inProgress && (
          <Handle
            className="w-full h-full top-0 left-0 transform-none rounded-none opacity-0"
            position={Position.Right}
            type="source"
          />
        )}
        {/* We want to disable the target handle, if the connection was started from this node */}
        {(!connection.inProgress || isTarget) && (
          <Handle className="w-full h-full bg-zinc-700 top-0 left-0 transform-none rounded-none opacity-0" position={Position.Left} type="target" isConnectableStart={false} />
        )}
        {data.label}
      </div>
    </div>
  );
}