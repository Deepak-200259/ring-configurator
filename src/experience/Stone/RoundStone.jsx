import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import DiamondMaterial from "../DiamondMaterial";

export function RoundStone(props) {
  const { nodes } = useGLTF("models/stone/Round.glb");
  const meshRef = useRef();
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes["all-diamonds1217"].geometry}
        material={nodes["all-diamonds1217"].material} // Overridden in useEffect
        position={[0.001, 0.2, 0.007]}
        scale={0.4}
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

useGLTF.preload("models/stone/Round.glb");
