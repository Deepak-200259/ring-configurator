import { AsscherStone } from "./AsscherStone";
import { HeartStone } from "./HeartStone";
import { PrincessStone } from "./PrincessStone";
import { RoundStone } from "./RoundStone";

export default function Stone() {
  return (
    <>
      {/* <RoundStone position={[0, 3.5, 0]} /> */}
      {/* <PrincessStone position={[0, 3.5, 0]} /> */}
      {/* <AsscherStone position={[0, 3.5, 0]} /> */}
      <HeartStone position={[0, 3.5, 0]} />

    </>
  );
}
