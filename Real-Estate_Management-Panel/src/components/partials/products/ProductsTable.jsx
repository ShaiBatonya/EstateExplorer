import {
  Box,
  Heading,
  Input,
  Button,
  Container,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProductsTable({ productsData }) {
  const [products, setProducts] = useState([...productsData]);

  const handleDeleteProduct = async (id) => {
    debugger;
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/products/managers/delete/${id}`
      );

      const updatedProducts = products.filter((p) => {
        if (p._id !== id) {
          return p;
        }
      });

      setProducts(updatedProducts);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <TableContainer mt="15px">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Image</Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((prd) => {
              return (
                <Tr key={prd._id}>
                  <Td>{prd.product_name}</Td>
                  <Td maxW="200px" whiteSpace="wrap">
                    {prd.product_description}
                  </Td>
                  <Td>{prd.product_price}$</Td>
                  <Td>
                    <Image
                      boxSize="50px"
                      objectFit="cover"
                      src={prd.product_image}
                      alt={prd.product_name}
                    />
                  </Td>
                  <Td>
                    <Stack justify="end" direction="row">
                      <Button
                        as={Link}
                        to={`/products/edit-product/${prd._id}`}
                        colorScheme="blue"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          const answer = confirm(
                            "are u sure to delete this product?"
                          );
                          if (answer) {
                            handleDeleteProduct(prd._id);
                          }
                        }}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProductsTable;
