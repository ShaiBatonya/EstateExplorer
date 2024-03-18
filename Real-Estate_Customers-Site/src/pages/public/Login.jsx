// Import necessary Chakra UI components and React dependencies
import { Box, Heading, FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Navigate, useNavigate, Link } from "react-router-dom";

// Login component
const Login = () => {
  // Access the navigation function from react-router-dom
  const navigate = useNavigate();

  
  // Access user data and login function from AuthContext
  const { user, login } = useContext(AuthContext);

  // State variables for loading status and form values
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    user_email: "",
    user_password: ""
  });

  // Handle input change in the form
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission for user login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Call login function with email and password values
      const response = await login(values.user_email, values.user_password);
      debugger

      // Display success message and navigate to home page
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      debugger
      // Display error message if login fails
      return {
        success: false,
        error: error.response.data.error
      };
    } finally {
      setLoading(false);
    }
  };

  // Redirect to home page if user is already logged in
  if(user) {
    return <Navigate to="/"/>
  }

  // Render the login form
  return (
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
        {/* Heading for the login form */}
        <Heading as="h2" size="xl" mb={6}>
          Login
        </Heading>
        {/* Email input field in the form */}
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
        {/* Password input field in the form */}
        <FormControl id="password" isRequired mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            name="user_password"
            value={values.user_password}
            onChange={handleChange}
          />
        </FormControl>
        {/* Login button in the form */}
        <Button type="submit" colorScheme="orange" size="lg" mb={4}>
          Login
        </Button>
        {/* Text for registering a new account */}
        <Text>
          Don't have an account?{" "}
          <Link style={{
            fontWeight:"bold",
            color:"blue",
            textDecoration:"underline"
          }} to="/register">
            Register
          </Link>
        </Text>
        {/* Text for password reset link */}
        <Text>
          Forgot password?{" "}
          <Link style={{
            fontWeight:"bold",
            color:"blue",
            textDecoration:"underline"
          }} to="/password-reset">
            Click Here
          </Link>
        </Text>
      </Box>

      {/* Display loading message if form submission is in progress */}
      {loading && <span>loading...</span>}
    </>
  );
};

// Export the Login component as the default export
export default Login;