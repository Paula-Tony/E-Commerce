import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

function UpdateUserData() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short !").max(10, "Too Long !"),
    email: Yup.string().email("Email is invalid !"),
    phone: Yup.string().matches(
      /^01[0125][0-9]{8}$/,
      "Please enter a valid Egyptian phone number !"
    ),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleUpdateData,
  });

  function handleUpdateData(formValues) {
    const filteredValues = Object.fromEntries(
      Object.entries(formValues).filter(([, value]) => value.trim() !== "")
    );
    setMessage("");
    setIsLoading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        filteredValues,
        { headers }
      )
      .then((response) => {
        setIsLoading(false);
        if (response.data.message == "success") {
          setMessage("Data Updated Successfully");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response?.data?.errors.msg || "An error occurred");
      });
  }
  return (
    <>
      <h2 className="text-2xl mb-3 underline underline-offset-4 text-center font-bold text-green-600">
        Update User Data
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-2 group">
          <input
            type="text"
            name="name"
            id="floating_name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          <p
            className={`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${
              formik.errors.name && formik.touched.name ? "" : "opacity-0"
            }`}
            role="alert"
          >
            {formik.errors.name}
          </p>
        </div>
        <div className="relative z-0 w-full mb-2 group">
          <input
            type="email"
            name="email"
            id="floating_email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            type="tel"
            name="phone"
            id="floating_phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          <p
            className={`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${
              formik.errors.phone && formik.touched.phone ? "" : "opacity-0"
            }`}
            role="alert"
          >
            {formik.errors.phone}
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
              message == "Data Updated Successfully"
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

export default UpdateUserData;
