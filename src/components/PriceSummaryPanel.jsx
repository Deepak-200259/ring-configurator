import { useEffect, useMemo, useRef, useState } from "react";
import { useRingConfigurator } from "../context/RingConfiguratorContext";
import {
  computeHeadSectionPrice,
  computeRingTotalPrice,
  computeShankSectionPrice,
  computeStoneSectionPrice,
  formatUsd,
} from "../pricing/computeRingTotalPrice";

function SummaryListIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M4 4h4v4H4V4zm6 0h10v2H10V4zm-6 7h4v4H4v-4zm6 1h10v2H10v-2zm-6 6h4v4H4v-4zm6 1h10v2H10v-2z"
      />
    </svg>
  );
}

function SectionHeader({ title, amount }) {
  return (
    <div className="price-summary-section__header">
      <span className="price-summary-section__title">{title}</span>
      <span className="price-summary-section__amount">{formatUsd(amount)}</span>
    </div>
  );
}

function DetailRow({ label, value, hint }) {
  return (
    <div className="price-summary-detail">
      <span className="price-summary-detail__label">{label}</span>
      <div className="price-summary-detail__col">
        <span className="price-summary-detail__value">{value}</span>
        {hint ? (
          <span className="price-summary-detail__hint">{hint}</span>
        ) : null}
      </div>
    </div>
  );
}

export default function PriceSummaryPanel() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const {
    selectedShankStyle,
    matchingBandEnabled,
    selectedMatchingBandStyle,
    selectedShankCarat,
    selectedMetal,
    selectedHeadStyle,
    biMetalEnabled,
    selectedHeadMetal,
    selectedStoneStyle,
    selectedStoneMaterialType,
    selectedStoneMaterialVariant,
    selectedStoneCaratWeight,
  } = useRingConfigurator();

  const pricingInput = useMemo(
    () => ({
      shankStyle: selectedShankStyle,
      matchingBandEnabled,
      matchingBandStyle: selectedMatchingBandStyle,
      metal: selectedMetal,
      shankCarat: selectedShankCarat,
      headStyle: selectedHeadStyle,
      biMetalEnabled,
      headAccentMetal: selectedHeadMetal ?? "",
      stoneShape: selectedStoneStyle,
      stoneMaterialType: selectedStoneMaterialType,
      stoneMaterialVariant: selectedStoneMaterialVariant,
      stoneCaratWeight: selectedStoneCaratWeight,
    }),
    [
      selectedShankStyle,
      matchingBandEnabled,
      selectedMatchingBandStyle,
      selectedShankCarat,
      selectedMetal,
      selectedHeadStyle,
      biMetalEnabled,
      selectedHeadMetal,
      selectedStoneStyle,
      selectedStoneMaterialType,
      selectedStoneMaterialVariant,
      selectedStoneCaratWeight,
    ],
  );

  const total = useMemo(
    () => computeRingTotalPrice(pricingInput),
    [pricingInput],
  );
  const shankPrice = useMemo(
    () => computeShankSectionPrice(pricingInput),
    [pricingInput],
  );
  const headPrice = useMemo(
    () => computeHeadSectionPrice(pricingInput),
    [pricingInput],
  );
  const stonePrice = useMemo(
    () => computeStoneSectionPrice(pricingInput),
    [pricingInput],
  );

  const metalLabel = `${selectedShankCarat.toLowerCase()} ${selectedMetal}`;
  const sideSettingLabel = matchingBandEnabled
    ? selectedMatchingBandStyle
    : "None";
  const fancyStoneLabel =
    selectedStoneMaterialType === "Colorless"
      ? "—"
      : selectedStoneMaterialVariant || "—";

  const biMetalLabel = biMetalEnabled
    ? selectedHeadMetal
      ? `Yes (${selectedHeadMetal})`
      : "Yes"
    : "No";

  const caratDisplay = Number(selectedStoneCaratWeight)
    .toFixed(2)
    .replace(/\.00$/, "");

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div className="price-summary" ref={rootRef}>
      <button
        type="button"
        className="price-summary__trigger"
        aria-expanded={open}
        aria-controls="price-summary-breakdown"
        id="price-summary-trigger"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="price-summary__trigger-inner">
          <SummaryListIcon className="price-summary__icon" />
          <span className="price-summary__total">{formatUsd(total)}</span>
        </span>
      </button>

      {open ? (
        <div
          className="price-summary__dropdown"
          id="price-summary-breakdown"
          role="region"
          aria-labelledby="price-summary-trigger"
        >
          <section className="price-summary-section">
            <SectionHeader title="SHANK" amount={shankPrice} />
            <DetailRow label="Style:" value={selectedShankStyle} />
            <DetailRow label="Side Setting:" value={sideSettingLabel} />
            <DetailRow
              label="Matching Band:"
              value={matchingBandEnabled ? "Yes" : "No"}
            />
            <DetailRow label="Metal:" value={metalLabel} />
          </section>

          <section className="price-summary-section">
            <SectionHeader title="HEAD" amount={headPrice} />
            <DetailRow label="Style:" value={selectedHeadStyle} />
            <DetailRow label="Bi-Metal:" value={biMetalLabel} />
          </section>

          <section className="price-summary-section">
            <SectionHeader title="STONE" amount={stonePrice} />
            <DetailRow label="Shape:" value={selectedStoneStyle} />
            <DetailRow label="Carat:" value={caratDisplay} />
            <DetailRow label="Stone Fancy Color:" value={fancyStoneLabel} />
            <DetailRow label="Type:" value={selectedStoneMaterialType} />
            <DetailRow
              label="Quality:"
              value="Standard (Lab)"
              hint="(Clarity: SI2, SI1, VS2 | Intensity: Light, Fancy)"
            />
          </section>
        </div>
      ) : null}
    </div>
  );
}
