import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import DiamondMaterial from "../DiamondMaterial";
import { Color } from "three";

export default function OvalSideStones(props) {
  const { nodes, materials } = useGLTF("./models/head/Oval-SideStones.glb");
  materials["ROSE GOLD.003"].metalness = props.metalness;
  materials["ROSE GOLD.003"].roughness = props.roughness;
  materials["ROSE GOLD.003"].color = new Color(props.color);
  return (
    <group {...props} dispose={null}>
      <group
        position={[-2.842, 0.307, 0]}
        rotation={[Math.PI / 2, 0.196, Math.PI]}
        scale={0.654}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.oval004.geometry}
          material={materials["ROSE GOLD.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.oval004_1.geometry}
          material={materials["DIAMOND.003"]}
        >
          <DiamondMaterial
            envMap={props.diamondTextureMap}
            bounces={6}
            ior={2.43}
            aberrationStrength={0.012}
            fresnel={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("./models/head/Oval-SideStones.glb");
