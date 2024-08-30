import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";

function ProductItem({
  product,
  addProductToWishlist,
  addProduct,
  loading,
  currentProductId,
  isInWishlist,
  removeProductFromWishlist,
}) {
  return (
    <div className="px-2 py-2 w-full sm:w-1/2 md:w-1/3">
      <div className="shadow-md bg-gray-50 p-3 hover:shadow-lg transition-all duration-500">
        <Link
          to={`/productDetails/${product.category.name}/${product.id}`}
          className="group"
        >
          <div className="overflow-hidden mb-2">
            <LazyLoadImage
              className={"object-cover h-72"}
              src={product.imageCover}
              alt={product.title}
            />
          </div>
          <p className="text-green-600 text-sm mb-2">{product.category.name}</p>
          <h2 className="text-gray-950 line-clamp-1 mb-1 font-medium">
            {product.title}
          </h2>
          <div className="flex mb-2 items-center justify-between">
            <span>{product.price} EGP</span>
            <span className="flex items-center text-sm">
              {product.ratingsAverage}
              <i className="text-yellow-400 ml-1 text-xs fa-solid fa-star"></i>
            </span>
          </div>
        </Link>
        <div className="flex justify-between items-center mt-2 gap-2">
          <button
            onClick={() => addProduct(product.id)}
            className=" transition-all duration-500 text-green-600 font-bold"
          >
            {loading && currentProductId == product.id ? (
              <i className="fas fa-spin fa-spinner text-xl"></i>
            ) : (
              <i className="fa-solid fa-cart-plus text-2xl"></i>
            )}
          </button>
          <button
            onClick={() =>
              isInWishlist
                ? removeProductFromWishlist(product.id)
                : addProductToWishlist(product.id)
            }
          >
            <i
              className={`${
                isInWishlist ? "fa-solid" : "fa-regular"
              } fa-heart fa-xl text-green-600`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageCover: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    ratingsAverage: PropTypes.number.isRequired,
  }).isRequired,
  addProductToWishlist: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currentProductId: PropTypes.string,
  isInWishlist: PropTypes.bool,
  removeProductFromWishlist: PropTypes.func.isRequired,
};

export default ProductItem;
