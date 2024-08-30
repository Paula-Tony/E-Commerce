import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import useProducts from "../../hooks/useProducts";
import Error from "../Error/Error";
import ProductItem from "../ProductItem/ProductItem";
import { BeatLoader } from "react-spinners";

function ProductDetails() {
  let { id, productCategory } = useParams();
  let [productDetails, setProductDetails] = useState(null);
  let [apiError, setApiError] = useState("");
  let { data } = useProducts();
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((error) => {
        setApiError(error.message);
      });
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id, productCategory]);

  if (!productDetails) {
    return <BeatLoader className="text-center" color="rgb(22 163 74)" />;
  }

  if (apiError) {
    return <Error error={apiError} />;
  }

  return (
    <>
      <div className="flex flex-wrap items-center">
        <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4 sm:mb-0">
          <Slider {...settings}>
            {productDetails?.images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={productDetails?.title}
                className="w-full h-auto"
              />
            ))}
          </Slider>
        </div>
        <div className="w-full sm:w-1/2 lg:w-3/4 px-2 mt-4 sm:mt-0">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            {productDetails?.title}
          </h1>
          <p className="mb-3 text-xl">{productDetails?.description}</p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-bold">
              Price : {productDetails?.price} EGP
            </p>
            <p className="text-xl font-bold">
              {productDetails?.ratingsAverage}
              <i className="fa-solid fa-star ml-2 text-yellow-400"></i>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-green-600 transition-all duration-500 hover:bg-green-500 text-white font-bold py-1 px-4 rounded">
              Add To Cart
            </button>
            <span className="cursor-pointer">
              <i className="fa-regular fa-heart fa-xl"></i>
            </span>
          </div>
        </div>
      </div>
      <h2 className="text-4xl mt-8 mb-4 text-center text-green-600 font-bold">
        Related Products
      </h2>
      {data && (
        <div className="flex flex-wrap">
          {data
            .filter(
              (product) =>
                product.category.name === productCategory && product.id !== id
            )
            .map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
}

export default ProductDetails;
