import { RoundStone } from "./RoundStone";
import { OvalStone } from "./OvalStone";
import { PrincessStone } from "./PrincessStone";
import { CushionStone } from "./CushionStone";
import { RadiantStone } from "./RadiantStone";
import { PearStone } from "./PearStone";
import { EmeraldStone } from "./EmeraldStone";
import { MarquiseStone } from "./MarquiseStone";
import { HeartStone } from "./HeartStone";
import { AsscherStone } from "./AsscherStone";

const stoneComponents = {
  Round: {
    component: RoundStone,
    scale: [1.05, 1.05, 1.05],
    position: [0, 3.5, 0],
  },
  Oval: { component: OvalStone, scale: [1, 1, 1.15], position: [0, 3.55, 0] },
  Princess: {
    component: PrincessStone,
    scale: [1, 1, 1],
    position: [0, 3.45, 0],
  },
  Cushion: {
    component: CushionStone,
    scale: [1, 1, 1],
    position: [0, 3.55, 0],
  },
  Radiant: {
    component: RadiantStone,
    scale: [2, 2, 2],
    position: [0, 3.45, 0],
  },
  Pear: { component: PearStone, scale: [1, 1, 1], position: [0, 3.55, -0.1] },
  Emerald: {
    component: EmeraldStone,
    scale: [1.2, 1.2, 1.2],
    position: [0, 3.55, 0],
  },
  Marquise: {
    component: MarquiseStone,
    scale: [1.22, 1, 0.8],
    position: [0, 3.65, 0],
  },
  Heart: {
    component: HeartStone,
    scale: [0.9, 1, 0.9],
    position: [0, 3.5, -0.1],
  },
  Asscher: {
    component: AsscherStone,
    scale: [1, 1, 1],
    position: [0, 3.35, 0],
  },
};

export default function Stone(props) {
  const style = props.selectedStyle ?? "Round";
  const StoneComponent = stoneComponents[style]?.component ?? RoundStone;
  const transform =
    stoneComponents[style]?.scale ?? stoneComponents.Round.scale;
  const position =
    stoneComponents[style]?.position ?? stoneComponents.Round.position;
  return (
    <StoneComponent
      scale={transform}
      position={position}
      diamondTextureMap={props.diamondTextureMap}
      stoneColor={props.stoneColor}
      {...props}
    />
  );
}
