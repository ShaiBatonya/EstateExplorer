import { Box, Heading, Input, Button, Flex  } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditCategoryForm({ category }) {
  const [categoryName, setCategoryName] = useState(category.category_name);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_SERVER_URL
        }/categories/managers/update-category/${category._id}`,
        { category_name: categoryName }
      );

      toast.success(data.message);
      navigate("/categories");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  
  return (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Edit Category : {category.category_name}</title>
            <meta name="description" content={`edit category : ${category.category_name}`} />
          </Helmet>
      <Heading mb={"20px"}>Edit Category : {category.category_name} </Heading>
      <Box onSubmit={handleSubmit} as="form">
        <label htmlFor="category_name">Category Name</label>
        <Input
        defaultValue={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
          id="category_name"
          my="20px"
          placeholder="category name.."
          aria-label="input for category name"
        />
        <Flex mt="30px" justify="space-around">
          <Button type="submit" colorScheme="teal">
            Save Changes
          </Button>
          <Button
            onClick={() => {
              navigate("/categories");
            }}
            type="button"
            colorScheme="yellow"
          >
            Cancel
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default EditCategoryForm;
