import { Suspense } from "react";
import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GltfModel from './GltfModel';

const ModelViewer = (props: any) => {
    const [modelPath, setModelPath] = React.useState();
    const [scale, setScale] = React.useState();

    React.useEffect(() => {
        setModelPath(props.modelPath);
        setScale(props.scale);
    }, [props.modelPath, props.scale]);

    const position = [0, -3, 0];

    return (
        <Canvas
            // camera={{ position: [2, 0, 12.25], fov: 15 }}
            style={{
                backgroundColor: '#111a21',
                width: '500px',
                height: '500px',
            }}
        >
            <ambientLight intensity={1} />

            <pointLight position={[0, 0, 0]} />
            <hemisphereLight intensity={1} />
            <Suspense fallback={null}>
                <GltfModel modelPath={modelPath} scale={scale} position={position} />
                <OrbitControls />
            </Suspense>
        </Canvas>
    );
};

export default ModelViewer;