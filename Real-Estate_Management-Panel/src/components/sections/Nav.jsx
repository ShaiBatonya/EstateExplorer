import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { ImMenu } from "react-icons/im";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContextProvider";
import { useCookies } from "react-cookie";
import { Link as rl } from "react-router-dom";

const Nav = () => {
  const { manager, setManager } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/managers/logout`
      );

      toast.success(data.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });

      setTimeout(() => {
        removeCookie("token");
        setManager(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
  };
  return (
    <>
      <Box
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        color={[isOpen ? "blue" : "black"]}
        fontSize={50}
        pos="fixed"
        left={2.5}
        top={2.5}
        display={["flex", "flex", "none"]}
      >
        <ImMenu />
      </Box>
      <Flex
        fontSize={"sm"}
        as="nav"
        align="center"
        justify="space-between"
        padding={4}
        bg="gray.800"
        color="white"
        display={[isOpen ? "flex" : "none", isOpen ? "flex" : "none", "flex"]}
        direction={["row-reverse", "row-reverse", "row"]}
        mt={[20, 20, 0]}
      >
        <Box>
          <Text
            display={["none", "none", "flex"]}
            fontSize="xl"
            fontWeight="bold"
          >
            My App
          </Text>
        </Box>
        <Flex direction={["column", "column", "row"]}>
          <Link
            as={rl}
            m={1}
            to="/dashboard"
            color="gray.200"
            _hover={{ color: "white" }}
          >
            Dashboard
          </Link>
          <Link
            as={rl}
            m={1}
            to="/users"
            color="gray.200"
            _hover={{ color: "white" }}
          >
            Users
          </Link>
          <Link
            as={rl}
            m={1}
            to="/products/add-product"
            color="gray.200"
            _hover={{ color: "white" }}
          >
            Add Product
          </Link>
          <Link
            as={rl}
            m={1}
            to="/products"
            color="gray.200"
            _hover={{ color: "white" }}
          >
            Products
          </Link>
          <Link
            as={rl}
            m={1}
            to="/categories/add-category"
            color="gray.200"
            _hover={{ color: "white" }}
          >
            Add Category
          </Link>
          <Link
            as={rl}
            m={1}
            to="/categories"
            color="gray.200"
            _hover={{ color: "white" }}
          >
            Categories
          </Link>
          <Link
            as={rl}
            m={1}
            to="/orders"
            color="gray.200"
            _hover={{ color: "white" }}
          >
            Orders
          </Link>
          <Link
            onClick={handleLogout}
            m={1}
            color="gray.200"
            _hover={{ color: "white" }}
          >
            Logout
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default Nav;
