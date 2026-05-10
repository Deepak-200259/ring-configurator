import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { getDefaultStoneCaratWeight } from "../config/ringTabOptions";

/** Cycle order for the canvas Change view (eye) control (starts at front). */
export const CAMERA_VIEW_ORDER = ["top", "right", "front", "rotating"];

export const CAMERA_VIEW_LABELS = {
  top: "Top",
  right: "Right",
  front: "Front",
  rotating: "Rotating",
};

const RingConfiguratorContext = createContext(null);

export function RingConfiguratorProvider({ children }) {
  const [selectedShankStyle, setSelectedShankStyle] = useState("Plain");
  const [selectedMatchingBandStyle, setSelectedMatchingBandStyle] =
    useState("Plain");
  const [matchingBandEnabled, setMatchingBandEnabled] = useState(false);
  const [selectedShankCarat, setSelectedShankCarat] = useState("9K");
  const [selectedHeadStyle, setSelectedHeadStyle] = useState("Plain");
  const [selectedStoneStyle, setSelectedStoneStyle] = useState("Round");
  const [selectedMetal, setSelectedMetal] = useState("White Gold");
  /** When null, head matches shank metal; BI‑METAL toggle stores accent metal here */
  const [selectedHeadMetal, setSelectedHeadMetal] = useState(null);
  const [biMetalEnabled, setBiMetalEnabled] = useState(false);
  const [selectedStoneMaterialType, setSelectedStoneMaterialType] =
    useState("Colorless");
  const [selectedStoneMaterialVariant, setSelectedStoneMaterialVariant] =
    useState("");
  /** Center stone carat from Stone tab slider (for summary / pricing hooks). */
  const [selectedStoneCaratWeight, setSelectedStoneCaratWeight] = useState(
    getDefaultStoneCaratWeight,
  );
  const [stoneColor, setStoneColor] = useState("#ffffff");
  const [cameraViewMode, setCameraViewMode] = useState("front");
  /** Refcount of SceneDeferredFadeSwap transitions — disables sidebar until idle. */
  const sceneAssetTransitionDepthRef = useRef(0);
  const [sceneAssetTransitionLocked, setSceneAssetTransitionLocked] =
    useState(false);

  const beginSceneAssetTransition = useCallback(() => {
    sceneAssetTransitionDepthRef.current += 1;
    if (sceneAssetTransitionDepthRef.current === 1) {
      setSceneAssetTransitionLocked(true);
    }
  }, []);

  const endSceneAssetTransition = useCallback(() => {
    sceneAssetTransitionDepthRef.current = Math.max(
      0,
      sceneAssetTransitionDepthRef.current - 1,
    );
    if (sceneAssetTransitionDepthRef.current === 0) {
      setSceneAssetTransitionLocked(false);
    }
  }, []);

  const cycleCameraView = useCallback(() => {
    setCameraViewMode((prev) => {
      const i = CAMERA_VIEW_ORDER.indexOf(prev);
      const idx = i === -1 ? 0 : (i + 1) % CAMERA_VIEW_ORDER.length;
      return CAMERA_VIEW_ORDER[idx];
    });
  }, []);

  const resetRingConfiguration = useCallback(() => {
    setSelectedShankStyle("Plain");
    setSelectedMatchingBandStyle("Plain");
    setMatchingBandEnabled(false);
    setSelectedShankCarat("9K");
    setSelectedHeadStyle("Plain");
    setSelectedStoneStyle("Round");
    setSelectedMetal("White Gold");
    setSelectedHeadMetal(null);
    setBiMetalEnabled(false);
    setSelectedStoneMaterialType("Colorless");
    setSelectedStoneMaterialVariant("");
    setSelectedStoneCaratWeight(getDefaultStoneCaratWeight());
    setStoneColor("#ffffff");
    setCameraViewMode("front");
  }, []);

  const value = useMemo(
    () => ({
      selectedShankStyle,
      setSelectedShankStyle,
      selectedMatchingBandStyle,
      setSelectedMatchingBandStyle,
      matchingBandEnabled,
      setMatchingBandEnabled,
      selectedShankCarat,
      setSelectedShankCarat,
      selectedHeadStyle,
      setSelectedHeadStyle,
      selectedStoneStyle,
      setSelectedStoneStyle,
      selectedMetal,
      setSelectedMetal,
      selectedHeadMetal,
      setSelectedHeadMetal,
      biMetalEnabled,
      setBiMetalEnabled,
      selectedStoneMaterialType,
      setSelectedStoneMaterialType,
      selectedStoneMaterialVariant,
      setSelectedStoneMaterialVariant,
      selectedStoneCaratWeight,
      setSelectedStoneCaratWeight,
      stoneColor,
      setStoneColor,
      cameraViewMode,
      setCameraViewMode,
      cycleCameraView,
      resetRingConfiguration,
      sceneAssetTransitionLocked,
      beginSceneAssetTransition,
      endSceneAssetTransition,
    }),
    [
      selectedShankStyle,
      selectedMatchingBandStyle,
      matchingBandEnabled,
      selectedShankCarat,
      selectedHeadStyle,
      selectedStoneStyle,
      selectedMetal,
      selectedHeadMetal,
      biMetalEnabled,
      selectedStoneMaterialType,
      selectedStoneMaterialVariant,
      selectedStoneCaratWeight,
      stoneColor,
      cameraViewMode,
      cycleCameraView,
      resetRingConfiguration,
      sceneAssetTransitionLocked,
      beginSceneAssetTransition,
      endSceneAssetTransition,
    ],
  );

  return (
    <RingConfiguratorContext.Provider value={value}>
      {children}
    </RingConfiguratorContext.Provider>
  );
}

export function useRingConfigurator() {
  const ctx = useContext(RingConfiguratorContext);
  if (ctx === null) {
    throw new Error(
      "useRingConfigurator must be used within RingConfiguratorProvider",
    );
  }
  return ctx;
}
