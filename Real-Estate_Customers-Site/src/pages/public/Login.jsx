import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  useToast,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { z } from "zod";

// Schema validation for login form
const loginSchema = z.object({
  user_email: z.string().email("Invalid email format"),
  user_password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [values, setValues] = useState({
    user_email: "",
    user_password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Handle input change
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = loginSchema.parse(values);
      setErrors({});
      setLoading(true);

      const response = await login(parsedData.user_email, parsedData.user_password);
      toast({
        title: "Login Successful",
        description: response.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials and try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect to home if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg={useColorModeValue("gray.800", "gray.900")}
      color="white"
      borderRadius="lg"
      shadow="xl"
      p={8}
      maxW="lg"
      mx="auto"
      mt={10}
    >
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Login
      </Heading>
      <VStack spacing={5}>
        <FormControl isInvalid={errors.user_email}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="user_email"
            value={values.user_email}
            onChange={handleChange}
            placeholder="Enter your email"
            bg="whiteAlpha.200"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="teal.500"
          />
          {errors.user_email && (
            <Alert status="error" mt={2} borderRadius="md">
              <AlertIcon />
              {errors.user_email}
            </Alert>
          )}
        </FormControl>

        <FormControl isInvalid={errors.user_password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="user_password"
            value={values.user_password}
            onChange={handleChange}
            placeholder="Enter your password"
            bg="whiteAlpha.200"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="teal.500"
          />
          {errors.user_password && (
            <Alert status="error" mt={2} borderRadius="md">
              <AlertIcon />
              {errors.user_password}
            </Alert>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          isLoading={loading}
          loadingText="Logging in"
          w="full"
        >
          Login
        </Button>

        <Text>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "teal", fontWeight: "bold" }}>
            Register
          </Link>
        </Text>
        <Text>
          Forgot your password?{" "}
          <Link to="/password-reset" style={{ color: "teal", fontWeight: "bold" }}>
            Reset it here
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
