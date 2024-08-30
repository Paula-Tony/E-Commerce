import axios from "axios";
import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create WishlistContext
export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const [wishlistIds, setWishlistIds] = useState(null);

  const addToWishlist = (productId) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  };

  const removeFromWishlist = (productId) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  };

  const getWishlist = () => {
    if (headers.token) {
      return axios
        .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
        .then((response) => response)
        .catch((error) => error);
    }
  };

  // Provide context values to children components
  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        setWishlistIds,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

WishlistContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
