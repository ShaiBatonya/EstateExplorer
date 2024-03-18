import { Spinner, Container  } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditProductForm from "../../../components/partials/products/EditProductForm";
import { Helmet } from "react-helmet";

function EditProduct() {
  const { product_id } = useParams();
  
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProductById = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/products/managers/by_id/${product_id}`
        );

        setProductData(data.product);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    const getAllCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`
        );

        setCategories(data.categories);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getAllCategories();

    getProductById();
  }, []);
  return (
    <>

<Helmet>
        <meta charSet="utf-8" />
        <title>Add Product</title>
        <meta name="description" content="add product to panel" />
      </Helmet>
      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
      {loading && <Spinner />}
      {error && <Text>{error}</Text>}
      {!loading && !error && productData && (
          <EditProductForm categories={categories} productData={productData} />
          )}
          </Container>
    </>
  );
}

export default EditProduct;
