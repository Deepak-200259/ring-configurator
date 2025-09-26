import { Environment, OrbitControls } from "@react-three/drei";
import Shank from "./Shank/Shank";
import Stone from "./Stone/Stone";
import Head from "./Head/Head";
import * as THREE from "three";
const ColorProps = {
  "ROSE GOLD": 0xf8b996,
  "METAL GOLD": 0xdbdbdb,
};

const materialProperties = {
  "ROSE GOLD": {
    metalness: 0.95,
    roughness: 0.1,
  },
};

export default function Experience(props) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight intensity={2} position={[-5, 5, 5]} />
      {/* <pointLight intensity={2} position={[5, 5, -5]} /> */}
      <OrbitControls />

      {/* ✅ Postprocessing */}
      {/* <Effect /> */}
      {/* <EffectComposer>
        <Bloom mipmapBlur intensity={1.5} luminanceThreshold={0.9} />
        
      </EffectComposer> */}

      <Environment path="hdr/metal-env-map" environmentIntensity={1} />

      <Shank
        selectedStyle={props.selectedStyle}
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
