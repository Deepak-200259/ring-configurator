import { useState } from "react";
import { shankSupportsMatchingBand } from "../config/shankMatchingBandSupport";

export default function ShankSection({
  options,
  currentStyle,
  currentSideSetting,
  currentMetal,
  currentCarat,
  onSelectProperty,
  matchingBandEnabled,
  onToggleMatchingBand,
}) {
  return options.map((propertySelector, i) => (
    <ShankPropertySelector
      content={propertySelector}
      key={propertySelector.name}
      currentStyle={i === 0 ? currentStyle : null}
      currentSideSetting={i === 0 ? currentSideSetting : null}
      currentMetal={i === 1 ? currentMetal : null}
      currentCarat={i === 1 ? currentCarat : null}
      onSelectProperty={onSelectProperty}
      matchingBandEnabled={i === 0 ? matchingBandEnabled : undefined}
      onToggleMatchingBand={i === 0 ? onToggleMatchingBand : undefined}
    />
  ));
}

function ShankPropertySelector({
  content,
  currentStyle,
  currentSideSetting,
  currentMetal,
  currentCarat,
  onSelectProperty,
  matchingBandEnabled,
  onToggleMatchingBand,
}) {
  const [hoveredOption, setHoveredOption] = useState(null);
  const [hoveredSubOption, setHoveredSubOption] = useState(null);

  const getDisplayMain = () => {
    if (hoveredOption) return hoveredOption;
    if (!content.options || content.options.length === 0) return null;
    return content.options.find((opt) =>
      currentStyle
        ? opt.name === currentStyle
        : currentMetal
          ? opt.name === currentMetal
          : false,
    );
  };

  const getDisplaySub = () => {
    if (hoveredSubOption) return hoveredSubOption;
    if (!content.subOptions || content.subOptions.length === 0) return null;
    return content.subOptions.find((opt) =>
      currentSideSetting
        ? opt.name === currentSideSetting
        : currentCarat
          ? opt.name === currentCarat
          : false,
    );
  };

  const displayMain = getDisplayMain();
  const displaySub = getDisplaySub();
  const subOptions = content.subOptions ?? [];
  const hasSubSection = subOptions.length > 0;
  const showMatchingBandToggle =
    content.name === "STYLE" && typeof matchingBandEnabled === "boolean";
  const disableSubOptions = Boolean(
    showMatchingBandToggle && !matchingBandEnabled,
  );
  const displayedSubOption = disableSubOptions ? null : displaySub;
  const isStyleSection = content.name === "STYLE";

  if (content.includesEngraving) {
    return (
      <div className="properties-selector-tab">
        <ShankEngravingSection property={content} />
      </div>
    );
  }

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
          {!content.mainOptionsHasText &&
            content.options.map((option) => {
              const disableMainStyleOption =
                isStyleSection &&
                matchingBandEnabled &&
                !shankSupportsMatchingBand(option.name);
              return (
                <div
                  className={`property-option ${option.isSelected ? "selected" : ""}${disableMainStyleOption ? " property-option-disabled" : ""}`}
                  key={option.name}
                  onClick={() => {
                    if (disableMainStyleOption) return;
                    onSelectProperty(content.name, option.name);
                  }}
                  onMouseEnter={() => setHoveredOption(option)}
                  onMouseLeave={() => setHoveredOption(null)}
                  aria-disabled={disableMainStyleOption || undefined}
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

        {hasSubSection ? (
          <>
            {content.subHeadingName?.trim() ? (
              <h5
                className={`property-sub-heading${showMatchingBandToggle ? " property-sub-heading-with-toggle" : ""}`}
              >
                <span className="property-heading-title">
                  {content.subHeadingName}{" "}
                  <span className="selected-property-option">
                    {displayedSubOption?.name}{" "}
                    {displayedSubOption?.price
                      ? "(+ ₹" + displayedSubOption?.price + ")"
                      : ""}
                  </span>
                </span>
                {showMatchingBandToggle ? (
                  <button
                    type="button"
                    role="switch"
                    aria-checked={matchingBandEnabled}
                    aria-label={`${matchingBandEnabled ? "Disable" : "Enable"} ${content.subHeadingName}`}
                    className={`property-switch-btn${matchingBandEnabled ? " property-switch-btn--on" : ""}`}
                    onClick={() => onToggleMatchingBand?.(!matchingBandEnabled)}
                  >
                    <span className="property-switch-thumb" aria-hidden />
                  </button>
                ) : null}
              </h5>
            ) : null}

            <div
              className={`property-options${disableSubOptions ? " property-option-disabled" : ""}`}
            >
              {!content.subOptionsHasText
                ? subOptions.map((option) => (
                    <div
                      className={`property-option ${option.isSelected ? "selected" : ""}`}
                      key={option.name}
                      onClick={() => {
                        if (disableSubOptions) return;
                        onSelectProperty(content.name, option.name, true);
                      }}
                      onMouseEnter={() => setHoveredSubOption(option)}
                      onMouseLeave={() => setHoveredSubOption(null)}
                    >
                      <img
                        className="property-icon"
                        src={option.img}
                        alt={option.name}
                      />
                    </div>
                  ))
                : subOptions.map((option) => (
                    <div
                      className={`property-option ${option.isSelected ? "selected" : ""}`}
                      key={option.name}
                      onClick={() => {
                        if (disableSubOptions) return;
                        onSelectProperty(content.name, option.name, true);
                      }}
                      onMouseEnter={() => setHoveredSubOption(option)}
                      onMouseLeave={() => setHoveredSubOption(null)}
                    >
                      <p className="property-icon">{option.name}</p>
                    </div>
                  ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function ShankEngravingSection({ property }) {
  const [draftText, setDraftText] = useState("");
  const [committedText, setCommittedText] = useState("");
  const hasPendingChanges = draftText !== committedText;

  const handleConfirm = () => {
    const next = draftText.trim();
    setCommittedText(next);
    setDraftText(next);
  };

  const handleCancel = () => {
    setDraftText(committedText);
  };

  return (
    <div className="properties-section">
      <h4 className="property-main-heading">{property.name}</h4>
      <div className="engraving-input-row">
        <input
          type="text"
          name="EngravingText"
          id="engraving-text-input"
          placeholder="Type here"
          className="engraving-text-input"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
        />
        <button
          type="button"
          className="engraving-action-btn engraving-action-btn--confirm"
          onClick={handleConfirm}
          disabled={!hasPendingChanges}
          aria-label="Confirm engraving text"
          title={hasPendingChanges ? "Confirm" : "No changes to confirm"}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </button>
        <button
          type="button"
          className="engraving-action-btn engraving-action-btn--cancel"
          onClick={handleCancel}
          disabled={!hasPendingChanges}
          aria-label="Cancel engraving edits"
          title={hasPendingChanges ? "Cancel edits" : "No changes to cancel"}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <h5 className="property-sub-heading">{property.subHeading1}</h5>
      <div className="sub-options-container">
        {property.subOptions1.map((option, index) => (
          <div
            className={`font-option ${index === 0 ? "selected" : ""}`}
            key={option.name}
          >
            <img className="font-icon" src={option.img} alt={option.name} />
          </div>
        ))}
      </div>

      <h5 className="property-sub-heading">{property.subHeading2}</h5>
      <div className="symbols">
        {property.subOptions2.map((option) => (
          <p className="symbol" key={option}>
            {option}
          </p>
        ))}
      </div>
    </div>
  );
}
