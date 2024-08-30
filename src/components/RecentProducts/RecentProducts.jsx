import useProducts from "../../hooks/useProducts";
import ProductList from "../ProductList/ProductList";

function RecentProducts() {
  const { data, isError, error, isLoading } = useProducts();

  return (
    <>
      <h1 className="text-3xl mb-3 text-center font-bold text-green-600">
        Recent Products
      </h1>
      <ProductList
        data={data}
        isError={isError}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
}

export default RecentProducts;
