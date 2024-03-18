import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";

function UsersTable({ usersData }) {
  const [users, setUsers] = useState([...usersData]);

  return (
    <>
      <TableContainer mt="15px">
        <Table variant="striped" colorScheme="whatsapp">
          <Thead>
            <Tr>
              <Th>User Name</Th>
              <Th>User Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => {
              return (
                <Tr key={user._id}>
                  <Td>{user.user_name}</Td>
                  <Td>{user.user_email}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UsersTable;
