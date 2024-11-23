import React, { useContext, useState, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  Stack,
  Button,
  HStack,
  useDisclosure,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../../../context/AuthContext";
import { CartContext } from "../../../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";

const StyledNav = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: linear-gradient(135deg, rgba(18, 18, 18, 0.75), rgba(18, 18, 18, 0.55));
  backdrop-filter: blur(12px);
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.6);
  padding: 1.5rem 2rem;
  transition: background-color 0.4s ease, padding 0.3s ease, backdrop-filter 0.4s;

  &.scrolled {
    background: linear-gradient(135deg, rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.7));
    padding: 1rem 1.5rem;
    backdrop-filter: blur(20px);
  }

  a {
    font-size: 1.1rem;
    font-weight: 600;
    color: #f5f5f5;
    text-transform: uppercase;
    font-family: "Poppins", sans-serif;
    letter-spacing: 0.08em;
    transition: color 0.3s ease-in-out, text-shadow 0.3s ease-in-out;

    &:hover {
      color: #ffd700;
      text-shadow: 0px 3px 8px rgba(255, 215, 0, 0.8);
    }
  }

  .cart-badge {
    position: absolute;
    top: -5px;
    right: -10px;
    background: #e53e3e;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(229, 62, 62, 0.8);
  }

  .mobile-menu {
    background: rgba(18, 18, 18, 0.9);
    backdrop-filter: blur(14px);
    color: white;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    z-index: 999;
    animation: fadeIn 0.5s ease-in-out;

    a {
      font-size: 1.4rem;
      font-weight: bold;
      color: #ffffff;
      transition: color 0.3s ease;

      &:hover {
        color: #ffd700;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const Nav = () => {
  const { user, logout, setUser, loading } = useContext(AuthContext);
  const { cartItems = [] } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load the session status on mount
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoaded(true);
  }, [setUser]);

  useEffect(() => {
    // Save the user data to session storage when user state changes
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      alert("You have successfully logged out.");
      sessionStorage.removeItem("user"); // Remove user data on logout
    } catch (error) {
      alert("An error occurred while logging out.");
    }
  };

  return (
    <StyledNav className={isScrolled ? "scrolled" : ""}>
      <Flex justify="space-between" align="center">
        {/* Logo */}
        <RouterLink
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "1.8rem",
            color: "#ffd700",
            textDecoration: "none",
          }}
        >
          <Text className="hero-subtitle">
          Estate Explorer</Text>
        </RouterLink>

        {/* Desktop Navigation */}
        <HStack
          as="nav"
          spacing={8}
          display={{ base: "none", md: "flex" }}
          align="center"
        >
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About Us</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          {user && (
            <RouterLink to="/cart" style={{ position: "relative" }}>
              <FaShoppingCart size={20} />
              {cartItems.length > 0 && (
                <Box className="cart-badge">{cartItems.length}</Box>
              )}
            </RouterLink>
          )}
        </HStack>

        {/* User Actions */}
        <Stack direction="row" spacing={4} align="center">
          {isLoaded ? (
            user ? (
              <Button
                onClick={handleLogout}
                size="sm"
                bg="linear-gradient(90deg, #5a5a5a, #434343)"
                color="white"
                _hover={{
                  bg: "linear-gradient(90deg, #4a4a4a, #3a3a3a)",
                  boxShadow: "0px 4px 12px rgba(90, 90, 90, 0.8)",
                }}
                borderRadius="full"
                px={6}
                fontWeight="bold"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  as={RouterLink}
                  to="/login"
                  size={{ base: "xs", md: "sm" }}
                  bg="linear-gradient(90deg, #6dd5ed, #2193b0)"
                  color="white"
                  _hover={{
                    bg: "linear-gradient(90deg, #5ab8d4, #1e7fa1)",
                    boxShadow: "0px 4px 12px rgba(109, 213, 237, 0.8)",
                  }}
                  borderRadius="full"
                  px={4}
                  fontWeight="bold"
                >
                  Login
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  size={{ base: "xs", md: "sm" }}
                  bg="linear-gradient(90deg, #ff9a9e, #fad0c4)"
                  color="white"
                  _hover={{
                    bg: "linear-gradient(90deg, #f47e85, #eab8b8)",
                    boxShadow: "0px 4px 12px rgba(255, 154, 158, 0.8)",
                  }}
                  borderRadius="full"
                  px={4}
                  fontWeight="bold"
                >
                  Register
                </Button>
              </>
            )
          ) : (
            <Spinner color="white" size="sm" />
          )}
        </Stack>

        {/* Mobile Navigation */}
        <Flex display={{ base: "flex", md: "none" }} align="center">
          {user && (
            <RouterLink to="/cart" style={{ position: "relative", marginRight: "1rem" }}>
              <FaShoppingCart size={24} color="#ffd700" />
              {cartItems.length > 0 && (
                <Box className="cart-badge">{cartItems.length}</Box>
              )}
            </RouterLink>
          )}
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle Navigation"
            color="white"
          />
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box className="mobile-menu">
          <RouterLink to="/" onClick={onToggle}>
            Home
          </RouterLink>
          <RouterLink to="/about" onClick={onToggle}>
            About Us
          </RouterLink>
          <RouterLink to="/contact" onClick={onToggle}>
            Contact
          </RouterLink>
          {user ? (
            <Button onClick={handleLogout} bg="linear-gradient(90deg, #5a5a5a, #434343)" color="white" _hover={{ bg: "linear-gradient(90deg, #4a4a4a, #3a3a3a)", boxShadow: "0px 4px 12px rgba(90, 90, 90, 0.8)" }}>
              Logout
            </Button>
          ) : (
            <>
              <RouterLink to="/login" onClick={onToggle}>
                Login
              </RouterLink>
              <RouterLink to="/register" onClick={onToggle}>
                Register
              </RouterLink>
            </>
          )}
        </Box>
      )}
    </StyledNav>
  );
};

export default Nav;
