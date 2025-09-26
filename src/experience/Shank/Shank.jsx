import {
  CathedralShank,
  ChannelShank,
  KnifeEdgeShank,
  PlainShank,
  PlateProngShank,
  SplitShank,
  TwistedShank,
  WidePlainShank,
} from "./index"; // import all shank variants

export default function Shank({ selectedStyle, ...props }) {
  // Mapping of style name to component
  const shankComponents = {
    Plain: PlainShank,
    Cathedral: CathedralShank,
    "Knife Edge": KnifeEdgeShank,
    Split: SplitShank,
    Twisted: TwistedShank,
    "Wide Plain": WidePlainShank,
    Channel: ChannelShank,
    "Plate Prong": PlateProngShank,
  };

  // Default position and scale for each shank type
  const shankTransforms = {
    Plain: { position: [0, -1, 0], scale: [0.5, 0.5, 0.5] },
    Cathedral: { position: [0, -0.8, 0], scale: [0.5, 0.5, 0.5] },
    "Knife Edge": { position: [0, -1, 0], scale: [0.5, 0.5, 0.5] },
    Split: { position: [0, -0.8, 0], scale: [0.42, 0.42, 0.42] },
    Twisted: { position: [0, -0.9, 0], scale: [0.5, 0.5, 0.5] },
    "Wide Plain": { position: [0, -1.2, 0], scale: [0.5, 0.5, 0.5] },
    Channel: { position: [0, -1, 0], scale: [0.5, 0.5, 0.5] },
    "Plate Prong": { position: [0, -1, 0], scale: [0.5, 0.5, 0.5] },
  };

  const ShankComponent = shankComponents[selectedStyle] || PlainShank;
  const transform = shankTransforms[selectedStyle] || shankTransforms["Plain"];

  return <ShankComponent {...transform} {...props} />;
}
