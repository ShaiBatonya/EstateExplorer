import {
  Box,
  Grid,
  Text,
  Image,
  Divider,
  Flex,
  Button,
  useColorModeValue,
  IconButton,
  VStack,
  Badge,
  HStack,
  useToast,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#63b3ed", "#68d391", "#f6ad55", "#fc8181", "#ed64a6", "#4299e1"];

const MotionBox = motion(Box);

function Cart() {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0),
    [cartItems]
  );
  const tax = useMemo(() => subtotal * 0.1, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const chartData = useMemo(() => {
    return cartItems.map((item) => ({
      name: item.product_name,
      value: item.product_price * item.quantity,
    }));
  }, [cartItems]);

  return (
    <Box
      p={8}
      maxW="container.xl"
      mx="auto"
      bg={useColorModeValue("gray.900", "gray.800")}
      borderRadius="lg"
      shadow="2xl"
      color="white"
    >
      <Heading as="h1" size="2xl" textAlign="center" mb={10} fontWeight="extrabold">
        🛒 Shopping Cart
      </Heading>

      {cartItems.length === 0 ? (
        <Text mt={6} textAlign="center" fontSize="lg" color="gray.400">
          Your cart is empty. Start adding amazing products!
        </Text>
      ) : (
        <Flex direction={{ base: "column", lg: "row" }} gap={10}>
          {/* Left Section: Cart Items */}
          <Box flex={2}>
            <Grid templateColumns="1fr" gap={6}>
              {cartItems.map((item) => (
                <MotionBox
                  key={item._id}
                  p={6}
                  bg={useColorModeValue("whiteAlpha.200", "gray.700")}
                  borderRadius="xl"
                  shadow="lg"
                  overflow="hidden"
                  whileHover={{ scale: 1.03 }}
                  _hover={{ shadow: "2xl", transform: "translateY(-5px)" }}
                  transition="all 0.3s ease"
                >
                  <HStack align="start" spacing={6}>
                    <Image
                      boxSize="120px"
                      borderRadius="md"
                      src={item.product_image}
                      alt={item.product_name}
                      transition="all 0.3s"
                      _hover={{ transform: "scale(1.1)" }}
                    />
                    <VStack align="start" spacing={2} flex={1}>
                      <Text fontSize="lg" fontWeight="bold">
                        {item.product_name}
                      </Text>
                      <Badge colorScheme="purple" fontSize="sm">
                        ${item.product_price.toFixed(2)} x {item.quantity}
                      </Badge>
                      <Flex justify="space-between" w="100%">
                        <Tooltip label="Increase quantity" placement="top">
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => {
                              addToCart(item);
                              toast({
                                title: `${item.product_name} quantity increased.`,
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                              });
                            }}
                          >
                            +
                          </Button>
                        </Tooltip>
                        <Tooltip label="Decrease quantity" placement="top">
                          <Button
                            size="sm"
                            colorScheme="yellow"
                            onClick={() => {
                              decreaseQuantity(item);
                              toast({
                                title: `Reduced quantity for ${item.product_name}.`,
                                status: "warning",
                                duration: 2000,
                                isClosable: true,
                              });
                            }}
                          >
                            -
                          </Button>
                        </Tooltip>
                        <Tooltip label="Remove item" placement="top">
                          <IconButton
                            icon={<FaTrashAlt />}
                            colorScheme="red"
                            onClick={() => {
                              removeFromCart(item._id);
                              toast({
                                title: `${item.product_name} removed.`,
                                status: "error",
                                duration: 2000,
                                isClosable: true,
                              });
                            }}
                            aria-label="Remove item"
                          />
                        </Tooltip>
                      </Flex>
                    </VStack>
                  </HStack>
                </MotionBox>
              ))}
            </Grid>
          </Box>

          {/* Right Section: Payment Summary */}
          <Box
            flex={1}
            bg={useColorModeValue("gray.800", "gray.700")}
            p={6}
            borderRadius="lg"
            shadow="lg"
            position="sticky"
            top="20px"
            h="fit-content"
          >
            <Heading size="lg" mb={4} textAlign="center">
              Order Summary
            </Heading>
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between">
                <Text>Subtotal</Text>
                <Text>${subtotal.toFixed(2)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Tax (10%)</Text>
                <Text>${tax.toFixed(2)}</Text>
              </Flex>
              <Divider />
              <Flex justify="space-between">
                <Text fontWeight="bold" fontSize="lg">
                  Total
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  ${total.toFixed(2)}
                </Text>
              </Flex>
              <Divider />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    label={({ name, value, percent }) => `${name}: $${value.toFixed(2)} (${(percent * 100).toFixed(1)}%)`}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
