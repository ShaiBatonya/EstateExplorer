import React from "react";
import { Box, useColorModeValue, Flex, Spinner } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../components/UI/sections/Navbar/Nav";
import Footer from "../components/UI/sections/Footer";
import { ErrorBoundary } from "react-error-boundary";

// Fallback UI for error boundary
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="80vh"
      bg="red.50"
      p={6}
      textAlign="center"
      borderRadius="md"
      shadow="lg"
    >
      <Box as="p" fontWeight="bold" fontSize="lg">
        Something went wrong:
      </Box>
      <Box as="pre" color="red.500" my={4}>
        {error.message}
      </Box>
      <Box
        as="button"
        bg="red.400"
        color="white"
        p={3}
        borderRadius="md"
        onClick={resetErrorBoundary}
        _hover={{ bg: "red.500" }}
      >
        Try Again
      </Box>
    </Flex>
  );
}

// Root component
function Root() {
  const bgColor = useColorModeValue("black", "black");
  const textColor = useColorModeValue("gray.800", "gray.800");

  const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <>
      <Nav />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <motion.div
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Box
            as="main"
            bg={bgColor}
            color={textColor}
            mt="80px"
            minH="80vh"
            p={{ base: 4, md: 8 }}
          >
            <React.Suspense
              fallback={
                <Flex justify="center" align="center" minH="80vh">
                  <Spinner size="xl" />
                </Flex>
              }
            >
              <Outlet />
            </React.Suspense>
          </Box>
        </motion.div>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default Root;
