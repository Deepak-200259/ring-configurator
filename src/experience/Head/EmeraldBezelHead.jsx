import { useGLTF } from "@react-three/drei";
import { Color } from "three";

const GLB = "/models/head/Emerald-Bezel.glb";

export default function EmeraldBezelHead(props) {
  const { nodes, materials } = useGLTF(GLB);
  materials["ROSE GOLD"].metalness = props.metalness;
  materials["ROSE GOLD"].roughness = props.roughness;
  materials["ROSE GOLD"].color = new Color(props.color);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Emerald001.geometry}
        material={materials["ROSE GOLD"]}
        position={[0.076, 0.085, 0.01]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.964, 0.918, 1]}
      />
    </group>
  );
}

useGLTF.preload(GLB);
