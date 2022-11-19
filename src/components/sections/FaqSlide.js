import React from "react";
import { Collapse } from "antd";
import useFetch from "@hooks/useFetch";
import { PaymentAPI } from "@apis/";
import Loading from "@components/other/Loading";

const { Panel } = Collapse;

const FaqSlide = ({ className }) => {
  const { result, loading } = useFetch(
    PaymentAPI.ask_question,
    null
  )({
    rows: [],
  });
  if (loading) {
    return <Loading />;
  }
  return (
    <div className={`faq-slide ${!!className && className}`}>
      <h2
        className="faq-slide__title mb-3
      pt-3"
      >
        Түгээмэл асуултууд
      </h2>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIconPosition={"right"}
        accordion={true}
      >
        {result.rows.map((e, i) => (
          <Panel header={e.title} key={i + 1}>
            {e.description}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FaqSlide;
