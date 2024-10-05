import { useContext } from "react";
import {
  Box,
  Badge,
  Image,
  Button,
  Text,
  Flex,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // For smooth animations
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { AiFillStar } from "react-icons/ai"; // Star icon from react-icons
import "./ProductCard.css"; // Custom CSS for advanced styling

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Access user context to check authentication

  return (
    <motion.div
      whileHover={{ scale: 1.03 }} // Slight scaling effect on hover
      whileTap={{ scale: 0.98 }} // Slight scale down on click
      className="product-card"
    >
      <Box
        id={product._id}
        bg={useColorModeValue("white", "gray.800")}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        shadow="lg"
        maxW="sm"
        mx="auto"
        transition="all 0.3s"
        className="card-container"
      >
        <Image
          src={product.product_image}
          alt={product.product_name}
          objectFit="cover"
          h="250px"
          w="100%"
          cursor="pointer"
          _hover={{ filter: "brightness(1.1)" }} // Lighten image on hover
          onClick={() => navigate(`/product/${product._id}`)}
          transition="filter 0.3s ease"
        />

        <Box p={6}>
          <Badge borderRadius="full" px="3" colorScheme="green">
            New
          </Badge>

          <Text
            mt={4}
            fontSize="2xl"
            fontWeight="bold"
            lineHeight="short"
            color="teal.600"
            noOfLines={1}
            textAlign="center"
            _hover={{ color: "teal.800" }}
            transition="color 0.3s ease"
          >
            {product.product_name}
          </Text>

          <Text mt={2} fontSize="md" color="gray.500" noOfLines={2}>
            {product.product_description}
          </Text>

          <VStack mt={5} spacing={3}>
            {user ? (
              <>
                {/* Show full details only if the user is authenticated */}
                <HStack justifyContent="space-between" mt={4} w="full">
                  <Text fontSize="xl" fontWeight="bold" color="gray.700">
                    ${product.product_price}
                  </Text>
                  <HStack spacing={1}>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <AiFillStar
                          key={i}
                          color={i < 4 ? "teal.500" : "gray.300"} // Adjust rating display
                        />
                      ))}
                  </HStack>
                </HStack>

                <Button
                  variant="solid"
                  colorScheme="teal"
                  w="full"
                  onClick={() => navigate(`/product/${product._id}`)}
                  _hover={{ bg: "teal.500" }}
                  rounded="md"
                  fontSize="md"
                >
                  View Details
                </Button>
              </>
            ) : (
              <>
                {/* Show only if the user is not authenticated */}
                <Text mt={4} fontSize="lg" fontWeight="bold" color="red.500">
                  Register or Login to View Details
                </Text>
                <Button
                  as={RouterLink}
                  to="/Register"
                  variant="solid"
                  colorScheme="teal"
                  w="full"
                  _hover={{ bg: "teal.500" }}
                  rounded="md"
                  fontSize="md"
                >
                  Register to Buy
                </Button>
              </>
            )}
          </VStack>
        </Box>
      </Box>
    </motion.div>
  );
}

export default ProductCard;
