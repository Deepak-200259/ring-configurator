
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Color } from "three";

export default function BezelHead(props) {
  const { nodes, materials } = useGLTF("/models/head/Bezel.glb");
  materials["ROSE GOLD"].metalness = props.metalness;
  materials["ROSE GOLD"].roughness = props.roughness;
  materials["ROSE GOLD"].color = new Color(props.color);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ROUND001.geometry}
        material={materials["ROSE GOLD"]}
        position={[0, 10.041, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload("/models/head/Bezel.glb");