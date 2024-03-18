import { Box, Heading, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddCategoryForm() {
  const [categoryName, setCategoryName] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {

        const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/categories/managers/add-category`,{category_name:categoryName});

        toast.success(data.message);
        navigate('/categories')
    } catch (error) {
        toast.error(error.response.data.error)
    }
  }
  return (
    <>
      <Heading mb={"20px"}>Add Category </Heading>
      <Box onSubmit={handleSubmit} as="form">
        <label htmlFor="category_name">Category Name</label>
        <Input
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
          id="category_name"
          my="20px"
          placeholder="category name.."
          aria-label="input for category name"
        />
        <Button type="submit" colorScheme="teal">Add</Button>
      </Box>
    </>
  );
}

export default AddCategoryForm;
