import { useContext } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Flex,
  Divider,
  Stack,
  Badge,
  Image,
  CardBody,
  Card,
  CardFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import "./ProductCard.css";
import { StarIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../../../context/AuthContext";

function ProductCard({ product, addToCart }) {
  // Access the navigation utility from react-router-dom
  const navigate = useNavigate();

  // Access the user context
  const { user } = useContext(AuthContext);

  // Hero component containing the product details
  const Hero = () => {
    // Example property details
    const property = {
      beds: 3,
      baths: 2,
      reviewCount: 34,
      rating: 4,
    };

    return (
      <Flex>
        <Box
          id={product._id}
          bg="white"
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          textAlign="center"
        >
          <Image
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
            style={{
              cursor: "pointer",
              borderRadius: "8px",
              margin: "0 auto",
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
            src={product.product_image}
            alt={product.product_name}
          />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge rounded="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {property.beds} beds &bull; {property.baths} baths
              </Box>
            </Box>

            <Text
              mt="4"
              mb="4"
              fontWeight="bold"
              fontSize={{ base: "l", md: "2xl", lg: "3xl" }}
              lineHeight="1.2"
              color="teal.600"
              textAlign="center"
              maxW="xl"
              mx="auto"
              noOfLines={3}
              _hover={{ color: "teal.800" }}
              transition="color 0.3s"
            >
              {product.product_name}
            </Text>

            <Text mt="2" mb="2" fontSize="m" fontFamily={"bold"} color="gray.600">
              {product.product_description}
            </Text>

            <Box fontSize="xl">
              {product.product_price}
              <Box as="span" color="gray.600" fontSize="Xl" fontWeight={"bold"}>
                $ WK
              </Box>
            </Box>

            <Box display="flex" mt="2" mb={2} alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < property.rating ? "teal.500" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="Xl">
                {property.reviewCount} reviews
              </Box>
            </Box>

            {/* Conditional rendering based on user authentication */}
            {user ? (
              <Button
                mb={7}
                variant="solid"
                colorScheme="blue"
                ml="2"
                _hover={{
                  bg: "green.300",
                }}
                onClick={() => {
                  navigate(`/product/${product._id}`);
                }}
                style={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  margin: "0 auto",
                }}
              >
                click for more details
              </Button>
            ) : (
              <Button
                as={RouterLink}
                ml="2"
                to="/Register"
                _hover={{
                  bg: "green.300",
                }}
                mt={5}
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  navigate(`/product/${product._id}`);
                }}
                style={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  margin: "0 auto",
                }}
              >
                For more details Register/Login
              </Button>
            )}
          </Box>
        </Box>
      </Flex>
    );
  };

  return <Hero />;
}

export default ProductCard;
