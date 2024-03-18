import {
  Container,
  Card,
  CardBody,
  Text,
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  StatHelpText,
  StatArrow,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    const getDataForDashboard = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/system/data-for-dashboard`
        );

        setDashboardData(data.obj);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    getDataForDashboard();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        {loading && <Spinner />}
        {error && <Text>{error}</Text>}
        {!loading && !error && dashboardData && (
          <Flex
            wrap="wrap"
            direction={["column", "row"]}
            justify="center"
            align="center"
          >
            <Stat
              borderRadius="10%"
              textAlign="center"
              p="15px"
              /* maxW={["60%","90%"]} */
              m="25px"
              minW="fit-content"
              bgColor="gray.700"
              color="white"
            >
              <StatLabel fontSize="3xl">
                Best Sellers
              </StatLabel>
              <Stack direction="column">
                {dashboardData.top3Products.map((t) => {
                  return (
                    <Link key={t[0]} to={`/products/edit-product/${t[0]}`}>
                      {" "}
                      {t[1].name} : {t[1].quantity}
                    </Link>
                  );
                })}{" "}
              </Stack>
            </Stat>

            <Stat
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/orders");
              }}
              borderRadius="10%"
              textAlign="center"
              p="15px"
              /* maxW={["60%","90%"]} */
              m="25px"
              minW="fit-content"
              bgColor="gray.700"
              color="white"
            >
              <StatLabel fontSize="3xl">Products Monthly Sales</StatLabel>
              <StatNumber>{dashboardData.monthly_sales}</StatNumber>
            </Stat>
            <Stat
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/products");
              }}
              borderRadius="10%"
              textAlign="center"
              p="15px"
              /* maxW={["60%","90%"]} */
              m="25px"
              minW="fit-content"
              bgColor="gray.700"
              color="white"
            >
              <StatLabel fontSize="3xl">Total Products</StatLabel>
              <StatNumber>{dashboardData.products_count}</StatNumber>
            </Stat>

            <Stat
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/orders");
              }}
              borderRadius="10%"
              textAlign="center"
              p="15px"
              /* maxW={["60%","90%"]} */
              m="25px"
              minW="fit-content"
              bgColor="gray.700"
              color="white"
            >
              <StatLabel fontSize="3xl">Total Orders</StatLabel>
              <StatNumber>{dashboardData.orders_count}</StatNumber>
            </Stat>

            <Stat
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/orders");
              }}
              borderRadius="10%"
              textAlign="center"
              p="15px"
              /* maxW={["60%","90%"]} */
              m="25px"
              minW="fit-content"
              bgColor="gray.700"
              color="white"
            >
              <StatLabel fontSize="3xl">Total Sales</StatLabel>
              <StatNumber>{dashboardData.total_sales}</StatNumber>
            </Stat>

            <Stat
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/categories");
              }}
              borderRadius="10%"
              textAlign="center"
              p="15px"
              /* maxW={["60%","90%"]} */
              m="25px"
              minW="fit-content"
              bgColor="gray.700"
              color="white"
            >
              <StatLabel fontSize="3xl">Total Categories</StatLabel>
              <StatNumber>{dashboardData.categories_count}</StatNumber>
            </Stat>
          </Flex>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
