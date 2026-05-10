import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Color } from "three";

export default function HeartHead(props) {
  const { scene } = useGLTF("/models/head/Heart.glb");
  const model = useMemo(() => scene.clone(), [scene]);

  model.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = true;
    child.receiveShadow = true;
    const mat = child.material;
    if (!mat || !mat.name?.toUpperCase().includes("ROSE GOLD")) return;
    mat.metalness = props.metalness;
    mat.roughness = props.roughness;
    mat.color = new Color(props.color);
  });

  return (
    <group {...props} dispose={null}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload("/models/head/Heart.glb");
