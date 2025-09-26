import { useState } from "react";
import {
  activeHead,
  activeOther,
  activeShank,
  activeStone,
  cathedral,
  channel,
  inactiveHead,
  inactiveOther,
  inactiveShank,
  inactiveStone,
  italics,
  knifeEdge,
  plain,
  plateProng,
  platinum,
  regular,
  roman,
  roseGold,
  script,
  split,
  twisted,
  whiteGold,
  widePlain,
  yellowGold,
} from "../assets";
import PropertiesSelector from "./PropertiesSelector";
import RingSelectionTabs from "./RingSelectionTabs";

const RingSelectionTabOptions = [
  { name: "SHANK", activeImg: activeShank, inactiveImg: inactiveShank },
  { name: "HEAD", activeImg: activeHead, inactiveImg: inactiveHead },
  { name: "STONE", activeImg: activeStone, inactiveImg: inactiveStone },
  { name: "OTHER", activeImg: activeOther, inactiveImg: inactiveOther },
];

const PropertiesSelectorOptions = [
  {
    name: "STYLE",
    includesEngraving: false,
    mainOptionsHasText: false,
    options: [
      { name: "Plain", img: plain, price: 1500, isSelected: true },
      { name: "Cathedral", img: cathedral, price: 2500, isSelected: false },
      { name: "Knife Edge", img: knifeEdge, price: 3500, isSelected: false },
      { name: "Split", img: split, price: 4500, isSelected: false },
      { name: "Twisted", img: twisted, price: 5500, isSelected: false },
      { name: "Wide Plain", img: widePlain, price: 6500, isSelected: false },
      { name: "Channel", img: channel, price: 7500, isSelected: false },
      { name: "Plate Prong", img: plateProng, price: 8500, isSelected: false },
    ],
    subHeadingName: "SIDE SETTING",
    subOptionsHasText: false,
    subOptions: [
      { name: "None", img: plain, price: 0, isSelected: true },
      { name: "Channel", img: channel, price: 500, isSelected: false },
      { name: "Plate Prong", img: plateProng, price: 1000, isSelected: false },
    ],
  },
  {
    name: "METAL",
    includesEngraving: false,
    mainOptionsHasText: false,
    options: [
      { name: "White Gold", img: whiteGold, price: 500, isSelected: false },
      { name: "Yellow Gold", img: yellowGold, price: 500, isSelected: false },
      { name: "Rose Gold", img: roseGold, price: 500, isSelected: false },
      { name: "Platinum", img: platinum, price: 500, isSelected: false },
    ],
    subHeadingName: "CARAT",
    subOptionsHasText: true,
    subOptions: [
      { name: "14K", price: 0, isSelected: false },
      { name: "18K", price: 500, isSelected: false },
    ],
  },
  {
    name: "ADD ENGRAVING",
    includesEngraving: true,
    subHeading1: "SELECT A FONT",
    subOptions1: [
      { name: "REGULAR", img: regular },
      { name: "SCRIPT", img: script },
      { name: "ITALICS", img: italics },
      { name: "ROMAN", img: roman },
    ],
    subHeading2: "ADD SYMBOLS",
    subOptions2: [
      "♡",
      "★",
      "☽",
      "∞",
      "☯︎",
      "♑︎",
      "♓︎",
      "♈︎",
      "♉︎",
      "♒︎",
      "♋︎",
      "♌︎",
      "♍︎",
      "♎︎",
      "♏︎",
      "♐︎",
    ],
  },
];

export default function NavigationBar(props) {
  const [currentTab, setCurrentTab] = useState(RingSelectionTabOptions[0]);
  const [currentStyle, setCurrentStyle] = useState(
    PropertiesSelectorOptions[0].options[0].name
  );
  const [currentSideSetting, setCurrentSideSetting] = useState(
    PropertiesSelectorOptions[0].subOptions[0].name
  );
  const [currentMetal, setCurrentMetal] = useState(
    PropertiesSelectorOptions[1].options[0].name
  );
  const [currentCarat, setCurrentCarat] = useState(
    PropertiesSelectorOptions[1].subOptions[0].name
  );
  const onSelectCurrentTab = (option, e) => {
    setCurrentTab(option);
    const target =
      e.target instanceof HTMLImageElement ||
      e.target instanceof HTMLParagraphElement
        ? e.target.parentElement
        : e.target;
    console.log(target);

    for (const child of target.parentElement.children) {
      child.classList.contains("selected") &&
        child.classList.remove("selected");
    }
    target.classList.add("selected");
  };

  const onSelectProperty = (category, optionName, isSubOption = false) => {
    const updatedOptions = [...PropertiesSelectorOptions];

    updatedOptions.forEach((group) => {
      if (group.name === category) {
        if (isSubOption) {
          group.subOptions = group.subOptions.map((opt) => ({
            ...opt,
            isSelected: opt.name === optionName,
          }));

          if (category === "STYLE") setCurrentSideSetting(optionName);
          if (category === "METAL") setCurrentCarat(optionName);
        } else {
          group.options = group.options.map((opt) => ({
            ...opt,
            isSelected: opt.name === optionName,
          }));

          if (category === "STYLE") {
            setCurrentStyle(optionName);
            props.setSelectedStyle(optionName); // <--- pass selection to App
          }
          if (category === "METAL") setCurrentMetal(optionName);
        }
      }
    });
  };

  return (
    <>
      <div className="navigation-bar">
        <RingSelectionTabs
          selectedOption={currentTab}
          options={RingSelectionTabOptions}
          onClick={onSelectCurrentTab}
        />
        {PropertiesSelectorOptions.map((propertySelector, i) => (
          <PropertiesSelector
            content={propertySelector}
            key={propertySelector.name}
            currentStyle={i == 0 ? currentStyle : null}
            currentSideSetting={i == 0 ? currentSideSetting : null}
            currentMetal={i == 1 ? currentMetal : null}
            currentCarat={i == 1 ? currentCarat : null}
            onSelectProperty={onSelectProperty}
          />
        ))}
      </div>
    </>
  );
}
