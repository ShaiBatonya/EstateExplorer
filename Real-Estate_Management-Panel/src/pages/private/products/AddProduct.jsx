import {
  Box,
  Heading,
  Input,
  Button,
  Container,
  Select,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import AddProductForm from "../../../components/partials/products/AddProductForm";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
function AddProduct() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {

      try {

        const {data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/categories/managers/all`);

        setCategories(data.categories)
        
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getAllCategories();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Product</title>
        <meta name="description" content="add product to panel" />
      </Helmet>
      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <AddProductForm categories={categories} />
      </Container>
    </>
  );
}

export default AddProduct;
