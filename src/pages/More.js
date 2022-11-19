import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router";

import Layout from "@components/Layout";
import MoreLayout from "@components/more/More";
import ResetPassword from "@components/more/ResetPassword";
import Edit from "@components/more/Edit";
const More = () => {
  const match = useRouteMatch();
  return (
    <Layout>
      <div className="more__container">
        <div className="more__info">
          <Switch>
            <Route exact path={`${match.url}/edit`} component={Edit} />
            <Route
              exact
              path={`${match.url}/reset_password`}
              component={ResetPassword}
            />
            <Route exact path={`${match.url}/`} component={MoreLayout} />
            <Redirect to={`${match.url}/`} />
          </Switch>
        </div>
      </div>
    </Layout>
  );
};

export default More;
