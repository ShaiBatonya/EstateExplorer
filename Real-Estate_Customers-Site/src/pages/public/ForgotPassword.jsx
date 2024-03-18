// Import necessary dependencies and components from React, react-router-dom, and Chakra UI
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  Input,
  Button,
  Heading,
  Divider,
} from "@chakra-ui/react";

import axiosInstance from "../../config/axiosConfig"; // Import the axios instance

// ForgotPassword component with user authentication and password reset functionality
const ForgotPassword = ({ user }) => {
  // Extract parameters and location information using react-router-dom hooks
  const { id } = useParams();
  const location = useLocation();

  // Extract customer token from the URL query parameters
  const customer_token = location.search.split("=")[1];

  // Access the navigation function from react-router-dom
  const navigate = useNavigate();

  // State variables for handling data loading, password input, and success message
  const [data2, setData] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Check if the user is valid and update state accordingly
  const userValid = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_SERVER_URL}/emails/forgot-password/${id}`,
        {
          headers: {
            customer_token: customer_token,
          },
        }
      );

      if (data.status === 201) {
        console.log("user valid");
        setData(true);
      } else {
        navigate("/");
        toast.error("Invalid Link");
      }
    } catch (error) {
      navigate("/");
      toast.error("Invalid Link");
    }
  };

  // Send a new password to the server for the user
  const sendPassword = async (e) => {
    e.preventDefault();

    // Validate the password length before making the request
    if (password === "") {
      toast.error("Password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!", {
        position: "top-center",
      });
    } else {
      try {
        const { data } = await axiosInstance.post(
          `${import.meta.env.VITE_SERVER_URL}/emails/${id}`,
          {
            password,
            customer_token,
          }
        );

        if (data.status === 201) {
          setPassword("");
          setMessage(true);
        } else {
          toast.error("Token Expired, generate new Link!", {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error("An error occurred while updating the password!", {
          position: "top-center",
        });
      }
    }
  };

  // Trigger the userValid function on component mount
  useEffect(() => {
    userValid();
  }, []);

  // Redirect to home page if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  // Render different components based on the data loading status
  return (
    <>
      {data2 ? (
        <>
          {" "}
          {/* Render password reset form */}
          <Box minH="65vh" maxW="600px" mx="auto" py={10} px={4}>
            <Heading as="h2" size="xl" mb={6}>
              Enter Your NEW Password
            </Heading>
            <section>
              <div className="form_data">
                <form>
                  {message ? (
                    // Display success message if password is updated
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      Password Successfully Updated
                    </p>
                  ) : null}
                  {/* Password input field in the form */}
                  <div className="form_input">
                    <label htmlFor="password">New password</label>
                    <Input
                      my={5}
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      name="password"
                      id="password"
                      placeholder="Enter Your new password"
                    />
                  </div>

                  {/* Button to send the new password */}
                  <Button mb={4} colorScheme="blue" onClick={sendPassword}>
                    Send
                  </Button>
                </form>
                {/* Navigation links */}
                <p>
                  <Divider />
                  <Link to="/">
                    <Button mt={3}>Home</Button>
                  </Link>
                </p>
              </div>
            </section>
          </Box>
        </>
      ) : (
        // Display loading spinner while data is being loaded
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

// Export the ForgotPassword component as the default export
export default ForgotPassword;
