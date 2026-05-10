export default function RingSelectionTabs({
  selectedOption,
  options,
  onClick,
  endAction,
}) {
  return (
    <div className="ring-selection-tabs">
      <div className="ring-selection-tabs__items">
        {options.map((option, index) => {
          return (
            <div
              className={
                selectedOption === option
                  ? "ring-selection-tab selected"
                  : "ring-selection-tab"
              }
              key={index}
              onClick={(e) => onClick(option, e)}
            >
              <img
                src={
                  selectedOption.name == option.name
                    ? selectedOption.activeImg
                    : option.inactiveImg
                }
                alt={selectedOption.name}
              />
              {selectedOption.name === option.name ? (
                <p> {selectedOption.name} </p>
              ) : null}
            </div>
          );
        })}
      </div>
      {endAction ?? null}
    </div>
  );
}
