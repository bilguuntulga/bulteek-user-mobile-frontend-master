import React from "react";
import Layout from "components/Layout";
import Banner from "@components/banner";
import MoviesAll from "layout/MoviesAll";
const Home = () => {
  return (
    <Layout key="layout">
      <Banner key={"banners"} />
      <div>
        <MoviesAll key={"movies_all"} />
      </div>
    </Layout>
  );
};

export default React.memo(Home);
