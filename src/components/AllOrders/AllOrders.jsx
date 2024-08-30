import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import OrderDetails from "../OrderDetails/OrderDetails";
import { UserContext } from "../../context/UserContext";
import { BeatLoader } from "react-spinners";

function AllOrders() {
  const { getAllOrders } = useContext(CartContext);
  const { checkToken, userId } = useContext(UserContext); // Add userId from UserContext
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function allOrders() {
    if (userId) {
      const response = await getAllOrders();
      setOrders(response?.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function handle() {
      setLoading(true);
      await checkToken(); // Ensure user token is verified before fetching orders
      allOrders(); // Fetch orders once the token is verified and userId is set
    }
    handle();
  }, [userId]); // Add userId as a dependency

  return (
    <HelmetProvider>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <BeatLoader color="rgb(74 222 128)" />
        </div>
      )}
      {orders?.map((order) => (
        <OrderDetails key={order.id} order={order} />
      ))}

      <Helmet>
        <title>All Orders</title>
      </Helmet>
    </HelmetProvider>
  );
}

export default AllOrders;
