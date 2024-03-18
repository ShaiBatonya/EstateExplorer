import { useState } from "react";
import { Box, Text, Stack, Heading, Button, Input } from "@chakra-ui/react";

import axiosInstance from "../../config/axiosConfig"; // Import the axios instance

import { toast } from "react-toastify";

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState({
    user_name: user.user_name,
    user_phone: user?.user_phone || "",
    user_address: {
      city: user.user_address?.city || "",
      street: user.user_address?.street || "",
      building: user.user_address?.building || "",
      apartment: user.user_address?.apartment || "",
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const { data } = await axiosInstance.put(
        `${import.meta.env.VITE_SERVER_URL}/users/customers/update/${user._id}`,
        values
      );

      setUser(data.user);
      setIsEditing(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (e) => {
    setValues({
      ...values,
      user_address: { ...values.user_address, [e.target.name]: e.target.value },
    });
  };

  return (
    <Box minH="65vh" maxW="1000px" mx="auto" py={10} px={4}>
      <Heading as="h2" size="xl" mb={6}>
        My Profile
      </Heading>
      <Stack spacing={2}>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Name:
          </Text>{" "}
          {isEditing ? (
            <Input
              name="user_name"
              value={values.user_name || ""}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          ) : (
            user?.user_name
          )}
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Email:
          </Text>{" "}
          {user?.user_email}
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Phone:
          </Text>{" "}
          {isEditing ? (
            <Input
              name="user_phone"
              value={values.user_phone || ""}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          ) : (
            user?.user_phone
          )}
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            City:
          </Text>{" "}
          {isEditing ? (
            <Input
              name="city"
              value={values.user_address?.city || ""}
              onChange={handleNestedChange}
              placeholder="Enter your city"
            />
          ) : (
            user?.user_address?.city
          )}
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Street:
          </Text>{" "}
          {isEditing ? (
            <Input
              name="street"
              value={values.user_address?.street || ""}
              onChange={handleNestedChange}
              placeholder="Enter your street"
            />
          ) : (
            user?.user_address?.street
          )}
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Building:
          </Text>{" "}
          {isEditing ? (
            <Input
              name="building"
              value={values.user_address?.building || ""}
              onChange={handleNestedChange}
              placeholder="Enter your building"
            />
          ) : (
            user?.user_address?.building
          )}
        </Text>
        <Text fontSize="md">
          <Text as="span" fontWeight="bold">
            Apartment:
          </Text>{" "}
          {isEditing ? (
            <Input
              name="apartment"
              value={values.user_address?.apartment || ""}
              onChange={handleNestedChange}
              placeholder="Enter your apartment"
            />
          ) : (
            user?.user_address?.apartment
          )}
        </Text>
      </Stack>
      {isEditing ? (
        <Button mt={4} colorScheme="orange" onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button mt={4} colorScheme="orange" onClick={handleEdit}>
          Edit
        </Button>
      )}
    </Box>
  );
};

export default Profile;
