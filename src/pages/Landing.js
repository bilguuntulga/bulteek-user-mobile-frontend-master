/* eslint-disable no-useless-concat */
import React from "react";
import LandingHome from "./LandingHome";
import { Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router";
import Login from "@components/auth/Login";
import Signup from "@components/auth/Signup";
import Forget from "@components/auth/Forget";
import PasswordChange from "@components/auth/PasswordChange";
const Landing = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}/change_password`}
        component={PasswordChange}
      />
      <Route exact path={`${match.url}/reset_password`} component={Forget} />
      <Route exact path={`${match.url}/signup`} component={Signup} />
      <Route exact path={`${match.url}/login`} component={Login} />
      <Route exact path={`${match.url}`} component={LandingHome} />
    </Switch>
  );
};

export default React.memo(Landing);
