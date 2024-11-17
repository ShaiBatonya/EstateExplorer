import React from "react";
import { Box, ButtonGroup, Button, IconButton, VisuallyHidden, Text, Tooltip } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

/**
 * Pagination Component
 * @param {number} currentPage - Current active page
 * @param {number} productsPerPage - Number of products displayed per page
 * @param {number} totalProducts - Total number of products
 * @param {function} onPageChange - Callback to handle page change
 */
const Pagination = ({ currentPage, productsPerPage, totalProducts, onPageChange }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const maxVisiblePages = 5;

  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handleClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const buttonVariant = {
    hover: {
      scale: 1.2,
      background: "linear-gradient(145deg, #1e293b, #4b5563)",
      color: "#f8fafc",
      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.8), 0 0 15px rgba(56, 189, 248, 0.7)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const inactiveButtonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#a0aec0",
    _hover: { backgroundColor: "rgba(255, 255, 255, 0.2)" },
    border: "1px solid rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(5px)",
  };

  const containerVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariant}>
      <Box my={8} textAlign="center">
        <Text
          fontSize="2xl"
          mb={6}
          color="gray.200"
          fontWeight="extrabold"
          textTransform="uppercase"
          letterSpacing="widest"
          lineHeight="1.2"
        >
          Page {currentPage} of {totalPages}
        </Text>
        <ButtonGroup spacing={4} isAttached>
          <Tooltip label="First Page" aria-label="First Page">
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariant}>
              <IconButton
                icon={<ArrowLeftIcon />}
                onClick={() => handleClick(1)}
                isDisabled={currentPage === 1}
                aria-label="First page"
                size="lg"
                borderRadius="full"
                bg="gray.800"
                color="gray.300"
                _hover={{ bg: "gray.700", color: "white" }}
                boxShadow="0px 6px 15px rgba(0, 0, 0, 0.5)"
              />
            </motion.div>
          </Tooltip>

          <Tooltip label="Previous Page" aria-label="Previous Page">
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariant}>
              <IconButton
                icon={<ChevronLeftIcon />}
                onClick={() => handleClick(currentPage - 1)}
                isDisabled={currentPage === 1}
                aria-label="Previous page"
                size="lg"
                borderRadius="full"
                bg="gray.800"
                color="gray.300"
                _hover={{ bg: "gray.700", color: "white" }}
                boxShadow="0px 6px 15px rgba(0, 0, 0, 0.5)"
              />
            </motion.div>
          </Tooltip>

          {getVisiblePages().map((page) => (
            <motion.div key={page} whileHover="hover" whileTap="tap" variants={buttonVariant}>
              <Button
                onClick={() => handleClick(page)}
                aria-current={currentPage === page ? "page" : undefined}
                size="lg"
                borderRadius="full"
                fontWeight="bold"
                bg={currentPage === page ? "blue.700" : "gray.900"}
                color={currentPage === page ? "white" : "gray.400"}
                _hover={{ bg: "blue.600", color: "white" }}
                boxShadow={currentPage === page ? "0px 12px 24px rgba(29, 78, 216, 0.8)" : "none"}
                sx={currentPage !== page ? inactiveButtonStyle : {}}
              >
                {page}
              </Button>
            </motion.div>
          ))}

          <Tooltip label="Next Page" aria-label="Next Page">
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariant}>
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={() => handleClick(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                aria-label="Next page"
                size="lg"
                borderRadius="full"
                bg="gray.800"
                color="gray.300"
                _hover={{ bg: "gray.700", color: "white" }}
                boxShadow="0px 6px 15px rgba(0, 0, 0, 0.5)"
              />
            </motion.div>
          </Tooltip>

          <Tooltip label="Last Page" aria-label="Last Page">
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariant}>
              <IconButton
                icon={<ArrowRightIcon />}
                onClick={() => handleClick(totalPages)}
                isDisabled={currentPage === totalPages}
                aria-label="Last page"
                size="lg"
                borderRadius="full"
                bg="gray.800"
                color="gray.300"
                _hover={{ bg: "gray.700", color: "white" }}
                boxShadow="0px 6px 15px rgba(0, 0, 0, 0.5)"
              />
            </motion.div>
          </Tooltip>
        </ButtonGroup>

        <VisuallyHidden>
          Current Page: {currentPage} of {totalPages}
        </VisuallyHidden>
      </Box>
    </motion.div>
  );
};

export default Pagination;
