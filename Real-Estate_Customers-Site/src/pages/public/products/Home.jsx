import { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import ProductCard from "../../../components/UI/partials/products/ProductCard";
import axiosInstance from "../../../config/axiosConfig";
import { AuthContext } from "../../../context/AuthContext";
import { BsSearchHeart } from "react-icons/bs";
import { useLoaderData, useLocation } from "react-router-dom";
import {
  Box,
  ButtonGroup,
  Heading,
  Text,
  Flex,
  HStack,
  Button,
  IconButton,
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
import { motion } from "framer-motion";

const abortController = new AbortController();

function Home() {
  const { user } = useContext(AuthContext);
  const productsInit = useLoaderData();
  const [filterStatus, setFilterStatus] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([...productsInit]);
  const [selectedLocationProducts, setSelectedLocationProducts] = useState([]);
  
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const onChangeHandle = (e) => {
    setSearchTerm(e.target.value);
  };

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
    return () => {
      abortController.abort();
    };
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  const handleLocationClick = (productsAtLocation) => {
    setSelectedLocationProducts(productsAtLocation); 
  };

  return (
    <>
      <Helmet>
        <title>Global Real Estate Platform</title>
        <meta
          name="description"
          content="Explore a global collection of exquisite real estate properties."
        />
      </Helmet>

      <Hero />
      <Companies />

      {/* Interactive World Map Section */}
      <Box px={8} py={8} mx="auto" bg="black" color="white">
        <Box w={{ base: "full", md: 11 / 12, xl: 9 / 12 }} mx="auto" textAlign="center">
          <Heading as="h2" size="xl" fontWeight="bold" color="teal.500">
            Explore Global Properties
          </Heading>
          <Text mt={4} color="gray.400" fontSize="lg">
            Discover properties around the world using our interactive map.
          </Text>
          <MapContainer
            center={[51.505, -0.09]} 
            zoom={3}
            scrollWheelZoom={false}
            className="leaflet-container"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]} onClick={() => handleLocationClick(productsInit.filter(p => p.location === 'London'))}>
              <Popup>Properties in London</Popup>
            </Marker>
            <Marker position={[40.7128, -74.006]} onClick={() => handleLocationClick(productsInit.filter(p => p.location === 'New York'))}>
              <Popup>Properties in New York</Popup>
            </Marker>
            <Marker position={[34.0522, -118.2437]} onClick={() => handleLocationClick(productsInit.filter(p => p.location === 'Los Angeles'))}>
              <Popup>Properties in Los Angeles</Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>

      {/* Selected Location Products Display */}
      {selectedLocationProducts.length > 0 && (
        <Box px={8} py={8} mx="auto" bg="gray.900" color="white">
          <Box w={{ base: "full", md: 11 / 12, xl: 9 / 12 }} mx="auto" textAlign="center">
            <Heading as="h3" size="lg" fontWeight="bold" color="teal.500" mb={6}>
              Properties in Selected Location
            </Heading>
            <Flex
              direction={["column", "row"]}
              flexWrap="wrap"
              justifyContent="center"
              gap={6}
              my={5}
            >
              {selectedLocationProducts.map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </Flex>
          </Box>
        </Box>
      )}

      {/* Product Filtering and Display Section */}
      <Box px={8} py={8} mx="auto" bg="black" color="white">
        <Box w={{ base: "full", md: 11 / 12, xl: 9 / 12 }} mx="auto" textAlign={{ base: "left", md: "center" }}>
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            lineHeight="none"
            letterSpacing={{ base: "normal", md: "tight" }}
            bgGradient="linear(to-r, teal.300, blue.500)"
            bgClip="text"
          >
            The Epitome of Real Estate Excellence
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
          <chakra.p px={{ base: 0, lg: 24 }} mb={6} fontSize={{ base: "lg", md: "xl" }} color="gray.400">
            Browse properties and explore real customer reviews across the globe.
          </chakra.p>

          {/* Filter and Search Section */}
          <HStack justifyContent={{ base: "center", md: "space-between" }} w="full" mb={5} flexDirection={{ base: "column", md: "row" }} alignItems="center" spacing={{ base: 4, md: 0 }}>
            <ButtonGroup flexWrap="wrap" spacing={4} justifyContent={{ base: "center", md: "flex-start" }}>
              <Text alignSelf="center" fontWeight="bold" color="teal.300" fontSize={{ base: "md", lg: "lg" }}>
                Filter By Category:
              </Text>
              <Button
                variant={filterStatus === null ? "solid" : "outline"}
                onClick={() => handleFilterByCategory(null)}
                bg={filterStatus === null ? "teal.500" : "gray.700"}
                color="white"
                _hover={{ bg: "teal.600" }}
                transition="all 0.3s"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category._id}
                  variant={filterStatus === category._id ? "solid" : "outline"}
                  onClick={() => handleFilterByCategory(category._id)}
                  bg={filterStatus === category._id ? "teal.500" : "gray.700"}
                  color="white"
                  _hover={{ bg: "teal.600" }}
                  transition="all 0.3s"
                >
                  {category.category_name}
                </Button>
              ))}
            </ButtonGroup>

            <InputGroup maxW={["100%", "480px"]} mt={{ base: 4, md: 0 }} flex={{ base: "1 0 100%", md: "auto" }}>
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
                <IconButton aria-label="Search" icon={<BsSearchHeart />} variant="ghost" color="teal.500" _hover={{ bg: "gray.700" }} />
              </InputRightElement>
            </InputGroup>
          </HStack>

          {/* Products display section */}
          <Flex direction={["column", "row"]} flexWrap="wrap" justifyContent="center" gap={6} my={5}>
            {currentProducts.map((product) => (
              <motion.div key={product._id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </Flex>

          {/* Pagination */}
          <Pagination currentPage={currentPage} productsPerPage={productsPerPage} totalProducts={filteredProducts.length} onPageChange={handlePageChange} />
        </Box>
      </Box>

      <Value />
    </>
  );
}




// Function to fetch all products from the server
export const getAllProducts = async () => {
  try {
    console.log("Sending request to /products/customers/all");
    const { data } = await axiosInstance.get("/products/customers/all");
    console.log("Response data:", data);
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


// Export the Home component as the default export
export default Home;
