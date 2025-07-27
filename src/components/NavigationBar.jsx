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
      { name: "PLAIN", img: plain, price: 1000 },
      { name: "CATHEDRAL", img: cathedral, price: 1000 },
      { name: "KNIFE EDGE", img: knifeEdge, price: 2000 },
      { name: "SPLIT", img: split, price: 3000 },
      { name: "TWISTED", img: twisted, price: 4000 },
      { name: "WIDE PLAIN", img: widePlain, price: 5000 },
    ],
    subHeadingName: "SIDE SETTING",
    subOptionsHasText: false,
    subOptions: [
      { name: "NONE", img: plain, price: 0 },
      { name: "CHANNEL", img: channel, price: 500 },
      { name: "PLATE PRONG", img: plateProng, price: 1000 },
    ],
  },
  {
    name: "METAL",
    includesEngraving: false,
    mainOptionsHasText: false,
    options: [
      { name: "WHITE GOLD", img: whiteGold, price: 500 },
      { name: "YELLOW GOLD", img: yellowGold, price: 500 },
      { name: "ROSE GOLD", img: roseGold, price: 500 },
      { name: "PLATINUM", img: platinum, price: 500 },
    ],
    subHeadingName: "CARAT",
    subOptionsHasText: true,
    subOptions: [
      { name: "14K", price: 0 },
      { name: "18K", price: 500 },
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

export default function NavigationBar() {
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

    for (const child of target.children.parentElement) {
      child.classList.contains("selected") &&
        child.classList.remove("selected");
    }
    target.classList.add("selected");
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
          />
        ))}
      </div>
    </>
  );
}
