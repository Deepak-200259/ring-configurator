import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { diamondTexture } from "../../assets";

export function RoundStone(props) {
  const { nodes } = useGLTF("models/stone/Round.glb");
  const meshRef = useRef();

  useEffect(() => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;

    // ✅ Load the texture
    new THREE.TextureLoader().load(diamondTexture, (texture) => {
      texture.mapping = THREE.CubeReflectionMapping
      // ✅ Create a new physically-based material with the loaded texture
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.3,
        transmission: 1,
        thickness: 5,
        ior: 2.47,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        envMap: texture,
        envMapIntensity: 15,
        transparent: true,

        // envMap: D,
        // metalness: s,
        // roughness: n,
        // reflectivity: i,
        // clearcoat: o,
        // clearcoatRoughness: c,
      });
      console.log(material);
      
      // ✅ Apply all userData deeply from the original material
      const userData = mesh.material.userData;
      for (const key in userData) {
        const value = userData[key];

        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          for (const innerKey in value) {
            try {
              material[innerKey] = value[innerKey];
            } catch (e) {
              console.warn(`Could not apply property: ${innerKey}`, e);
            }
          }
        } else {
          try {
            material[key] = value;
          } catch (e) {
            console.warn(`Could not apply property: ${key}`, e);
          }
        }
      }

      material.needsUpdate = true;
      mesh.material = material;
    });
  }, []);

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
      />
    </group>
  );
}

useGLTF.preload("models/stone/Round.glb");
