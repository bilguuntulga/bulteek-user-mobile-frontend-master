import React from "react";
import Layout from "@components/Layout";
import { PaymentAPI } from "@apis/";
import useFetch from "@hooks/useFetch";
import Loading from "@components/other/Loading";
import { Empty } from "antd";
import moment from "moment";

const PurchaseHistory = () => {
  const { result, loading } = useFetch(PaymentAPI.history, null);
  if (loading) {
    return <Loading />;
  }
  console.log(result, "res");
  return (
    <Layout>
      <div className="purchase pl-2 pr-2">
        <h2 className="auth__title purchase__title mb-4 mt-3">
          Худалдан авалтын түүх
        </h2>
        <div className="purchase__container">
          {result && result.length > 0 ? (
            result.map((e) => (
              <div className="purchase__item pb-2 mb-3" key={e.id}>
                <div className="purchase__item__el">
                  Худалдан авсан:{" "}
                  <span>
                    {e.payment_type === "MOVIE"
                      ? e.movie
                        ? e.movie.name
                        : "Мэдээлэл алга"
                      : e.plan
                      ? e.plan.name
                      : "Мэдээлэл алга"}
                  </span>
                </div>
                <div className="purchase__item__el">
                  Төрөл:
                  <span>{e.payment_type === "PLAN" ? "План" : "Кино"}</span>
                </div>
                <div className="purchase__item__el">
                  Эхлэх огноо:
                  <span>{moment(e.start_date).format("YYYY.MM.DD")}</span>
                </div>
                <div className="purchase__item__el">
                  Дуусах огноо:
                  <span>{moment(e.end_date).format("YYYY.MM.DD")}</span>
                </div>
                <div className="purchase__item__el">
                  Үнийн дүн: <span>{e.price} ₮ </span>
                </div>
              </div>
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Худалдан авалтын түүх олдсонгүй"}
              className={"m-5 p-5"}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PurchaseHistory;
