import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";

const LightBackgroundColor = "#fff";
const PrimaryColor = "#3498db";
const SecondaryColor = "#2980b9";

const AppointmentFormContainer = styled(Container)`
  background-color: ${LightBackgroundColor};
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
`;

const StyledFormControl = styled(FormControl)`
  margin-bottom: 20px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 12px;
  font-size: 1.2rem;
  background-color: ${PrimaryColor};
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${SecondaryColor};
  }
`;

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    preferredDate: null, // Change the initial value to null
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
    <AppointmentFormContainer maxW="container.md">
      <form>
        <StyledFormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
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
  );
};

export default AppointmentForm;
