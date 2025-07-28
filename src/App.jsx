import { Canvas } from "@react-three/fiber";
import NavigationBar from "./components/NavigationBar";
import Experience from "./experience/Experience";

export default function App() {
  console.log("App Testing");
  return (
    <>
      <NavigationBar />
      <Canvas className="canvas-container" camera={{position:[0,0,20],fov:50}}>
        <Experience />
      </Canvas> 
    </>
  );
}
