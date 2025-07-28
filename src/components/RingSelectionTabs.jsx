export default function RingSelectionTabs(props) {
  return (
    <>
      <div className="ring-selection-tabs">
        {props.options.map((option, index) => {
          return (
            <div
              className={
                props.selectedOption === option
                  ? "ring-selection-tab selected"
                  : "ring-selection-tab"
              }
              key={index}
              onClick={(e) => props.onClick(option, e)}
            >
              <img
                src={
                  props.selectedOption.name == option.name
                    ? props.selectedOption.activeImg
                    : option.inactiveImg
                }
                alt={props.selectedOption.name}
              />
              {props.selectedOption.name === option.name
                ? <p> {props.selectedOption.name} </p>
                : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
