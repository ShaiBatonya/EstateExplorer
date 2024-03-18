// Import necessary Chakra UI components, React dependencies, and context
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// Register component for user registration
const Register = () => {
  // Access the navigation function and user data from AuthContext
  const navigate = useNavigate();
  const { user, register } = useContext(AuthContext);

  // State variable for form values
  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_password_confirm: "",
  });

  // Handle change in form input values
  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission for user registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if password and confirm password match
      if (values.user_password !== values.user_password_confirm) {
        throw new Error("Passwords don't match");
      }

      // Call register function with form values
      const response = await register(values);
      toast.success(response.message);

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      // Display error message if registration fails
      return { success: false, error: error.response.data.error };
    }
  };

  // Redirect to home page if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  // Render the registration form
  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      minH="65vh"
      maxW="600px"
      mx="auto"
      py={10}
      px={4}
    >
      {/* Heading for the registration form */}
      <Heading as="h1" size="xl" mb={6}>
        Register
      </Heading>
      {/* Form control for user's name */}
      <FormControl isRequired mb={4}>
        <FormLabel>Your Name</FormLabel>
        <Input
          name="user_name"
          type="text"
          placeholder="Enter your name"
          value={values.user_name}
          onChange={handleChange}
        />
      </FormControl>
      {/* Form control for user's email */}
      <FormControl isRequired mb={4}>
        <FormLabel>Email Address</FormLabel>
        <Input
          name="user_email"
          type="email"
          placeholder="Enter your email address"
          value={values.user_email}
          onChange={handleChange}
        />
      </FormControl>
      {/* Form control for user's password */}
      <FormControl isRequired mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          name="user_password"
          type="password"
          placeholder="Enter your password"
          value={values.user_password}
          onChange={handleChange}
        />
      </FormControl>
      {/* Form control for confirming user's password */}
      <FormControl isRequired mb={4}>
        <FormLabel>Password Again</FormLabel>
        <Input
          name="user_password_confirm"
          type="password"
          placeholder="Enter your password"
          value={values.user_password_confirm}
          onChange={handleChange}
        />
      </FormControl>
      {/* Button for submitting the registration form */}
      <Button type="submit" colorScheme="orange" size="lg" mb={4}>
        Register
      </Button>
      {/* Text for linking to the login page */}
      <Text>
        already have an account?{" "}
        <Link
          style={{
            fontWeight: "bold",
            color: "blue",
            textDecoration: "underline",
          }}
          to="/login"
        >
          Login
        </Link>
      </Text>
    </Box>
  );
};

// Export the Register component as the default export
export default Register;
