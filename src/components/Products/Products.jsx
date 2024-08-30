import useProducts from "../../hooks/useProducts";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ProductList from "../ProductList/ProductList";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

function Products() {
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data, isError, error, isLoading } = useProducts();

  useEffect(() => {
    getAllBrands();
    getAllCategories();
  }, []);

  async function getAllBrands() {
    const initialResponse = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    const { currentPage, numberOfPages } = initialResponse.data.metadata;
    let allBrandsData = initialResponse.data.data;

    if (numberOfPages > currentPage) {
      const requests = [];
      for (let page = 2; page <= numberOfPages; page++) {
        requests.push(
          axios.get(
            `https://ecommerce.routemisr.com/api/v1/brands?page=${page}`
          )
        );
      }

      const responses = await Promise.all(requests);
      const additionalBrands = responses.flatMap(
        (response) => response.data.data
      );

      allBrandsData = [...allBrandsData, ...additionalBrands];
    }
    setAllBrands(allBrandsData);
  }

  async function getAllCategories() {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setAllCategories(response.data.data);
  }

  const formik = useFormik({
    initialValues: {
      minPrice: "",
      maxPrice: "",
      brand: "",
      selectedCategories: [],
    },
    onSubmit: filterProducts,
  });

  function filterProducts(formValues) {
    const { brand, maxPrice, minPrice, selectedCategories } = formValues;
    const params = [];
    if (brand) params.push(`brand=${brand}`);
    if (maxPrice) params.push(`price[gte]=${maxPrice}`);
    if (minPrice) params.push(`price[lte]=${minPrice}`);
    if (selectedCategories.length > 0)
      params.push(`category[in]=${selectedCategories.join(",")}`);

    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?${params.join("&")}`
      )
      .then((response) => {
        setFilteredProducts(response.data.data); // Update state with filtered products
      })
      .catch((error) => console.log(error));
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">
        Products
      </h1>
      <div className="flex flex-wrap items-start">
        <form
          onSubmit={formik.handleSubmit}
          className="sm:w-1/4 flex flex-wrap gap-2 p-2"
        >
          <select
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="focus:outline-none block w-full p-2 border rounded"
          >
            <option value="">Select Brand</option>
            {allBrands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="minPrice"
            min={0}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.minPrice}
            placeholder="Min Price"
            className="p-2 block w-full border rounded focus:outline-none"
          />
          <input
            type="number"
            name="maxPrice"
            min={0}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.maxPrice}
            placeholder="Max Price"
            className=" block w-full p-2 border rounded focus:outline-none"
          />

          <div className="space-y-2">
            <h3 className="text-sm">Select Category :</h3>
            {allCategories.map((category) => (
              <div
                key={category._id}
                className="inline-flex sm:flex items-center mr-2 sm:mr-0"
              >
                <input
                  type="checkbox"
                  name="selectedCategories"
                  value={category._id}
                  id={category._id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.selectedCategories.includes(
                    category._id
                  )}
                  className="h-4 w-4 appearance-none border border-gray-300 rounded checked:bg-green-600 checked:border-transparent checked:focus:ring-green-500"
                  style={{
                    backgroundImage:
                      "url('data:image/svg+xml;utf8,%3Csvg viewBox%3D%220 0 16 16%22 fill%3D%22white%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath d%3D%22M12.146 4.854a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L6 10.293l5.646-5.647a.5.5 0 0 1 .708 0z%22/%3E%3C/svg%3E')",
                    backgroundPosition: "center",
                    backgroundSize: "75%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <label
                  htmlFor={category._id}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className=" p-2 block w-full bg-green-700 text-white rounded"
          >
            Filter
          </button>
        </form>

        <div className="sm:w-3/4">
          <ProductList
            data={filteredProducts.length > 0 ? filteredProducts : data} // Pass filtered products or default data
            isError={isError}
            error={error}
            isLoading={isLoading}
          />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Products;
