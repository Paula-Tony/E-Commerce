import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { UserContext } from "../../context/UserContext";

function UpdateUserPassword() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  let { setUserLogin } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .matches(
        /^[a-z0-9]{6,8}/,
        "Password must be between 6 and 9 characters long"
      )
      .required("Password is required !"),
    password: Yup.string()
      .matches(
        /^[a-z0-9]{6,8}/,
        "Password must be between 6 and 9 characters long"
      )
      .required("Password is required !"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match !")
      .required("Repeat password is required"),
  });

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleUpdatePassword,
  });

  function handleUpdatePassword(formValues) {
    setMessage("");
    setIsLoading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword/`,
        formValues,
        { headers }
      )
      .then((response) => {
        setIsLoading(false);
        if (response.data.message == "success") {
          setUserLogin(response.data.token);
          setMessage("Password Updated Successfully");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response?.data?.message || "An error occurred");
      });
  }
  return (
    <>
      <h2 className="text-2xl mb-3 underline underline-offset-4 text-center mt-8 font-bold text-green-600">
        Update User Password
      </h2>
      <form onSubmit={formik.handleSubmit} className="mb-4 max-w-md mx-auto">
        <div className="relative z-0 w-full mb-2 group">
          <input
            type="password"
            name="currentPassword"
            id="floating_currentPassword"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_currentPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Current Password
          </label>
          <p
            className={`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${
              formik.errors.currentPassword && formik.touched.currentPassword
                ? ""
                : "opacity-0"
            }`}
            role="alert"
          >
            {formik.errors.currentPassword}
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
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
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
        <div className="relative z-0 w-full mb-2 group">
          <input
            type="password"
            name="rePassword"
            id="floating_rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Repeat Password
          </label>
          <p
            className={`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${
              formik.errors.rePassword && formik.touched.rePassword
                ? ""
                : "opacity-0"
            }`}
            role="alert"
          >
            {formik.errors.rePassword}
          </p>
        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Update Data"
          )}
        </button>
        {message && (
          <p
            className={`text-sm sm:ml-4 text-center sm:inline-block mt-3 sm:mt-0 font-medium rounded-lg min-h-6 ${
              message == "Password Updated Successfully"
                ? "text-green-600"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </>
  );
}

export default UpdateUserPassword;
