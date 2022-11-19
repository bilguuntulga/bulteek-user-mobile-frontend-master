import React from "react";
import Layout from "@components/Layout";
import { Col, Row } from "antd";
import { AiOutlineArrowLeft } from "react-icons/all";
import { Descriptions } from "antd";
import bogdbank from "@assets/images/banks/bogdbank.png";
import capitronbank from "@assets/images/banks/capitronbank.png";
import chinggisbank from "@assets/images/banks/chinggisbank.png";
import khanbank from "@assets/images/banks/khanbank.png";
import mostmoney from "@assets/images/banks/mostmoney.png";
import nibank from "@assets/images/banks/nibank.png";
import statebank from "@assets/images/banks/statebank.png";
import tdbm from "@assets/images/banks/tdbm.png";
import xacbank from "@assets/images/banks/xacbank.png";
const bankArr = [
  { name: "Khan Bank", image: khanbank },
  { name: "TDB online", image: tdbm },
  { name: "State Bank", image: statebank },
  { name: "XacBank", image: xacbank },
  { name: "Bogd Bank", image: bogdbank },
  { name: "NIBank", image: nibank },
  { name: "MostMoney", image: mostmoney },
  { name: "Capitron Bank", image: capitronbank },
  { name: "Chinggis Bank", image: chinggisbank },
];
const Payment = () => {
  return (
    <Layout>
      <div className="payment">
        <h2 className="detail__back pl-3 pr-3">
          <AiOutlineArrowLeft />
          Буцах
        </h2>
        <Descriptions title="Төлбөрийн мэдээлэл" className="pr-3 pl-3 pt-4">
          <Descriptions.Item label="Түрээслэх хугацаа">72цаг</Descriptions.Item>
          <Descriptions.Item label="Үнэ">2500₮</Descriptions.Item>
        </Descriptions>
        <h2 className="detail__name pl-3 pr-3 pt-3">Qpay</h2>
        <Row gutter={[16, 16]} className="p-3">
          {bankArr.map((bank) => (
            <Col xs={8} sm={6}>
              <div className="payment__bank">
                <div className="payment__bank__image">
                  <img src={bank.image} alt="khanbank" />
                </div>
                <div className="payment__bank__title">{bank.name}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default Payment;
