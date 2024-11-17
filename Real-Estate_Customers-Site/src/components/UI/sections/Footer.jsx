import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram, FaApple, FaGooglePlay } from "react-icons/fa";

const ListHeader = ({ children }) => (
  <Text
    fontWeight="700"
    fontSize="lg"
    mb={2}
    color="teal.300"
    _hover={{ textDecoration: "underline", color: "teal.400" }}
  >
    {children}
  </Text>
);

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
    >
      <Container as={Stack} maxW="7xl" py={12}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <Link href="#">About Us</Link>
            <Link href="#">Blog</Link>
            <Link href="#">Career</Link>
            <Link href="#">Contact Us</Link>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <Link href="#">Help Center</Link>
            <Link href="#">Safety Center</Link>
            <Link href="#">Community Guidelines</Link>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Legal</ListHeader>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Law Enforcement</Link>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Download App</ListHeader>
            <Stack direction="row" spacing={4}>
              <Link href="#appstore" aria-label="App Store">
                <FaApple size={24} color="teal.300" />
              </Link>
              <Link href="#playstore" aria-label="Google Play">
                <FaGooglePlay size={24} color="teal.300" />
              </Link>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box borderTopWidth={1} borderStyle="solid" borderColor="gray.700" py={6}>
        <Container
          as={Stack}
          maxW="7xl"
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text fontSize="sm" textAlign="center">
            © 2023 Your Company. All rights reserved.
          </Text>
          <Stack direction="row" spacing={6}>
            <SocialButton label="Twitter" href="#">
              <FaTwitter />
            </SocialButton>
            <SocialButton label="YouTube" href="#">
              <FaYoutube />
            </SocialButton>
            <SocialButton label="Instagram" href="#">
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
