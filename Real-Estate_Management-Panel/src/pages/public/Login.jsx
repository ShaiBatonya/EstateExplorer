import {
  Input,
  Heading,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { manager, setManager } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/managers/login`,
        {
          manager_email: email,
          manager_password: password,
        }
      );

      const data = response.data;

      setManager(data.manager);
      setCookie("token", data.token, { path: "/", maxAge: 10800 });

      toast.success(data.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  if (manager) {
    return <Navigate to="dashboard" />;
  }

  return (
    <Container
      borderRadius={20}
      p={20}
      backgroundColor="lightblue"
      maxW={["90%", "70%", "30%"]}
      mt={20}
    >
      <Flex direction="column">
        <Heading textAlign="center" my={15}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            backgroundColor="white"
            my={5}
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            backgroundColor="white"
            my={5}
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Divider />
          <HStack justify="center">
            <Button
              fontWeight="bold"
              fontSize={20}
              colorScheme="blue"
              px={7}
              mt={5}
              type="submit"
            >
              Login
            </Button>
          </HStack>
        </form>
        <Divider my={5} />
        {loading && (
          <Spinner
            alignSelf="center"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        )}
      </Flex>
    </Container>
  );
}

export default Login;
