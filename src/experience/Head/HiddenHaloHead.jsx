
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Color } from "three";
import DiamondMaterial from '../DiamondMaterial';

export default function HiddenHaloHead(props) {
  const { nodes, materials } = useGLTF("/models/head/HiddenHalo.glb");
  console.log(props);
  
  materials["ROSE GOLD.004"].metalness = props.metalness;
  materials["ROSE GOLD.004"].roughness = props.roughness;
  materials["ROSE GOLD.004"].color = new Color(props.color);
  materials["ROSE GOLD.002"].metalness = props.metalness;
  materials["ROSE GOLD.002"].roughness = props.roughness;
  materials["ROSE GOLD.002"].color = new Color(props.color);
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.round001.geometry}
        material={materials['ROSE GOLD.004']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.hidden_halo001.geometry}
        material={materials['ROSE GOLD.002']}
        position={[0, 0.096, 0]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['hidden_halo_-_diamonds001'].geometry}
        material={materials['DIAMOND.001']}
        position={[0, 0.096, 0]}
        scale={0.965}
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
  )
}

useGLTF.preload("/models/head/HiddenHalo.glb");