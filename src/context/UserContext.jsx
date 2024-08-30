import { jwtDecode } from "jwt-decode";
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create UserContext
export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [userId, setUserId] = useState(null);

  async function verifyToken() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      if (response.data.message === "verified") {
        return true; // Token is valid
      } else {
        return false; // Token is invalid
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return false; // Token is invalid or error occurred
    }
  }

  const checkToken = async () => {
    const token = localStorage.getItem("userToken");

    if (token) {
      const isTokenValid = await verifyToken();
      if (isTokenValid) {
        setUserLogin(token);
        try {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken?.id);
        } catch (error) {
          console.error("Invalid token:", error);
          // Handle invalid token
        }
      } else {
        // Remove invalid token from local storage
        localStorage.removeItem("userToken");
        setUserLogin(null);
        setUserId(null);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  // Provide context values to children components
  return (
    <UserContext.Provider
      value={{ userLogin, checkToken, setUserLogin, userId }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
