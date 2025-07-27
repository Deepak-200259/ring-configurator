import { PlainShank } from "./PlainShank";

export default function Shank(props) {
  return (
    <>
      <PlainShank scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} color={props.color} {...props}/>
    </>
  );
}
