import {
  CathedralShank,
  ChannelShank,
  KnifeEdgeShank,
  PlainShank,
  PlateProngShank,
  SplitShank,
  TwistedShank,
  WidePlainShank,
} from "./index";

/** Layout + matching-band metadata keyed like STYLE tab labels */
export const ShankComponents = {
  Plain: {
    component: PlainShank,
    position: [0, -1, 0],
    scale: [0.5, 0.5, 0.5],
    canHaveThreeStones: true,
    hasThreeStone: false,
    matchingBand: {
      Plain: { position: [0, -1, 0.8], scale: [0.5, 0.5, 0.5] },
      Channel: { position: [0, -1, 0.9], scale: [0.5, 0.5, 0.5] },
      "Plate Prong": {
        position: [0, -1.05, 0.8],
        scale: [0.495, 0.495, 0.495],
      },
    },
  },
  Cathedral: {
    component: CathedralShank,
    position: [0, -0.82, 0],
    scale: [0.525, 0.525, 0.525],
    canHaveThreeStones: false,
    hasThreeStone: false,
    matchingBand: {
      Plain: { position: [0, -0.9, 0.8], scale: [0.5, 0.5, 0.5] },
      Channel: { position: [0, -1, 0.9], scale: [0.5, 0.5, 0.5] },
      "Plate Prong": { position: [0, -0.9, 0.8], scale: [0.495, 0.495, 0.495] },
    },
  },
  "Knife Edge": {
    component: KnifeEdgeShank,
    position: [0, -1.25, 0],
    scale: [0.525, 0.525, 0.525],
    canHaveThreeStones: true,
    hasThreeStone: false,
    matchingBand: {
      Plain: { position: [0, -0.9, 0.95], scale: [0.495, 0.495, 0.495] },
      Channel: { position: [0, -1, 1.05], scale: [0.5, 0.5, 0.5] },
      "Plate Prong": { position: [0, -1, 1], scale: [0.5, 0.5, 0.5] },
    },
  },
  Split: {
    component: SplitShank,
    position: [0, -1.2, 0],
    scale: [0.485, 0.485, 0.485],
    canHaveThreeStones: false,
    hasThreeStone: false,
    matchingBand: {
      Plain: { position: [0, -0.95, 1], scale: [0.5, 0.5, 0.5] },
      Channel: { position: [0, -1, 1.1], scale: [0.5, 0.5, 0.5] },
      "Plate Prong": { position: [0, -0.95, 1.1], scale: [0.5, 0.5, 0.5] },
    },
  },
  Twisted: {
    component: TwistedShank,
    position: [0, -0.9, 0],
    scale: [0.5, 0.5, 0.5],
    canHaveThreeStones: false,
    hasThreeStone: false,
    matchingBand: null,
  },
  "Wide Plain": {
    component: WidePlainShank,
    position: [0, -1.2, 0],
    scale: [0.5, 0.5, 0.5],
    canHaveThreeStones: true,
    hasThreeStone: false,
    matchingBand: null,
  },
  Channel: {
    component: ChannelShank,
    position: [0, -1, 0],
    scale: [0.5, 0.5, 0.5],
    canHaveThreeStones: false,
    hasThreeStone: false,
    matchingBand: {
      Plain: { position: [0, -0.95, 0.9], scale: [0.5, 0.5, 0.5] },
      Channel: { position: [0, -1, 0.95], scale: [0.5, 0.5, 0.5] },
      "Plate Prong": { position: [0, -1.05, 0.85], scale: [0.49, 0.49, 0.49] },
    },
  },
  "Plate Prong": {
    component: PlateProngShank,
    position: [0, -1, 0],
    scale: [0.5, 0.5, 0.5],
    canHaveThreeStones: false,
    hasThreeStone: false,
    matchingBand: {
      Plain: { position: [0, -1, 0.8], scale: [0.505, 0.505, 0.505] },
      Channel: { position: [0, -1, 0.9], scale: [0.505, 0.505, 0.505] },
      "Plate Prong": { position: [0, -1, 0.8], scale: [0.5, 0.5, 0.5] },
    },
  },
};

const FALLBACK_STYLE = "Plain";

function getShankEntry(styleKey) {
  return ShankComponents[styleKey] ?? ShankComponents[FALLBACK_STYLE];
}

/** Props spread onto the mesh after stripping registry-only fields */
function meshSpread(entry) {
  const { Component: _C, matchingBand: _m, ...rest } = entry;
  return rest;
}

/** Primary engagement ring shank (STYLE tab). */
export function Shank({ selectedStyle, ...props }) {
  const entry = getShankEntry(selectedStyle);
  const ShankComponent = entry.component;

  return (
    <ShankComponent
      {...meshSpread(entry)}
      {...props}
      diamondTextureMap={props.diamondTextureMap}
    />
  );
}

/** Secondary matching band (Plain / Channel / Plate Prong), offset from main shank. */
export function MatchingBandShank({
  selectedStyle,
  selectedMatchingBandStyle,
  ...props
}) {
  const primaryEntry = getShankEntry(selectedStyle);
  const bandStyleEntry = getShankEntry(selectedMatchingBandStyle);

  const MatchingBandComponent = bandStyleEntry.component;
  const hasMatchingBand = primaryEntry.matchingBand != null;
  const placement = primaryEntry.matchingBand?.[selectedMatchingBandStyle];
  const matchingBandPosition = placement?.position;
  const matchingBandScale = placement?.scale;

  return (
    hasMatchingBand && (
      <MatchingBandComponent
        {...meshSpread(bandStyleEntry)}
        scale={matchingBandScale}
        position={matchingBandPosition}
        {...props}
        diamondTextureMap={props.diamondTextureMap}
      />
    )
  );
}
