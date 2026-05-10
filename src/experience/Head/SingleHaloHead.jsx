import { useGLTF } from "@react-three/drei";
import { Color } from "three";
import DiamondMaterial from "../DiamondMaterial";

export default function SingleHaloHead(props) {
  const { nodes, materials } = useGLTF("/models/head/SingleHalo.glb");
  materials["ROSE GOLD"].metalness = props.metalness;
  materials["ROSE GOLD"].roughness = props.roughness;
  materials["ROSE GOLD"].color = new Color(props.color);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["4_prong"].geometry}
        material={materials["ROSE GOLD"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.diamond.geometry}
        material={materials.DIAMOND}
      >
        <DiamondMaterial
          envMap={props.diamondTextureMap}
          bounces={6}
          ior={2.43}
          aberrationStrength={0.012}
          fresnel={0.1}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.metal.geometry}
        material={materials["ROSE GOLD"]}
      />
    </group>
  );
}

useGLTF.preload("/models/head/SingleHalo.glb");
