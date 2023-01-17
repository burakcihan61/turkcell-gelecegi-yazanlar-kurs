import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
