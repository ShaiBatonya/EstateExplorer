// src/pages/public/Cart.jsx
import React, { useContext, useEffect } from "react";
import {
  Box,
  Text,
  Divider,
  Flex,
  Button,
  useColorModeValue,
  VStack,
  HStack,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import CartItem from "../../components/UI/partials/products/CartItem";

// recharts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const PIE_COLORS = ["#63b3ed", "#68d391", "#f6ad55", "#fc8181", "#ed64a6", "#4299e1"];

function Cart() {
  const { user } = useContext(AuthContext);
  const { cartItems, removeFromCart, addToCart, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  const subtotal = cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;


  const chartData = cartItems.map((item) => ({
    name: item.product_name,
    value: item.product_price * item.quantity,
  }));


  const containerBg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const summaryBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      p={{ base: 4, md: 8 }}
      maxW="container.xl"
      mx="auto"
      bg={containerBg}
      borderRadius="lg"
      shadow="2xl"
      color={textColor}
      minH="80vh"
    >
      <Heading
        as="h1"
        size="2xl"
        textAlign="center"
        mb={{ base: 6, md: 10 }}
        fontWeight="extrabold"
      >
        🛒 Shopping Cart
      </Heading>

      {cartItems.length === 0 ? (
        <Text mt={6} textAlign="center" fontSize="lg" color="gray.500">
          Your cart is empty. Start adding amazing products!
        </Text>
      ) : (
        <Flex direction={{ base: "column", lg: "row" }} gap={10}>
          {/* Left Section: Cart Items */}
          <Box flex={2}>
          
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  addToCart={addToCart}
                  decreaseQuantity={decreaseQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </SimpleGrid>
          </Box>

          {/* Right Section: Payment Summary */}
          <Box
            flex={1}
            bg={summaryBg}
            color={useColorModeValue("gray.800", "white")}
            p={6}
            borderRadius="lg"
            shadow="lg"
           
            position={{ base: "static", lg: "sticky" }}
            top={{ lg: "20px" }}
            h="fit-content"
          >
            <Heading size="lg" mb={4} textAlign="center">
              Order Summary
            </Heading>

            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text>Subtotal</Text>
                <Text fontWeight="semibold">${subtotal.toFixed(2)}</Text>
              </HStack>

              <HStack justify="space-between">
                <Text>Tax (10%)</Text>
                <Text fontWeight="semibold">${tax.toFixed(2)}</Text>
              </HStack>

              <Divider />

              <HStack justify="space-between">
                <Text fontWeight="bold" fontSize="lg">
                  Total
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  ${total.toFixed(2)}
                </Text>
              </HStack>

              <Divider />

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    label={({ name, value, percent }) =>
                      `${name}: $${value.toFixed(2)} (${(percent * 100).toFixed(1)}%)`
                    }
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>

              <Button
                colorScheme="teal"
                size="lg"
                w="full"
                mt={4}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </VStack>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default Cart;
