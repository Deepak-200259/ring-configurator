import { useEffect, useMemo, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import DiamondMaterial from "../DiamondMaterial";

const path = "models/stone/radiant.obj";

export function RadiantStone(props) {
  const obj = useLoader(OBJLoader, path);
  const meshRef = useRef();
  const geometry = useMemo(() => {
    let cloned = null;
    obj.traverse((child) => {
      if (child.isMesh && cloned === null) cloned = child.geometry.clone();
    });
    return cloned;
  }, [obj]);
  useEffect(() => () => geometry?.dispose(), [geometry]);
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={geometry}
        scale={[0.39, 0.39, 0.39]}
      >
        <DiamondMaterial
          color={props.stoneColor}
          envMap={props.diamondTextureMap}
          bounces={6}
          ior={2.43}
          aberrationStrength={0.012}
          fresnel={0.1}
        />
      </mesh>
    </group>
  );
}

useLoader.preload(OBJLoader, path);
