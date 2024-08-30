import Slider from "react-slick";
import Error from "../Error/Error";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function CategoriesSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchCategories = async () => {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    return data.data;
  };

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    retry: 2,
    onError: (error) => {
      console.error("Failed to fetch categories:", error);
    },
  });

  if (isLoading) {
    return <BeatLoader className="text-center" color="rgb(22 163 74)" />;
  }

  if (isError) {
    return <Error error={error.message} />;
  }

  return (
    <>
      <h2 className="text-3xl text-green-600 font-bold text-center mb-6">
        Show Popular Categories
      </h2>
      <Slider {...settings} className="mb-5">
        {data?.map((category, index) => (
          <div key={index} className="px-1">
            <img
              className="w-full h-48 mb-2"
              src={category.image}
              alt={category.name}
            />
            <h3 className="text-center text-gray-600 text-sm">
              {category.name}
            </h3>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default CategoriesSlider;
