import { useContext, useState, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const links = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/products", label: "Products" },
      { to: "/wishlist", label: "Wishlist" },
      { to: "/cart", label: "Cart" },
    ],
    []
  );

  const toggleMenu = () => setIsOpen(!isOpen);

  const logout = () => {
    setUserLogin(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const renderLinks = () =>
    links.map((link) => (
      <li key={link.to}>
        <NavLink
          className={({ isActive }) => (isActive ? "text-green-600" : null)}
          to={link.to}
          onClick={toggleMenu}
        >
          {link.label}
        </NavLink>
      </li>
    ));

  return (
    <nav className="bg-gray-100 fixed top-0 z-50 right-0 left-0">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link className="flex items-center" to="/">
              <i className="fa-solid fa-cart-shopping mr-2 fa-2xl text-green-600"></i>
              <span className="font-semibold text-2xl text-green-600">
                Paula&apos;s Market
              </span>
            </Link>
            {userLogin && (
              <ul className="hidden lg:flex items-center gap-3">
                {renderLinks()}
              </ul>
            )}
          </div>
          <ul className="hidden lg:flex items-center gap-3">
            {userLogin ? (
              <>
                <li>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      toggleMenu();
                      logout();
                    }}
                  >
                    Logout
                  </span>
                </li>
                <li className="cursor-pointer">
                  <Link to={"/settings"}>
                    <i className="fa-solid fa-gear text-green-600 fa-xl"></i>
                  </Link>
                </li>
                <li>
                  <Link className="relative" to="/cart">
                    <i className="fa-solid fa-cart-shopping fa-xl"></i>
                    <span className="bg-green-600 text-white px-1 py-0.5 text-xs -top-2 -right-1 absolute rounded-md">
                      {numOfCartItems}
                    </span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
          <button className="lg:hidden" onClick={toggleMenu}>
            <i className="fa-solid fa-bars fa-xl"></i>
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-[max-height] duration-700 ease-in-out ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="pt-3 space-y-3 bg-slate-100">
            {userLogin ? (
              <>
                {renderLinks()}
                <li>
                  <Link
                    to={"/settings"}
                    className="cursor-pointer"
                    onClick={() => toggleMenu()}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      toggleMenu();
                      logout();
                    }}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link onClick={toggleMenu} to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link onClick={toggleMenu} to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
