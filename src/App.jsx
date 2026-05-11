import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import ChangeViewButton from "./components/ChangeViewButton";
import FaqDropdown from "./components/FaqDropdown";
import NavigationBar from "./components/NavigationBar";
import PriceSummaryPanel from "./components/PriceSummaryPanel";
import { RingConfiguratorProvider } from "./context/RingConfiguratorContext";
import Experience from "./experience/Experience";

export default function App() {
  useEffect(() => {
    const blockMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", blockMenu);
    return () => document.removeEventListener("contextmenu", blockMenu);
  }, []);

  return (
    <RingConfiguratorProvider>
      <div className="app-shell">
        <div className="app-shell__canvas-column">
          <div className="canvas-overlay-top">
            <div className="canvas-overlay-top__toolbar">
              <ChangeViewButton />
              <FaqDropdown />
              <PriceSummaryPanel />
            </div>
          </div>
          <Canvas
            className="canvas-container"
            camera={{ position: [0, 0, 30], fov: 30 }}
            shadows
            scene={{ background: "#f8f8f8", backgroundIntensity: 1 }}
          >
            <Experience />
          </Canvas>
        </div>
        <NavigationBar />
      </div>
    </RingConfiguratorProvider>
  );
}
