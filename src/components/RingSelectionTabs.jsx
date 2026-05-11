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
          const isSelected = selectedOption.name === option.name;
          return (
            <div
              className={`ring-selection-tab${isSelected ? " selected" : ""}`}
              key={index}
              onClick={(e) => onClick(option, e)}
            >
              <img
                src={isSelected ? selectedOption.activeImg : option.inactiveImg}
                alt={option.name}
              />
              <p className="ring-selection-tab__label">{option.name}</p>
            </div>
          );
        })}
      </div>
      {endAction ?? null}
    </div>
  );
}
