import { Spinner, Center, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Motion component for smooth fade-in
const MotionVStack = motion(VStack);

const LoadingSpinner = () => {
  return (
    <Center h="100vh" bgGradient="linear(to-br, black, gray.800)" p={6}>
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
          color="teal.300"
          size="xl"
        />
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="teal.300"
          textAlign="center"
        >
          Loading your dream properties...
        </Text>
      </MotionVStack>
    </Center>
  );
};

export default LoadingSpinner;
