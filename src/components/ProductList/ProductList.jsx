import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";
import ProductItem from "../ProductItem/ProductItem";
import Error from "../Error/Error";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function ProductList({ data, isError, error, isLoading }) {
  const { addProductToCart, setNumOfCartItems } = useContext(CartContext);
  const {
    wishlistIds,
    setWishlistIds,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
  } = useContext(WishlistContext);
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState();

  useEffect(() => {
    if (getWishlist) {
      getWishlist()?.then((response) => {
        if (response?.data?.status === "success") {
          setWishlistIds(response?.data?.data.map((product) => product.id));
        }
      });
    }
  }, []);

  const handleAddProduct = async (id) => {
    setLoading(true);
    setCurrentProductId(id);
    const response = await addProductToCart(id);
    if (response.data.status === "success") {
      setLoading(false);
      setNumOfCartItems(response.data.numOfCartItems);
      toast.success(response.data.message, {
        duration: 5000,
        position: "bottom-center",
      });
    } else {
      setLoading(false);
      toast.error(response.data.message, {
        duration: 2000,
        position: "bottom-center",
      });
    }
  };

  const handleAddToWishlist = async (productId) => {
    const response = await addToWishlist(productId);
    if (response?.data?.status === "success") {
      toast.success(response.data.message, {
        duration: 5000,
        position: "bottom-center",
      });
      setWishlistIds(response?.data?.data);
    } else {
      toast.error(response.data.message, {
        duration: 2000,
        position: "bottom-center",
      });
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    const response = await removeFromWishlist(productId);
    if (response?.data?.status === "success") {
      toast.success(response?.data?.message, {
        duration: 5000,
        position: "bottom-center",
      });
      setWishlistIds(response?.data?.data);
    } else {
      toast.error(response?.data?.message, {
        duration: 2000,
        position: "bottom-center",
      });
    }
  };

  if (isLoading) {
    return <BeatLoader className="text-center" color="rgb(22 163 74)" />;
  }

  if (isError) {
    return <Error error={error.message} />;
  }

  return (
    <div className="flex flex-wrap">
      {data?.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          addProduct={handleAddProduct}
          loading={loading}
          currentProductId={currentProductId}
          addProductToWishlist={handleAddToWishlist}
          removeProductFromWishlist={handleRemoveFromWishlist}
          isInWishlist={wishlistIds?.includes(product.id)}
        />
      ))}
    </div>
  );
}

// Define PropTypes for the ProductList component
ProductList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      // Add other expected product properties here if necessary
    })
  ),
  isError: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
};

export default ProductList;
