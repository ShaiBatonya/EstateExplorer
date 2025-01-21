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
import "./Nav.css";

const StyledNav = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(18, 18, 18, 0.55);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  transition: background 0.4s ease, padding 0.3s ease, backdrop-filter 0.4s;
  padding: 1.5rem 2rem;

  &.scrolled {
    background: rgba(18, 18, 18, 0.85);
    backdrop-filter: blur(20px);
    padding: 1rem 1.5rem;
  }

  /* Logo styles */
  .nav-logo {
    font-size: 1.8rem;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--luxury-color);
    font-family: var(--heading-font);
    text-shadow: 0 3px 8px rgba(212, 175, 55, 0.7);
    transition: transform 0.3s, text-shadow 0.3s;
  }

  .nav-logo:hover {
    transform: translateY(-3px);
    text-shadow: 0 6px 16px rgba(212, 175, 55, 0.9);
  }

  /* Cart badge */
  .cart-badge {
    position: absolute;
    top: -6px;
    right: -12px;
    background: #e53e3e;
    color: #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(229, 62, 62, 0.8);
  }

  /* Mobile menu */
  .mobile-menu {
    background: rgba(18, 18, 18, 0.95);
    backdrop-filter: blur(15px);
    color: #fff;
    position: absolute;
    top: 70px;
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
      letter-spacing: 0.08em;
      transition: color 0.3s ease, transform 0.3s ease;
    }
    a:hover {
      color: var(--luxury-color);
      transform: translateX(4px);
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
`;

const Nav = () => {
  const { user, logout, setUser, loading } = useContext(AuthContext);
  const { cartItems = [] } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoaded(true);
  }, [setUser]);

  useEffect(() => {
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
      sessionStorage.removeItem("user");
    } catch {
      alert("An error occurred while logging out.");
    }
  };

  return (
    <StyledNav className={isScrolled ? "scrolled" : ""}>
      <Flex justify="space-between" align="center">
        {/* Logo */}
        <RouterLink to="/" className="nav-logo">
          Estate Explorer
        </RouterLink>

        {/* Desktop Nav */}
        <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }} align="center">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About Us</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          {user && (
            <RouterLink to="/cart" style={{ position: "relative" }}>
              <FaShoppingCart size={20} />
              {cartItems.length > 0 && <Box className="cart-badge">{cartItems.length}</Box>}
            </RouterLink>
          )}
        </HStack>

        {/* Right Actions */}
        <Stack direction="row" spacing={4} align="center">
          {isLoaded ? (
            user ? (
              <Button
                onClick={handleLogout}
                size="sm"
                variant="solid"
                className="logout-btn"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  as={RouterLink}
                  to="/login"
                  size={{ base: "xs", md: "sm" }}
                  className="login-btn"
                >
                  Login
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  size={{ base: "xs", md: "sm" }}
                  className="register-btn"
                >
                  Register
                </Button>
              </>
            )
          ) : (
            <Spinner color="white" size="sm" />
          )}
        </Stack>

        {/* Mobile Nav Toggle */}
        <Flex display={{ base: "flex", md: "none" }} align="center">
          {user && (
            <RouterLink to="/cart" style={{ position: "relative", marginRight: "1rem" }}>
              <FaShoppingCart size={24} color="#ffd700" />
              {cartItems.length > 0 && <Box className="cart-badge">{cartItems.length}</Box>}
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
            <Button onClick={handleLogout} className="logout-btn">
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
