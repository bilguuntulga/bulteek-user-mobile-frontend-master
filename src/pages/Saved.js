import React from "react";
import Layout from "@components/Layout";
import Card from "@components/card";
import CategoryName from "@components/other/CategoryName";
import { Col, Empty, Row } from "antd";
import { MovieAPI } from "apis"
import useFetch from "@hooks/useFetch";
const Saved = () => {
  const loadingArr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

  const [likeFilter] = React.useState({})

  const {
    result: lists,
    loading
  } = useFetch(MovieAPI.like_list.list, likeFilter)([])

  return (
    <Layout>
      <CategoryName text>Хадгалсан үзвэрүүд</CategoryName>
      <div className="mb-3"></div>
      <div className="category__wrapper">
        <Row gutter={[5, 48]}>
          {loading ? loadingArr.map((e, index) => (
            <Col xs={8} sm={6} md={8} lg={6} xl={4} key={index}>
              <Card loading />
            </Col>
          )) : (
            lists.length > 0 ? (
              lists.map(
                (e, index) => (
                  <Col xs={8} sm={6} md={8} lg={6} xl={4} key={index}>
                    <Card movie={e.movie} />
                  </Col>
                )
              )
            ) : (
              <Col xs={24}>
                <div>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}  description="Та кино хадгалаагүй байна"/>
                </div>
              </Col>)
          )
          }
        </Row>
      </div>
    </Layout>
  );
};

export default Saved;
