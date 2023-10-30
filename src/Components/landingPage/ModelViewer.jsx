import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GltfModel from './GltfModel';

const ModelViewer = ({ modelPath, scale = 1000, position = [0, 0, 0] }) => {
    return (
        <Canvas
            camera={{ position: [2, 0, 12.25], fov: 15 }}
            style={{
                backgroundColor: '#111a21',
                width: '100vw',
                height: '100vh',
            }}
        >
            <ambientLight intensity={0.7} />
            
            <pointLight position={[-10, -10, -10]} />
            <hemisphereLight intensity={1}/>
            <Suspense fallback={null}>
                <GltfModel modelPath={modelPath} scale={scale} position={position} />
                <OrbitControls />
            </Suspense>
        </Canvas>
    );
};

export default ModelViewer;