import "./App.css";
import ParticlesBg from "particles-bg";
import RouterIndex from "./routes/RouterIndex";
function App() {
  return (
    <div className="App">
      <div>
      <ParticlesBg type="cobweb" color="#00A3C4" num={150} bg={true} />
        <div className="white-gradient" />
        <RouterIndex />
      </div>
    </div>
  );
}

export default App;
