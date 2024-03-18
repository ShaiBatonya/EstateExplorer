import {
  Box,
  Heading,
  Input,
  Button,
  Container,
  Select,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProductForm({ categories, productData }) {
  const navigate = useNavigate();

  const chosenCategories = productData.categories.map((cat) => cat.category);

  const [values, setValues] = useState({
    product_name: productData.product_name,
    product_description: productData.product_description,
    product_price: productData.product_price,
    product_image: productData.product_image,
    categories: chosenCategories,
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
    const check = values.categories.some((c) => c._id == obj._id);

    if (!check) {
      setValues({
        ...values,
        categories: [
          ...values.categories,
          { _id: obj._id, category_name: obj.category_name },
        ],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/products/managers/update/${
          productData._id
        }`,
        {
          product_name: values.product_name,
          product_description: values.product_description,
          product_price: values.product_price,
          product_image: values.product_image,
          categories: values.categories,
        }
      );

      navigate('/products')
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Heading mb={"20px"}>Edit Product : {productData.product_name}</Heading>
      <Box onSubmit={handleSubmit} as="form">
        <label htmlFor="product_name">Product Name</label>
        <Input
          defaultValue={values.product_name}
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
          defaultValue={values.product_description}
          onChange={handleChangeInput}
          name="product_description"
          id="product_description"
          my="20px"
          placeholder="product description.."
          aria-label="input for product description"
        />
        <label htmlFor="product_price">Product Price</label>
        <Input
          defaultValue={values.product_price}
          onChange={handleChangeInput}
          name="product_price"
          type="number"
          id="product_price"
          my="20px"
          placeholder="product price.."
          aria-label="input for product price"
        />
        <Image boxSize="80px" src={values.product_image} />
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
                <Text key={c._id}>
                  {c.category_name}{" "}
                  <Button
                    p="0.5px"
                    onClick={() => {
                      console.log(values.categories.length);
                      if (values.categories.length !== 1) {
                        const updatedSelectedCategories =
                          values.categories.filter((category) => {
                            return category._id !== c._id;
                          });

                        setValues({
                          ...values,
                          categories: updatedSelectedCategories,
                        });
                      } else {
                        toast.error("minimum 1 categories");
                      }
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
                  _id: category._id,
                  category_name: category.category_name,
                })}
              >
                {category.category_name}
              </option>
            );
          })}
        </Select>
        <Flex mt="30px" justify="space-around">
          <Button type="submit" colorScheme="teal">
            Save Changes
          </Button>
          <Button
            onClick={() => {
              navigate("/products");
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

export default EditProductForm;
