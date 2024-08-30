import { Helmet, HelmetProvider } from "react-helmet-async";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import MainSlider from "../MainSlider/MainSlider";

function Home() {
  return (
    <HelmetProvider>
      <MainSlider />
      <CategoriesSlider />
      <RecentProducts />
      <Helmet>
        <title>Paula&apos;s Market</title>
      </Helmet>
    </HelmetProvider>
  );
}

export default Home;
