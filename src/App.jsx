import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import Experience from "./experience/Experience";

export default function App() {
  const [selectedStyle, setSelectedStyle] = useState("Plain"); // default style

  return (
    <>
      <NavigationBar setSelectedStyle={setSelectedStyle} />
      <Canvas
        className="canvas-container"
        camera={{ position: [0, 0, 20], fov: 50 }}
        scene={{ background: 0xffffff, backgroundIntensity: 1 }}
      >
        <Experience selectedStyle={selectedStyle} />
      </Canvas>
    </>
  );
}
