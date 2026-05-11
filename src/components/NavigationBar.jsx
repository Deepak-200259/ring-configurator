import { useState } from "react";
import {
  activeHead,
  activeShank,
  activeStone,
  inactiveHead,
  inactiveShank,
  inactiveStone,
} from "../assets";
import {
  HeadTabOptions,
  ShankTabOptions,
  StoneTabOptions,
} from "../config/ringTabOptions";
import { shankSupportsMatchingBand } from "../config/shankMatchingBandSupport";
import { shankStyleBlocksThreeStone } from "../config/threeStoneShankCompatibility";
import { useRingConfigurator } from "../context/RingConfiguratorContext";
import HeadSection from "./HeadSection";
import ResetConfiguratorModal, { ResetIcon } from "./ResetConfiguratorModal";
import RingSelectionTabs from "./RingSelectionTabs";
import ShankSection from "./ShankSection";
import StoneSection from "./StoneSection";

/** Head BI‑METAL choices that can pair with a gold shank (no Platinum). */
const BI_METAL_METAL_NAMES = ["White Gold", "Yellow Gold", "Rose Gold"];

const mapBiMetalOptionsFromShank = (options, shankMetal) => {
  const selected = BI_METAL_METAL_NAMES.includes(shankMetal)
    ? shankMetal
    : null;
  return options.map((opt) => ({
    ...opt,
    isSelected: selected !== null && opt.name === selected,
  }));
};

const cloneOptions = (options) =>
  options.map((group) => {
    const { subOptions, subOptions1, subOptions2, ...rest } = group;
    return {
      ...rest,
      options: group.options
        ? group.options.map((opt) => ({
            ...opt,
            ...(Array.isArray(opt.options)
              ? {
                  options: opt.options.map((sub) => ({ ...sub })),
                }
              : {}),
          }))
        : [],
      ...(subOptions != null
        ? { subOptions: subOptions.map((opt) => ({ ...opt })) }
        : {}),
      ...(subOptions1 != null
        ? { subOptions1: subOptions1.map((opt) => ({ ...opt })) }
        : {}),
      ...(subOptions2 != null ? { subOptions2: [...subOptions2] } : {}),
    };
  });

const RingSelectionTabOptions = [
  { name: "SHANK", activeImg: activeShank, inactiveImg: inactiveShank },
  { name: "HEAD", activeImg: activeHead, inactiveImg: inactiveHead },
  { name: "STONE", activeImg: activeStone, inactiveImg: inactiveStone },
];

/** @returns {null|Set<string>} `null` → all shapes allowed */
export function headAllowedStoneShapes(headStyleName) {
  const styleGroup = HeadTabOptions.find((g) => g.name === "STYLE");
  const entry = styleGroup?.options?.find((o) => o.name === headStyleName);
  const raw = entry?.allowedStoneShapes;
  if (raw == null) return null;
  return new Set(raw);
}

const STONE_SHAPE_ORDER =
  StoneTabOptions.find((g) => g.name === "SHAPE")?.options.map((o) => o.name) ??
  [];

function normalizeStoneShapeForHead(shapeName, headStyleName) {
  const allowed = headAllowedStoneShapes(headStyleName);
  if (!allowed) return shapeName;
  if (allowed.has(shapeName)) return shapeName;
  for (const n of STONE_SHAPE_ORDER) {
    if (allowed.has(n)) return n;
  }
  return [...allowed][0];
}

