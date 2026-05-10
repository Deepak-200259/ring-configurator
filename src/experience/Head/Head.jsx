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

const headTransforms = {
  Plain: { scale: [0.55, 0.55, 0.55], position: [0, -1.35, 0] },
  Bezel: { scale: [0.5, 0.5, 0.5], position: [0, -1.4, 0] },
  "Hidden Halo": { scale: [0.55, 0.55, 0.55], position: [0, -1.35, 0] },
  "Single Halo": { scale: [0.55, 0.55, 0.55], position: [0, -1.35, 0] },
  "Double Halo": { scale: [0.55, 0.55, 0.55], position: [0, -1.35, 0] },
  "Three Stone": { scale: [0.475, 0.475, 0.475], position: [0, -1, 0] },
  Oval: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0] },
  Round: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0] },
  Princess: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0] },
  Cushion: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0] },
  Radiant: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0] },
  Pear: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0.2] },
  Emerald: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0] },
  Marquise: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0] },
  Heart: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0.2] },
  Asscher: { scale: [0.475, 0.475, 0.475], position: [0, -1.35, 0] },
};

const headComponents = {
  Plain: RoundHead,
  Bezel: BezelHead,
  "Hidden Halo": HiddenHaloHead,
  "Single Halo": SingleHaloHead,
  "Double Halo": DoubleHaloHead,
  "Three Stone": ThreeStoneHead,
};

const stoneHeadComponents = {
  Princess: PrincessHead,
  Cushion: CushionHead,
  Radiant: RadiantHead,
  Pear: PearHead,
  Emerald: EmeraldHead,
  Marquise: MarquiseHead,
  Heart: HeartHead,
  Asscher: AsscherHead,
  Oval: OvalHead,
};

const STONE_HEAD_NAMES = new Set(Object.keys(stoneHeadComponents));

/** Stable routing token used by scene transitions (fade/load swaps). */
export function getHeadSwapKey(selectedStyle, selectedStoneStyle) {
  if (selectedStyle === "Three Stone") return "three";
  if (STONE_HEAD_NAMES.has(selectedStoneStyle))
    return `stone:${selectedStoneStyle}`;
  return `tab:${selectedStyle}`;
}

function routeHead(routeKey, props) {
  if (routeKey === "three") {
    const transform = headTransforms["Three Stone"];
    return <ThreeStoneHead {...transform} {...props} />;
  }

  if (routeKey.startsWith("stone:")) {
    const shape = routeKey.slice("stone:".length);
    const StoneHeadComponent = stoneHeadComponents[shape];
    if (!StoneHeadComponent) {
      const HeadComponent = headComponents[props.selectedStyle] || RoundHead;
      const transform =
        headTransforms[props.selectedStyle] || headTransforms["Plain"];
      return <HeadComponent {...transform} {...props} />;
    }
    const stoneTransform = headTransforms[shape] || headTransforms["Round"];
    return <StoneHeadComponent {...stoneTransform} {...props} />;
  }

  const tabName = routeKey.startsWith("tab:")
    ? routeKey.slice("tab:".length)
    : props.selectedStyle;
  const HeadComponent = headComponents[tabName] || RoundHead;
  const transform = headTransforms[tabName] || headTransforms["Plain"];
  return <HeadComponent {...transform} {...props} />;
}

export default function Head(props) {
  const routeKey =
    props.frozenSwapKey ??
    getHeadSwapKey(props.selectedStyle, props.selectedStoneStyle);
  const { frozenSwapKey: _ignored, ...forwardProps } = props;
  return routeHead(routeKey, forwardProps);
}
