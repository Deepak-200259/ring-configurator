import { useGLTF } from "@react-three/drei";
import { Color } from "three";

export default function OvalHead(props) {
  const { nodes, materials } = useGLTF("/models/head/Oval.glb");
  materials["ROSE GOLD"].metalness = props.metalness;
  materials["ROSE GOLD"].roughness = props.roughness;
  materials["ROSE GOLD"].color = new Color(props.color);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.oval.geometry}
        material={materials["ROSE GOLD"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/head/Oval.glb");
