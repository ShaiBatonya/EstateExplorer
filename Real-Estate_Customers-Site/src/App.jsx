import "./App.css";
import RouterIndex from "./routes/RouterIndex";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box className="App" position="relative" overflowX="hidden">
      <Box className="white-gradient" />
      <RouterIndex />
    </Box>
  );
}

export default App;
