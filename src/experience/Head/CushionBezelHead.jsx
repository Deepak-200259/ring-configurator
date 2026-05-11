import { useGLTF } from "@react-three/drei";
import { Color } from "three";

const GLB = "/models/head/Cushion-Bezel.glb";

export default function CushionBezelHead(props) {
  const { nodes, materials } = useGLTF(GLB);
  materials["ROSE GOLD"].metalness = props.metalness;
  materials["ROSE GOLD"].roughness = props.roughness;
  materials["ROSE GOLD"].color = new Color(props.color);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cushion.geometry}
        material={materials["ROSE GOLD"]}
        position={[0, 10.11, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(GLB);
