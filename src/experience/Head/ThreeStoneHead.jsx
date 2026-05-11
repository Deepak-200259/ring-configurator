import OvalSideStones from "./OvalSideStones";
import RoundSideStones from "./RoundSideStones";
import PrincessSideStones from "./PrincessSideStones";
import OvalHead from "./OvalHead";
import RoundHead from "./RoundHead";
import PrincessHead from "./PrincessHead";

const VARIANTS = {
  Oval: { Head: OvalHead, SideStones: OvalSideStones },
  Round: { Head: RoundHead, SideStones: RoundSideStones },
  Princess: { Head: PrincessHead, SideStones: PrincessSideStones },
};

export default function ThreeStoneHead({ threeStoneShape = "Oval", ...rest }) {
  const entry = VARIANTS[threeStoneShape] ?? VARIANTS.Oval;
  const { Head: HeadComp, SideStones: SideComp } = entry;

  const headProps =
    threeStoneShape === "Round"
      ? { position: [0, -1.35, 0], scale: [0.55, 0.55, 0.55] }
      : { position: [0, -1.5, 0] };

  return (
    <>
      <HeadComp {...rest} {...headProps} />
      <SideComp {...rest} />
    </>
  );
}
