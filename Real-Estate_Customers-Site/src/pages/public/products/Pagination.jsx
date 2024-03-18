// Import necessary dependencies and components from Chakra UI
import React from "react";
import { Box, ButtonGroup, Button } from "@chakra-ui/react";

// Pagination component with props for current page, products per page, total products, and callback for page change
const Pagination = ({ currentPage, productsPerPage, totalProducts, onPageChange }) => {
  // Calculate total number of pages based on total products and products per page
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Handle click on pagination button, triggering the page change callback
  const handleClick = (page) => {
    onPageChange(page);
  };

  // Render pagination buttons based on the total number of pages
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          // Set button color scheme based on whether it represents the current page
          colorScheme={currentPage === i ? "blue" : "gray"}
          onClick={() => handleClick(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  // Render the pagination component with the pagination buttons
  return (
    <Box my={5}>
      <ButtonGroup spacing={2}>{renderPaginationButtons()}</ButtonGroup>
    </Box>
  );
};

// Export the Pagination component as the default export
export default Pagination;
