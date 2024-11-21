// src/pages/Home/Home.jsx

import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Heading,
  Flex,
  Wrap,
  WrapItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Grid,
  GridItem,
  Text,
  VStack,
  Skeleton,
  Spinner,
  useColorModeValue,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../config/axiosConfig';
import { AuthContext } from '../../../context/AuthContext';

// Lazy-loaded components for code splitting and performance
const Hero = lazy(() => import('../../../components/UI/sections/Hero/Hero'));
const Companies = lazy(() =>
  import('../../../components/UI/sections/Companies/Companies')
);
const Value = lazy(() => import('../../../components/UI/sections/Value/Value'));
const ProductCard = lazy(() =>
  import('../../../components/UI/partials/products/ProductCard')
);
const Pagination = lazy(() => import('./Pagination'));

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionGridItem = motion(GridItem);

const Home = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortOption, setSortOption] = useState('default');
  const productsPerPage = 8;

  // Debounced search term to optimize performance
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch categories using React Query for efficient data management
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/categories/customers/all');
      return data.categories || [];
    },
  });

  // Fetch products using React Query
  const {
    data: productsInit = [],
    isLoading: isProductsLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/products/customers/all');
      return data.products || [];
    },
  });

  // Memoized filtered products to prevent unnecessary computations
  const filteredProducts = useMemo(() => {
    let results = [...productsInit];

    // Filter by category
    if (filterStatus) {
      results = results.filter((product) =>
        product.categories.some((cat) => cat.category === filterStatus)
      );
    }

    // Filter by search term
    if (debouncedSearchTerm) {
      const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
      results = results.filter(
        (product) =>
          product.product_name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.product_description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Filter by price range
    results = results.filter(
      (product) =>
        product.product_price >= priceRange[0] &&
        product.product_price <= priceRange[1]
    );

    // Sort products
    switch (sortOption) {
      case 'priceLowHigh':
        results.sort((a, b) => a.product_price - b.product_price);
        break;
      case 'priceHighLow':
        results.sort((a, b) => b.product_price - a.product_price);
        break;
      case 'nameAZ':
        results.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      case 'nameZA':
        results.sort((a, b) => b.product_name.localeCompare(a.product_name));
        break;
      default:
        break;
    }

    return results;
  }, [productsInit, filterStatus, debouncedSearchTerm, priceRange, sortOption]);

  // Paginated products for the current page
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage]);

  // Handlers with useCallback to prevent unnecessary re-renders
  const handleFilterByCategory = useCallback((categoryId) => {
    setFilterStatus(categoryId);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handlePageChange = useCallback((page) => setCurrentPage(page), []);

  const handlePriceRangeChange = useCallback((e) => {
    const value = e.target.value;
    if (value === 'all') {
      setPriceRange([0, 10000000]);
    } else if (value === '0-500000') {
      setPriceRange([0, 500000]);
    } else if (value === '500000-1000000') {
      setPriceRange([500000, 1000000]);
    } else if (value === '1000000+') {
      setPriceRange([1000000, 10000000]);
    }
    setCurrentPage(1);
  }, []);

  const handleSortOptionChange = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  // Theming and styling using Chakra UI
  const bgColor = useColorModeValue('#000000', '#000000'); // Match Hero background color
  const textColor = useColorModeValue('#FFFFFF', '#FFFFFF');
  const headingColor = useColorModeValue('#FFFFFF', '#FFFFFF');
  const accentColor = useColorModeValue('#d4af37', '#d4af37'); // Gold color for luxury

  return (
    <>
      <Helmet>
        <title>Luxury Real Estate Platform</title>
        <meta
          name="description"
          content="Explore a curated collection of the world's most luxurious real estate properties."
        />
      </Helmet>

      {/* Hero Section */}
      <Suspense fallback={<Spinner color={accentColor} size="xl" />}>
        <Hero />
      </Suspense>
  {/* Companies Section */}
  <Suspense fallback={<Spinner color={accentColor} size="xl" />}>
        <Companies />
      </Suspense>
     
      {/* Main Content */}
      <Box bg={bgColor} color={textColor} py={12} id="properties">
        <MotionBox
          px={{ base: 4, md: 10 }}
          mx="auto"
          maxW="1400px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Enhanced Heading */}
          <Heading
            as="h2"
            size="2xl"
            textAlign="center"
            mb={12}
            color={headingColor}
            fontFamily="'Playfair Display', serif"
            fontWeight="700"
            lineHeight="1.1"
            letterSpacing="tight"
          >
            Discover the{' '}
            <span style={{ color: accentColor }}>World's Finest Properties</span>
          </Heading>
        
{/* Filters and Search - Enhanced Design */}
<Box
  bg="linear-gradient(135deg, rgba(40, 40, 40, 0.9), rgba(20, 20, 20, 0.9))"
  p={8}
  borderRadius="2xl"
  boxShadow="0 10px 30px rgba(0, 0, 0, 0.5)"
  backdropFilter="blur(12px)"
  mb={12}
>
  <Flex
    direction="column"
    align="center"
    justify="center"
    gap={6}
    wrap="wrap"
  >
    {/* Category Filters */}
    <Wrap spacing={4} justify="center">
      {isCategoriesLoading ? (
        <Skeleton height="50px" width="100px" borderRadius="md" />
      ) : (
        <>
          <WrapItem>
            <MotionButton
              onClick={() => handleFilterByCategory(null)}
              variant="solid"
              bg={filterStatus === null ? "gold.400" : "rgba(255, 255, 255, 0.1)"}
              color={filterStatus === null ? "black" : "white"}
              size="lg"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              _hover={{
                bg: "gold.500",
                boxShadow: "0px 4px 15px rgba(255, 215, 0, 0.8)",
              }}
              borderRadius="full"
              px={8}
              py={3}
              fontWeight="bold"
              boxShadow="0 4px 15px rgba(0, 0, 0, 0.4)"
            >
              All
            </MotionButton>
          </WrapItem>
          {categories.map((category) => (
            <WrapItem key={category._id}>
              <MotionButton
                onClick={() => handleFilterByCategory(category._id)}
                variant="solid"
                bg={
                  filterStatus === category._id
                    ? "gold.400"
                    : "rgba(255, 255, 255, 0.1)"
                }
                color={filterStatus === category._id ? "black" : "white"}
                size="lg"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                _hover={{
                  bg: "gold.500",
                  boxShadow: "0px 4px 15px rgba(255, 215, 0, 0.8)",
                }}
                borderRadius="full"
                px={8}
                py={3}
                fontWeight="bold"
                boxShadow="0 4px 15px rgba(0, 0, 0, 0.4)"
              >
                {category.category_name}
              </MotionButton>
            </WrapItem>
          ))}
        </>
      )}
    </Wrap>

    {/* Search and Filter Options */}
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      wrap="wrap"
      gap={6}
      bg="rgba(255, 255, 255, 0.1)"
      p={6}
      borderRadius="lg"
      boxShadow="0 6px 20px rgba(0, 0, 0, 0.5)"
    >
      <InputGroup maxW="300px">
        <InputLeftElement pointerEvents="none">
          <BsSearch color="gold" />
        </InputLeftElement>
        <Input
          placeholder="Search properties..."
          onChange={handleSearchChange}
          size="lg"
          borderRadius="full"
          bg="rgba(255, 255, 255, 0.2)"
          color="white"
          _placeholder={{ color: "gray.400" }}
          _focus={{
            bg: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.4)",
          }}
        />
      </InputGroup>

      <Select
        placeholder="Price Range"
        onChange={handlePriceRangeChange}
        size="lg"
        maxW="200px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.2)"
        color="white"
        _focus={{
          bg: "rgba(255, 255, 255, 0.3)",
          boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.4)",
        }}
        boxShadow="0 4px 15px rgba(0, 0, 0, 0.4)"
      >
        <option value="all" style={{ color: "#000" }}>
          All Prices
        </option>
        <option value="0-500000" style={{ color: "#000" }}>
          $0 - $500,000
        </option>
        <option value="500000-1000000" style={{ color: "#000" }}>
          $500,000 - $1,000,000
        </option>
        <option value="1000000+" style={{ color: "#000" }}>
          $1,000,000+
        </option>
      </Select>

      <Select
        placeholder="Sort By"
        onChange={handleSortOptionChange}
        size="lg"
        maxW="200px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.2)"
        color="white"
        _focus={{
          bg: "rgba(255, 255, 255, 0.3)",
          boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.4)",
        }}
        boxShadow="0 4px 15px rgba(0, 0, 0, 0.4)"
      >
        <option value="default" style={{ color: "#000" }}>
          Default
        </option>
        <option value="priceLowHigh" style={{ color: "#000" }}>
          Price: Low to High
        </option>
        <option value="priceHighLow" style={{ color: "#000" }}>
          Price: High to Low
        </option>
        <option value="nameAZ" style={{ color: "#000" }}>
          Name: A to Z
        </option>
        <option value="nameZA" style={{ color: "#000" }}>
          Name: Z to A
        </option>
      </Select>
    </Flex>
  </Flex>
