import { PlainShank } from "./PlainShank";
import { KnifeEdgeShank } from "./KnifeEdgeShank";
import { SplitShank } from "./SplitShank";
import { TwistedShank } from "./TwistedShank";
import { WidePlainShank } from "./WidePlainShank";

export default function Shank(props) {
  return (
    <>
      {/* <PlainShank scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/> */}
      {/* <KnifeEdgeShank scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/> */}
      {/* <SplitShank scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/> */}
      {/* <TwistedShank scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/> */}
      <WidePlainShank scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/>
    </>
  );
}
