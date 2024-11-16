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
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const MotionBox = motion(Box);

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
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <MotionBox
      as="form"
      onSubmit={handleSubmit}
      bgGradient="linear(to-r, blackAlpha.900, gray.800)"
      color="whiteAlpha.900"
      borderRadius="lg"
      shadow="dark-lg"
      p={8}
      maxW="lg"
      mx="auto"
      mt={10}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        <FaUserCircle size="2em" style={{ marginBottom: "10px" }} />
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
            bg="blackAlpha.600"
            _placeholder={{ color: "gray.500" }}
            focusBorderColor="cyan.500"
            border="1px"
            borderColor="gray.700"
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
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              name="user_password"
              value={values.user_password}
              onChange={handleChange}
              placeholder="Enter your password"
              bg="blackAlpha.600"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="cyan.500"
              border="1px"
              borderColor="gray.700"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                bg="cyan.500"
                color="white"
                _hover={{ bg: "cyan.600" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.user_password && (
            <Alert status="error" mt={2} borderRadius="md">
              <AlertIcon />
              {errors.user_password}
            </Alert>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="cyan"
          size="lg"
          isLoading={loading}
          loadingText="Logging in"
          w="full"
          _hover={{ bg: "cyan.600", boxShadow: "0 0 20px cyan" }}
        >
          Login
        </Button>

        <Text>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "cyan.400", fontWeight: "bold" }}>
            Register
          </Link>
        </Text>
      </VStack>
    </MotionBox>
  );
};

export default Login;
