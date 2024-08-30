import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function ResetPassword() {
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let { setUserLogin } = useContext(UserContext);
  let [apiError, setApiError] = useState("");

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is Invalid !")
      .required("Email is Required !"),
    newPassword: Yup.string()
      .matches(
        /^[a-z0-9]{6,8}/,
        "Password must be between 6 and 9 characters long"
      )
      .required("Password is required !"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  function handleResetPassword(formValues) {
    setIsLoading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        formValues
      )
      .then((response) => {
        setIsLoading(false);
        if (response.status == 200) {
          localStorage.setItem("userToken", response.data.token);
          setUserLogin(response.data.token);
          setIsLoading(false);
          navigate("/");
        }
      })
      .then((error) => {
        setIsLoading(false);
        setApiError(error?.response?.data?.message);
      });
  }

  return (
    <>
      <h1 className="text-3xl mb-3 text-center font-bold text-green-600">
        Reset Password
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
            className={`text-xs mt-2 font-medium rounded-lg min-h-6 text-red-400 ${
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
            name="newPassword"
            id="floating_newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
          <p
            className={`text-xs mt-2 font-medium rounded-lg min-h-6 text-red-400 ${
              formik.errors.newPassword && formik.touched.newPassword
                ? ""
                : "opacity-0"
            }`}
            role="alert"
          >
            {formik.errors.newPassword}
          </p>
        </div>
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
        </button>
        <p className="text-red-600 font-bold text-center">{apiError}</p>
      </form>
    </>
  );
}

export default ResetPassword;
