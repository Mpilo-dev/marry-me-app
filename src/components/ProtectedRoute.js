import React from "react";
import { useSelector } from "react-redux";
import { navigate } from "gatsby";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/SignUp");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
