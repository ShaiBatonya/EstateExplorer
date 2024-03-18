// Import necessary dependencies and components
import { useContext, useEffect, useState } from "react";
import ProductCard from "../../../components/UI/partials/products/ProductCard";

import axiosInstance from "../../../config/axiosConfig"; // Import the axios instance

import { AuthContext } from "../../../context/AuthContext";
import { BsSearchHeart } from "react-icons/bs";
import { useLoaderData, useLocation } from "react-router-dom";
import {
  // Import Chakra UI components for styling
  Box,
  ButtonGroup,
  Heading,
  IconButton,
  Text,
  Flex,
  HStack,
  Button,
  Input,
  Icon,
  useColorModeValue,
  Container,
  chakra,
  createIcon,
  InputRightElement,
  InputGroup,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Stack,
  Divider,
} from "@chakra-ui/react";

import Pagination from "./Pagination";
import { Helmet } from "react-helmet";
import Value from "../../../components/UI/sections/Value/Value";
import Hero from "../../../components/UI/sections/Hero/Hero";
import Companies from "../../../components/UI/sections/Companies/Companies";
const abortController = new AbortController();

function Home() {
  // Initialize necessary state variables
  const { user } = useContext(AuthContext);
  const productsInit = useLoaderData();
  const [filterStatus, setFilterStatus] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([...productsInit]);
  const [filteredProducts, setFilteredProducts] = useState([...productsInit]);

  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Calculate the range of products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle changes in the search input
  const onChangeHandle = (e) => {
    setSearchTerm(e.target.value);
  };

  // Update filtered products based on search term
  useEffect(() => {
    const searchResults = productsInit.filter(
      (product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(searchResults);
  }, [searchTerm, productsInit]);

  // Scroll to a specific section based on the hash in the URL
  useEffect(() => {
    const productId = location.hash.substring(1);
    if (productId) {
      const targetSection = document.getElementById(productId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        targetSection.className = "shadow";
      }
    }
  }, [location.hash]);

  // Fetch all categories when component mounts
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/customers/all`
        );
        setCategories(data.categories);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getAllCategories();

    // Cleanup function to abort ongoing requests when component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  // Handle page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter products based on selected category
  const handleFilterByCategory = (categoryId) => {
    setFilterStatus(categoryId);

    if (categoryId === null) {
      setFilteredProducts([...productsInit]);
    } else {
      const filteredByCategory = productsInit.filter((product) =>
        product.categories.some((category) => category.category === categoryId)
      );
      setFilteredProducts(filteredByCategory);
    }
    setCurrentPage(1);
  };

  return (
    <>
      {/* Helmet for setting document title and meta description */}
      <Helmet>
        <title>Real Estate Site</title>
        <meta
          name="description"
          content="Explore our exquisite collection of designer headscarves for women."
        />
      </Helmet>

      {/* Hero section */}
      <Hero />

      {/* Companies section */}
      <Companies />

      {/* Main content section */}
      <Box px={8} py={8} mx="auto">
        <Box
          w={{
            base: "full",
            md: 11 / 12,
            xl: 9 / 12,
          }}
          mx="auto"
          textAlign={{
            base: "left",
            md: "center",
          }}
        >
          {/* Heading and introductory text */}
          <chakra.h1
            mb={6}
            fontSize={{
              base: "4xl",
              md: "6xl",
            }}
            fontWeight="bold"
            lineHeight="none"
            letterSpacing={{
              base: "normal",
              md: "tight",
            }}
            color="gray.900"
            _dark={{
              color: "gray.100",
            }}
          >
            Explore the epitome of real estate excellence.{" "}
            <Text
              display={{
                base: "block",
                lg: "inline",
              }}
              w="full"
              bgClip="text"
              bgGradient="linear(to-r, green.400,purple.500)"
              fontWeight="extrabold"
            >
              customer feedback
            </Text>{" "}
            at our premier online platform.
          </chakra.h1>
          {/* Description paragraph */}
          <chakra.p
            px={{
              base: 0,
              lg: 24,
            }}
            mb={6}
            fontSize={{
              base: "lg",
              md: "xl",
            }}
            color="gray.600"
            _dark={{
              color: "gray.300",
            }}
          >
            Hellonext is a feature voting software where you can allow your
            users to vote on features, publish roadmap, and complete your
            customer feedback loop.
          </chakra.p>
          {/* Call-to-action buttons */}
          <Stack
            direction={{
              base: "column",
              sm: "row",
            }}
            mb={{
              base: 4,
              md: 8,
            }}
            spacing={2}
            justifyContent={{
              sm: "left",
              md: "center",
            }}
          >
            <Button
              as="a"
              variant="solid"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{
                base: "full",
                sm: "auto",
              }}
              mb={{
                base: 2,
                sm: 0,
              }}
              size="lg"
              cursor="pointer"
            >
              Get Started
              <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </Icon>
            </Button>
            <Button
              as="a"
              colorScheme="gray"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{
                base: "full",
                sm: "auto",
              }}
              mb={{
                base: 2,
                sm: 0,
              }}
              size="lg"
              cursor="pointer"
            >
              Book a Demo
              <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                  clipRule="evenodd"
                />
              </Icon>
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Main content section with dynamic data */}
      <Flex minH="65vh" maxW="90%" mx="auto" direction="column" align="center">
        <HStack justifyContent={"space-between"}>
          {/* Filter by category buttons */}
          <ButtonGroup my={5}>
            <Text alignSelf={"center"} fontWeight={"bold"}>
              Filter By Category:
            </Text>
            <Button
              variant={filterStatus === null ? "solid" : "outline"}
              onClick={() => handleFilterByCategory(null)}
              colorScheme="orange"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category._id}
                variant={filterStatus === category._id ? "solid" : "outline"}
                onClick={() => handleFilterByCategory(category._id)}
                colorScheme="blue"
              >
                {category.category_name}
              </Button>
            ))}
          </ButtonGroup>
        </HStack>

        {/* Search input */}
        <InputGroup maxW={480}>
          <Input
            placeholder="Search by product name or description"
            value={searchTerm}
            onChange={onChangeHandle}
            borderRadius="md"
            _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
          />
          <InputRightElement>
            {/* Search icon button */}
            <IconButton
              aria-label="Search"
              icon={<BsSearchHeart />}
              variant="ghost"
              color="teal.500"
            />
          </InputRightElement>
        </InputGroup>

        {/* Display products, handle loading and errors */}
        <Flex
          direction={["column", "column", "row", "row"]}
          flexWrap="wrap"
          my={5}
          justifyContent="center"
          gap="4"
        >
          {loading && <span>Loading...</span>}
          {error && <span>{error}</span>}
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Flex>

        {/* Pagination component */}
        <Pagination
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          onPageChange={handlePageChange}
        />
      </Flex>

      {/* Value section */}
      <Value />
    </>
  );
}

// Function to fetch all products from the server
export const getAllProducts = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${import.meta.env.VITE_SERVER_URL}/products/customers/all`
    );
    return data.products;
  } catch (error) {
    return error.response.data.error;
  }
};

// Export the Home component as the default export
export default Home;
