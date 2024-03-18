// Import Chakra UI components for building the About component
import { Box, Heading, Text } from "@chakra-ui/react";

// About component to display information about the business
function About() {
  return (
    // Container for the About section
    <Box maxW="800px" mx="auto" py={10} px={4}>
      {/* Heading for the About section */}
      <Heading as="h2" size="xl" mb={6}>
        About Us
      </Heading>
      {/* Paragraph describing the philosophy and quality of the business */}
      <Text my={5}>
        At Nofar, we believe that every woman deserves to feel
        confident, beautiful, and comfortable in her own skin. Our headscarves
        are crafted with the utmost care, using high-quality materials that
        ensure both comfort and durability. Each piece is thoughtfully designed
        to elevate your style and complement any outfit, whether you're
        attending a formal event or simply strolling through the city streets.
      </Text>
      {/* Second paragraph emphasizing the user-friendly website and product variety */}
      <Text my={5}>
        Our website offers a seamless browsing experience, allowing you to
        easily navigate through our extensive range of headscarves. Discover the
        latest trends, browse by color or pattern, or search for a specific
        designer - the choice is yours. With detailed product descriptions and
        high-resolution images, you can get a closer look at each headscarf,
        helping you make an informed decision.
      </Text>
      {/* Third paragraph highlighting the importance of customer service */}
      <Text my={5}>
        We understand that choosing the perfect headscarf is a personal journey,
        which is why our team is dedicated to providing exceptional customer
        service. If you have any questions or need assistance, our friendly and
        knowledgeable staff is here to help. We strive to ensure your shopping
        experience is enjoyable and stress-free, leaving you with a headscarf
        that truly reflects your style and personality.
      </Text>
    </Box>
  );
}

// Export the About component as the default export
export default About;
