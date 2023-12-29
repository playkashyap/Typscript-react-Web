import ModelViewer from './ModelViewer';

export default function Landing() {
    const path : any = "/model.glb";
    // const path : any = "/gladiator.glb";    
    const scale : number = 3;
    return (
        <>
            <ModelViewer scale={scale} modelPath={path} />
        </>
    );
}