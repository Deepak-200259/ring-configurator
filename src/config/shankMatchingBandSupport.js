/**
 * Styles whose `matchingBand` entry is `null` in `experience/Shank/Shank.jsx`
 * (`Twisted`, `Wide Plain`).
 * Keep this list aligned when adding/changing `customProps` there.
 */
const SHANK_STYLES_WITHOUT_MATCHING_BAND = new Set(["Twisted", "Wide Plain"]);

export function shankSupportsMatchingBand(styleName) {
  return !SHANK_STYLES_WITHOUT_MATCHING_BAND.has(styleName);
}
