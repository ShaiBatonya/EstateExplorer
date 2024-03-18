import { useContext } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Heading,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import { BiUserCircle, BiHomeCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
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
      bg={useColorModeValue("blue.600", "gray.800")}
      color="white"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav NAV_ITEMS={NAV_ITEMS} />
          </Flex>
        </Flex>

        {user ? (
          <Button
            onClick={handleLogout}
            as={RouterLink}
            display={{ base: "none", md: "inline-flex" }}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="blue.400"
            _hover={{
              bg: "blue.200",
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              as={RouterLink}
              display={{ base: "none", md: "inline-flex" }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="blue.900"
              to="/login"
              _hover={{
                bg: "blue.300",
              }}
            >
              Login
            </Button>
            <Button
              as={RouterLink}
              ml="2"
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="green.400"
              to="/Register"
              _hover={{
                bg: "green.300",
              }}
            >
              Register
            </Button>
          </>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          alignItems="center"
          direction={{ base: "column", md: "row" }}
          spacing={6}
          display={{ base: "flex", md: "none" }}
        >
          {user ? (
            <Button
              onClick={handleLogout}
              mx="10px"
              p="10px"
              as={RouterLink}
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="blue.400"
              _hover={{
                bg: "blue.300",
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              mt="5px"
              mx="10px"
              p="10px"
              as={RouterLink}
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="blue.400"
              to="/login"
              _hover={{
                bg: "blue.300",
              }}
            >
              Login
            </Button>
          )}
        </Stack>

        <MobileNav NAV_ITEMS={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

// Desktop navigation component
const DesktopNav = ({ NAV_ITEMS }) => {
  const linkColor = "white";
  const linkHoverColor = "gray.200";

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <ChakraLink
                p={2}
                as={RouterLink}
                to={navItem.to}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </ChakraLink>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

// Mobile navigation component
const MobileNav = ({ NAV_ITEMS }) => {
  return (
    <Flex justify="center">
      <Stack
        bg={useColorModeValue("blue.600", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    </Flex>
  );
};

// Mobile navigation item component
const MobileNavItem = ({ label, children, to }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={to}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color="white" fontSize="lg">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeftWidth={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} as={RouterLink} to={child.to}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default Nav;
