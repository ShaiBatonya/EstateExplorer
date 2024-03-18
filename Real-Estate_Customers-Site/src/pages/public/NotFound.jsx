import { Box, Heading } from "@chakra-ui/react"

function NotFound() {
  return (
    <Box minH="65vh" maxW="800px" mx="auto" py={10} px={4}>
    <Heading as="h2" size="xl" mb={6}>
      Not Found Page 404
    </Heading>
    </Box>
  )
}

export default NotFound