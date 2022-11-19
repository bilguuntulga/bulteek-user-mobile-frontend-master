import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, children, ...rest }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token)
          return (
            <Redirect
              to={{ pathname: "/landing", state: { from: props.location } }}
            />
          );

        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default PrivateRoute;
