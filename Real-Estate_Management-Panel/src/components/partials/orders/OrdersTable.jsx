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
  Select,
  ButtonGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function OrdersTable({ ordersData }) {
  const [filterStatus, setFilterStatus] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [orders, setOrders] = useState([...ordersData]);
  const handleChangeStatus = async (e, id) => {
    const answer = confirm("are you sure to change status?");
    const value = e.target.value;

    if (answer) {
      try {
        const { data } = await axios.put(
          `${
            import.meta.env.VITE_SERVER_URL
          }/orders/managers/update-status/${id}`,
          {
            status: e.target.value,
          }
        );

        const updatedOrders = orders.map((order) => {
          if (order._id == id) {
            return {
              ...order,
              status: value,
            };
          }
          return order;
        });

        setOrders(updatedOrders);

        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <>
      <Heading mb={"20px"}>Orders</Heading>
      <Stack my="20px" justify="space-between" direction="row">
        <ButtonGroup>
          <Button
            onClick={() => {
              setFilterStatus(0);
            }}
          >
            All
          </Button>
          <Button
            onClick={() => {
              setFilterStatus(1);
            }}
            bgColor="yellow.300"
          >
            Pending
          </Button>
          <Button
            onClick={() => {
              setFilterStatus(2);
            }}
            bgColor="purple.300"
          >
            Process
          </Button>
          <Button
            onClick={() => {
              setFilterStatus(3);
            }}
            bgColor="green.300"
          >
            Done
          </Button>
          <Button
            onClick={() => {
              setFilterStatus(4);
            }}
            bgColor="gray.300"
          >
            Canceled
          </Button>
        </ButtonGroup>
        <Input
          width="31%"
          placeholder="search by order number, customer phone, customer name"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </Stack>
      <Divider />
      <TableContainer mt="15px">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Order Number</Th>
              <Th>Date</Th>
              <Th>Customer Name</Th>
              <Th>Customer Phone</Th>
              <Th>Customer Address</Th>
              <Th>Total</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders
              .filter((order) => {
                if (filterStatus == 0) {
                  return order;
                } else if (filterStatus == 1) {
                  if (order.status == 1) {
                    return order;
                  }
                } else if (filterStatus == 2) {
                  if (order.status == 2) {
                    return order;
                  }
                } else if (filterStatus == 3) {
                  if (order.status == 3) {
                    return order;
                  }
                } else if (filterStatus == 4) {
                  if (order.status == 4) {
                    return order;
                  }
                }
              })
              .filter((order) => {
                if (searchTerm == "") {
                  return order;
                } else if (
                  order.customer_details.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  order.customer_details.customer_phone.includes(searchTerm) || 
                  order.order_number.toString().includes(searchTerm)
                ) {
                  return order;
                }
              })
              .map((order, index) => {
                return (
                  <Tr key={order._id}>
                    <Td>{index + 1}</Td>
                    <Td color="blue" textDecoration="underline">
                      <Link to={`/orders/order-details/${order._id}`}>
                        {order.order_number}
                      </Link>
                    </Td>
                    <Td>{order.created_at}</Td>
                    <Td>{order.customer_details.customer_name}</Td>
                    <Td>{order.customer_details.customer_phone}</Td>
                    <Td>
                      {order.customer_details.customer_address.street}{" "}
                      {order.customer_details.customer_address.building},{" "}
                      {order.customer_details.customer_address.city}
                    </Td>
                    <Td>{order.total_price}</Td>
                    <Td minW="200px">
                      <Select
                        bgColor={
                          order.status == 1
                            ? "yellow.300"
                            : order.status == 2
                            ? "purple.300"
                            : order.status == 3
                            ? "green.300"
                            : "gray.300"
                        }
                        onChange={(e) => {
                          handleChangeStatus(e, order._id);
                        }}
                        value={order.status}
                      >
                        <option value="1">Pending</option>
                        <option value="2">Processing</option>
                        <option value="3">Completed</option>
                        <option value="4">Cancelled</option>
                      </Select>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default OrdersTable;
