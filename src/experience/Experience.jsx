import { ContactShadows, Environment } from "@react-three/drei";
import { Shank, MatchingBandShank } from "./Shank/Shank";
import Stone from "./Stone/Stone";
import Head, { getHeadSwapKey } from "./Head/Head";
import CameraViewControls from "./CameraViewControls";
import SceneDeferredFadeSwap from "./SceneDeferredFadeSwap";
import * as THREE from "three";
import { diamondTexture } from "../assets";
import { useRingConfigurator } from "../context/RingConfiguratorContext";
import { useLoader } from "@react-three/fiber";
import { useCallback, useMemo } from "react";
const ColorProps = {
  "WHITE GOLD": 0xdbdbdb,
  "YELLOW GOLD": 0xffd280,
  "ROSE GOLD": 0xffbaa3,
  PLATINUM: 0xe5e4e2,
};

/** Shank METAL UI labels → keys above */
const metalUiToKey = {
  "White Gold": "WHITE GOLD",
  "Yellow Gold": "YELLOW GOLD",
  "Rose Gold": "ROSE GOLD",
  Platinum: "PLATINUM",
};

const materialProperties = {
  "WHITE GOLD": {
    metalness: 0.95,
    roughness: 0.05,
  },
  "YELLOW GOLD": {
    metalness: 0.95,
    roughness: 0,
  },
  "ROSE GOLD": {
    metalness: 0.95,
    roughness: 0.05,
  },
  PLATINUM: {
    metalness: 0.98,
    roughness: 0.12,
  },
};

export default function Experience() {
  const GROUND_COLOR = "#f8f8f8";
  const {
    selectedShankStyle,
    selectedMatchingBandStyle,
    matchingBandEnabled,
    selectedHeadStyle,
    selectedStoneStyle,
    selectedMetal,
    stoneColor,
    selectedHeadMetal,
    beginSceneAssetTransition,
    endSceneAssetTransition,
  } = useRingConfigurator();

  const handleSceneSwapBusy = useCallback(
    (busy) => {
      if (busy) beginSceneAssetTransition();
      else endSceneAssetTransition();
    },
    [beginSceneAssetTransition, endSceneAssetTransition],
  );

  const metalKey = metalUiToKey[selectedMetal] ?? "WHITE GOLD";
  const selectedColor = ColorProps[metalKey];
  /** Hex tint from UI (#rgb / gemstone); ColorProps is for metals only — parse explicitly */
  const selectedStoneTint = useMemo(() => {
    try {
      return new THREE.Color(stoneColor ?? "#ffffff").getHex();
    } catch {
      return 0xffffff;
    }
  }, [stoneColor]);
  const selectedMaterial = materialProperties[metalKey];

  const headMetalUi = selectedHeadMetal ?? selectedMetal;
  const headMetalKey = metalUiToKey[headMetalUi] ?? metalKey;
  const headColor = ColorProps[headMetalKey];
  const headMaterialProps = materialProperties[headMetalKey];

  const diamondTextureMap = useLoader(THREE.TextureLoader, diamondTexture);

  const headSwapKey = getHeadSwapKey(selectedHeadStyle, selectedStoneStyle);

  const shankSharedProps = {
    diamondTextureMap,
    color: selectedColor,
    ...selectedMaterial,
  };

  return (
    <>
      <color attach="background" args={[GROUND_COLOR]} />
      <fog attach="fog" args={[GROUND_COLOR, 28, 150]} />
      <ambientLight intensity={1.2} />
      <directionalLight intensity={2} position={[-5, 5, 5]} />
      {/* <pointLight intensity={2} position={[5, 5, -5]} /> */}
      <CameraViewControls />
      <ContactShadows
        position={[0, -5.68, 0]}
        scale={20}
        blur={3.5}
        far={24}
        opacity={0.45}
        resolution={1024}
        color="#000000"
      />

      {/* ✅ Postprocessing */}
      {/* <Effect /> */}
      {/* <EffectComposer>
        <Bloom mipmapBlur intensity={1.5} luminanceThreshold={0.9} />
        
      </EffectComposer> */}

      <Environment path="hdr/metal-env-map" environmentIntensity={1} />

      <SceneDeferredFadeSwap
        swapKey={selectedShankStyle}
        onSwapBusyChange={handleSceneSwapBusy}
      >
        {(frozenMainStyle) => (
          <Shank selectedStyle={frozenMainStyle} {...shankSharedProps} />
        )}
      </SceneDeferredFadeSwap>

      {matchingBandEnabled ? (
        <SceneDeferredFadeSwap
          swapKey={selectedMatchingBandStyle}
          onSwapBusyChange={handleSceneSwapBusy}
        >
          {(frozenBandStyle) => (
            <MatchingBandShank
              selectedStyle={selectedShankStyle}
              selectedMatchingBandStyle={frozenBandStyle}
              {...shankSharedProps}
            />
          )}
        </SceneDeferredFadeSwap>
      ) : null}

      <SceneDeferredFadeSwap
        swapKey={selectedStoneStyle}
        onSwapBusyChange={handleSceneSwapBusy}
      >
        {(frozenStoneStyle) => (
          <Stone
            diamondTextureMap={diamondTextureMap}
            stoneColor={selectedStoneTint}
            {...selectedMaterial}
            selectedStyle={frozenStoneStyle}
          />
        )}
      </SceneDeferredFadeSwap>

      <SceneDeferredFadeSwap
        swapKey={headSwapKey}
        onSwapBusyChange={handleSceneSwapBusy}
      >
        {(frozenHeadKey) => (
          <Head
            frozenSwapKey={frozenHeadKey}
            diamondTextureMap={diamondTextureMap}
            selectedStyle={selectedHeadStyle}
            selectedStoneStyle={selectedStoneStyle}
            color={headColor}
            {...headMaterialProps}
          />
        )}
      </SceneDeferredFadeSwap>
    </>
  );
}
