import React, { useEffect, useRef } from "react";
import { MeshRefractionMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { diamondTexture } from "../../assets";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { useLoader } from "@react-three/fiber";

export function RoundStone(props) {
  const { nodes } = useGLTF("models/stone/Round.glb");
  const meshRef = useRef();
  // https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr - Yellow Diamond
  // https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr - Dark Blue
  const envMap = useLoader(RGBELoader, "hdr/metal3.hdr");
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  envMap.colorSpace = THREE.SRGBColorSpace;
  envMap.repeat.set(0, 0);
  envMap.wrapS = THREE.RepeatWrapping;
  envMap.wrapT = THREE.RepeatWrapping;
  const map = useLoader(THREE.TextureLoader, diamondTexture);
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes["all-diamonds1217"].geometry}
        material={nodes["all-diamonds1217"].material} // Overridden in useEffect
        position={[0.001, 0.338, 0.007]}
        scale={0.398}
      >
        <MeshRefractionMaterial
          map={map}
          envMap={envMap}
          envMapIntensity={5}
          aberrationStrength={0.01}
          toneMapped={true}
          bounces={4}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("models/stone/Round.glb");
