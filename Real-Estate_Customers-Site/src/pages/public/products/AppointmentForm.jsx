import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Button, Container, FormControl, FormLabel, Input, useColorModeValue, useToast, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Styled container and button
const AppointmentFormContainer = styled(Container)`
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin-top: 40px;
  background-color: ${(props) => props.bgColor};
  transition: all 0.3s ease;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 14px;
  font-size: 1.2rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle date change for date picker
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      preferredDate: date,
    });
  };

  // Form validation
  const validateForm = () => {
    const { name, email, phoneNumber, preferredDate } = formData;
    if (!name || !email || !phoneNumber || !preferredDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields before submitting",
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
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AppointmentFormContainer maxW="container.md" bgColor={useColorModeValue("#ffffff", "#1a202c")}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel color={useColorModeValue("gray.700", "gray.300")}>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              focusBorderColor="teal.500"
              borderRadius="8px"
              bg={useColorModeValue("white", "gray.700")}
              color={useColorModeValue("black", "white")}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={useColorModeValue("gray.700", "gray.300")}>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              focusBorderColor="teal.500"
              borderRadius="8px"
              bg={useColorModeValue("white", "gray.700")}
              color={useColorModeValue("black", "white")}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={useColorModeValue("gray.700", "gray.300")}>Phone Number</FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              focusBorderColor="teal.500"
              borderRadius="8px"
              bg={useColorModeValue("white", "gray.700")}
              color={useColorModeValue("black", "white")}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={useColorModeValue("gray.700", "gray.300")}>Preferred Date</FormLabel>
            <StyledDatePicker
              selected={formData.preferredDate}
              onChange={handleDateChange}
              placeholderText="Select a date"
              dateFormat="MMMM d, yyyy"
            />
          </FormControl>

          <SubmitButton type="submit">Schedule Appointment</SubmitButton>
        </form>
      </AppointmentFormContainer>

      {/* Leaflet Map Integration */}
      <Box mt={10} p={4} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="8px">
        <Heading size="md" mb={4} color={useColorModeValue("gray.700", "white")}>Your Location</Heading>
        <Box height="300px" borderRadius="8px">
          <MapContainer
            center={[51.505, -0.09]} // Default location (London)
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", borderRadius: "8px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                Your selected location. You can customize this with dynamic data.
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
    </motion.div>
  );
};

export default AppointmentForm;
