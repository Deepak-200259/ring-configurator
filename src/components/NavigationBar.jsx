import { useState } from "react";
import {
  activeHead,
  activeOther,
  activeShank,
  activeStone,
  inactiveHead,
  inactiveOther,
  inactiveShank,
  inactiveStone,
} from "../assets";
import PropertiesSelector from "./PropertiesSelector";
import RingSelectionTabs from "./RingSelectionTabs";

const RingSelectionTabOptions = [
  { name: "SHANK", activeImg: activeShank, inactiveImg: inactiveShank },
  { name: "HEAD", activeImg: activeHead, inactiveImg: inactiveHead },
  { name: "STONE", activeImg: activeStone, inactiveImg: inactiveStone },
  { name: "OTHER", activeImg: activeOther, inactiveImg: inactiveOther },
];

export default function NavigationBar() {
  const [currentTab, setCurrentTab] = useState(RingSelectionTabOptions[0]);
  const onSelectCurrentTab = (option, e) => {
    setCurrentTab(option);
    const target =
      e.target instanceof HTMLImageElement ||
      e.target instanceof HTMLParagraphElement
        ? e.target.parentElement
        : e.target;
    
    for(const child of target.children.parentElement){
      child.classList.contains("selected") && child.classList.remove("selected");
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
        <PropertiesSelector heading={"STYLE"} />
        <PropertiesSelector heading={"METAL"} />
        <PropertiesSelector heading={"ADD ENGRAVING"} />
        <PropertiesSelector heading={"MATCHING BRAND"} />
      </div>
    </>
  );
}
