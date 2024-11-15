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
    hover: { scale: 1.15, backgroundColor: "#2b6cb0", color: "#fff" },
    tap: { scale: 0.95 },
  };

  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariant}>
      <Box my={6} textAlign="center">
        <Text fontSize="xl" mb={4} color="gray.600" fontWeight="bold">
          Page {currentPage} of {totalPages}
        </Text>
        <ButtonGroup spacing={3} isAttached>
          <Tooltip label="First Page" aria-label="First Page">
            <IconButton
              icon={<ArrowLeftIcon />}
              onClick={() => handleClick(1)}
              isDisabled={currentPage === 1}
              aria-label="First page"
              colorScheme="purple"
              size="lg"
            />
          </Tooltip>

          <Tooltip label="Previous Page" aria-label="Previous Page">
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={() => handleClick(currentPage - 1)}
              isDisabled={currentPage === 1}
              aria-label="Previous page"
              colorScheme="purple"
              size="lg"
            />
          </Tooltip>

          {getVisiblePages().map((page) => (
            <motion.div key={page} whileHover="hover" whileTap="tap" variants={buttonVariant}>
              <Button
                colorScheme={currentPage === page ? "blue" : "gray"}
                onClick={() => handleClick(page)}
                aria-current={currentPage === page ? "page" : undefined}
                size="lg"
              >
                {page}
              </Button>
            </motion.div>
          ))}

          <Tooltip label="Next Page" aria-label="Next Page">
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={() => handleClick(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              aria-label="Next page"
              colorScheme="purple"
              size="lg"
            />
          </Tooltip>

          <Tooltip label="Last Page" aria-label="Last Page">
            <IconButton
              icon={<ArrowRightIcon />}
              onClick={() => handleClick(totalPages)}
              isDisabled={currentPage === totalPages}
              aria-label="Last page"
              colorScheme="purple"
              size="lg"
            />
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
