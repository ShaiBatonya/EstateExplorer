import {
  Box,
  Flex,
  Text,
  IconButton,
  Heading,
  Button,
  Stack,
  Collapse,
  Link as ChakraLink,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

function Nav() {
  // Access user context
  const { user, logout } = useContext(AuthContext);

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await logout();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.error);
    }
  };

  // Define navigation items
  const NAV_ITEMS = [
    {
      label: "Home",
      to: "/",
    },
  ];

  if (user) {
    NAV_ITEMS.push(
      {
        label: "About",
        to: "/About",
      },
      {
        label: "Contact",
        to: "/Contact",
      }
    );
  }

  // UseDisclosure hook for managing state of mobile navigation
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      bgGradient="linear-gradient(135deg, #06beb6, #48b1bf)" // Gradient Animation
      color="white"
      position="sticky"
      top={0}
      zIndex="sticky"
      shadow="lg"
      borderBottom={0} // Removing the border at the bottom
    >
      <Flex
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
        justify="space-between"
      >
        {/* Logo Section */}
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <motion.div
            whileHover={{ scale: 1.1 }} // Animating logo on hover
            transition={{ duration: 0.5 }}
          >
            <Heading as="h1" size="lg" fontWeight="bold">
              <ChakraLink
                as={RouterLink}
                to="/"
                _hover={{ textDecoration: "none" }}
              >
                Real Estate
              </ChakraLink>
            </Heading>
          </motion.div>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav NAV_ITEMS={NAV_ITEMS} />
          </Flex>
        </Flex>

        {user ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleLogout}
              as={RouterLink}
              display={{ base: "none", md: "inline-flex" }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="blue.400"
              _hover={{
                bg: "blue.300",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Adding hover shadow effect
              }}
              borderRadius="full" // Rounded button
              transition="0.3s" // Smooth transition
            >
              Logout
            </Button>
          </motion.div>
        ) : (
          <Stack direction="row" spacing={4}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={RouterLink}
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="blue.900"
                to="/login"
                _hover={{
                  bg: "blue.700",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                }}
                borderRadius="full"
                transition="0.3s"
              >
                Login
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={RouterLink}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="green.400"
                to="/Register"
                _hover={{
                  bg: "green.300",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                }}
                borderRadius="full"
                transition="0.3s"
              >
                Register
              </Button>
            </motion.div>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav NAV_ITEMS={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

// Desktop navigation component
const DesktopNav = ({ NAV_ITEMS }) => {
  const linkColor = "white";
  const linkHoverColor = "gray.300";

  return (
    <Stack direction="row" spacing={6}>
      {NAV_ITEMS.map((navItem) => (
        <motion.div
          key={navItem.label}
          whileHover={{ scale: 1.1 }} // Enlarge on hover
          transition={{ duration: 0.3 }}
        >
          <ChakraLink
            as={RouterLink}
            to={navItem.to}
            fontSize="lg"
            fontWeight="600"
            color={linkColor}
            _hover={{
              color: linkHoverColor,
              textDecoration: "underline",
            }}
            transition="0.3s" // Smooth transition on hover
          >
            {navItem.label}
          </ChakraLink>
        </motion.div>
      ))}
    </Stack>
  );
};

// Mobile navigation component
const MobileNav = ({ NAV_ITEMS }) => {
  return (
    <Stack bg="blue.600" p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

// Mobile navigation item component
const MobileNavItem = ({ label, to }) => {
  return (
    <ChakraLink
      py={2}
      as={RouterLink}
      to={to}
      fontWeight="600"
      color="white"
      _hover={{ textDecoration: "none", color: "gray.300" }}
    >
      {label}
    </ChakraLink>
  );
};

export default Nav;
