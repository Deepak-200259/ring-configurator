import { Color } from "three";
import { PlainHead } from "./PlainHead";
import { BezelHead } from "./BezelHead";
import { HaloHead } from "./HaloHead";
import { ThreeStoneHead } from "./ThreeStoneHead";



export default function Head(props) {
  return (
    <>
      <PlainHead scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/>
      {/* <BezelHead scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/> */}
      {/* <HaloHead scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/> */}
      {/* <ThreeStoneHead scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/> */}
    </>
  );
}
