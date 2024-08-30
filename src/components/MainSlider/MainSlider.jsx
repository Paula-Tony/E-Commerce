import React from "react";
import Slider from "react-slick";
import product_1 from "../../assets/images/product (1).jpg";
import product_2 from "../../assets/images/product (2).jpg";
import product_3 from "../../assets/images/product (3).jpg";
import product_4 from "../../assets/images/product (4).jpg";
import product_5 from "../../assets/images/product (5).jpg";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";

function CategoriesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="flex flex-wrap mb-5">
      <div className="w-full sm:w-3/4">
        <Slider {...settings}>
          <LazyLoadImage
            src={product_1}
            alt="Product 1"
            className="h-96 object-cover"
          />
          <LazyLoadImage
            src={product_2}
            alt="Product 2"
            className="h-96 object-cover"
          />
          <LazyLoadImage
            src={product_5}
            alt="Product 5"
            className="h-96 object-cover"
          />
        </Slider>
      </div>
      <div className="w-full flex sm:block flex-wrap sm:w-1/4">
        <LazyLoadImage
          src={product_4}
          alt="Product 4"
          className="sm:h-48 object-cover w-full sm:pl-2 pb-1 pt-2 sm:pt-0"
        />
        <LazyLoadImage
          src={product_3}
          alt="Product 3"
          className="sm:h-48 object-cover w-full sm:pl-2 pt-1"
        />
      </div>
    </div>
  );
}

export default CategoriesSlider;
