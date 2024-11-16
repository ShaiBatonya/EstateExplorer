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
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";

const MotionBox = motion(Box);

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirmation must match password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      registerSchema.parse(values);
      setErrors({});
      setLoading(true);
      await register(values);
      toast({
        title: "Registration Successful",
        description: "Welcome! You can now login.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Registration Failed",
          description: error.message || "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

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
        <FaUserPlus size="2em" style={{ marginBottom: "10px" }} />
        Register
      </Heading>
      <VStack spacing={5}>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
            bg="blackAlpha.600"
            _placeholder={{ color: "gray.500" }}
            focusBorderColor="cyan.500"
            border="1px"
            borderColor="gray.700"
          />
          {errors.name && (
            <Alert status="error" mt={2} borderRadius="md">
              <AlertIcon />
              {errors.name}
            </Alert>
          )}
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            bg="blackAlpha.600"
            _placeholder={{ color: "gray.500" }}
            focusBorderColor="cyan.500"
            border="1px"
            borderColor="gray.700"
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
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
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
          {errors.password && (
            <Alert status="error" mt={2} borderRadius="md">
              <AlertIcon />
              {errors.password}
            </Alert>
          )}
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
            bg="blackAlpha.600"
            _placeholder={{ color: "gray.500" }}
            focusBorderColor="cyan.500"
            border="1px"
            borderColor="gray.700"
          />
          {errors.confirmPassword && (
            <Alert status="error" mt={2} borderRadius="md">
              <AlertIcon />
              {errors.confirmPassword}
            </Alert>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="cyan"
          size="lg"
          isLoading={loading}
          loadingText="Registering"
          w="full"
          _hover={{ bg: "cyan.600", boxShadow: "0 0 20px cyan" }}
        >
          Register
        </Button>
      </VStack>

      <Text mt={4} textAlign="center">
        Already have an account?{" "}
        <Link to="/login" style={{ color: "cyan.400", fontWeight: "bold" }}>
          Login
        </Link>
      </Text>
    </MotionBox>
  );
};

export default Register;
