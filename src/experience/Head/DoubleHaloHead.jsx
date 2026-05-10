import { useGLTF } from "@react-three/drei";
import { Color } from "three";
import DiamondMaterial from "../DiamondMaterial";

export default function DoubleHaloHead(props) {
  const { nodes, materials } = useGLTF("/models/head/DoubleHalo.glb");
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.diamond001.geometry}
        material={materials.DIAMOND}
        position={[0, -0.612, 0]}
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
        geometry={nodes.metal001.geometry}
        material={materials["ROSE GOLD"]}
        position={[0, -0.612, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/head/DoubleHalo.glb");
