import axios from "axios";
import { useState, useEffect } from "react";
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
  Text,
  Spinner,
} from "@chakra-ui/react";
import ProductsTable from "../../../components/partials/products/ProductsTable";

function Products() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getAllProductsFromServer = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "http://localhost:4000/products/managers/all"
        );

        setProducts(data.products);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    getAllProductsFromServer();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <Container
        maxW={["98%", "87%", "80%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <Heading mb={"20px"}>Products</Heading>
        <Divider />
        {loading && <Spinner mt="10px" />}
        {!loading && error && <Text>{error}</Text>}
        {!error && !loading && products && (
          <ProductsTable productsData={products} />
        )}
      </Container>
    </>
  );
}

export default Products;
