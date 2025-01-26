import React, {
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
  Button,
  chakra,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { motion, useAnimation, useViewportScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../config/axiosConfig";
import { AuthContext } from "../../../context/AuthContext";

// Lazy-loaded sections
const Hero = lazy(() => import("../../../components/UI/sections/Hero/Hero"));
const Companies = lazy(() => import("../../../components/UI/sections/Companies/Companies"));
const Value = lazy(() => import("../../../components/UI/sections/Value/Value"));
const ProductCard = lazy(() => import("../../../components/UI/partials/products/ProductCard"));
const Pagination = lazy(() => import("../../../components/UI/partials/products/Pagination"));

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionGridItem = motion(GridItem);

const Home = () => {
  const { user } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortOption, setSortOption] = useState("default");

  const productsPerPage = 8;

  // Debounce search for performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // React Query for categories
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/categories/customers/all");
      return data.categories || [];
    },
  });

  // React Query for products
  const { data: productsInit = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/products/customers/all");
      return data.products || [];
    },
  });

  // Filter, sort & memoized data
  const filteredProducts = useMemo(() => {
    let results = [...productsInit];

    if (filterStatus) {
      results = results.filter((product) =>
        product.categories.some((cat) => cat.category === filterStatus)
      );
    }
    if (debouncedSearchTerm) {
      const lower = debouncedSearchTerm.toLowerCase();
      results = results.filter(
        (p) =>
          p.product_name.toLowerCase().includes(lower) ||
          p.product_description.toLowerCase().includes(lower)
      );
    }
    results = results.filter(
      (p) => p.product_price >= priceRange[0] && p.product_price <= priceRange[1]
    );

    switch (sortOption) {
      case "priceLowHigh":
        results.sort((a, b) => a.product_price - b.product_price);
        break;
      case "priceHighLow":
        results.sort((a, b) => b.product_price - a.product_price);
        break;
      case "nameAZ":
        results.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      case "nameZA":
        results.sort((a, b) => b.product_name.localeCompare(a.product_name));
        break;
      default:
        break;
    }

    return results;
  }, [productsInit, filterStatus, debouncedSearchTerm, priceRange, sortOption]);

  // Pagination
  const currentProducts = useMemo(() => {
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    return filteredProducts.slice(firstIndex, lastIndex);
  }, [filteredProducts, currentPage]);

  // Event handlers
  const handleFilterByCategory = useCallback((id) => {
    setFilterStatus(id);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePriceRangeChange = useCallback((e) => {
    const val = e.target.value;
    if (val === "all") setPriceRange([0, 10000000]);
    else if (val === "0-500000") setPriceRange([0, 500000]);
    else if (val === "500000-1000000") setPriceRange([500000, 1000000]);
    else if (val === "1000000+") setPriceRange([1000000, 10000000]);
    setCurrentPage(1);
  }, []);

  const handleSortOptionChange = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  // Parallax effect for an additional background layer
  const { scrollY } = useViewportScroll();
  const parallaxOverlayY = useTransform(scrollY, [0, 600], [0, 150]);

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
      <Suspense fallback={<Spinner color="#d4af37" size="xl" />}>
        <Hero />
      </Suspense>

      {/* Additional Parallax Overlay (optional) */}
      <motion.div
        style={{
          position: "absolute",
          top: 900,
          left: 0,
          right: 0,
          height: "120vh",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)",
          zIndex: 0,
          y: parallaxOverlayY,
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <Box bg="#000000" color="#ffffff" py={12} position="relative" zIndex={1}>
        <MotionBox
          px={{ base: 4, md: 10 }}
          mx="auto"
          maxW="1400px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Filters & Search */}
          <Box
            bg="linear-gradient(135deg, rgba(30,30,30,0.95), rgba(10,10,10,0.95))"
            p={{ base: 10, md: 16 }}
            borderRadius="3xl"
            boxShadow="0px 40px 70px rgba(0,0,0,0.8)"
            backdropFilter="blur(15px)"
            mb={16}
            w="100%"
            position="relative"
          >
            <Flex direction="column" align="center" gap={12}>
              {/* Heading */}
              <Heading
                as="h2"
                size="2xl"
                textAlign="center"
                color="#ffffff"
                fontFamily='"Playfair Display", serif'
                fontWeight="700"
                letterSpacing="tight"
                lineHeight="1.2"
              >
                Discover the{" "}
                <chakra.span color="#d4af37">World's Finest Properties</chakra.span>
              </Heading>

              {/* Decorative line */}
              <Box
                w="150px"
                h="5px"
                bgGradient="linear(to-r, #FFD700, #FFFFFF, #FFD700)"
                borderRadius="full"
                animation="gradient-move 3s infinite alternate"
                boxShadow="0px 0px 20px rgba(255,215,0,0.6)"
              />

              {/* Categories */}
              <Wrap spacing={6} justify="center">
                {isCategoriesLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        height="50px"
                        width="120px"
                        borderRadius="full"
                      />
                    ))
                  : [
                      <WrapItem key="all">
                        <MotionButton
                          onClick={() => handleFilterByCategory(null)}
                          variant="solid"
                          bg={filterStatus === null ? "#FFD700" : "rgba(255,255,255,0.2)"}
                          color={filterStatus === null ? "#000" : "#fff"}
                          size="lg"
                          whileHover={{
                            scale: 1.1,
                            boxShadow: "0px 0px 25px rgba(255,215,0,1)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          borderRadius="full"
                          px={10}
                          py={4}
                          fontWeight="semibold"
                          fontSize="lg"
                          transition="all 0.3s"
                          textTransform="capitalize"
                          _hover={{
                            bg: "#FFC700",
                            boxShadow: "0px 15px 30px rgba(255,215,0,0.8)",
                          }}
                        >
                          All
                        </MotionButton>
                      </WrapItem>,
                      ...categories.map((cat) => (
                        <WrapItem key={cat._id}>
                          <MotionButton
                            onClick={() => handleFilterByCategory(cat._id)}
                            variant="solid"
                            bg={
                              filterStatus === cat._id
                                ? "#FFD700"
                                : "rgba(255,255,255,0.2)"
                            }
                            color={filterStatus === cat._id ? "#000" : "#fff"}
                            size="lg"
                            whileHover={{
                              scale: 1.1,
                              boxShadow: "0px 0px 25px rgba(255,215,0,1)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            borderRadius="full"
                            px={10}
                            py={4}
                            fontWeight="semibold"
                            fontSize="lg"
                            transition="all 0.3s"
                            textTransform="capitalize"
                            _hover={{
                              bg: "#FFC700",
                              boxShadow: "0px 15px 30px rgba(255,215,0,0.8)",
                            }}
                          >
                            {cat.category_name}
                          </MotionButton>
                        </WrapItem>
                      )),
                    ]}
              </Wrap>

              {/* Search & Sort */}
              <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                justify="center"
                wrap="wrap"
                gap={10}
                bg="rgba(255,255,255,0.05)"
                p={8}
                borderRadius="3xl"
                boxShadow="0px 30px 60px rgba(0,0,0,0.8)"
                w="100%"
              >
                {/* Search */}
                <InputGroup maxW="450px" w="100%">
                  <InputLeftElement pointerEvents="none">
                    <BsSearch color="#FFD700" size="1.6em" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search for properties..."
                    onChange={handleSearchChange}
                    size="lg"
                    borderRadius="full"
                    bg="rgba(255,255,255,0.2)"
                    color="#fff"
                    fontFamily='"Heebo", sans-serif'
                    fontSize="lg"
                    fontWeight="medium"
                    _placeholder={{ color: "rgba(255,255,255,0.6)" }}
                    _focus={{
                      bg: "rgba(255,255,255,0.3)",
                      boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
                    }}
                  />
                </InputGroup>

                {/* Price Range */}
                <Select
                  placeholder="Price Range"
                  onChange={handlePriceRangeChange}
                  size="lg"
                  maxW="280px"
                  borderRadius="full"
                  bg="rgba(255,255,255,0.2)"
                  color="#fff"
                  fontFamily='"Heebo", sans-serif'
                  fontSize="lg"
                  fontWeight="medium"
                  _focus={{
                    bg: "rgba(255,255,255,0.3)",
                    boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
                  }}
                  boxShadow="0px 20px 50px rgba(0,0,0,0.8)"
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

                {/* Sort By */}
                <Select
                  placeholder="Sort By"
                  onChange={handleSortOptionChange}
                  size="lg"
                  maxW="280px"
                  borderRadius="full"
                  bg="rgba(255,255,255,0.2)"
                  color="#fff"
                  fontFamily='"Heebo", sans-serif'
                  fontSize="lg"
                  fontWeight="medium"
                  _focus={{
                    bg: "rgba(255,255,255,0.3)",
                    boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
                  }}
                  boxShadow="0px 20px 50px rgba(0,0,0,0.8)"
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

          {/* Product Grid */}
          {isProductsLoading ? (
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={8}
            >
              {Array.from({ length: productsPerPage }).map((_, i) => (
                <GridItem key={i}>
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
                  base: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
                gap={8}
              >
                {currentProducts.map((product) => (
                  <MotionGridItem
                    key={product._id}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Suspense fallback={<Skeleton height="400px" borderRadius="lg" />}>
                      <ProductCard product={product} />
                    </Suspense>
                  </MotionGridItem>
                ))}
              </Grid>
              {/* Pagination */}
              <Suspense fallback={<Spinner color="#d4af37" size="xl" />}>
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

      {/* Value Section */}
      <Suspense fallback={<Spinner color="#d4af37" size="xl" />}>
        <Value />
      </Suspense>

      {/* Companies Section */}
      <Suspense fallback={<Spinner color="#d4af37" size="xl" />}>
        <Companies />
      </Suspense>
    </>
  );
};

export default React.memo(Home);
