import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const MotionBox = motion(Box);

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(values);
      setErrors({});
      setLoading(true);
      await login(values.email, values.password);
      toast({
        title: "Welcome Back!",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
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
          description: "Invalid credentials, please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bgGradient="linear(to-r, blackAlpha.900, gray.800)"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="whiteAlpha.900"
    >
      <MotionBox
        as="form"
        onSubmit={handleSubmit}
        bg="blackAlpha.800"
        borderRadius="2xl"
        p={{ base: 8, md: 16 }}
        w={{ base: "90%", md: "40%" }}
        boxShadow="2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Heading textAlign="center" fontSize={{ base: "2xl", md: "3xl" }}>
          <FaUserCircle size="3rem" />
          Login to Your Account
        </Heading>
        <Divider my={6} />
        <VStack spacing={5}>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              bg="blackAlpha.600"
              _placeholder={{ color: "gray.400" }}
              borderColor="gray.700"
              focusBorderColor="cyan.500"
            />
            {errors.email && (
              <Alert status="error" mt={2} borderRadius="md">
                <AlertIcon />
                {errors.email}
              </Alert>
            )}
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                bg="blackAlpha.600"
                _placeholder={{ color: "gray.400" }}
                borderColor="gray.700"
                focusBorderColor="cyan.500"
              />
              <InputRightElement>
                <Button
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
            {errors.password && (
              <Alert status="error" mt={2} borderRadius="md">
                <AlertIcon />
                {errors.password}
              </Alert>
            )}
          </FormControl>

          <Button
            type="submit"
            isLoading={loading}
            loadingText="Logging in"
            colorScheme="cyan"
            w="full"
            size="lg"
            boxShadow="0px 0px 20px cyan"
            _hover={{ boxShadow: "0px 0px 40px cyan" }}
          >
            Login
          </Button>
        </VStack>

        <Text textAlign="center" mt={6}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "cyan.400", fontWeight: "bold" }}>
            Register
          </Link>
        </Text>
      </MotionBox>
    </Box>
  );
};

export default Login;
