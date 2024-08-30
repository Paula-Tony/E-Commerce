import { useContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import WishlistItem from "../WishlistItem/WishlistItem";
import { WishlistContext } from "../../context/WishlistContext";

function Wishlist() {
  let { getWishlist } = useContext(WishlistContext);
  let [wishlistProducts, setWishlistProducts] = useState([]);

  async function getWishlistProducts() {
    let respone = await getWishlist();
    if (respone.data.status == "success") {
      setWishlistProducts(respone.data.data);
    }
  }

  useEffect(() => {
    getWishlistProducts();
  }, []);

  return (
    <HelmetProvider>
      <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">
        My Wishlist
      </h1>
      <div className="flex flex-wrap">
        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <WishlistItem key={product.id} product={product} />
          ))
        ) : (
          <h2 className="text-4xl flex-1 font-bold text-center text-red-600">
            Wishlist is Empty
          </h2>
        )}
      </div>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
    </HelmetProvider>
  );
}

export default Wishlist;
