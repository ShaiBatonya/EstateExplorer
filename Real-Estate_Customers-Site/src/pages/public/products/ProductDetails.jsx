// src/pages/ProductDetails/ProductDetails.jsx
import { Box, Container, Divider, Flex, Heading, Image, Spinner, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import { useProduct } from "../../../hooks/useProduct";
import AppointmentForm from "./AppointmentForm";

export default function ProductDetails() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  const containerBg = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Helmet>
        {product && <title>{product.product_name} Details</title>}
        <meta name="description" content={product?.product_description || ""} />
      </Helmet>

      {/* Loading State */}
      {loading && (
        <Flex justify="center" my={10}>
          <Spinner size="xl" />
        </Flex>
      )}

      {/* Error State */}
      {error && (
        <Flex justify="center" my={10}>
          <Text color="red.500" fontSize="xl">
            {error}
          </Text>
        </Flex>
      )}

      {/* Main Content */}
      {product && !loading && !error && (
        <Container
          maxW="container.lg"
          bg={containerBg}
          p={8}
          mt={8}
          mb={8}
          borderRadius="md"
          boxShadow="md"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            mb={8}
          >
            <Box flex="1" mr={{ base: 0, md: 8 }} mb={{ base: 4, md: 0 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={product.product_image}
                  alt="Product"
                  borderRadius="md"
                  w="100%"
                  boxShadow="lg"
                />
              </motion.div>
            </Box>
            <Box flex="1">
              <Heading as="h1" size="lg" color="teal.400" mb={4}>
                Property Details
              </Heading>
              <Heading as="h2" size="xl" color="gray.200" mb={4}>
                {product.product_name}
              </Heading>
              <Divider mb={4} />

              <Heading as="h3" size="md" color="teal.400" mb={2}>
                Property Description
              </Heading>
              <Text mb={4}>{product.product_description}</Text>

              <Heading as="h3" size="md" color="teal.400" mb={2}>
                Price
              </Heading>
              <Text fontSize="2xl" fontWeight="bold" color="orange.300" mb={4}>
                ${product.product_price}
              </Text>
            </Box>
          </Flex>

          <Box mb={8} textAlign="center">
            <Heading as="h3" size="lg" mb={4}>
              Contact the Agent
            </Heading>
            <Text fontSize="lg" mb={4} color="gray.600">
              For inquiries or to schedule a visit, kindly reach out to us:
            </Text>
            <AppointmentForm />
          </Box>

          <Box textAlign="center">
            <Button
              as={Link}
              to="/"
              bg="blue.400"
              color="white"
              _hover={{ bg: "blue.500" }}
            >
              Go Back to Listings
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
}
