import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Container, FormControl, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AppointmentFormContainer = styled(Container)`
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin-top: 40px;
  background-color: ${(props) => props.bgColor};
  transition: all 0.3s ease;
`;

const StyledFormControl = styled(FormControl)`
  margin-bottom: 24px;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      preferredDate: date,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AppointmentFormContainer maxW="container.md" bgColor={useColorModeValue("#ffffff", "#1a202c")}>
        <form>
          <StyledFormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              focusBorderColor="teal.500"
              borderRadius="8px"
            />
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              focusBorderColor="teal.500"
              borderRadius="8px"
            />
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              focusBorderColor="teal.500"
              borderRadius="8px"
            />
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel>Preferred Date</FormLabel>
            <StyledDatePicker
              selected={formData.preferredDate}
              onChange={handleDateChange}
              placeholderText="Select a date"
              dateFormat="MMMM d, yyyy"
            />
          </StyledFormControl>

          <SubmitButton onClick={handleSubmit}>Schedule Appointment</SubmitButton>
        </form>
      </AppointmentFormContainer>
    </motion.div>
  );
};

export default AppointmentForm;
