import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ProductCard from "../../../components/UI/partials/products/ProductCard";
import axiosInstance from "../../../config/axiosConfig";
import { AuthContext } from "../../../context/AuthContext";
import { BsSearchHeart } from "react-icons/bs";
import {
  Box,
  Heading,
  Flex,
  HStack,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import Pagination from "./Pagination";
import { Helmet } from "react-helmet";
import Value from "../../../components/UI/sections/Value/Value";
import Hero from "../../../components/UI/sections/Hero/Hero";
import Companies from "../../../components/UI/sections/Companies/Companies";
import { motion } from "framer-motion";

// Function to fetch categories
const fetchCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories/customers/all");
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Function to fetch products
const fetchProducts = async () => {
  try {
    const { data } = await axiosInstance.get("/products/customers/all");
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

function Home() {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [productsInit, setProductsInit] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    (async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const products = await fetchProducts();
      setProductsInit(products);
      setFilteredProducts(products);
    })();
  }, []);

  useEffect(() => {
    let results = [...productsInit];
    if (filterStatus) {
      results = results.filter((product) =>
        product.categories.some((cat) => cat.category === filterStatus)
      );
    }
    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.product_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(results);
  }, [filterStatus, searchTerm, productsInit]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage]);

  const handleFilterByCategory = useCallback((categoryId) => {
    setFilterStatus(categoryId);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      <Helmet>
        <title>Global Real Estate Platform</title>
        <meta name="description" content="Explore a global collection of exquisite real estate properties." />
      </Helmet>

      <Hero />
      <Companies />

      <Box px={8} py={8} mx="auto" bg="black" color="white">
        <Heading as="h2" size="xl" textAlign="center" mb={6} color="teal.300">
          Explore Global Properties
        </Heading>

        <Flex justify="space-between" align="center" wrap="wrap" mb={6}>
          <Wrap spacing={4} align="center">
            <WrapItem>
              <Button
                onClick={() => handleFilterByCategory(null)}
                variant={filterStatus === null ? "solid" : "outline"}
                colorScheme="teal"
              >
                All
              </Button>
            </WrapItem>
            {categories.map((category) => (
              <WrapItem key={category._id}>
                <Button
                  onClick={() => handleFilterByCategory(category._id)}
                  variant={filterStatus === category._id ? "solid" : "outline"}
                  colorScheme="teal"
                >
                  {category.category_name}
                </Button>
              </WrapItem>
            ))}
          </Wrap>

          <InputGroup maxW="400px">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              borderRadius="md"
              bg="gray.800"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
            <InputRightElement>
              <IconButton
                aria-label="Search"
                icon={<BsSearchHeart />}
                onClick={() => toast({ title: "Search applied", status: "info" })}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={6}
          bg="gray.900"
          p={6}
          borderRadius="lg"
          shadow="lg"
        >
          {currentProducts.map((product) => (
            <GridItem key={product._id}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <ProductCard product={product} />
              </motion.div>
            </GridItem>
          ))}
        </Grid>

        <Pagination
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          onPageChange={handlePageChange}
        />
      </Box>

      <Value />
    </>
  );
}





// Fetch all products function
export const getAllProducts = async () => {
  try {
    const { data } = await axiosInstance.get("/products/customers/all");
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default Home;
