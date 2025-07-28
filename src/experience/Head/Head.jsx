import { Color } from "three";
import { RoundHead } from "./RoundHead";



export default function Head(props) {
  return (
    <>
      <RoundHead scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/>
    </>
  );
}
