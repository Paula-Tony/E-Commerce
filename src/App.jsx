import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./context/CartContext";
import WishlistContextProvider from "./context/WishlistContext";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Settings from "./components/Settings/Settings";

const Layout = lazy(() => import("./components/Layout/Layout"));
const Home = lazy(() => import("./components/Home/Home"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Wishlist = lazy(() => import("./components/Wishlist/Wishlist"));
const Products = lazy(() => import("./components/Products/Products"));
const Register = lazy(() => import("./components/Register/Register"));
const Login = lazy(() => import("./components/Login/Login"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const ForgotPassword = lazy(() =>
  import("./components/ForgotPassword/ForgotPassword")
);
const ResetCode = lazy(() => import("./components/ResetCode/ResetCode"));
const ResetPassword = lazy(() =>
  import("./components/ResetPassword/ResetPassword")
);
const ProductDetails = lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const AllOrders = lazy(() => import("./components/AllOrders/AllOrders"));

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<div>Loading Layout...</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading Home...</div>}>
              <Home />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:productCategory/:id",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading Product Details...</div>}>
              <ProductDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading Cart...</div>}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading Checkout...</div>}>
              <Checkout />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading Orders...</div>}>
              <AllOrders />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Settings ...</div>}>
              <Settings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "forgotPassword",
        element: (
          <Suspense fallback={<div>Forgot Password ...</div>}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "forgotPassword/resetCode",
        element: (
          <Suspense fallback={<div>Reset Code ...</div>}>
            <ResetCode />
          </Suspense>
        ),
      },
      {
        path: "forgotPassword/resetCode/resetPassword",
        element: (
          <Suspense fallback={<div>Reset Password ...</div>}>
            <ResetPassword />
          </Suspense>
        ),
      },

      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading Wishlist...</div>}>
              <Wishlist />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading Products...</div>}>
              <Products />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div>Loading Register...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading Login...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading NotFound...</div>}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <UserContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={router} />
              <ReactQueryDevtools />
              <Toaster />
              <Offline>
                <div
                  className="fixed bottom-5 right-5 p-4 bg-red-500 text-white rounded shadow-lg z-50"
                  role="alert"
                >
                  You are currently offline. Some features may not be available.
                </div>
              </Offline>
            </WishlistContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
