import React from "react";
import Layout from "@components/Layout";
import PlanSlide from "@components/sections/PlanSlide";
const Plan = () => {
  return (
    <Layout>
      <div className="plan-page view-min-height pt-5 pb-5">
        <PlanSlide auth />
      </div>
    </Layout>
  );
};

export default Plan;
