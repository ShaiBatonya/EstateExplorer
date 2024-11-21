// src/components/LoadingSpinner.jsx

import React from "react";
import { Spinner, Center, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

const LoadingSpinner = () => {
  return (
    <Center h="100vh" bg="black" p={6}>
      <MotionVStack
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        spacing={6}
      >
        <Spinner
          thickness="5px"
          speed="0.75s"
          emptyColor="gray.600"
          color="gold.500"
          size="xl"
        />
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="gold.500"
          textAlign="center"
        >
          Loading your exclusive experience...
        </Text>
      </MotionVStack>
    </Center>
  );
};

export default React.memo(LoadingSpinner);
