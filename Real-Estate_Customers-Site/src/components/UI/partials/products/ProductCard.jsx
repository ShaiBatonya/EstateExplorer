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
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { AiFillStar } from "react-icons/ai"; 
import "./ProductCard.css"; 

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="product-card-enhanced"
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
        className="card-container"
      >
        <Image
          src={product.product_image}
          alt={product.product_name}
          objectFit="cover"
          h="250px"
          w="100%"
          cursor="pointer"
          _hover={{ filter: "brightness(1.1)" }}
          onClick={() => navigate(`/product/${product._id}`)}
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
          >
            {product.product_name}
          </Text>

          <Text mt={2} fontSize="md" color="gray.500" noOfLines={2}>
            {product.product_description}
          </Text>

          <VStack mt={5} spacing={3}>
            {user ? (
              <>
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
                          color={i < 4 ? "teal.500" : "gray.300"}
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
