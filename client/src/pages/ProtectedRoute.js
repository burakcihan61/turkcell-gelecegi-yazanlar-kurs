import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, admin, ...rest }) => {
  const { loggedIn, user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (admin && user.role !== "admin") {
          return <Redirect to="/" />;
        }

        if (loggedIn) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
