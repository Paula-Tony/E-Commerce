import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../context/UserContext";

function Login() {
  let [apiError, setApiError] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let { setUserLogin } = useContext(UserContext);

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid !")
      .required("Email is Required !"),
    password: Yup.string()
      .matches(
        /^[a-z0-9]{6,8}/,
        "Password must be between 6 and 9 characters long"
      )
      .required("Password is required !"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValues)
      .then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          setUserLogin(response.data.token);
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error?.response?.data?.message);
      });
  }

  return (
    <>
      <h1 className="text-3xl mb-3 text-center font-bold text-green-600">
        Login Now
      </h1>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-2 group">
          <input
            type="email"
            name="email"
            id="floating_email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          <p
            className={`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${
              formik.errors.email && formik.touched.email ? "" : "opacity-0"
            }`}
            role="alert"
          >
            {formik.errors.email}
          </p>
        </div>
        <div className="relative z-0 w-full mb-2 group">
          <input
            type="password"
            name="password"
            id="floating_password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          <p
            className={`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${
              formik.errors.password && formik.touched.password
                ? ""
                : "opacity-0"
            }`}
            role="alert"
          >
            {formik.errors.password}
          </p>
        </div>
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
        {apiError && (
          <p className="text-sm sm:ml-4 text-center sm:inline-block mt-3 sm:mt-0 font-medium rounded-lg min-h-6 text-red-400">
            {apiError}
          </p>
        )}

        <p className="mt-4">
          Didn&apos;t register yet ?
          <Link
            className="text-green-600 ml-2 underline hover:text-green-700"
            to="/register"
          >
            Register Now !
          </Link>
        </p>
        <p className="mt-3">
          Forgot Your Password ?
          <Link
            to="/forgotPassword"
            className="text-red-600 ml-2 underline hover:text-red-700"
          >
            Remember Now !
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
