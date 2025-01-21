import React from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link as ChakraLink,
  chakra,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaApple,
  FaGooglePlay,
  FaGithub,
} from "react-icons/fa";

const ListHeader = ({ children }) => (
  <Text
    fontWeight="700"
    fontSize="lg"
    mb={2}
    color="var(--luxury-color, #d4af37)"
    fontFamily='"Heebo", sans-serif'
    letterSpacing="0.05em"
    _hover={{ textDecoration: "underline", color: "#ffc107" }}
    transition="color 0.2s ease"
  >
    {children}
  </Text>
);

// Reusable Social Button
const SocialButton = ({ children, label, href }) => (
  <chakra.button
    bg="linear-gradient(135deg, #2193b0, #6dd5ed)"
    rounded="full"
    w={10}
    h={10}
    cursor="pointer"
    as="a"
    href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="transform 0.3s ease, background 0.3s ease"
    _hover={{
      transform: "scale(1.2)",
      bg: "linear-gradient(135deg, #6dd5ed, #2193b0)",
    }}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Text srOnly>{label}</Text>
    {children}
  </chakra.button>
);

export default function Footer() {
  return (
    <Box
      bg="linear-gradient(180deg, #0f0f0f, #1a1a1a)"
      color="gray.300"
      borderTop="1px solid #2d2d2d"
      fontFamily='"Heebo", sans-serif'
    >
      <Container as={Stack} maxW="7xl" py={12}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <ChakraLink href="#">About Us</ChakraLink>
            <ChakraLink href="#">Blog</ChakraLink>
            <ChakraLink href="#">Career</ChakraLink>
            <ChakraLink href="#">Contact Us</ChakraLink>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <ChakraLink href="#">Help Center</ChakraLink>
            <ChakraLink href="#">Safety Center</ChakraLink>
            <ChakraLink href="#">Community Guidelines</ChakraLink>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Legal</ListHeader>
            <ChakraLink href="#">Cookie Policy</ChakraLink>
            <ChakraLink href="#">Privacy Policy</ChakraLink>
            <ChakraLink href="#">Terms of Service</ChakraLink>
            <ChakraLink href="#">Law Enforcement</ChakraLink>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Download App</ListHeader>
            <Stack direction="row" spacing={4}>
              <ChakraLink href="#appstore" aria-label="App Store">
                <FaApple size={24} color="var(--luxury-color, #d4af37)" />
              </ChakraLink>
              <ChakraLink href="#playstore" aria-label="Google Play">
                <FaGooglePlay size={24} color="var(--luxury-color, #d4af37)" />
              </ChakraLink>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box borderTopWidth={1} borderStyle="solid" borderColor="#2d2d2d" py={6}>
        <Container
          as={Stack}
          maxW="7xl"
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text fontSize="sm" textAlign="center">
            © 2023 Your Company. All rights reserved. | Created by <chakra.span color="var(--luxury-color, #d4af37)">Shai Batonya</chakra.span>
          </Text>
          <Stack direction="row" spacing={6}>
            <SocialButton label="GitHub" href="https://github.com/ShaiBatonya">
              <FaGithub />
            </SocialButton>
            <SocialButton label="Twitter" href="https://twitter.com/">
              <FaTwitter />
            </SocialButton>
            <SocialButton label="YouTube" href="https://youtube.com/">
              <FaYoutube />
            </SocialButton>
            <SocialButton label="Instagram" href="https://instagram.com/">
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
