import ThreeStoneSideStones from "./ThreeStoneSideStones";
import OvalHead from "./OvalHead";

export default function ThreeStoneHead(props) {
  return (
    <>
      <OvalHead {...props} position={[0, -1.5, 0]} />
      <ThreeStoneSideStones {...props} />
    </>
  );
}
