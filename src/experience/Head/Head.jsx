import RoundHead from "./RoundHead";
import BezelHead from "./BezelHead";
import HiddenHaloHead from "./HiddenHaloHead";
import SingleHaloHead from "./SingleHaloHead";
import DoubleHaloHead from "./DoubleHaloHead";
import ThreeStoneHead from "./ThreeStoneHead";
import AsscherHead from "./AsscherHead";
import CushionHead from "./CushionHead";
import EmeraldHead from "./EmeraldHead";
import HeartHead from "./HeartHead";
import MarquiseHead from "./MarquiseHead";
import PearHead from "./PearHead";
import PrincessHead from "./PrincessHead";
import RadiantHead from "./RadiantHead";
import OvalHead from "./OvalHead";
import AsscherBezelHead from "./AsscherBezelHead";
import CushionBezelHead from "./CushionBezelHead";
import EmeraldBezelHead from "./EmeraldBezelHead";
import HeartBezelHead from "./HeartBezelHead";
import MarquiseBezelHead from "./MarquiseBezelHead";
import OvalBezelHead from "./OvalBezelHead";
import PearBezelHead from "./PearBezelHead";
import PrincessBezelHead from "./PrincessBezelHead";
import RadiantBezelHead from "./RadiantBezelHead";

const HeadComponents = {
  Plain: {
    component: RoundHead,
    scale: [0.55, 0.55, 0.55],
    position: [0, -1.35, 0],
  },
  Bezel: {
    component: BezelHead,
    scale: [0.5, 0.5, 0.5],
    position: [0, -1.4, 0],
  },
  "Hidden Halo": {
    component: HiddenHaloHead,
    scale: [0.55, 0.55, 0.55],
    position: [0, -1.35, 0],
  },
  "Single Halo": {
    component: SingleHaloHead,
    scale: [0.55, 0.55, 0.55],
    position: [0, -1.35, 0],
  },
  "Double Halo": {
    component: DoubleHaloHead,
    scale: [0.55, 0.55, 0.55],
    position: [0, -1.35, 0],
  },
  "Three Stone": {
    component: ThreeStoneHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1, 0],
  },
  Round: {
    component: RoundHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0],
  },
  Oval: {
    component: OvalHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0],
  },
  Princess: {
    component: PrincessHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0],
  },
  Cushion: {
    component: CushionHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0],
  },
  Radiant: {
    component: RadiantHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0],
  },
  Pear: {
    component: PearHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0.2],
  },
  Emerald: {
    component: EmeraldHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0],
  },
  Marquise: {
    component: MarquiseHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0],
  },
  Heart: {
    component: HeartHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0.2],
  },
  Asscher: {
    component: AsscherHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0],
  },
};

const STONE_HEAD_NAMES = new Set([
  "Princess",
  "Cushion",
  "Radiant",
  "Pear",
  "Emerald",
  "Marquise",
  "Heart",
  "Asscher",
  "Oval",
]);

/**
 * Head tab Bezel + stone shape → `*-Bezel.glb` component + transform.
 * Scale/position match the stone-specific heads in `headTransforms` for each shape.
 * Round uses `BezelHead` + `headTransforms.Bezel` via `tab:Bezel`.
 */
const bezelStoneHeadEntries = {
  Asscher: {
    Component: AsscherBezelHead,
    scale: [0.45, 0.45, 0.45],
    position: [0, -0.95, 0],
  },
  Cushion: {
    Component: CushionBezelHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.3, 0],
  },
  Emerald: {
    Component: EmeraldBezelHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, 3.5, 0],
  },
  Heart: {
    Component: HeartBezelHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.475, 0.175],
  },
  Marquise: {
    Component: MarquiseBezelHead,
    scale: [0.475, 0.475, 0.475],
    position: [0, -1.35, 0],
  },
  Oval: {
    Component: OvalBezelHead,
    scale: [0.45, 0.475, 0.5],
    position: [0, -1.35, 0],
  },
  Pear: {
    Component: PearBezelHead,
    scale: [0.42, 0.475, 0.475],
    position: [0, -1.35, 0.2],
  },
  Princess: {
    Component: PrincessBezelHead,
    scale: [0.425, 0.425, 0.425],
    position: [0, -0.85, 0],
  },
  Radiant: {
    Component: RadiantBezelHead,
    scale: [0.45, 0.45, 0.45],
    position: [0, -1, 0],
  },
};

/** Shapes with dedicated Three-Stone center head + side-stone assets */
const THREE_STONE_SHAPE_KEYS = new Set(["Oval", "Round", "Princess"]);

/** Stable routing token used by scene transitions (fade/load swaps). */
export function getHeadSwapKey(selectedStyle, selectedStoneStyle) {
  if (selectedStyle === "Three Stone") {
    const shape = THREE_STONE_SHAPE_KEYS.has(selectedStoneStyle)
      ? selectedStoneStyle
      : "Oval";
    return `three:${shape}`;
  }
  if (selectedStyle === "Bezel") {
    if (selectedStoneStyle === "Round") return "tab:Bezel";
    if (bezelStoneHeadEntries[selectedStoneStyle])
      return `bezel:${selectedStoneStyle}`;
    return "tab:Bezel";
  }
  if (STONE_HEAD_NAMES.has(selectedStoneStyle))
    return `stone:${selectedStoneStyle}`;
  return `tab:${selectedStyle}`;
}

function routeHead(routeKey, props) {
  if (routeKey.startsWith("three:")) {
    const shape = routeKey.slice("three:".length);
    const { component: ThreeStoneComponent, ...transform } =
      HeadComponents["Three Stone"];
    return (
      <ThreeStoneComponent threeStoneShape={shape} {...transform} {...props} />
    );
  }

  if (routeKey.startsWith("bezel:")) {
    const shape = routeKey.slice("bezel:".length);
    const entry = bezelStoneHeadEntries[shape];
    if (entry) {
      const { Component, scale, position } = entry;
      return <Component scale={scale} position={position} {...props} />;
    }
    const { component: BezelComponent, ...transform } = HeadComponents.Bezel;
    return <BezelComponent {...transform} {...props} />;
  }

  if (routeKey.startsWith("stone:")) {
    const shape = routeKey.slice("stone:".length);
    const stoneEntry = HeadComponents[shape];
    if (!stoneEntry) {
      const { component: FallbackComponent, ...fallbackTransform } =
        HeadComponents[props.selectedStyle] || HeadComponents.Plain;
      return <FallbackComponent {...fallbackTransform} {...props} />;
    }
    const { component: StoneHeadComponent, ...stoneTransform } = stoneEntry;
    return <StoneHeadComponent {...stoneTransform} {...props} />;
  }

  const tabName = routeKey.startsWith("tab:")
    ? routeKey.slice("tab:".length)
    : props.selectedStyle;
  const { component: HeadComponent, ...transform } =
    HeadComponents[tabName] || HeadComponents.Plain;
  return <HeadComponent {...transform} {...props} />;
}

export default function Head(props) {
  const routeKey =
    props.frozenSwapKey ??
    getHeadSwapKey(props.selectedStyle, props.selectedStoneStyle);
  const { frozenSwapKey: _ignored, ...forwardProps } = props;
  return routeHead(routeKey, forwardProps);
}
