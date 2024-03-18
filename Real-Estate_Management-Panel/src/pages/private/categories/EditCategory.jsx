import { useEffect, useState } from "react"
import EditCategoryForm from "../../../components/partials/categories/EditCategoryForm"
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Text, Spinner, Container } from "@chakra-ui/react";
import axios from "axios";


function EditCategory() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categoryData, setCategoryData] = useState(null);

    const { category_id } = useParams();

    useEffect(()=>{

        const getCategoryById = async () => {
            try {
              setLoading(true);
      
              const { data } = await axios.get(
                `${
                  import.meta.env.VITE_SERVER_URL
                }/categories/managers/get-by-id/${category_id}`
              );
      
              setCategoryData(data.category);
            } catch (error) {
              setError(error.response.data.error);
            } finally {
              setLoading(false);
            }
          };

          getCategoryById();
    },[])
    return (
        <>

          <Container
            maxW={["98%", "87%", "80%", "70%", "45%"]}
            mt={["10vh", "10vh", "3vh"]}
            minH="70vh"
          >
          {loading && <Spinner />}
          {error && <Text>{error}</Text>}
          {!loading && !error && categoryData && (
              <EditCategoryForm category={categoryData} />
              )}
              </Container>
        </>
      );
}

export default EditCategory