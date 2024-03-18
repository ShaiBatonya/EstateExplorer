import {
  Box,
  Heading,
  Input,
  Button,
  Container,
  Select,
  Text,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProductForm({ categories }) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    product_name: "",
    product_description: "",
    product_price: "",
    product_image: "",
    categories: [],
  });

  const handleChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setValues({ ...values, product_image: base64String });
    };

    reader.readAsDataURL(file);
  };

  const handleChangeCategory = (e) => {
    const obj = JSON.parse(e.target.value);
    const check = values.categories.some((c) => c.id == obj.id);

    if (!check) {
      setValues({
        ...values,
        categories: [...values.categories, { id: obj.id, name: obj.name }],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/products/managers/add`,
        {
          product_name: values.product_name,
          product_description: values.product_description,
          product_price: values.product_price,
          product_image: values.product_image,
          categories: JSON.stringify(values.categories),
        }
      );

      toast.success(data.message);

      navigate("/products");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Heading mb={"20px"}>Add Product </Heading>
      <Box onSubmit={handleSubmit} as="form">
        <label htmlFor="product_name">Product Name</label>
        <Input
          onChange={handleChangeInput}
          isRequired
          name="product_name"
          id="product_name"
          my="20px"
          placeholder="product name.."
          aria-label="input for product name"
        />
        <label htmlFor="product_description">Product Description</label>
        <Input
          onChange={handleChangeInput}
          name="product_description"
          id="product_description"
          my="20px"
          placeholder="product description.."
          aria-label="input for product description"
        />
        <label htmlFor="product_price">Product Price</label>
        <Input
          onChange={handleChangeInput}
          name="product_price"
          type="number"
          id="product_price"
          my="20px"
          placeholder="product price.."
          aria-label="input for product price"
        />
        {values.product_image && (
          <Image boxSize="80px" src={values.product_image} />
        )}
        <label htmlFor="product_image">Product Image</label>
        <Input
          id="product_image"
          my="20px"
          type="file"
          aria-label="input for product image"
          onChange={handleFileChange}
        />

        {values.categories.length ? (
          <>
            <Heading fontSize="lg">selected categories : </Heading>
            {values.categories.map((c) => {
              return (
                <Text key={c.id}>
                  {c.name}{" "}
                  <Button
                    p="0.5px"
                    onClick={() => {
                      const updatedSelectedCategories =
                        values.categories.filter((category) => {
                          return category.id !== c.id;
                        });

                      setValues({
                        ...values,
                        categories: updatedSelectedCategories,
                      });
                    }}
                  >
                    X
                  </Button>
                </Text>
              );
            })}
          </>
        ) : (
          <Text>no categories</Text>
        )}
        <Select
          onChange={handleChangeCategory}
          mb="15px"
          id="select_category"
          placeholder="Select category"
        >
          {categories.map((category) => {
            return (
              <option
                key={category._id}
                value={JSON.stringify({
                  id: category._id,
                  name: category.category_name,
                })}
              >
                {category.category_name}
              </option>
            );
          })}
        </Select>
        <Button type="submit" colorScheme="teal">
          Add
        </Button>
      </Box>
    </>
  );
}

export default AddProductForm;
