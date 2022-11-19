import React from "react";
import Layout from "@components/Layout";
import FaqSlide from "@components/sections/FaqSlide";
const Faq = () => {
  return (
    <Layout footerClass="bg-purple">
      <div className="faq__container view-min-height pl-2 pr-2">
        <FaqSlide className="landing__element" />
      </div>
    </Layout>
  );
};

export default React.memo(Faq);
