import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";

import axiosInstance from "../../config/axiosConfig"; // Import the axios instance

import { useEffect, useState } from "react";

const Orders = ({ user }) => {
  // Assuming orders data is passed as props or fetched from an API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersForUser = async () => {
      try {
        setLoading(true);

        const { data } = await axiosInstance.get(
          `${import.meta.env.VITE_SERVER_URL}/orders/by-id-for-customer-user/${user._id}`
        );
        setOrders(data.orders);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    getOrdersForUser();
  }, []);

  return (
    <>
    {loading && <Spinner/>}
    {error && <Text>{error}</Text>}
      {orders && (
        <Box minH="65vh" maxW="1000px" mx="auto" py={10} px={4}>
          <Heading as="h2" size="xl" mb={6}>
            My Orders
          </Heading>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Order Number</Th>
                <Th>Date</Th>
                <Th>Total</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order.order_number}</Td>
                  <Td>
                    {new Date(order.created_at).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </Td>
                  <Td>${order.total_price}</Td>
                  <Td>
                  {order.status == 1 && <span>new</span>}
                  {order.status == 2 && <span>in progress</span>}
                  {order.status == 3 && <span>done</span>}
                  {order.status == 4 && <span>canceled</span>}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default Orders;
