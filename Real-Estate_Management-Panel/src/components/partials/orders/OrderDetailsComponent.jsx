import React, { useState } from "react";
import {
  Box,
  Divider,
  Heading,
  Text,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Button,
  Image,
  Stack,
  Center,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

function OrderDetailsComponent({ orderData }) {
  const [order, setOrder] = useState({ ...orderData });

  const handleChangeStatus = async (e, id) => {
    const answer = window.confirm("Are you sure you want to change the status?");
    const value = e.target.value;

    if (answer) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/orders/managers/update-status/${id}`,
          {
            status: e.target.value,
          }
        );

        const updatedOrder = { ...order, status: value };

        setOrder(updatedOrder);

        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <Stack spacing={6} p={6} boxShadow="md" borderRadius="md" bg="white">
      <Heading mb="30px" fontSize="2xl">
        Order Details:
      </Heading>
      <Text fontSize="lg" fontWeight="bold">
        Order number: {order.order_number}
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        Order date: {order.created_at}
      </Text>
      <Divider />
      <Heading mt="30px" fontSize="xl">
        Customer Details:
      </Heading>
      <Text>Name: {order.customer_details.customer_name}</Text>
      <Text>Phone: {order.customer_details.customer_phone}</Text>
      <Text>Email: {order.customer_details.customer_email}</Text>
      <Heading mb="30px" fontSize="xl">
        Customer Address:
      </Heading>
      <Text>Street: {order.customer_details.customer_address.street}</Text>
      <Text>Building: {order.customer_details.customer_address.building}</Text>
      <Text>City: {order.customer_details.customer_address.city}</Text>
      <Divider />
      <Heading fontSize="xl">Order Products</Heading>
      <TableContainer my="80px">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th textAlign="center">Image</Th>
              <Th>Name</Th>
              <Th textAlign="center">Price Per Unit</Th>
              <Th textAlign="center">Quantity</Th>
              <Th textAlign="center">Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {order.products.map((prd) => (
              <Tr key={prd._id}>
                <Td>
                  <Center>
                    <Image
                      boxSize="50px"
                      objectFit="cover"
                      src={prd.product.product_image}
                      alt={prd.product.product_name}
                    />
                  </Center>
                </Td>
                <Td>{prd.product.product_name}</Td>
                <Td textAlign="center">{prd.RTP}$</Td>
                <Td textAlign="center">{prd.quantity}</Td>
                <Td textAlign="center">{prd.RTP * prd.quantity}$</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Heading textAlign="center" mt={6}>
          Total Order Price: {order.total_price}$
        </Heading>
      </TableContainer>
      <Divider />
      <Heading fontSize="xl">Payment Details</Heading>
      <Text>Terminal Number: {order.payment_details.terminal_number}</Text>
      <Text>Transaction Number: {order.payment_details.transaction_number}</Text>
      <Text>Transaction Date: {order.payment_details.transaction_date}</Text>
      <Text>
        4 Last Digits: XXXX-XXXX-{order.payment_details.last_digits}
      </Text>
      <Select
        my="50px"
        bgColor={
          order.status === 1
            ? "yellow.300"
            : order.status === 2
            ? "purple.300"
            : order.status === 3
            ? "green.300"
            : "gray.300"
        }
        onChange={(e) => handleChangeStatus(e, order._id)}
        value={order.status}
      >
        <option value="1">Pending</option>
        <option value="2">Processing</option>
        <option value="3">Completed</option>
        <option value="4">Cancelled</option>
      </Select>
    </Stack>
  );
}

export default OrderDetailsComponent;
