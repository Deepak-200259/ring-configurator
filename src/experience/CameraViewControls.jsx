import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import CameraControlsLib from "camera-controls";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useRingConfigurator } from "../context/RingConfiguratorContext";

const TARGET = new THREE.Vector3(0, 0, 0);

const VIEW_POSITIONS = {
  front: new THREE.Vector3(0, 0, 30),
  top: new THREE.Vector3(0, 30, 0.001),
  right: new THREE.Vector3(30, 0, 0),
  rotating: new THREE.Vector3(0, 6, 29),
};

/** Seconds for camera-controls spherical/target blend (position + orbit angles together). */
const VIEW_TRANSITION_SMOOTH_TIME = 0.25;

export default function CameraViewControls() {
  const controlsRef = useRef(null);
  const { cameraViewMode } = useRingConfigurator();
  /** Latest mode for async rest callbacks (avoid stale closures). */
  const cameraViewModeRef = useRef(cameraViewMode);
  /** Auto-orbit only after preset transition finishes — rotate(..., false) snaps phi/theta and cancelled setLookAt damping (visible jerk front→rotating). */
  const rotatingArmedRef = useRef(false);

  cameraViewModeRef.current = cameraViewMode;

  useLayoutEffect(() => {
    let cancelled = false;
    let raf = 0;

    const applyView = () => {
      if (cancelled) return;
      const controls = controlsRef.current;
      if (!controls) {
        raf = requestAnimationFrame(applyView);
        return;
      }

      const dest = VIEW_POSITIONS[cameraViewMode];
      if (!dest) return;

      if (cameraViewMode !== "rotating") {
        rotatingArmedRef.current = false;
      }

      controls.stop();
      controls.smoothTime = VIEW_TRANSITION_SMOOTH_TIME;
      const restPromise = controls.setLookAt(
        dest.x,
        dest.y,
        dest.z,
        TARGET.x,
        TARGET.y,
        TARGET.z,
        true,
      );

      if (cameraViewMode === "rotating") {
        rotatingArmedRef.current = false;
        restPromise.then(() => {
          if (!cancelled && cameraViewModeRef.current === "rotating") {
            rotatingArmedRef.current = true;
          }
        });
      }
    };

    applyView();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      controlsRef.current?.stop();
    };
  }, [cameraViewMode]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (
      !controls ||
      cameraViewMode !== "rotating" ||
      !rotatingArmedRef.current
    ) {
      return;
    }
    controls.rotate(0.22 * delta, 0, false);
  });

  return (
    <CameraControls
      ref={controlsRef}
      minDistance={20}
      maxDistance={34}
      maxPolarAngle={Math.PI / 2}
      mouseButtons={{
        left: CameraControlsLib.ACTION.ROTATE,
        middle: CameraControlsLib.ACTION.DOLLY,
        right: CameraControlsLib.ACTION.NONE,
        /** Required: partial mouseButtons replaces library defaults; omitting wheel disables scroll/trackpad dolly. */
        wheel: CameraControlsLib.ACTION.DOLLY,
      }}
    />
  );
}
