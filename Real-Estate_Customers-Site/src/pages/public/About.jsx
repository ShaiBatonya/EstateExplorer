// Import necessary modules and components
import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  VStack,
  HStack,
  Divider,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { FaUserTie, FaUserGraduate, FaUserMd, FaUserAstronaut, FaUserNinja } from "react-icons/fa";

// MotionBox for animation effects
const MotionBox = motion(Box);

function About() {
  return (
    <Box
      maxW="1200px"
      mx="auto"
      py={12}
      px={6}
      bgGradient="linear(to-br, black, gray.900)"
      color="white"
      borderRadius="xl"
      shadow="2xl"
    >
      {/* Header Section */}
      <Heading
        as="h2"
        size="2xl"
        textAlign="center"
        bgGradient="linear(to-r, teal.400, blue.500, purple.600)"
        bgClip="text"
        fontWeight="extrabold"
        mb={8}
      >
        About Us
      </Heading>

      {/* Introductory Text */}
      <Text fontSize="lg" textAlign="center" lineHeight="1.8" mb={10}>
        At <b>Global Estate</b>, we specialize in luxury real estate, providing
        unparalleled service to connect our clients with their dream properties.
        Our mission is to redefine real estate by combining innovation,
        expertise, and exceptional customer care.
      </Text>

      {/* Success Stories Section */}
      <Box my={10}>
        <Heading as="h3" size="lg" mb={6} textAlign="center">
          Success Stories
        </Heading>
        <Flex gap={8} direction={{ base: "column", md: "row" }}>
          {[{
            text: "Found our dream home...",
            name: "Emily Johnson",
            icon: FaUserTie,
          }, {
            text: "Secured our beachfront property...",
            name: "Michael Brown",
            icon: FaUserGraduate,
          }].map((story, index) => (
            <VStack
              key={index}
              p={5}
              bg="gray.800"
              borderRadius="lg"
              shadow="xl"
              align="flex-start"
              spacing={4}
              w="full"
            >
              <Text fontStyle="italic">"{story.text}"</Text>
              <HStack>
                <Avatar icon={<Icon as={story.icon} w={8} h={8} />} bg="teal.500" />
                <VStack align="flex-start" spacing={0}>
                  <Text fontWeight="bold">{story.name}</Text>
                  <Text fontSize="sm" color="gray.400">
                    Happy Client
                  </Text>
                </VStack>
              </HStack>
              <HStack>
                {[...Array(5)].map((_, i) => (
                  <Icon as={StarIcon} key={i} color="yellow.400" />
                ))}
              </HStack>
            </VStack>
          ))}
        </Flex>
      </Box>

      <Divider my={10} />

      {/* Meet Our Experts Section */}
      <Box>
        <Heading as="h3" size="lg" mb={6} textAlign="center">
          Meet Our Experts
        </Heading>
        <Flex wrap="wrap" justify="space-around" gap={6}>
          {[{
            name: "Sarah Lee",
            role: "Luxury Consultant",
            icon: FaUserMd,
          }, {
            name: "John Smith",
            role: "Market Analyst",
            icon: FaUserAstronaut,
          }, {
            name: "Emily Davis",
            role: "Property Specialist",
            icon: FaUserNinja,
          }].map((expert, index) => (
            <VStack key={index} align="center" spacing={3}>
              <Avatar icon={<Icon as={expert.icon} w={8} h={8} />} bg="blue.500" size="xl" />
              <Text fontWeight="bold">{expert.name}</Text>
              <Text color="gray.400">{expert.role}</Text>
            </VStack>
          ))}
        </Flex>
      </Box>

      <Divider my={10} />

      {/* Client Reviews Section */}
      <Box>
        <Heading as="h3" size="lg" mb={6} textAlign="center">
          What Our Clients Say
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {["Amazing service, very professional!", "Found the perfect property easily!", "Highly recommend, fantastic experience!"].map((review, i) => (
            <MotionBox
              key={i}
              p={5}
              bg="gray.800"
              borderRadius="lg"
              shadow="lg"
              whileHover={{ scale: 1.05 }}
            >
              <Text fontStyle="italic">"{review}"</Text>
              <Text mt={3} fontWeight="bold">
                - Client {i + 1}
              </Text>
            </MotionBox>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default About;
