import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import CanvasContainer from "./components/CanvasContainer/CanvasContainer";

function App() {
  return (
    <div className="App">
      <CanvasContainer>
        <Canvas />
      </CanvasContainer>
    </div>
  );
}

export default App;
