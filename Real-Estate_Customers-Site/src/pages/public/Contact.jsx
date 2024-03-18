// Import Chakra UI components for building the Contact component
import {
  Box,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

// Contact component for rendering a contact form
function Contact() {
  return (
    // Container for the contact form
    <Box minH="65vh" maxW="800px" mx="auto" py={10} px={4}>
      {/* Heading for the contact form */}
      <Heading as="h2" size="xl" mb={6}>
        Contact Us
      </Heading>
      {/* Text providing information about reaching out */}
      <Text>
        We would love to hear from you! Whether you have a question, feedback,
        or simply want to say hello, please feel free to reach out to us using
        the form below.
      </Text>
      {/* Flex container for form elements */}
      <Flex direction="column" mt={8}>
        {/* Form control for entering name */}
        <FormControl id="name" isRequired mb={4}>
          <FormLabel>Your Name</FormLabel>
          <Input type="text" placeholder="Enter your name" />
        </FormControl>
        {/* Form control for entering email address */}
        <FormControl id="email" isRequired mb={4}>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" placeholder="Enter your email address" />
        </FormControl>
        {/* Form control for entering phone number */}
        <FormControl id="phone" isRequired mb={4}>
          <FormLabel>Phone</FormLabel>
          <Input type="email" placeholder="Enter your phone" />
        </FormControl>
        {/* Form control for entering message */}
        <FormControl id="message" isRequired mb={4}>
          <FormLabel>Message</FormLabel>
          <Textarea placeholder="Enter your message" rows={4} />
        </FormControl>
        {/* Button for submitting the contact form */}
        <Button colorScheme="orange" size="lg">
          Send Message
        </Button>
      </Flex>
    </Box>
  );
}

// Export the Contact component as the default export
export default Contact;
