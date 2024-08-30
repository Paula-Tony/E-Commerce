import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

// Create CartContext
export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(
    <i className="fas fa-spin fa-spinner fa-xs"></i>
  );
  const [cartId, setCartId] = useState(null);
  const { userId, userLogin } = useContext(UserContext); // Ensure userLogin is available
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (userLogin) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userLogin]);

  useEffect(() => {
    if (!isLoggedIn) {
      // If not logged in, clear cart information
      setNumOfCartItems(null);
      setCartId(null);
      return;
    }

    const getCartItems = async () => {
      try {
        const res = await getLoggedUserCart();
        if (res?.data) {
          setNumOfCartItems(res.data.numOfCartItems);
          setCartId(res.data.cartId); // Assume cartId is returned in the response
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setNumOfCartItems("Error loading items");
      }
    };

    getCartItems();
  }, [isLoggedIn]);

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const getLoggedUserCart = () => {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => response)
      .catch((error) => {
        console.error("Error fetching cart:", error);
        throw error;
      });
  };

  const addProductToCart = (productId) => {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        throw error;
      });
  };

  const updateCartItemCount = (productId, count) => {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => {
        console.error("Error updating cart item count:", error);
        throw error;
      });
  };

  const deleteProduct = (productId) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => {
        console.error("Error deleting product from cart:", error);
        throw error;
      });
  };

  const paymentOnline = (shippingAddress) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      )
      .then((response) => response)
      .catch((error) => {
        console.error("Error processing online payment:", error);
        throw error;
      });
  };

  const paymentCash = (shippingAddress) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        { headers }
      )
      .then((response) => response)
      .catch((error) => {
        console.error("Error processing cash payment:", error);
        throw error;
      });
  };

  const getAllOrders = () => {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((response) => response)
      .catch((error) => {
        console.error("Error fetching all orders:", error);
        throw error;
      });
  };

  const clearCart = () => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => {
        console.error("Error clearing cart:", error);
        throw error;
      });
  };

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        cartId,
        setCartId,
        getLoggedUserCart,
        addProductToCart,
        updateCartItemCount,
        deleteProduct,
        paymentOnline,
        paymentCash,
        getAllOrders,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
