/** Shank styles that cannot pair with the Three Stone head (mutual exclusion). */
export const SHANK_STYLES_INCOMPATIBLE_WITH_THREE_STONE = new Set([
  "Cathedral",
  "Split",
  "Twisted",
]);

export function shankStyleBlocksThreeStone(shankStyleName) {
  return SHANK_STYLES_INCOMPATIBLE_WITH_THREE_STONE.has(shankStyleName);
}
