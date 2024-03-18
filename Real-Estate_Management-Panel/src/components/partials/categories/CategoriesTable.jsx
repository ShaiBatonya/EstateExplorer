import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function CategoriesTable({ categoriesData }) {

  const [categories, setCategories] = useState([...categoriesData]);

  
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/categories/managers/delete-category/${id}`
      );

      const updatedCategories = categories.filter((c) => {

        if (c._id !== id) {
          return c;
        }
        
      });

      setCategories(updatedCategories);

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <TableContainer mt="15px">
        <Table variant="striped" colorScheme="whatsapp">
          <Thead>
            <Tr>
              <Th>Category Name</Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((cat) => {
              return (
                <Tr key={cat._id}>
                  <Td>{cat.category_name}</Td>
                  <Td>
                    <Stack justify="end" direction="row">
                      <Button
                        as={Link}
                        to={`/categories/edit-category/${cat._id}`}
                        colorScheme="blue"
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        onClick={() => {
                          const answer = confirm(
                            "are u sure to delete this category ?"
                          );

                          if (answer) {
                            handleDelete(cat._id);
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

export default CategoriesTable;
