import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const GltfModel = (props: any) => {

  const modelPath = props.modelPath;
  const scale = props.scale;
  const position = props.position;


  const ref: any = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);


  useFrame(() => (ref.current.rotation.y += 0.003));
  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        scale={scale}
      />
    </>
  );
};

export default GltfModel;