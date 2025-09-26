import { useState } from "react";

export default function PropertiesSelector(props) {
  const {
    content,
    currentStyle,
    currentSideSetting,
    currentMetal,
    currentCarat,
    onSelectProperty,
  } = props;

  // Hover state
  const [hoveredOption, setHoveredOption] = useState(null);
  const [hoveredSubOption, setHoveredSubOption] = useState(null);

  // Helper to get displayed name and price
  const getDisplayMain = () => {
    if (hoveredOption) return hoveredOption;

    if (!content.options || content.options.length === 0) return null;

    return content.options.find((opt) =>
      currentStyle
        ? opt.name === currentStyle
        : currentMetal
        ? opt.name === currentMetal
        : false
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
        : false
    );
  };

  const displayMain = getDisplayMain();
  const displaySub = getDisplaySub();

  return (
    <div className="properties-selector-tab">
      {content.includesEngraving ? (
        <EngravingPropertySelector property={content} />
      ) : (
        <div className="properties-section">
          {/* Main Heading */}
          <h4 className="property-main-heading">
            {content.name}{" "}
            <span className="selected-property-option">
              {displayMain?.name} (+ ₹{displayMain?.price})
            </span>
          </h4>

          {/* Main Options */}
          <div className="property-options">
            {!content.mainOptionsHasText &&
              content.options.map((option) => (
                <div
                  className={`property-option ${
                    option.isSelected ? "selected" : ""
                  }`}
                  key={option.name}
                  onClick={() => onSelectProperty(content.name, option.name)}
                  onMouseEnter={() => setHoveredOption(option)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <img
                    className="property-icon"
                    src={option.img}
                    alt={option.name}
                  />
                </div>
              ))}
          </div>

          {/* Sub Heading */}
          <h5 className="property-sub-heading">
            {content.subHeadingName}{" "}
            <span className="selected-property-option">
              {displaySub?.name}{" "}
              {displaySub?.price ? "- ₹" + displaySub?.price : ""}
            </span>
          </h5>

          {/* Sub Options */}
          <div className="property-options">
            {!content.subOptionsHasText
              ? content.subOptions.map((option) => (
                  <div
                    className={`property-option ${
                      option.isSelected ? "selected" : ""
                    }`}
                    key={option.name}
                    onClick={() =>
                      onSelectProperty(content.name, option.name, true)
                    }
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
              : content.subOptions.map((option) => (
                  <div
                    className={`property-option ${
                      option.isSelected ? "selected" : ""
                    }`}
                    key={option.name}
                    onClick={() =>
                      onSelectProperty(content.name, option.name, true)
                    }
                    onMouseEnter={() => setHoveredSubOption(option)}
                    onMouseLeave={() => setHoveredSubOption(null)}
                  >
                    <p className="property-icon">{option.name}</p>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EngravingPropertySelector({ property }) {
  return (
    <div className="properties-section">
      <h4 className="property-main-heading">{property.name}</h4>
      <input
        type="text"
        name="EngravingText"
        id="engraving-text-input"
        placeholder="Type here"
        className="engraving-text-input"
      />

      {/* Fonts */}
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

      {/* Symbols */}
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
