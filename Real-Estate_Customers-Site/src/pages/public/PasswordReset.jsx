// Import Chakra UI components for building the PasswordReset component
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

// Import React hooks for state and context
import { useState, useContext } from "react";

// Import the authentication context and toast notification library
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

// Import React Router DOM functionalities for navigation
import { Navigate, useNavigate, Link } from "react-router-dom";

// PasswordReset component for handling the password reset functionality
const PasswordReset = () => {
  // Access user and forgot function from the AuthContext
  const { user, forgot } = useContext(AuthContext);

  // State to manage loading state during form submission
  const [loading, setLoading] = useState(false);

  // State to manage form input values
  const [values, setValues] = useState({
    user_email: "",
  });

  // Event handler for input change in the form
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Call the forgot function with the provided email
      const response = await forgot(values.user_email);
      // Clear the form values after successful submission
      setValues({
        user_email: "",
      });
      // Display success message using toast
      toast.success(response.message);
    } catch (error) {
      // Display error message using toast in case of an error
      return { success: false, error: error.response.data.error };
    } finally {
      setLoading(false);
    }
  };

  // If the user is already authenticated, redirect to the home page
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    // Form for handling the password reset
    <>
      <Box
        as="form"
        onSubmit={handleSubmit}
        minH="65vh"
        maxW="600px"
        mx="auto"
        py={10}
        px={4}
      >
        {/* Heading for the password reset form */}
        <Heading as="h2" size="xl" mb={6}>
          Forget Password
        </Heading>
        {/* Form control for entering email address */}
        <FormControl id="email" isRequired mb={4}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            name="user_email"
            value={values.user_email}
            onChange={handleChange}
          />
        </FormControl>
        {/* Button for submitting the password reset form */}
        <Button type="submit" colorScheme="orange" size="lg" mb={4}>
          Send
        </Button>
      </Box>

      {/* Display loading message while the form is being submitted */}
      {loading && <span>loading...</span>}
    </>
  );
};

// Export the PasswordReset component as the default export
export default PasswordReset;
