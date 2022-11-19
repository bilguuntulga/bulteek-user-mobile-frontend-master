import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "@hooks/useFetch";
import { MovieAPI } from "apis";
import { Swiper, SwiperSlide } from "swiper/react";
import { Empty } from "antd";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/swiper.scss";
import CategoryName from "@components/other/CategoryName";

import Card from "../card";
import SwiperCore, { Pagination, Navigation } from "swiper";
SwiperCore.use([Pagination, Navigation]);
const CardRow = ({ category }) => {
  const { id } = useParams();
  const [dataFetchQuery] = React.useState({
    offset: {
      page: 1,
      limit: 500,
    },
    filter: {
      category: category.id,
      query: "",
      not: id || "",
    },
  });

  const { result: movies, loading: loadingMovies } = useFetch(
    MovieAPI.list,
    dataFetchQuery
  )({ rows: [], count: 0 });
  const loadingArr = [0, 1, 2, 3, 4, 5];
  if (
    (!loadingMovies && movies === null) ||
    movies.rows === null ||
    movies.rows.length === 0
  ) {
    return null
  }
    return (
      <div className="card-row pb-3">
        <CategoryName id={category.id}>{category.name}</CategoryName>
        <Swiper
          centeredSlides={false}
          autoplay={false}
          pagination={false}
          navigation={false}
          loop={false}
          spaceBetween={8}
          slidesPerView={"auto"}
        >
          {loadingMovies ? (
            loadingArr.map((e) => (
              <SwiperSlide key={e}>
                <Card loading />
              </SwiperSlide>
            ))
          ) : movies === null ||
            movies.rows === null ||
            movies.rows.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            movies.rows.map((item) => {
              const { verticals } = item.posters;
              const randomElement =
                verticals[Math.floor(Math.random() * verticals.length)];

              return (
                <SwiperSlide key={item.id}>
                  <Card id={item.id} image={randomElement} movie={item} />
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    );
};

export default React.memo(CardRow);
