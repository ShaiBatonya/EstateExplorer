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
  Spinner,
} from "@chakra-ui/react";

import CategoriesTable from "../../../components/partials/categories/CategoriesTable";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Categories() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`
        );

        setCategories(data.categories);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    getAllCategories();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <Heading mb={"20px"}>Categories </Heading>
        <Divider />
        {loading && <Spinner />}
        {error && <Text>{error}</Text>}
        {!loading && !error && categories && (
          <CategoriesTable categoriesData={categories} />
        )}
      </Container>
    </>
  );
}

export default Categories;