export default function NavigationBar() {
  const {
    setSelectedShankStyle,
    setSelectedMatchingBandStyle,
    matchingBandEnabled,
    setMatchingBandEnabled,
    setSelectedHeadStyle,
    setSelectedStoneStyle,
    setSelectedMetal,
    setSelectedHeadMetal,
    setStoneColor,
    biMetalEnabled,
    setBiMetalEnabled,
    setSelectedShankCarat,
    resetRingConfiguration,
    sceneAssetTransitionLocked,
  } = useRingConfigurator();

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [uiResetKey, setUiResetKey] = useState(0);
  const [currentTab, setCurrentTab] = useState(RingSelectionTabOptions[0]);
  const [shankTabOptions, setShankTabOptions] = useState(
    cloneOptions(ShankTabOptions),
  );
  const [headTabOptions, setHeadTabOptions] = useState(
    cloneOptions(HeadTabOptions),
  );
  const [stoneTabOptions, setStoneTabOptions] = useState(
    cloneOptions(StoneTabOptions),
  );
  const [currentStyle, setCurrentStyle] = useState(
    ShankTabOptions[0].options[0].name,
  );
  const [currentHeadStyle, setCurrentHeadStyle] = useState(
    HeadTabOptions[0].options[0].name,
  );
  const [currentSideSetting, setCurrentSideSetting] = useState(
    ShankTabOptions[0].subOptions[0].name,
  );
  const [currentMetal, setCurrentMetal] = useState(
    ShankTabOptions[1].options[0].name,
  );
  const [currentCarat, setCurrentCarat] = useState(
    ShankTabOptions[1].subOptions[0].name,
  );
  const [currentStoneShape, setCurrentStoneShape] = useState(
    StoneTabOptions[0].options[0].name,
  );

  const confirmResetConfiguration = () => {
    resetRingConfiguration();
    setShankTabOptions(cloneOptions(ShankTabOptions));
    setHeadTabOptions(cloneOptions(HeadTabOptions));
    setStoneTabOptions(cloneOptions(StoneTabOptions));
    setCurrentStyle(ShankTabOptions[0].options[0].name);
    setCurrentSideSetting(ShankTabOptions[0].subOptions[0].name);
    setCurrentMetal(ShankTabOptions[1].options[0].name);
    setCurrentCarat(ShankTabOptions[1].subOptions[0].name);
    setCurrentHeadStyle(HeadTabOptions[0].options[0].name);
    setCurrentStoneShape(StoneTabOptions[0].options[0].name);
    setCurrentTab(RingSelectionTabOptions[0]);
    setUiResetKey((k) => k + 1);
    setResetModalOpen(false);
  };

  const handleMatchingBandToggle = (checked) => {
    setMatchingBandEnabled(checked);
    if (!checked) return;

    if (!shankSupportsMatchingBand(currentStyle)) {
      const fallback = "Plain";
      setCurrentStyle(fallback);
      setSelectedShankStyle(fallback);
      setShankTabOptions((prev) =>
        prev.map((group) => {
          if (group.name !== "STYLE") return group;
          return {
            ...group,
            options: group.options.map((opt) => ({
              ...opt,
              isSelected: opt.name === fallback,
            })),
          };
        }),
      );
    }
  };

  const handleBiMetalToggle = (checked) => {
    setBiMetalEnabled(checked);
    if (!checked) {
      setSelectedHeadMetal(null);
      return;
    }
    setHeadTabOptions((prev) =>
      prev.map((group) => {
        if (group.name !== "BI-METAL") return group;
        return {
          ...group,
          options: mapBiMetalOptionsFromShank(group.options, currentMetal),
        };
      }),
    );
    setSelectedHeadMetal(
      BI_METAL_METAL_NAMES.includes(currentMetal) ? currentMetal : null,
    );
  };

  const onSelectCurrentTab = (option, e) => {
    setCurrentTab(option);
    const target =
      e.target instanceof HTMLImageElement ||
      e.target instanceof HTMLParagraphElement
        ? e.target.parentElement
        : e.target;

    for (const child of target.parentElement.children) {
      child.classList.contains("selected") &&
        child.classList.remove("selected");
    }
    target.classList.add("selected");
  };

  const onSelectProperty = (category, optionName, isSubOption = false) => {
    const currentTabName = currentTab.name;
    const isHeadTab = currentTabName === "HEAD";
    const isStoneTab = currentTabName === "STONE";
    if (
      isHeadTab &&
      category === "BI-METAL" &&
      !isSubOption &&
      !biMetalEnabled
    ) {
      return;
    }
    if (
      !isHeadTab &&
      !isStoneTab &&
      category === "STYLE" &&
      isSubOption &&
      !matchingBandEnabled
    ) {
      return;
    }
    if (
      !isHeadTab &&
      !isStoneTab &&
      category === "STYLE" &&
      !isSubOption &&
      matchingBandEnabled &&
      !shankSupportsMatchingBand(optionName)
    ) {
      return;
    }

    if (isStoneTab && category === "SHAPE") {
      const allowed = headAllowedStoneShapes(currentHeadStyle);
      if (allowed != null && !allowed.has(optionName)) return;
    }

    if (
      isHeadTab &&
      category === "STYLE" &&
      optionName === "Three Stone" &&
      shankStyleBlocksThreeStone(currentStyle)
    ) {
      return;
    }
    if (isHeadTab && category === "STYLE") {
      const allowedForCandidateHead = headAllowedStoneShapes(optionName);
      if (
        allowedForCandidateHead != null &&
        !allowedForCandidateHead.has(currentStoneShape)
      ) {
        return;
      }
    }

    if (
      !isHeadTab &&
      !isStoneTab &&
      category === "STYLE" &&
      !isSubOption &&
      shankStyleBlocksThreeStone(optionName) &&
      currentHeadStyle === "Three Stone"
    ) {
      return;
    }

    const sourceOptions = isHeadTab
      ? headTabOptions
      : isStoneTab
        ? stoneTabOptions
        : shankTabOptions;
    const updatedOptions = sourceOptions.map((group) => {
      if (group.name !== category) return group;

      if (isSubOption) {
        if (group.subOptions == null) return group;

        const updatedGroup = {
          ...group,
          subOptions: group.subOptions.map((opt) => ({
            ...opt,
            isSelected: opt.name === optionName,
          })),
        };

        if (!isHeadTab && !isStoneTab) {
          if (category === "STYLE") {
            setCurrentSideSetting(optionName);
            setSelectedMatchingBandStyle(optionName);
          }
          if (category === "METAL") {
            setCurrentCarat(optionName);
            setSelectedShankCarat(optionName);
          }
        }

        return updatedGroup;
      }

      const updatedGroup = {
        ...group,
        options: group.options.map((opt) => ({
          ...opt,
          isSelected: opt.name === optionName,
        })),
      };

      if (category === "STYLE") {
        if (isHeadTab) {
          setCurrentHeadStyle(optionName);
          setSelectedHeadStyle(optionName);
        } else if (!isStoneTab) {
          setCurrentStyle(optionName);
          setSelectedShankStyle(optionName);
        }
      }
      if (isStoneTab && category === "SHAPE") {
        setCurrentStoneShape(optionName);
        setSelectedStoneStyle(optionName);
      }
      if (!isHeadTab && category === "METAL") {
        setCurrentMetal(optionName);
        setSelectedMetal(optionName);
        if (biMetalEnabled) {
          setHeadTabOptions((prev) =>
            prev.map((group) => {
              if (group.name !== "BI-METAL") return group;
              return {
                ...group,
                options: mapBiMetalOptionsFromShank(group.options, optionName),
              };
            }),
          );
          setSelectedHeadMetal(
            BI_METAL_METAL_NAMES.includes(optionName) ? optionName : null,
          );
        }
      }

      if (isHeadTab && category === "BI-METAL" && biMetalEnabled) {
        setSelectedHeadMetal(optionName);
      }

      return updatedGroup;
    });

    if (isHeadTab) {
      setHeadTabOptions(updatedOptions);
    } else if (isStoneTab) {
      setStoneTabOptions(updatedOptions);
    } else {
      setShankTabOptions(updatedOptions);
    }

    if (isHeadTab && category === "STYLE") {
      const allowedForHead = headAllowedStoneShapes(optionName);
      let nextShape;
      if (optionName === "Three Stone") {
        nextShape =
          allowedForHead != null && allowedForHead.has("Oval")
            ? "Oval"
            : normalizeStoneShapeForHead(currentStoneShape, optionName);
      } else if (allowedForHead == null) {
        // Plain, Bezel, etc. accept every stone shape — keep the user's stone selection.
        nextShape = currentStoneShape;
      } else {
        nextShape = normalizeStoneShapeForHead(currentStoneShape, optionName);
      }
      if (nextShape !== currentStoneShape) {
        setCurrentStoneShape(nextShape);
        setSelectedStoneStyle(nextShape);
        setStoneTabOptions((prev) =>
          prev.map((group) => {
            if (group.name !== "SHAPE") return group;
            return {
              ...group,
              options: group.options.map((opt) => ({
                ...opt,
                isSelected: opt.name === nextShape,
              })),
            };
          }),
        );
      }
    }
  };

  const renderCurrentSection = () => {
    if (currentTab.name === "SHANK") {
      return (
        <ShankSection
          key={uiResetKey}
          options={shankTabOptions}
          currentStyle={currentStyle}
          currentSideSetting={currentSideSetting}
          currentMetal={currentMetal}
          currentCarat={currentCarat}
          onSelectProperty={onSelectProperty}
          matchingBandEnabled={matchingBandEnabled}
          onToggleMatchingBand={handleMatchingBandToggle}
          threeStoneHeadSelected={currentHeadStyle === "Three Stone"}
        />
      );
    }

    if (currentTab.name === "HEAD") {
      return (
        <HeadSection
          key={uiResetKey}
          options={headTabOptions}
          currentHeadStyle={currentHeadStyle}
          currentStoneShape={currentStoneShape}
          onSelectProperty={onSelectProperty}
          biMetalEnabled={biMetalEnabled}
          onToggleBiMetal={handleBiMetalToggle}
          disableThreeStoneOption={shankStyleBlocksThreeStone(currentStyle)}
        />
      );
    }

    if (currentTab.name === "STONE") {
      return (
        <StoneSection
          key={uiResetKey}
          options={stoneTabOptions}
          currentStoneShape={currentStoneShape}
          allowedStoneShapeNames={headAllowedStoneShapes(currentHeadStyle)}
          onSelectProperty={onSelectProperty}
          setStoneColor={setStoneColor}
        />
      );
    }
  };

  return (
    <>
      <div
        className={`navigation-bar${sceneAssetTransitionLocked ? " navigation-bar--scene-busy" : ""}`}
        aria-busy={sceneAssetTransitionLocked}
      >
        <div className="navigation-bar__top">
          <RingSelectionTabs
            selectedOption={currentTab}
            options={RingSelectionTabOptions}
            onClick={onSelectCurrentTab}
            endAction={
              <button
                type="button"
                className="ring-selection-tab ring-selection-tab--reset"
                aria-label="Reset ring configuration"
                title="Reset all choices"
                onClick={() => setResetModalOpen(true)}
              >
                <ResetIcon className="ring-selection-tab__reset-icon" />
              </button>
            }
          />
        </div>
        <div className="navigation-bar__body">{renderCurrentSection()}</div>
      </div>
      <ResetConfiguratorModal
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={confirmResetConfiguration}
      />
    </>
  );
}
