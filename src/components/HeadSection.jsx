import { useState } from "react";

export default function HeadSection({
  options,
  currentHeadStyle,
  currentStoneShape,
  onSelectProperty,
  biMetalEnabled,
  onToggleBiMetal,
  disableThreeStoneOption,
}) {
  return options.map((propertySelector, i) => (
    <HeadPropertySelector
      content={propertySelector}
      key={propertySelector.name}
      currentStyle={i === 0 ? currentHeadStyle : null}
      onSelectProperty={onSelectProperty}
      toggleSwitch={
        propertySelector.hasToggleSwitch
          ? { value: biMetalEnabled, onChange: onToggleBiMetal }
          : undefined
      }
      disableMainOptions={Boolean(
        propertySelector.hasToggleSwitch && !biMetalEnabled,
      )}
      disableThreeStoneOption={disableThreeStoneOption}
      currentStoneShape={currentStoneShape}
    />
  ));
}

function HeadPropertySelector({
  content,
  currentStyle,
  onSelectProperty,
  toggleSwitch,
  disableMainOptions,
  disableThreeStoneOption,
  currentStoneShape,
}) {
  const [hoveredOption, setHoveredOption] = useState(null);
  const toggleOn = Boolean(toggleSwitch?.value);
  const displayMain =
    hoveredOption ??
    content.options?.find((opt) =>
      content.hasToggleSwitch
        ? toggleOn && opt.isSelected
        : currentStyle
          ? opt.name === currentStyle
          : false,
    );

  return (
    <div className="properties-selector-tab">
      <div className="properties-section">
        <h4
          className={`property-main-heading${content.hasToggleSwitch ? " property-heading-with-toggle" : ""}`}
        >
          <span className="property-heading-title">
            {content.name}{" "}
            <span className="selected-property-option">
              {displayMain
                ? content.hasToggleSwitch
                  ? displayMain.name
                  : `${displayMain.name} (+ ₹${displayMain.price})`
                : ""}
            </span>
          </span>
          {content.hasToggleSwitch && toggleSwitch ? (
            <button
              type="button"
              role="switch"
              aria-checked={toggleOn}
              aria-label={`${toggleOn ? "Disable" : "Enable"} ${content.name}`}
              className={`property-switch-btn${toggleOn ? " property-switch-btn--on" : ""}`}
              onClick={() => toggleSwitch.onChange(!toggleOn)}
            >
              <span className="property-switch-thumb" aria-hidden />
            </button>
          ) : null}
        </h4>

        <div className="property-options">
          {content.options.map((option) => {
            const disableThreeStone =
              Boolean(disableThreeStoneOption) &&
              content.name === "STYLE" &&
              option.name === "Three Stone";
            const disableStoneIncompatibleHeadStyle =
              content.name === "STYLE" &&
              Array.isArray(option.allowedStoneShapes) &&
              !option.allowedStoneShapes.includes(currentStoneShape);
            const disabled =
              disableMainOptions ||
              disableThreeStone ||
              disableStoneIncompatibleHeadStyle;
            return (
              <div
                className={`property-option ${option.isSelected ? "selected" : ""}${disabled ? " property-option-disabled" : ""}`}
                key={option.name}
                aria-disabled={disabled || undefined}
                onClick={() => {
                  if (disabled) return;
                  onSelectProperty(content.name, option.name);
                }}
                onMouseEnter={() => setHoveredOption(option)}
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
