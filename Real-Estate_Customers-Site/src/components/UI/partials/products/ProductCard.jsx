import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  Badge,
  IconButton,
  Tooltip,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../../context/CartContext";
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";

const MotionBox = motion(Box);

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <MotionBox
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bgGradient="linear(to-br, gray.900, gray.800)"
      borderRadius="xl"
      overflow="hidden"
      shadow="2xl"
      p={5}
      position="relative"
      w="full"
      maxW="400px"
      mx="auto"
      _hover={{
        boxShadow: "dark-lg",
        transform: "translateY(-8px)",
      }}
    >
      {/* Favorite Button */}
      <Tooltip label="Add to Favorites" fontSize="sm" placement="top">
        <IconButton
          aria-label="Add to favorites"
          icon={<AiOutlineHeart />}
          position="absolute"
          top="10px"
          right="10px"
          fontSize="22px"
          color="gray.400"
          variant="ghost"
          _hover={{ color: "red.500" }}
        />
      </Tooltip>

      {/* Product Image */}
      <Image
        src={product.product_image}
        alt={product.product_name}
        objectFit="cover"
        borderRadius="md"
        h="250px"
        w="100%"
        mb={3}
        transition="opacity 0.4s ease"
        _hover={{ opacity: 0.85 }}
      />

      <Box>
        {/* Product Badge */}
        <Badge colorScheme="purple" borderRadius="full" px="3" py="1">
          Premium
        </Badge>

        {/* Product Title */}
        <Text
          mt={3}
          fontWeight="bold"
          fontSize="xl"
          color="white"
          noOfLines={1}
        >
          {product.product_name}
        </Text>

        {/* Product Price */}
        <Text fontSize="lg" fontWeight="semibold" color="teal.300" mt={2}>
          ${product.product_price}
        </Text>

        <Divider borderColor="gray.600" my={3} />

        {/* Product Description */}
        <Text fontSize="sm" color="gray.400" noOfLines={2}>
          {product.product_description}
        </Text>

        <HStack justify="space-between" align="center" mt={4}>
          {/* Star Ratings */}
          <HStack spacing={1}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Box
                  key={i}
                  h="6px"
                  w="6px"
                  bg={i < product.rating ? "yellow.400" : "gray.500"}
                  borderRadius="full"
                />
              ))}
          </HStack>
        </HStack>

        {/* Buttons */}
        <VStack mt={5} spacing={4}>
          {user ? (
            <>
              <Button
                size="lg"
                colorScheme="teal"
                w="full"
                onClick={() => navigate(`/product/${product._id}`)}
                _hover={{ bg: "teal.600" }}
              >
                View Details
              </Button>
              <Button
                leftIcon={<AiOutlineShoppingCart />}
                size="lg"
                colorScheme="blue"
                w="full"
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.product_name} added to cart!`);
                }}
              >
                Add to Cart
              </Button>
            </>
          ) : (
            <MotionBox
              p={4}
              bg="gray.700"
              borderRadius="md"
              color="white"
              fontSize="md"
              fontWeight="bold"
              textAlign="center"
              whileHover={{ scale: 1.02 }}
              transition="0.3s"
            >
              🚀 Please <Text as="span" color="teal.300" cursor="pointer" onClick={() => navigate("/login")}>Log In</Text> to view details or add to cart!
            </MotionBox>
          )}
        </VStack>
      </Box>
    </MotionBox>
  );
}

export default ProductCard;
