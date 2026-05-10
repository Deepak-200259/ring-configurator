import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DAMP = 6;

function applyOpacityToObject3D(root, opacity) {
  if (!root) return;
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    const materials = Array.isArray(obj.material)
      ? obj.material
      : [obj.material];
    for (const mat of materials) {
      if (!mat || typeof mat.opacity !== "number") continue;
      mat.transparent = opacity < 1 - 1e-4;
      mat.opacity = opacity;
      mat.needsUpdate = true;
    }
  });
}

function MountedGate({ swapVersion, onReady, children }) {
  useLayoutEffect(() => {
    onReady(swapVersion);
  }, [swapVersion, onReady]);
  return children;
}

/**
 * Fade out the currently visible asset, optionally show an in-scene loader while
 * the next asset Suspense-loads, then fade the new asset in.
 *
 * `children` receives the frozen swap token that should drive which asset renders.
 */
export default function SceneDeferredFadeSwap({
  swapKey,
  children,
  onSwapBusyChange,
}) {
  const groupRef = useRef(null);
  const [frozenKey, setFrozenKey] = useState(swapKey);
  const [showLoader, setShowLoader] = useState(false);

  const phaseRef = useRef("idle"); // idle | fadeOut | fadeInPending | fadeIn
  const opacityRef = useRef(1);
  const targetKeyRef = useRef(swapKey);
  const swapArmedRef = useRef(false);
  const reportedBusyRef = useRef(false);

  useEffect(() => {
    targetKeyRef.current = swapKey;
    if (swapKey !== frozenKey && phaseRef.current === "idle") {
      phaseRef.current = "fadeOut";
      swapArmedRef.current = false;
      opacityRef.current = 1;
      applyOpacityToObject3D(groupRef.current, 1);
    }
  }, [swapKey, frozenKey]);

  const handleReady = useCallback((_version) => {
    setShowLoader(false);
    if (phaseRef.current === "fadeInPending") {
      phaseRef.current = "fadeIn";
      opacityRef.current = 0;
      applyOpacityToObject3D(groupRef.current, 0);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (reportedBusyRef.current) {
        reportedBusyRef.current = false;
        onSwapBusyChange?.(false);
      }
    };
  }, [onSwapBusyChange]);

  useFrame((_, delta) => {
    const busy = phaseRef.current !== "idle";
    if (busy !== reportedBusyRef.current) {
      reportedBusyRef.current = busy;
      onSwapBusyChange?.(busy);
    }

    const phase = phaseRef.current;

    if (phase === "fadeOut") {
      opacityRef.current = THREE.MathUtils.damp(
        opacityRef.current,
        0,
        DAMP,
        delta,
      );
      applyOpacityToObject3D(groupRef.current, opacityRef.current);

      if (opacityRef.current < 0.035 && !swapArmedRef.current) {
        swapArmedRef.current = true;
        phaseRef.current = "fadeInPending";
        opacityRef.current = 0;
        applyOpacityToObject3D(groupRef.current, 0);
        setShowLoader(true);
        setFrozenKey(targetKeyRef.current);
      }
      return;
    }

    if (phase === "fadeIn") {
      opacityRef.current = THREE.MathUtils.damp(
        opacityRef.current,
        1,
        DAMP,
        delta,
      );
      applyOpacityToObject3D(groupRef.current, opacityRef.current);

      if (opacityRef.current > 0.965) {
        opacityRef.current = 1;
        applyOpacityToObject3D(groupRef.current, 1);
        phaseRef.current = "idle";
        swapArmedRef.current = false;
      }
    }
  });

  return (
    <>
      {showLoader ? (
        <Html center>
          <div className="scene-asset-loader" role="status" aria-live="polite">
            Loading…
          </div>
        </Html>
      ) : null}

      <group ref={groupRef}>
        <Suspense fallback={null}>
          <MountedGate swapVersion={frozenKey} onReady={handleReady}>
            {children(frozenKey)}
          </MountedGate>
        </Suspense>
      </group>
    </>
  );
}
