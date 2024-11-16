import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram, FaApple, FaGooglePlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

const testimonials = [
  {
    text: "Amazing service, very professional!",
    name: "Emily Johnson",
    role: "Luxury Consultant",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    text: "Found the perfect property easily!",
    name: "Michael Brown",
    role: "Market Analyst",
    avatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    text: "Highly recommend, fantastic experience!",
    name: "Sarah Lee",
    role: "Property Specialist",
    avatar: "https://i.pravatar.cc/300?img=3",
  },
];

const ListHeader = ({ children }) => (
  <Text fontWeight="500" fontSize="lg" mb={2}>
    {children}
  </Text>
);

const SocialButton = ({ children, label, href }) => (
  <chakra.button
    bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
    rounded="full"
    w={8}
    h={8}
    cursor="pointer"
    as="a"
    href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{
      bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);

export default function Footer() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
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
                <FaApple size={24} />
              </Link>
              <Link href="#playstore" aria-label="Google Play">
                <FaGooglePlay size={24} />
              </Link>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box borderTopWidth={1} borderStyle="solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2023 Your Company. All Rights Reserved</Text>
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

      <Box py={10}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
          What Our Clients Say
        </Text>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Box
                p={5}
                bg="gray.800"
                borderRadius="lg"
                shadow="lg"
                textAlign="center"
                maxW="sm"
                mx="auto"
              >
                <Avatar
                  src={testimonial.avatar}
                  size="xl"
                  mb={4}
                  mx="auto"
                  border="2px solid teal"
                />
                <Text fontSize="lg" mb={2}>"{testimonial.text}"</Text>
                <Text fontWeight="bold">{testimonial.name}</Text>
                <Text fontSize="sm" color="gray.400">
                  {testimonial.role}
                </Text>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
