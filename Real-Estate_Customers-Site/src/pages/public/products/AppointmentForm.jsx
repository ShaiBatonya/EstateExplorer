// src/components/AppointmentForm.jsx

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MotionContainer = motion(Container);

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    preferredDate: null,
  });
  const toast = useToast();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle date change for date picker
  const handleDateChange = (date) => {
    setFormData({ ...formData, preferredDate: date });
  };

  // Form validation
  const validateForm = () => {
    const { name, email, phoneNumber, preferredDate } = formData;
    if (!name || !email || !phoneNumber || !preferredDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields before submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted with data:", formData);
      toast({
        title: "Appointment Scheduled",
        description: "Your appointment has been scheduled successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        preferredDate: null,
      });
    }
  };

  // Styles
  const bgColor = useColorModeValue("#0D0D2B", "#0D0D2B"); // Deep blue background
  const textColor = useColorModeValue("#FFFFFF", "#FFFFFF"); // White text
  const inputBg = useColorModeValue("#1F1F3D", "#1F1F3D"); // Slightly lighter blue for inputs
  const borderColor = useColorModeValue("#3E3E6B", "#3E3E6B"); // Silver border
  const headingColor = useColorModeValue("#A6A6C1", "#A6A6C1"); // Light silver for headings

  return (
    <MotionContainer
      maxW="container.md"
      mt={10}
      p={8}
      borderRadius="lg"
      bg={bgColor}
      color={textColor}
      boxShadow="2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit}>
        <Heading as="h2" size="xl" mb={6} textAlign="center" color={headingColor}>
          Schedule an Appointment
        </Heading>
        <VStack spacing={5}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              bg={inputBg}
              borderColor={borderColor}
              _placeholder={{ color: "gray.400" }}
              focusBorderColor="#5D5D79"
              _focus={{ boxShadow: "0 0 0 1px #5D5D79" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              bg={inputBg}
              borderColor={borderColor}
              _placeholder={{ color: "gray.400" }}
              focusBorderColor="#5D5D79"
              _focus={{ boxShadow: "0 0 0 1px #5D5D79" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              bg={inputBg}
              borderColor={borderColor}
              _placeholder={{ color: "gray.400" }}
              focusBorderColor="#5D5D79"
              _focus={{ boxShadow: "0 0 0 1px #5D5D79" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Preferred Date</FormLabel>
            <Box
              bg={inputBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={2}
              w="100%"
            >
              <DatePicker
                selected={formData.preferredDate}
                onChange={handleDateChange}
                placeholderText="Select a date"
                dateFormat="MMMM d, yyyy"
                className="datepicker-input"
              />
            </Box>
          </FormControl>

          <Button
            type="submit"
            size="lg"
            bg="#3E3E6B"
            color="white"
            _hover={{ bg: "#5D5D79" }}
            w="full"
            boxShadow="lg"
          >
            Schedule Appointment
          </Button>
        </VStack>
      </form>

      {/* Leaflet Map Integration */}
      <Box mt={16} borderRadius="lg" overflow="hidden">
        <Heading as="h3" size="lg" mb={6} color={headingColor}>
          Our Location
        </Heading>
        <Box h="400px" w="100%" borderRadius="lg" overflow="hidden">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                <Text fontWeight="bold">Our Office Location</Text>
                <Text>You're welcome to visit us!</Text>
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
    </MotionContainer>
  );
};

export default AppointmentForm;
