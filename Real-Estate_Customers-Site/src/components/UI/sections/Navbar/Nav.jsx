import {
  Box,
  Flex,
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
import { AuthContext } from "../../../../context/AuthContext";
import { CartContext } from "../../../../context/CartContext";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import './Nav.css';

function Nav() {
  const { user, logout } = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const cartItems = cartContext?.cartItems || []; 
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = async () => {
    try {
      const response = await logout();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const NAV_ITEMS = [{ label: "Home", to: "/" }];

  if (user) {
    NAV_ITEMS.push(
      { label: "About", to: "/About" },
      { label: "Contact", to: "/Contact" }
    );
  }

  return (
    <Box
      className="gradient-background"
      color="white"
      position="sticky"
      top={0}
      zIndex="sticky"
      shadow="lg"
    >
      <Flex
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
        justify="space-between"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </motion.div>
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
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

        <Stack direction="row" spacing={4} align="center">
          {user && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                as={RouterLink}
                to="/cart"
                icon={
                  <Box position="relative">
                    <FaShoppingCart />
                    {cartItems.length > 0 && (
                      <Box
                        position="absolute"
                        top="-1"
                        right="-1"
                        fontSize="xs"
                        bg="red.500"
                        color="white"
                        borderRadius="full"
                        w="4"
                        h="4"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {cartItems.length}
                      </Box>
                    )}
                  </Box>
                }
                aria-label="Cart"
                variant="ghost"
                color="white"
                fontSize="xl"
              />
            </motion.div>
          )}

          {user ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleLogout}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="blue.400"
              >
                Logout
              </Button>
            </motion.div>
          ) : (
            <>
              <Button as={RouterLink} to="/login" fontSize="sm" fontWeight={600} color="white" bg="blue.900">
                Login
              </Button>
              <Button as={RouterLink} to="/Register" fontSize="sm" fontWeight={600} color="white" bg="green.400">
                Register
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav NAV_ITEMS={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ NAV_ITEMS }) => {
  return (
    <Stack direction="row" spacing={6}>
      {NAV_ITEMS.map((navItem) => (
        <motion.div key={navItem.label} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <ChakraLink
            as={RouterLink}
            to={navItem.to}
            fontSize="lg"
            fontWeight="600"
            color="white"
            _hover={{ color: "gray.300", textDecoration: "underline" }}
            transition="0.3s"
          >
            {navItem.label}
          </ChakraLink>
        </motion.div>
      ))}
    </Stack>
  );
};

const MobileNav = ({ NAV_ITEMS }) => {
  return (
    <Stack bg="blue.600" p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <ChakraLink
          key={navItem.label}
          py={2}
          as={RouterLink}
          to={navItem.to}
          fontWeight="600"
          color="white"
        >
          {navItem.label}
        </ChakraLink>
      ))}
    </Stack>
  );
};

export default Nav;
