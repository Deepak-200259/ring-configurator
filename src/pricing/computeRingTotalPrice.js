import {
  getDefaultStoneCaratWeight,
  HeadTabOptions,
  ShankTabOptions,
  StoneTabOptions,
} from "../config/ringTabOptions";

function optionPrice(groups, groupName, optionName) {
  const g = groups.find((x) => x.name === groupName);
  return g?.options?.find((o) => o.name === optionName)?.price ?? 0;
}

function subOptionPrice(groups, groupName, subName) {
  const g = groups.find((x) => x.name === groupName);
  return g?.subOptions?.find((o) => o.name === subName)?.price ?? 0;
}

function stoneVariantPrice(typeCategory, variantName) {
  if (!variantName || typeCategory === "Colorless") return 0;
  const typeGroup = StoneTabOptions.find((g) => g.name === "TYPE");
  const category = typeGroup?.options?.find((o) => o.name === typeCategory);
  const item = category?.options?.find((o) => o.name === variantName);
  return item?.price ?? 0;
}

function stoneCaratSliderConfig() {
  const caratGroup = StoneTabOptions.find((g) => g.name === "CARAT");
  const opts = caratGroup?.sliderOptions;
  if (opts == null || typeof opts.min !== "number") return null;
  return {
    min: opts.min,
    max: opts.max ?? opts.min,
    minPrice: Number(opts.minPrice) || 0,
  };
}

/**
 * Center-stone price from CARAT slider: `minPrice` at `min` carat, scales linearly
 * (e.g. min 0.25 @ $655 → 0.5 → $1310, 0.75 → $1965).
 */
export function computeStoneCaratPrice(stoneCaratWeight) {
  const cfg = stoneCaratSliderConfig();
  if (!cfg || cfg.minPrice <= 0 || cfg.min <= 0) return 0;
  const raw =
    stoneCaratWeight == null
      ? getDefaultStoneCaratWeight()
      : Number(stoneCaratWeight);
  if (!Number.isFinite(raw)) return cfg.minPrice;
  const clamped = Math.min(cfg.max, Math.max(cfg.min, raw));
  return cfg.minPrice * (clamped / cfg.min);
}

/**
 * @param {object} s
 * @param {string} s.shankStyle
 * @param {boolean} s.matchingBandEnabled
 * @param {string} s.matchingBandStyle
 * @param {string} s.metal
 * @param {string} s.shankCarat
 * @param {string} s.headStyle
 * @param {boolean} s.biMetalEnabled
 * @param {string|null} s.headAccentMetal
 * @param {string} s.stoneShape
 * @param {string} s.stoneMaterialType
 * @param {string} s.stoneMaterialVariant
 */
export function computeShankSectionPrice(s) {
  let total = 0;
  total += optionPrice(ShankTabOptions, "STYLE", s.shankStyle);
  if (s.matchingBandEnabled) {
    total += subOptionPrice(ShankTabOptions, "STYLE", s.matchingBandStyle);
  }
  total += optionPrice(ShankTabOptions, "METAL", s.metal);
  total += subOptionPrice(ShankTabOptions, "METAL", s.shankCarat);
  return total;
}

export function computeHeadSectionPrice(s) {
  let total = optionPrice(HeadTabOptions, "STYLE", s.headStyle);
  if (s.biMetalEnabled && s.headAccentMetal) {
    total += optionPrice(HeadTabOptions, "BI-METAL", s.headAccentMetal);
  }
  return total;
}

/** @param {object} s — uses stoneCaratWeight with CARAT sliderOptions (minPrice @ min carat). */
export function computeStoneSectionPrice(s) {
  let total = optionPrice(StoneTabOptions, "SHAPE", s.stoneShape);
  total += stoneVariantPrice(s.stoneMaterialType, s.stoneMaterialVariant);
  total += computeStoneCaratPrice(s.stoneCaratWeight);
  return total;
}

export function computeRingTotalPrice(s) {
  return (
    computeShankSectionPrice(s) +
    computeHeadSectionPrice(s) +
    computeStoneSectionPrice(s)
  );
}

export function formatUsd(amount) {
  const n = Math.round(amount);
  return `$${n.toLocaleString("en-US")}`;
}
