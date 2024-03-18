// Import necessary React dependencies and styled components
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
} from "@chakra-ui/react";

// Import axios instance for API requests
import axiosInstance from "../../../config/axiosConfig";

// Import React Router dependencies
import { useParams, Link } from "react-router-dom";

// Import additional components
import { Helmet } from "react-helmet";
import AppointmentForm from "./AppointmentForm";

// Define styled components for styling
const LightBackgroundColor = "#f7f7f7";
const PrimaryColor = "#3498db";
const SecondaryColor = "#2980b9";

const ProductDetailsContainer = styled(Container)`
  background-color: ${LightBackgroundColor};
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
  margin-bottom: 40px;
`;

const ProductGrid = styled(Flex)`
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const ProductImage = styled(Image)`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const PriceText = styled(Text)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #e44d26;
  margin-bottom: 20px;
`;

const GoBackButton = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background-color: ${PrimaryColor};
  padding: 12px 24px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${SecondaryColor};
  }
`;

const ContactSection = styled(Box)`
  margin-top: 40px;
`;

// ProductDetails component for displaying detailed information about a product
function ProductDetails() {
  // Retrieve product ID from URL parameters
  const { id } = useParams();

  // State variables for loading, error, and product details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  // Fetch product details from the server upon component mount
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

  // Clear localStorage on component unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem("chosen");
    };
  }, []);

  // Render product details, spinner, or error message based on the state
  return (
    <>
      {/* Helmet for updating page title and meta description */}
      <Helmet>
        {product && <title>{product.product_name} Details</title>}
        <meta name="description" content={product?.product_description || ""} />
      </Helmet>

      {/* Display spinner while loading */}
      {loading && <Spinner />}
      {/* Display error message if an error occurs */}
      {error && <Text color="red">{error}</Text>}

      {/* Render product details if available */}
      {product && (
        <ProductDetailsContainer maxW="container.lg">
          {/* ProductGrid for responsive layout */}
          <ProductGrid direction={{ base: "column", md: "row" }} align="center">
            {/* Box for product image */}
            <Box flex="1" mr={{ base: 0, md: 8 }}>
              {/* Styled ProductImage component */}
              <ProductImage
                src={product.product_image}
                alt="Product Image"
                borderRadius="md"
                boxShadow="md"
              />
            </Box>
            {/* Box for product details */}
            <Box flex="1">
              {/* Heading for property details */}
              <Heading as="h1" size="xl" mb={4} color="teal.500">
                Property Details
              </Heading>
              {/* Heading for property name */}
              <Heading as="h2" size="2xl" mb={4} color="gray.700">
                {product.product_name}
              </Heading>
              {/* Divider for separating sections */}
              <Divider mb={4} />
              {/* Heading for property description */}
              <Heading as="h1" size="xl" mb={2} color="teal.500">
                Property Description
              </Heading>
              {/* Text for displaying property description */}
              <Text>{product.product_description}</Text>
              {/* Heading for property price */}
              <Heading as="h1" size="xl" mb={2} color="teal.500">
                Price
              </Heading>
              {/* Styled PriceText component for displaying price */}
              <PriceText fontSize="2xl" fontWeight="bold" color="red.500">
                ${product.product_price}
              </PriceText>
            </Box>
          </ProductGrid>
          {/* ContactSection for appointment form */}
          <ContactSection mb={8}>
            {/* Heading for contact section */}
            <Heading as="h3" size="lg" mb={4} textAlign="center">
              Contact the Agent
            </Heading>
            {/* Text for contact information */}
            <Text fontSize="lg" mb={4} textAlign="center" color="gray.600">
              For inquiries or to schedule a visit, kindly reach out to us:
            </Text>
            {/* AppointmentForm component for scheduling appointments */}
            <AppointmentForm />
          </ContactSection>
          {/* GoBackButton for navigating back to listings */}
          <GoBackButton to="/">Go Back to Listings</GoBackButton>
        </ProductDetailsContainer>
      )}
    </>
  );
}

// Export the ProductDetails component as the default export
export default ProductDetails;
