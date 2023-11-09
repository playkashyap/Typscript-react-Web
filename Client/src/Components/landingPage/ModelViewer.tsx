import { Suspense } from "react";
import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GltfModel from './GltfModel';
import './background.scss';

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
            className="background"
            style={{
                width: '100vw',
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