</Box>



          {/* Products Grid */}
          {isProductsLoading ? (
            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              }}
              gap={8}
            >
              {Array.from({ length: productsPerPage }).map((_, index) => (
                <GridItem key={index}>
                  <Skeleton height="400px" borderRadius="lg" />
                </GridItem>
              ))}
            </Grid>
          ) : filteredProducts.length === 0 ? (
            <VStack py={20}>
              <Text fontSize="xl" color="gray.500">
                No properties found.
              </Text>
            </VStack>
          ) : (
            <>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                }}
                gap={8}
              >
                {currentProducts.map((product) => (
                  <MotionGridItem
                    key={product._id}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Suspense
                      fallback={<Skeleton height="400px" borderRadius="lg" />}
                    >
                      <ProductCard product={product} />
                    </Suspense>
                  </MotionGridItem>
                ))}
              </Grid>

              {/* Pagination */}
              <Suspense fallback={<Spinner color={accentColor} size="xl" />}>
                <Pagination
                  currentPage={currentPage}
                  productsPerPage={productsPerPage}
                  totalProducts={filteredProducts.length}
                  onPageChange={handlePageChange}
                />
              </Suspense>
            </>
          )}
        </MotionBox>
      </Box>

      {/* Value Proposition Section */}
      <Suspense fallback={<Spinner color={accentColor} size="xl" />}>
        <Value />
      </Suspense>

    
    </>
  );
};

export default React.memo(Home);
