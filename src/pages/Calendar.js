import React from "react";
import Layout from "@components/Layout";
import CategoryName from "@components/other/CategoryName";
import { Col, Row, Empty } from "antd";
import Card from "@components/card";
import useFetch from "@hooks/useFetch";
import { MovieAPI } from "@apis/";
import Loading from "@components/other/Loading";

const Calendar = () => {
  const loadingArr = [
    { id: 1, name: "Даваа" },
    { id: 2, name: "Мягмар" },
    { id: 3, name: "Лхагва" },
    { id: 4, name: "Пүрэв" },
    { id: 5, name: "Баасан" },
    { id: 6, name: "Бямба" },
    { id: 0, name: "Ням" },
  ];

  const { result, loading } = useFetch(MovieAPI.calendar, null)([]);
  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
      <div className="mt-3"></div>
      {loadingArr.map((day) => (
        <div key={day.id}>
          <CategoryName text>{day.name}</CategoryName>
          <Row gutter={[5, 48]}>
            {/* {loadingArr.map((e, index) => (
               <Col xs={8} sm={6} md={8} lg={6} xl={4} key={index}>
                 <Card loading />
               </Col>
             ))} */}
            {result.filter((e) => {
              const d = new Date(e.date);
              return d.getDay() === day.id;
            }).length > 0 ? (
              result
                .filter((e) => {
                  const d = new Date(e.date);
                  return d.getDay() === day.id;
                })
                .map((el) => (
                  <Col xs={8} sm={6} md={8} lg={6} xl={4} key={el.id}>
                    <Card movie={el.movie} calendar={el.title} />
                  </Col>
                ))
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ width: "100%" }}
              />
            )}
          </Row>
          <div className="mb-5"></div>
        </div>
      ))}
    </Layout>
  );
};

export default Calendar;
