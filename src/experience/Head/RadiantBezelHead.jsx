import { useGLTF } from "@react-three/drei";
import { Color } from "three";

const GLB = "/models/head/Radiant-Bezel.glb";

export default function RadiantBezelHead(props) {
  const { nodes, materials } = useGLTF(GLB);
  materials["ROSE GOLD"].metalness = props.metalness;
  materials["ROSE GOLD"].roughness = props.roughness;
  materials["ROSE GOLD"].color = new Color(props.color);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Radiant.geometry}
        material={materials["ROSE GOLD"]}
        position={[0, 9.985, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(GLB);
