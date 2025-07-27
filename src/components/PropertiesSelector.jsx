export default function PropertiesSelector(props) {
  return (
    <div className="properties-selector-tab">
      {props.content.includesEngraving ? (
        <EngravingPropertySelector property={props.content} />
      ) : (
        <div className="properties-section">
          <h4 className="property-main-heading">
            {props.content.name}{" "}
            <span className="selected-property-option">
              {props.currentStyle ? props.currentStyle : props.currentMetal}
            </span>
          </h4>
          <div className="property-options">
            {!props.content.mainOptionsHasText
              ? props.content.options.map((option) => {
                  return (
                    <div className="property-option" key={option.name}>
                      <img
                        className="property-icon"
                        src={option.img}
                        alt={option.name}
                      />
                    </div>
                  );
                })
              : null}
          </div>
          <h5 className="property-sub-heading">
            {props.content.subHeadingName}{" "}
            <span className="selected-property-option">
              {props.currentSideSetting
                ? props.currentSideSetting
                : props.currentCarat}
            </span>
          </h5>
          <div className="property-options">
            {!props.content.subOptionsHasText
              ? props.content.subOptions.map((option) => {
                  return (
                    <div className="property-option" key={option.name}>
                      <img
                        className="property-icon"
                        src={option.img}
                        alt={option.name}
                      />
                    </div>
                  );
                })
              : props.content.subOptions.map((option) => {
                  return (
                    <div className="property-option" key={option.name}>
                      <p className="property-icon">{option.name}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
}

function EngravingPropertySelector({ property }) {
  return (
    <>
      <div className="properties-section">
        <h4 className="property-main-heading">{property.name}</h4>
        <input
          type="text"
          name="EngravingText"
          id="engraving-text-input"
          placeholder="Type here"
          className="engraving-text-input"
        />
        <h5 className="property-sub-heading">{property.subHeading1}</h5>
        <div className="sub-options-container">
          {property.subOptions1.map((option, index) => {
            return (
              <div className={`${"font-option"} ${index === 0 ? "selected" : ""}`}>
                <img
                  className="font-icon"
                  src={option.img}
                  alt={option.name}
                  key={option.name}
                />
              </div>
            );
          })}
        </div>
        <h5 className="property-sub-heading">{property.subHeading2}</h5>
        <div className="symbols">
          {property.subOptions2.map((option) => {
            return (
              <p className="symbol" key={option}>
                {option}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
