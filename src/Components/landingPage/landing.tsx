import ModelViewer from './ModelViewer';

export default function Landing() {
    return (
        <>
            <ModelViewer scale="10" modelPath={"/model.glb"} />
        </>
    );
}