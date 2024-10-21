import { Box, VStack, Button, Text, Image, Divider, Flex, useColorModeValue } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product_price, 0);

  return (
    <Box p={8} maxW="container.lg" mx="auto" bg={useColorModeValue("white", "gray.800")} borderRadius="lg" shadow="lg">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        Shopping Cart
      </Text>
      {cartItems.length === 0 ? (
        <Text mt={6} textAlign="center" fontSize="lg">Your cart is empty</Text>
      ) : (
        <VStack spacing={4}>
          {cartItems.map((item) => (
            <Flex key={item._id} justify="space-between" w="full" p={4} bg={useColorModeValue("white", "gray.700")} borderRadius="lg">
              <Flex alignItems="center">
                <Image boxSize="100px" src={item.product_image} alt={item.product_name} />
                <Box ml={4}>
                  <Text fontSize="lg" fontWeight="bold">{item.product_name}</Text>
                  <Text fontSize="md">${item.product_price}</Text>
                </Box>
              </Flex>
              <Button colorScheme="red" onClick={() => removeFromCart(item._id)}>Remove</Button>
            </Flex>
          ))}
          <Divider />
          <Text fontSize="lg" fontWeight="bold">Subtotal: ${subtotal.toFixed(2)}</Text>
          <Button colorScheme="teal" size="lg" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
        </VStack>
      )}
    </Box>
  );
}

export default Cart;
