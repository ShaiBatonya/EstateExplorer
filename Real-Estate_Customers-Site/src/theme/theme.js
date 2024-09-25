// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#0e0e10",
        color: "white",
      },
    },
  },
  colors: {
    brand: {
      primary: "#00A3C4",
      secondary: "#1A202C",
      accent: "#F56565",
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
});

export default theme;
