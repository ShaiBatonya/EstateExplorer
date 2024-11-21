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
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { z } from "zod";

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

const MotionBox = motion(Box);

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
        description: "You can now log in to your account.",
        status: "success",
        duration: 3000,
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
          description: "An unexpected error occurred.",
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
      bgGradient="linear(to-l, blackAlpha.900, gray.800)"
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
        w={{ base: "90%", md: "50%" }}
        boxShadow="2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Heading textAlign="center" fontSize={{ base: "2xl", md: "3xl" }}>
          <FaUserPlus size="3rem" />
          Register for an Account
        </Heading>
        <Divider my={6} />

        <VStack spacing={5}>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              bg="blackAlpha.600"
              _placeholder={{ color: "gray.400" }}
              borderColor="gray.700"
              focusBorderColor="cyan.500"
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

          <FormControl isInvalid={errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={handleChange}
              bg="blackAlpha.600"
              _placeholder={{ color: "gray.400" }}
              borderColor="gray.700"
              focusBorderColor="cyan.500"
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
            isLoading={loading}
            loadingText="Registering"
            colorScheme="cyan"
            w="full"
            size="lg"
            boxShadow="0px 0px 20px cyan"
            _hover={{ boxShadow: "0px 0px 40px cyan" }}
          >
            Register
          </Button>
        </VStack>

        <Text textAlign="center" mt={6}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "cyan.400", fontWeight: "bold" }}>
            Login
          </Link>
        </Text>
      </MotionBox>
    </Box>
  );
};

export default Register;
