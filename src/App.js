/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GeneralAPI, AuthAPI } from "apis";
import Loading from "components/other/Loading";
import "swiper/swiper-bundle.min.css";
import "styles/antd.less";
import "styles/style.scss";

import PrivateRoute from "@components/routes/private";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // try {
      //   const res = await GeneralAPI.init();
      //   dispatch({
      //     type: "general/init",
      //     payload: res,
      //   });
      // } catch (err) {
      //   console.log(err);
      // }

      try {
        const res = await GeneralAPI.categories();
        dispatch({
          type: "general/categories",
          payload: {
            categories: res,
          },
        });
      } catch (err) {
        console.log(err);
      }

      try {
        const res = await GeneralAPI.public_movie();
        dispatch({
          type: "general/public_movie",
          payload: {
            public_movies: res.officials,
            top_movies: res.tops,
          },
        });
        console.log(res, "res");
      } catch (err) {
        console.log(err);
      }

      if (token) {
        try {
          const res = await AuthAPI.me();
          dispatch({
            type: "auth/me",
            payload: {
              ...res,
            },
          });
        } catch (err) {}
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <Loading first />;
  }
  return (
    <>
      <Route
        component={() => (
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route
                path="/landing"
                component={lazy(() => import("./pages/Landing"))}
              />
              <PrivateRoute>
                <Switch>
                  <Route
                    path="/payment"
                    component={lazy(() => import("./pages/Payment"))}
                  />
                  <Route
                    path="/movie/:id"
                    component={lazy(() => import("./pages/Detail"))}
                  />
                  <Route
                    path="/privacy"
                    component={lazy(() => import("./pages/Privacy"))}
                  />
                  <Route
                    path="/faq"
                    component={lazy(() => import("./pages/Faq"))}
                  />

                  <Route
                    path="/saved"
                    component={lazy(() => import("./pages/Saved"))}
                  />

                  <Route
                    path="/purchase-history"
                    component={lazy(() => import("./pages/PurchaseHistory"))}
                  />
                  <Route
                    path="/plan"
                    component={lazy(() => import("./pages/Plan"))}
                  />
                  <Route
                    path="/more"
                    component={lazy(() => import("./pages/More"))}
                  />
                  <Route
                    path="/calendar"
                    component={lazy(() => import("./pages/Calendar"))}
                  />
                  <Route
                    path="/movies/:category"
                    component={lazy(() => import("./pages/Category"))}
                  />
                  <Route
                    path="/search"
                    component={lazy(() => import("./pages/Search"))}
                  />
                  <Route
                    path="/"
                    component={lazy(() => import("./pages/Home"))}
                  />
                </Switch>
              </PrivateRoute>
              <Route component={lazy(() => import("./pages/Landing"))} />
            </Switch>
          </Suspense>
        )}
      />
    </>
  );
}

export default App;
