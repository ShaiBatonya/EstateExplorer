import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
        fontFamily: 'Poppins, sans-serif',
        lineHeight: 'base',
      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
          color: 'teal.600',
        },
      },
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  colors: {
    brand: {
      50: '#e3fdfd',
      100: '#cbf1f5',
      200: '#a6e3e9',
      300: '#71c9ce',
      400: '#61a5c2',
      500: '#478cb5',
      600: '#3d6e8c',
      700: '#335f73',
      800: '#2b4b5e',
      900: '#1f3e50',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'teal.400',
          _hover: {
            bg: 'teal.500',
          },
        },
        outline: {
          borderColor: 'teal.400',
          _hover: {
            bg: 'teal.50',
          },
        },
      },
    },
  },
});

export default customTheme;
