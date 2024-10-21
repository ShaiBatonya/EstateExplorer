import "./App.css";
import ParticlesBg from "particles-bg";
import RouterIndex from "./routes/RouterIndex";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box className="App" position="relative" overflowX="hidden">
      <ParticlesBg type="cobweb" color="#00A3C4" num={150} bg={true} />
      <Box className="white-gradient" />
      <RouterIndex />
    </Box>
  );
}

export default App;