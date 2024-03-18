import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetailsComponent from "../../../components/partials/orders/OrderDetailsComponent";
import { Helmet } from "react-helmet";
import { Container, Spinner  } from "@chakra-ui/react";

function OrderDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const { order_id } = useParams();

  useEffect(() => {
    const getOrderById = async () => {
      try {
        setLoading(true);

        const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/orders/managers/order-details/${order_id}`);

        setOrder(data.order);
      } catch (error) {
        setError(error.data.response.error);
      } finally {
        setLoading(false);
      }
    };

    getOrderById();
  }, []);
  
  return (<>
          <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Order</title>
      </Helmet>
      <Container
        maxW={["98%", "87%", "95%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        {loading ? <Spinner/> : null}
        {error ? <Text>{error}</Text> : null}
        {order ? <OrderDetailsComponent orderData={order}/> : null}
      </Container>
  </>)
}

export default OrderDetails;
