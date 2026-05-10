import { changeViewIcon } from "../assets";
import {
  CAMERA_VIEW_LABELS,
  useRingConfigurator,
} from "../context/RingConfiguratorContext";

function EyeIcon({ className }) {
  return (
    <img
      className={className}
      src={changeViewIcon}
      alt=""
      width={22}
      height={22}
      draggable={false}
      aria-hidden
    />
  );
}

export default function ChangeViewButton() {
  const { cameraViewMode, cycleCameraView } = useRingConfigurator();
  const label = CAMERA_VIEW_LABELS[cameraViewMode] ?? cameraViewMode;

  return (
    <div className="change-view-btn">
      <button
        type="button"
        className="change-view-btn__trigger"
        aria-label={`Change view. Current: ${label}. Cycles top, front, right, rotating.`}
        title={`View: ${label} — click for next`}
        onClick={cycleCameraView}
      >
        <span className="change-view-btn__inner">
          <EyeIcon className="change-view-btn__icon" />
          <span className="change-view-btn__label">Change View</span>
        </span>
      </button>
    </div>
  );
}
