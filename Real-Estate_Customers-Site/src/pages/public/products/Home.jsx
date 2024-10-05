// Home.jsx

import { useContext, useEffect, useState } from "react";
import ProductCard from "../../../components/UI/partials/products/ProductCard";
import axiosInstance from "../../../config/axiosConfig"; // Import the axios instance
import { AuthContext } from "../../../context/AuthContext";
import { BsSearchHeart } from "react-icons/bs";
import { useLoaderData, useLocation } from "react-router-dom";
import {
  Box,
  ButtonGroup,
  Heading,
  IconButton,
  Text,
  Flex,
  HStack,
  Button,
  Input,
  chakra,
  Stack,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import Pagination from "./Pagination";
import { Helmet } from "react-helmet";
import Value from "../../../components/UI/sections/Value/Value";
import Hero from "../../../components/UI/sections/Hero/Hero";
import Companies from "../../../components/UI/sections/Companies/Companies";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const abortController = new AbortController();

function Home() {
  // Initialize necessary state variables
  const { user } = useContext(AuthContext);
  const productsInit = useLoaderData();
  const [filterStatus, setFilterStatus] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([...productsInit]);

  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Display more products per page

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
          content="Explore our exquisite collection of real estate properties."
        />
      </Helmet>

      {/* Hero section */}
      <Hero />

      {/* Companies section */}
      <Companies />

      {/* Main content section */}
      <Box px={8} py={8} mx="auto" bg="black" color="white">
        <Box
          w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
          mx="auto"
          textAlign={{ base: "left", md: "center" }}
        >
          {/* Heading and introductory text */}
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            lineHeight="none"
            letterSpacing={{ base: "normal", md: "tight" }}
            bgGradient="linear(to-r, teal.300, blue.500)"
            bgClip="text"
          >
            Discover the epitome of real estate excellence.
          </chakra.h1>
          <Text
            display={{ base: "block", lg: "inline" }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, teal.300, blue.500)"
            fontWeight="extrabold"
          >
            Customer Feedback
          </Text>

          {/* Description paragraph */}
          <chakra.p
            px={{ base: 0, lg: 24 }}
            mb={6}
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.400"
          >
            Explore properties with real customer reviews. Get the full experience at our premier online platform.
          </chakra.p>

          {/* Call-to-action buttons */}
          <Stack
            direction={{ base: "column", sm: "row" }}
            mb={{ base: 4, md: 8 }}
            spacing={2}
            justifyContent={{ sm: "left", md: "center" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as="a"
                variant="solid"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{ base: "full", sm: "auto" }}
                mb={{ base: 2, sm: 0 }}
                size="lg"
                cursor="pointer"
                bg="teal.500"
                color="white"
                _hover={{ bg: "teal.600" }}
              >
                Get Started
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as="a"
                variant="outline"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{ base: "full", sm: "auto" }}
                mb={{ base: 2, sm: 0 }}
                size="lg"
                cursor="pointer"
                borderColor="gray.500"
                color="white"
                _hover={{ bg: "gray.700" }}
              >
                Book a Demo
              </Button>
            </motion.div>
          </Stack>
        </Box>
      </Box>

   {/* Main content section with dynamic data */}
<Flex
  minH="65vh"
  maxW="90%"
  mx="auto"
  direction="column"
  align="center"
  bg="black"
  color="white"
  py={10}
  px={{ base: 4, md: 8 }}  // Padding adjusted for responsiveness
>
{/* Filter by category section */}
<HStack 
  justifyContent={{ base: "center", md: "space-between" }}  // Ensuring proper alignment across screen sizes
  w="full" 
  mb={5}
  flexDirection={{ base: "column", md: "row" }}  // Stack vertically on small screens and horizontally on larger ones
  alignItems="center"  // Aligning elements centrally on all screen sizes
  spacing={{ base: 4, md: 0 }}  // Adjusting spacing for small screens
>
  <ButtonGroup
    flexWrap="wrap"  // Buttons adjust and wrap for smaller screens
    spacing={4}  // Consistent spacing between buttons
    justifyContent={{ base: "center", md: "flex-start" }}  // Center on small screens, left on large screens
  >
    <Text alignSelf="center" fontWeight="bold" color="teal.300" fontSize={{ base: "md", lg: "lg" }}>
      Filter By Category:
    </Text>
    <Button
      variant={filterStatus === null ? "solid" : "outline"}
      onClick={() => handleFilterByCategory(null)}
      colorScheme="orange"
      transition="all 0.3s"
      _hover={{ bg: "orange.400", transform: "scale(1.05)" }}  // Adding hover animation for better UX
    >
      All
    </Button>
    {categories.map((category) => (
      <Button
        key={category._id}
        variant={filterStatus === category._id ? "solid" : "outline"}
        onClick={() => handleFilterByCategory(category._id)}
        colorScheme="blue"
        transition="all 0.3s"
        _hover={{ bg: "blue.400", transform: "scale(1.05)" }}  // Adding hover animation
      >
        {category.category_name}
      </Button>
    ))}
  </ButtonGroup>

  {/* Search input section */}
  <InputGroup 
    maxW={["100%", "480px"]} 
    mt={{ base: 4, md: 0 }}  // Add margin-top on small screens, none on larger ones
    flex={{ base: "1 0 100%", md: "auto" }}  // Ensure full width on small screens
  >
    <Input
      placeholder="Search by property name or description"
      value={searchTerm}
      onChange={onChangeHandle}
      borderRadius="md"
      bg="gray.800"
      color="white"
      _placeholder={{ color: "gray.400" }}
      _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
    />
    <InputRightElement>
      <IconButton
        aria-label="Search"
        icon={<BsSearchHeart />}
        variant="ghost"
        color="teal.500"
        _hover={{ bg: "gray.700" }}
      />
    </InputRightElement>
  </InputGroup>
</HStack>


  {/* Products display */}
  <Flex
    direction={["column", "row"]}  // Ensuring flexibility for mobile and desktop
    flexWrap="wrap"
    my={5}
    justifyContent="center"
    gap={6}
  >
    {currentProducts.map((product) => (
      <motion.div
        key={product._id}
        whileHover={{ scale: 1.05 }}  // Slightly increased hover effect for a better feel
        transition={{ duration: 0.3 }}
      >
        <ProductCard product={product} />
      </motion.div>
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
    console.error(error);
    return [];
  }
};

// Export the Home component as the default export
export default Home;
