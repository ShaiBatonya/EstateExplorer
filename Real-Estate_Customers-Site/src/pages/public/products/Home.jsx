import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Heading,
  Flex,
  Wrap,
  WrapItem,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { BsSearchHeart } from "react-icons/bs";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import axiosInstance from "../../../config/axiosConfig";
import { AuthContext } from "../../../context/AuthContext";

const Hero = lazy(() => import("../../../components/UI/sections/Hero/Hero"));
const Companies = lazy(() => import("../../../components/UI/sections/Companies/Companies"));
const Value = lazy(() => import("../../../components/UI/sections/Value/Value"));
const ProductCard = lazy(() => import("../../../components/UI/partials/products/ProductCard"));
const LoadingSpinner = lazy(() => import("../../../components/UI/partials/products/LoadingSpinner"));
const Pagination = lazy(() => import("./Pagination"));
const MotionBox = motion(Box);

const Home = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [productsInit, setProductsInit] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/categories/customers/all");
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("/products/customers/all");
        setProductsInit(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
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

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  const handleSearchChange = useCallback((e) => debouncedSearch(e.target.value), [debouncedSearch]);

  const handlePageChange = useCallback((page) => setCurrentPage(page), []);

  return (
    <>
      <Helmet>
        <title>Global Real Estate Platform</title>
        <meta name="description" content="Explore a global collection of exquisite real estate properties." />
      </Helmet>

      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Companies />
      </Suspense>

      <MotionBox
        px={10}
        py={12}
        mx="auto"
        bgGradient="linear(to-br, gray.800, black)"
        color="white"
     
        shadow="2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          mb={8}
          bgGradient="linear(to-r, teal.300, blue.400, purple.500)"
          bgClip="text"
          fontWeight="extrabold"
          letterSpacing="widest"
        >
          Explore Global Properties
        </Heading>

        <Flex justify="space-between" align="center" wrap="wrap" mb={8}>
          <Wrap spacing={6} align="center">
            <WrapItem>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handleFilterByCategory(null)}
                  variant={filterStatus === null ? "solid" : "ghost"}
                  bgGradient={filterStatus === null ? "linear(to-r, teal.400, teal.600)" : undefined}
                  color={filterStatus === null ? "white" : "teal.300"}
                  size="lg"
                  shadow="xl"
                >
                  All
                </Button>
              </motion.div>
            </WrapItem>
            {categories.map((category) => (
              <WrapItem key={category._id}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleFilterByCategory(category._id)}
                    variant={filterStatus === category._id ? "solid" : "ghost"}
                    bgGradient={
                      filterStatus === category._id ? "linear(to-r, teal.400, teal.600)" : undefined
                    }
                    color={filterStatus === category._id ? "white" : "teal.300"}
                    size="lg"
                    shadow="xl"
                  >
                    {category.category_name}
                  </Button>
                </motion.div>
              </WrapItem>
            ))}
          </Wrap>

          <InputGroup maxW="450px">
            <Input
              placeholder="Search properties..."
              onChange={handleSearchChange}
              size="lg"
              borderRadius="lg"
              bg="gray.800"
              color="white"
              _placeholder={{ color: "gray.400" }}
              shadow="xl"
            />
            <InputRightElement>
              <IconButton
                aria-label="Search"
                icon={<BsSearchHeart />}
                colorScheme="teal"
                size="lg"
                shadow="xl"
              />
            </InputRightElement>
          </InputGroup>
        </Flex>

        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={8}
        >
          {currentProducts.map((product) => (
            <GridItem key={product._id}>
              <Suspense fallback={<Spinner color="teal.300" />}>
                <ProductCard product={product} />
              </Suspense>
            </GridItem>
          ))}
        </Grid>

        <Suspense fallback={<Spinner color="teal.300" />}>
          <Pagination
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            onPageChange={handlePageChange}
          />
        </Suspense>
      </MotionBox>

      <Suspense fallback={<LoadingSpinner />}>
        <Value />
      </Suspense>
    </>
  );
};



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
