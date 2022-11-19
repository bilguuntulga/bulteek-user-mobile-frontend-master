import React from "react";
import { Row, Col, Empty, Spin, Alert } from "antd";
import PlanCard from "./PlanCard";
import Payment from "./Payment";
import useFetch from "@hooks/useFetch";
import { PaymentAPI } from "apis";

const PlanSlide = ({ className, auth }) => {
  const [selectPlan, setSelectPlan] = React.useState(null);
  const [filter] = React.useState({});

  const { result, loading } = useFetch(PaymentAPI.plan, filter)([]);

  return (
    <div className={`plan-slide pb-5 ${!!className && className}`}>
      <h1 className="plan-intro__title mb-3">
        Taнд дараах эрхүүдийг санал болгож байна
        <Alert type="warning" message="Та мөнгөн дүнгээ сайтар шалгаж гүйлгээ хийнэ үү. Нэгэнт гүйлгээ хийсэн тохиолдолд буцаалт хийх боломжгүйг анхаараарай!" />
      </h1>
      <p className="plan-intro__desc mb-5">
        {auth
          ? "Манайхыг сонгож үйлчлүүлсэн танд баярлалаа"
          : "Манайд орж буй дэлхийн шилдэг Кино , ТВ цувралуудыг өөрт тохирсон сараар сунгаад хязгааргүй үз"}
      </p>

      {loading ? (
        <Spin size="large">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 400,
            }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Планы мэдээлэл алга байна"
            />
          </div>
        </Spin>
      ) : result.length > 0 ? (
        <Row gutter={[24, 32]}>
          {result.map((item) => (
            <Col span={24} sm={12} key={item.id}>
              <PlanCard
                time={`(${item.date_config.config_qty} ${
                  config_types[item.date_config.config_type]
                })`}
                title={item.name}
                price={item.price}
                auth={auth}
                description={item.description}
                premium
                onClick={() => setSelectPlan(item)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Планы мэдээлэл алга байна"
          />
        </div>
      )}
      {auth && selectPlan && (
        <Payment
          isModalVisible={!!selectPlan}
          setIsModalVisible={() => setSelectPlan(null)}
          planId={selectPlan.id}
          type={"plan"}
          time={`(${selectPlan.date_config.config_qty} ${
            config_types[selectPlan.date_config.config_type]
          })`}
          price={selectPlan.price}
        />
      )}

      {/* <Row gutter={[24, 32]}>
        <Col span={24} sm={12}>
          <PlanCard
            icon={<IoRocketOutline />}
            time="1 сар"
            price="6.500"
            auth={auth}
          />
        </Col>
        <Col span={24} sm={12}>
          <PlanCard
            icon={<AiOutlineCrown />}
            time="3 сар"
            price="18.500"
            auth={auth}
            premium
          />
        </Col>
        <Col span={24} sm={12}>
          <PlanCard
            icon={<GiCutDiamond />}
            time="2 сар"
            price="12.500"
            auth={auth}
          />
        </Col>
      </Row> */}
    </div>
  );
};

let config_types = {
  MONTH: "сар",
  DAY: "өдөр",
  YEAR: "жил",
};

export default PlanSlide;
