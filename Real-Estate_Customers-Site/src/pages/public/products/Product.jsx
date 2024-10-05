import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axiosInstance from "../../../config/axiosConfig";
import AppointmentForm from "./AppointmentForm";
import { motion } from "framer-motion";

const ProductDetailsContainer = styled(Container)`
  background-color: ${(props) => props.bgColor};
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin-top: 40px;
  margin-bottom: 40px;
  transition: all 0.3s ease;
`;

const ProductGrid = styled(Flex)`
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ProductImage = styled(Image)`
  max-width: 100%;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const PriceText = styled(Text)`
  font-size: 2rem;
  font-weight: bold;
  color: #e44d26;
  margin-bottom: 20px;
`;

const GoBackButton = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background-color: #3498db;
  padding: 14px 28px;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
  }
`;

const ContactSection = styled(Box)`
  margin-top: 40px;
`;

function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `${import.meta.env.VITE_SERVER_URL}/products/customers/product/${id}`
        );
        setProduct(data.product);
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Helmet>
        {product && <title>{product.product_name} Details</title>}
        <meta name="description" content={product?.product_description || ""} />
      </Helmet>

      {loading && <Spinner />}
      {error && <Text color="red">{error}</Text>}

      {product && (
        <ProductDetailsContainer maxW="container.lg" bgColor={useColorModeValue("#f7f7f7", "#2D3748")}>
          <ProductGrid align="center">
            <Box flex="1" mr={{ base: 0, md: 8 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <ProductImage src={product.product_image} alt="Product Image" borderRadius="md" />
              </motion.div>
            </Box>
            <Box flex="1">
              <Heading as="h1" size="xl" mb={4} color="teal.500">
                Property Details
              </Heading>
              <Heading as="h2" size="2xl" mb={4} color="gray.700">
                {product.product_name}
              </Heading>
              <Divider mb={4} />
              <Heading as="h1" size="xl" mb={2} color="teal.500">
                Property Description
              </Heading>
              <Text>{product.product_description}</Text>
              <Heading as="h1" size="xl" mb={2} color="teal.500">
                Price
              </Heading>
              <PriceText>${product.product_price}</PriceText>
            </Box>
          </ProductGrid>
          <ContactSection mb={8}>
            <Heading as="h3" size="lg" mb={4} textAlign="center">
              Contact the Agent
            </Heading>
            <Text fontSize="lg" mb={4} textAlign="center" color="gray.600">
              For inquiries or to schedule a visit, kindly reach out to us:
            </Text>
            <AppointmentForm />
          </ContactSection>
          <GoBackButton to="/">Go Back to Listings</GoBackButton>
        </ProductDetailsContainer>
      )}
    </>
  );
}

export default ProductDetails;
