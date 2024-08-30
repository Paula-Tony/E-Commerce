import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "../../context/CartContext";
import { BeatLoader } from "react-spinners";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Cart() {
  const {
    getLoggedUserCart,
    updateCartItemCount,
    deleteProduct,
    setNumOfCartItems,
    setCartId,
    cartId,
    clearCart,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCartItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getLoggedUserCart();
      if (response?.data?.status === "success") {
        setCartDetails(response.data.data);
        setNumOfCartItems(response.data.numOfCartItems);
        setCartId(response.data.data._id);
      } else {
        setCartDetails(null);
      }
    } catch {
      setCartDetails(null);
    } finally {
      setLoading(false);
    }
  }, [getLoggedUserCart, setNumOfCartItems, setCartId]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const handleProductUpdate = async (id, count) => {
    setLoading(true);
    try {
      const response = await updateCartItemCount(id, count);
      if (response.data.status === "success") {
        setNumOfCartItems(response.data.numOfCartItems);
        setCartDetails(response.data.data);
        setCartId(response.data.data._id);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProductDelete = async (id) => {
    setLoading(true);
    try {
      const response = await deleteProduct(id);
      if (response.data.status === "success") {
        setNumOfCartItems(response.data.numOfCartItems);
        setCartDetails(response.data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmptyCart = async () => {
    setLoading(true);
    try {
      const response = await clearCart();
      if (response.data.message === "success") {
        setNumOfCartItems(0);
        setCartDetails(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">
        Shopping Cart
      </h1>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <BeatLoader color="rgb(74 222 128)" />
        </div>
      )}
      <div className={`relative ${loading ? "opacity-50" : ""}`}>
        {cartDetails && cartDetails.products.length > 0 ? (
          <div className="relative overflow-x-auto max-w-full shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between">
              <Link
                to={"/allorders"}
                className="font-bold mb-6 cursor-pointer text-green-600 w-fit mx-auto bg-green-100 hover:text-green-800 hover:underline text-center rounded-lg py-2 px-4 transition-all duration-300"
              >
                <i className="fa-solid fa-shopping-cart mr-3"></i>
                All Orders
              </Link>
              <p
                onClick={handleEmptyCart}
                className="font-bold mb-6 cursor-pointer text-red-600 w-fit mx-auto bg-red-100 hover:text-red-800 hover:underline text-center rounded-lg py-2 px-4 transition-all duration-300"
              >
                <i className="fa-solid fa-trash mr-3"></i>
                Empty Your Cart
              </p>
            </div>
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="p-4 flex justify-center">
                      <div className="w-16 md:w-32 max-w-full max-h-full">
                        <LazyLoadImage
                          src={product.product.imageCover}
                          alt={product.product.title}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleProductUpdate(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                          type="button"
                          aria-label="Decrease quantity"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="bg-gray-50 text-center w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1">
                          {product.count}
                        </span>
                        <button
                          onClick={() =>
                            handleProductUpdate(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full"
                          type="button"
                          aria-label="Increase quantity"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => handleProductDelete(product.product.id)}
                        className="font-medium cursor-pointer text-red-600 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    className="px-4 py-3 text-center font-semibold text-gray-900"
                    colSpan={2}
                  >
                    Total Cart Price
                  </td>
                  <td
                    className="px-6 py-3 font-semibold text-gray-900 text-center"
                    colSpan={2}
                  >
                    {cartDetails.totalCartPrice} EGP
                  </td>
                  <td className="font-semibold text-center relative py-3 px-3">
                    <button
                      onClick={toggleDropdown}
                      className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                    >
                      Checkout
                      <i
                        className={`fas fa-caret-${
                          isDropdownOpen ? "down" : "up"
                        } ms-3`}
                      ></i>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute bottom-full right-0 mb-2 bg-gray-50 divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul className="py-2 text-sm text-gray-700">
                          <li>
                            <Link
                              to={`/checkout/${cartId}`}
                              state={{ type: "online" }}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              <i className="fa-solid fa-credit-card me-3"></i>
                              Payment
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/checkout/${cartId}`}
                              state={{ type: "cash" }}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              <i className="fa-solid fa-cash-register me-3"></i>
                              Cash
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          !loading && (
            <h2 className="text-4xl font-bold text-center text-red-600">
              Cart is Empty
            </h2>
          )
        )}
      </div>
    </HelmetProvider>
  );
}

export default Cart;
