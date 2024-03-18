import { Helmet } from "react-helmet";
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
  Spinner 
} from "@chakra-ui/react";
import UsersTable from "../../../components/partials/users/UsersTable";
import { useState, useEffect } from "react";
import axios from "axios";



function Users() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users/customers-for-managers`
        );

        setUsers(data.users);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Users</title>
      </Helmet>
      <Container maxW={["98%","87%","80%","70%"]} mt={["10vh","10vh","3vh"]} minH="70vh">
        <Heading mb={"20px"}>Users </Heading>
        <Divider />
        {loading && <Spinner />}
        {error && <Text>{error}</Text>}
        {!loading && !error && users && (
          <UsersTable usersData={users} />
        )}
      </Container>
    </>
  );
}

export default Users;
