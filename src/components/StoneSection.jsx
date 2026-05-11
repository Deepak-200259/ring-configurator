import { useEffect, useState } from "react";
import { useRingConfigurator } from "../context/RingConfiguratorContext";

export default function StoneSection({
  options,
  currentStoneShape,
  allowedStoneShapeNames,
  onSelectProperty,
  setStoneColor,
}) {
  const {
    selectedStoneCaratWeight,
    selectedStoneMaterialType,
    selectedStoneMaterialVariant,
    setSelectedStoneMaterialType,
    setSelectedStoneMaterialVariant,
    setSelectedStoneCaratWeight,
  } = useRingConfigurator();

  const shapeConfig = options.find((g) => g.name === "SHAPE");
  const caratConfig = options.find((g) => g.name === "CARAT");
  const typeConfig = options.find((g) => g.name === "TYPE");

  const [caratValue, setCaratValue] = useState(selectedStoneCaratWeight);

  /** Persist TYPE UI via context — local state reset on tab change incorrectly defaulted to Colorless. */
  const selectedType = selectedStoneMaterialType;
  const selectedTypeOption = selectedStoneMaterialVariant ?? "";

  const currentTypeConfig = typeConfig?.options?.find(
    (opt) => opt.name === selectedType,
  );
  const conditionalOptions = currentTypeConfig?.options ?? [];
  const caratMin = caratConfig?.sliderOptions?.min ?? 0.25;
  const caratMax = caratConfig?.sliderOptions?.max ?? 5;
  const caratMarks = [0.25, 1, 2, 3, 4, 5];

  useEffect(() => {
    setSelectedStoneCaratWeight(caratValue);
  }, [caratValue, setSelectedStoneCaratWeight]);

  return (
    <>
      {shapeConfig ? (
        <StonePropertySelector
          content={shapeConfig}
          currentStyle={currentStoneShape}
          allowedStoneShapeNames={allowedStoneShapeNames}
          onSelectProperty={onSelectProperty}
        />
      ) : null}

      {caratConfig ? (
        <div className="properties-selector-tab">
          <div className="properties-section">
            <h4 className="property-main-heading">
              CARAT{" "}
              <span className="selected-property-option">
                {caratValue.toFixed(2).replace(/\.00$/, "")}
              </span>
            </h4>

            <div className="stone-carat-labels">
              {caratMarks.map((value) => (
                <span
                  key={value}
                  className="stone-carat-label"
                  style={{
                    left: `${((value - caratMin) / (caratMax - caratMin)) * 100}%`,
                  }}
                >
                  {value}
                </span>
              ))}
            </div>
            <div className="stone-carat-slider-wrap">
              <input
                className="stone-carat-slider"
                type="range"
                min={caratConfig.sliderOptions.min}
                max={caratConfig.sliderOptions.max}
                step={caratConfig.sliderOptions.step}
                value={caratValue}
                onChange={(e) => setCaratValue(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      ) : null}

      {typeConfig ? (
        <div className="properties-selector-tab">
          <div className="properties-section stone-type-panel">
            <h4 className="property-main-heading">
              TYPE{" "}
              <span className="selected-property-option">
                {selectedStoneMaterialVariant?.trim()
                  ? selectedStoneMaterialVariant
                  : selectedStoneMaterialType}
              </span>
            </h4>

            <div
              className="stone-type-categories"
              role="radiogroup"
              aria-label="Stone material type"
            >
              {typeConfig.options.map((option) => {
                const isSelected = option.name === selectedType;
                return (
                  <button
                    key={option.name}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`stone-type-category ${isSelected ? "stone-type-category--selected" : ""}`}
                    onClick={() => {
                      setSelectedStoneMaterialType(option.name);
                      const firstSub = option.options?.[0];
                      if (firstSub) {
                        setSelectedStoneMaterialVariant(firstSub.name);
                        setStoneColor(firstSub.color ?? "#ffffff");
                      } else {
                        setSelectedStoneMaterialVariant("");
                        setStoneColor("#ffffff");
                      }
                      onSelectProperty(typeConfig.name, option.name);
                    }}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>

            {conditionalOptions.length > 0 ? (
              <div className="stone-type-swatches-section">
                <p className="stone-type-swatches-hint" aria-hidden="true">
                  {selectedType === "Gemstone"
                    ? "Choose a gemstone"
                    : "Choose a tint"}
                </p>
                <div className="stone-type-swatches">
                  {conditionalOptions.map((option) => {
                    const isSelected = selectedTypeOption === option.name;
                    return (
                      <button
                        key={option.name}
                        type="button"
                        title={option.name}
                        aria-label={option.name}
                        aria-pressed={isSelected}
                        className={`stone-type-swatch ${isSelected ? "stone-type-swatch--selected" : ""}`}
                        onClick={() => {
                          setSelectedStoneMaterialVariant(option.name);
                          if (option.color != null) {
                            setStoneColor(option.color);
                          }
                        }}
                      >
                        <span className="stone-type-swatch-ring">
                          <img
                            className="stone-type-swatch-img"
                            src={option.img}
                            alt=""
                          />
                        </span>
                        <span className="stone-type-swatch-label">
                          {option.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function StonePropertySelector({
  content,
  currentStyle,
  allowedStoneShapeNames,
  onSelectProperty,
}) {
  const [hoveredOption, setHoveredOption] = useState(null);
  const displayMain =
    hoveredOption ??
    content.options?.find((opt) =>
      currentStyle ? opt.name === currentStyle : false,
    );
  return (
    <div className="properties-selector-tab">
      <div className="properties-section">
        <h4 className="property-main-heading">
          {content.name}{" "}
          <span className="selected-property-option">
            {displayMain ? `${displayMain.name} (+ ₹${displayMain.price})` : ""}
          </span>
        </h4>

        <div className="property-options">
          {content.options.map((option) => {
            const allowed =
              allowedStoneShapeNames == null ||
              allowedStoneShapeNames.has(option.name);
            return (
              <div
                className={`property-option ${option.isSelected ? "selected" : ""} ${!allowed ? "property-option-disabled" : ""}`}
                key={option.name}
                role="button"
                tabIndex={allowed ? 0 : -1}
                aria-disabled={!allowed}
                onClick={() => {
                  if (!allowed) return;
                  onSelectProperty(content.name, option.name);
                }}
                onMouseEnter={() => allowed && setHoveredOption(option)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <img
                  className="property-icon"
                  src={option.img}
                  alt={option.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
