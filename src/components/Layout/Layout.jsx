import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="pb-4 px-4 pt-20 bg-gray-50/50 min-h-screen">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
