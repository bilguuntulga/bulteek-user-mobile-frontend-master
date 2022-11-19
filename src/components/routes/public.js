import React from "react";
import { Route, } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, children, ...rest }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {

        // if ( Component)
        //   return <Component {...props} />;

        // // if (!token && !Component)
        // //   return children;

        // // return <Redirect to={{ pathname: "/" }} />;


        // if (!token)
        //   return (
        //     <Redirect
        //       to={{ pathname: "/login", state: { from: props.location } }}
        //     />
        //   );
        return Component ? <Component {...props} /> : children;

      }}
    />
  );
};

export default PublicRoute;
