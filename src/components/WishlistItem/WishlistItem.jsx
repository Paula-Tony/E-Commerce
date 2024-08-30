import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";

function Wishlistproduct({ product }) {
  return (
    <div className="px-2 py-2 sm:w-1/4 md:w-1/5 lg:w-1/6">
      <div className="shadow-lg bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <div className="absolute top-0 right-0 m-2 text-gray-500 hover:text-red-600 transition-colors duration-300">
            <i className="fa-regular fa-heart fa-xl"></i>
          </div>
          <LazyLoadImage
            src={product.imageCover}
            alt={product.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <p className="text-green-600 text-xs uppercase mb-2">
            {product.category.name}
          </p>
          <h2 className="text-gray-900 line-clamp-1 text-lg font-semibold mb-2">
            {product.title}
          </h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-800 font-semibold">
              {product.price} EGP
            </span>
            <span className="flex items-center text-sm text-yellow-500">
              {product.ratingsAverage}
              <i className="fa-solid fa-star ml-1"></i>
            </span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Wishlistproduct;
