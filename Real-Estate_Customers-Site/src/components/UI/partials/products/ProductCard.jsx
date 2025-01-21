import React, { useContext } from "react";
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
  Divider,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../../context/CartContext";
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import "./ProductCard.css";

const MotionBox = motion(Box);

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <MotionBox
      className="product-card"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      position="relative"
      p={5}
      rounded="xl"
      w="full"
      maxW="400px"
      mx="auto"
    >
      {/* Favorite (Wishlist) Button */}
      <Tooltip label="Add to Favorites" fontSize="sm" placement="top">
        <IconButton
          aria-label="Add to favorites"
          icon={<AiOutlineHeart />}
          position="absolute"
          top="15px"
          right="15px"
          fontSize="22px"
          variant="ghost"
          className="favorite-icon"
        />
      </Tooltip>

      {/* Property Image */}
      <Image
        src={product.product_image}
        alt={product.product_name}
        objectFit="cover"
        mb={3}
        w="100%"
        h="240px"
        borderRadius="lg"
        className="property-image"
      />

      <Box>
        {/* Premium Badge or Category */}
        <Badge
          bg="rgba(255, 255, 255, 0.15)"
          color="var(--luxury-color)"
          rounded="full"
          px={3}
          py={1}
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="0.06em"
          mb={2}
        >
          Premium
        </Badge>

        {/* Title / Name */}
        <Text fontWeight="bold" fontSize="xl" color="white" noOfLines={1}>
          {product.product_name}
        </Text>

        {/* Price */}
        <Text fontSize="lg" fontWeight="semibold" mt={1} color="var(--luxury-color)">
          ${product.product_price.toLocaleString()}
        </Text>

        <Divider borderColor="gray.600" my={3} />

        {/* Description */}
        <Text fontSize="sm" color="gray.300" noOfLines={2} mb={3}>
          {product.product_description}
        </Text>

        {/* Star Rating (or circle rating) */}
        <HStack spacing={1} mb={4}>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <Box
                key={i}
                h="6px"
                w="6px"
                bg={i < product.rating ? "yellow.400" : "gray.600"}
                borderRadius="full"
              />
            ))}
        </HStack>

        {/* Actions */}
        <VStack spacing={3}>
          {user ? (
            <>
              <Button
                size="md"
                w="full"
                bg="linear-gradient(135deg, #2c2c2c, #1a1a1a)"
                color="white"
                _hover={{
                  bg: "linear-gradient(135deg, #3a3a3a, #2c2c2c)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.7)",
                }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View Details
              </Button>
              <Button
                size="md"
                w="full"
                leftIcon={<AiOutlineShoppingCart />}
                className="add-to-cart"
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
              bg="rgba(255, 255, 255, 0.1)"
              rounded="md"
              color="white"
              fontSize="md"
              textAlign="center"
              whileHover={{ scale: 1.02 }}
            >
              Please{" "}
              <Text
                as="span"
                color="var(--luxury-color)"
                cursor="pointer"
                fontWeight="bold"
                onClick={() => navigate("/login")}
              >
                log in
              </Text>{" "}
              to view details or add to cart!
            </MotionBox>
          )}
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default ProductCard;
