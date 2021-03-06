import React, { useContext, useEffect, useState, useRef } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const UnprivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated)
          return (
            <Redirect
              to={{ pathname: "/home", state: { from: props.location } }}
            />
          );
        return <Component {...props} />;
      }}
    />
  );
};

export default UnprivateRoute;
