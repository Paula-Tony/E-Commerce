import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getAllProducts() {
  // Fetch the first page to get the initial data and metadata
  const initialResponse = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products"
  );

  const { currentPage, numberOfPages } = initialResponse.data.metadata;
  let allProducts = initialResponse.data.data;

  // If there are more pages, fetch them
  if (numberOfPages > currentPage) {
    const requests = [];
    for (let page = 2; page <= numberOfPages; page++) {
      requests.push(
        axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
        )
      );
    }

    // Wait for all the additional pages to be fetched
    const responses = await Promise.all(requests);
    const additionalProducts = responses.flatMap(
      (response) => response.data.data
    );

    // Combine the initial products with the additional products
    allProducts = [...allProducts, ...additionalProducts];
  }

  return allProducts;
}

function useProducts(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getAllProducts(params),
    staleTime: 60000,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    retry: 3,
    retryDelay: 0,
  });
}

export default useProducts;
