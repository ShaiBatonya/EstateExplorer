import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Contact = () => {
  return (
    <Box
      pt={{ base: "80px", md: "100px" }}
      bgGradient="linear(to-r, blackAlpha.900, gray.800)"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="whiteAlpha.900"
      px={{ base: 4, md: 8 }}
    >
      <MotionBox
        w="full"
        maxW="800px"
        p={{ base: 6, md: 10 }}
        bg="blackAlpha.800"
        borderRadius="2xl"
        boxShadow="2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Contact Us
        </Heading>
        <Text textAlign="center" mb={6}>
          We would love to hear from you! Whether you have a question, feedback,
          or simply want to say hello, please use the form below.
        </Text>

        <Flex direction="column" gap={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Your Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              bg="blackAlpha.600"
              _placeholder={{ color: "gray.400" }}
              borderColor="gray.700"
              focusBorderColor="cyan.500"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              bg="blackAlpha.600"
              _placeholder={{ color: "gray.400" }}
              borderColor="gray.700"
              focusBorderColor="cyan.500"
            />
          </FormControl>

          <FormControl id="phone" isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              bg="blackAlpha.600"
              _placeholder={{ color: "gray.400" }}
              borderColor="gray.700"
              focusBorderColor="cyan.500"
            />
          </FormControl>

          <FormControl id="message" isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
              placeholder="Enter your message"
              rows={4}
              bg="blackAlpha.600"
              _placeholder={{ color: "gray.400" }}
              borderColor="gray.700"
              focusBorderColor="cyan.500"
            />
          </FormControl>

          <Button
            colorScheme="cyan"
            size="lg"
            w="full"
            mt={4}
            boxShadow="0 0 20px cyan"
            _hover={{ boxShadow: "0 0 40px cyan" }}
          >
            Send Message
          </Button>
        </Flex>
      </MotionBox>
    </Box>
  );
};

export default Contact;
