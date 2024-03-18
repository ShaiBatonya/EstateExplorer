import { Helmet } from "react-helmet";
import {
  Box,
  Heading,
  Input,
  Button,
  Container,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import OrdersTable from "../../../components/partials/orders/OrdersTable";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Orders() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/orders/managers/all`
        );

        setOrders(data.orders);
      } catch (error) {
        setError(error.response.data.error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAllOrders();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
      </Helmet>
      <Container
        maxW={["98%", "87%", "95%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        {loading ? <Spinner/> : null}
        {error ? <Text>{error}</Text> : null}
        {orders ? <OrdersTable ordersData={orders}/> : null}
      </Container>
    </>
  );
}

export default Orders;
