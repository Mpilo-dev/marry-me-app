// import React from "react";
// import { useSelector } from "react-redux";
// import { navigate } from "gatsby";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   React.useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/SignUp");
//     }
//   }, [isAuthenticated]);

//   if (!isAuthenticated) {
//     return null;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { navigate } from "gatsby";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true); // Mark that we're on the client side
  }, []);

  React.useEffect(() => {
    if (isClient && !isLoading && !isAuthenticated) {
      navigate("/SignUp");
    }
  }, [isAuthenticated, isLoading, isClient]);

  // Don't render anything until we know the auth state
  if (!isClient || isLoading) {
    return null;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
