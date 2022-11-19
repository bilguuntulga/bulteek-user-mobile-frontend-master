import React from "react";
import Layout from "@components/Layout";
import Card from "@components/card";
import CategoryName from "@components/other/CategoryName";
import useFetch from "@hooks/useFetch";
import { MovieAPI } from "apis";
import { useSelector } from "react-redux";
import { Col, Row, Empty } from "antd";
import { useParams } from "react-router";
export default function Category() {
  const params = useParams();
  const { categories } = useSelector((state) => state.general);
  const [dataFetchQuery] = React.useState({
    offset: {
      page: 1,
      limit: 500,
    },
    filter: {
      category: params.category,
      query: "",
      not: params.id || "",
    },
  });
  const { result: movies, loading: loadingMovies } = useFetch(
    MovieAPI.list,
    dataFetchQuery
  )({ rows: [], count: 0 });
  const loadingArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  console.log(movies, "movies");
  const findById = (category) => {
    return category.id === params.category;
  };

  return (
    <Layout>
      <div className="category__container pl-4 pr-4">
        <CategoryName noMore={true}>
          {categories.find(findById).name}
        </CategoryName>
        <div className="mb-3"></div>
        <div className="category__wrapper">
          <Row gutter={[8, 16]}>
            {loadingMovies ? (
              loadingArr.map((e, index) => (
                <Col xs={8} span={6} key={index}>
                  <Card loading />
                </Col>
              ))
            ) : movies.rows === null || movies.rows.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Энэ төрлийн кино байхгүй байна"
              />
            ) : (
              movies.rows.map((item) => (
                <Col span={6} xs={8} key={item.id}>
                  <Card id={item.id} image={item.poster} movie={item} />
                </Col>
              ))
            )}
          </Row>
        </div>
      </div>
    </Layout>
  );
}
