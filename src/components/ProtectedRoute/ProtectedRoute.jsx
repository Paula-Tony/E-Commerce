import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  if (localStorage.getItem("userToken")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRoute;
