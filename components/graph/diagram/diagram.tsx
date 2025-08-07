'use client'

import React, { useCallback } from 'react';
 
import {
  Background,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Node,
  Edge,
  EdgeTypes,
  Connection,
  DefaultEdgeOptions,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
 
import CustomNode from './vertex';
import FloatingEdge from './edge';
import CustomConnectionLine from './line';
 
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { label: '1' }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 320 },
    data: { label: '2' }
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 40, y: 300 },
    data: { label: '3' }
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 300, y: 0 },
    data: { label: '4' }
  },
];
 
const initialEdges: Edge[] = [
  {
    id: '1',
    source: '1',
    target: '2'
  },
  {
    id: '2',
    source: '2',
    target: '3'
  },
];
const connectionLineStyle = {
  stroke: '#b1b1b7',
};
 
const nodeTypes = {
  custom: CustomNode,
};
 
const edgeTypes: EdgeTypes = {
  floating: FloatingEdge,
};
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#9f9f9f',
  },
};
 
export const GraphDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      console.log(params)
      setEdges((eds: Edge[]) => addEdge(params, eds))
    },
    [setEdges]);
 
  return (
    <div className='w-full h-100'>
      <ReactFlow
        className='rounded-lg border-zinc-700 border-2'
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={connectionLineStyle}
      >
        <Background color='#9f9f9f' bgColor='#2f2f2f' />
      </ReactFlow>
    </div>
  );
  
};
