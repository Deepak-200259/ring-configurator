import { Environment, OrbitControls } from "@react-three/drei";
import Shank from "./Shank/Shank";
import Stone from "./Stone/Stone";
import Head from "./Head/Head";
import * as THREE from "three";
const ColorProps = {
  "ROSE GOLD": 0xf8b996,
};

const materialProperties = {
  "ROSE GOLD": {
    metalness: 0.95,
    roughness: 0.15,
  },
};

export default function Experience() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight intensity={1} position={[10, 10, 10]} />
      <OrbitControls />

      {/* ✅ Postprocessing */}
      {/* <Effect /> */}
      {/* <EffectComposer>
        <Bloom mipmapBlur intensity={1.5} luminanceThreshold={0.9} />
        
      </EffectComposer> */}

      <Environment preset="city" blur={0.5} />

      <Shank
        color={ColorProps["ROSE GOLD"]}
        {...materialProperties["ROSE GOLD"]}
      />
      <Stone
        color={ColorProps["ROSE GOLD"]}
        {...materialProperties["ROSE GOLD"]}
      />
      <Head
        color={ColorProps["ROSE GOLD"]}
        {...materialProperties["ROSE GOLD"]}
      />
    </>
  );
}
