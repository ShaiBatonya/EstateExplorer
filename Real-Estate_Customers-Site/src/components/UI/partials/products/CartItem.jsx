// src/pages/public/CartItem.jsx
import React from "react";
import {
  Box,
  Image,
  VStack,
  Badge,
  Flex,
  Button,
  IconButton,
  HStack,
  Tooltip,
  useColorModeValue,
  useToast,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";

const MotionBox = motion(Box);

function CartItem({ item, addToCart, decreaseQuantity, removeFromCart }) {
  const toast = useToast();

 
  const handleIncrease = () => {
    addToCart(item);
    toast({
      title: `${item.product_name} quantity increased.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDecrease = () => {
    decreaseQuantity(item);
    toast({
      title: `Reduced quantity for ${item.product_name}.`,
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleRemove = () => {
    removeFromCart(item._id);
    toast({
      title: `${item.product_name} removed.`,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <MotionBox
      p={6}
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="xl"
      shadow="lg"
      whileHover={{ scale: 1.03 }}
      transition="all 0.3s ease"
    >
      <HStack align="start" spacing={6}>
        <Image
          boxSize={{ base: "100px", md: "120px" }}
          borderRadius="md"
          src={item.product_image}
          alt={item.product_name}
          transition="all 0.3s"
          _hover={{ transform: "scale(1.05)" }}
          objectFit="cover"
        />
        <VStack align="start" spacing={2} flex={1}>
          <Text fontSize="lg" fontWeight="bold">
            {item.product_name}
          </Text>
          <Badge colorScheme="purple" fontSize="sm">
            ${item.product_price.toFixed(2)} x {item.quantity}
          </Badge>

          <Flex justify="space-between" w="100%" pt={2}>
            <Tooltip label="Increase quantity" placement="top">
              <Button size="sm" colorScheme="green" onClick={handleIncrease}>
                +
              </Button>
            </Tooltip>

            <Tooltip label="Decrease quantity" placement="top">
              <Button size="sm" colorScheme="yellow" onClick={handleDecrease}>
                -
              </Button>
            </Tooltip>

            <Tooltip label="Remove item" placement="top">
              <IconButton
                icon={<FaTrashAlt />}
                colorScheme="red"
                onClick={handleRemove}
                aria-label="Remove item"
                size="sm"
              />
            </Tooltip>
          </Flex>
        </VStack>
      </HStack>
    </MotionBox>
  );
}

export default CartItem;
