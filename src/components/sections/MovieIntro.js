import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/swiper.scss";
import Card from "../card";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { useSelector } from "react-redux";
SwiperCore.use([Pagination, Navigation, Autoplay]);
const MovieIntro = ({ className }) => {
  const { public_movies, top_movies } = useSelector((state) => state.general);
  const loadingArr = [0, 1, 2, 3, 4, 5];
  return (
    <div className={`movie-intro ${!!className && className}`}>
      <div className="movie-intro__desc mb-5">
        Дэлхийн шинэ шилдэг бүтээлүүдийг цаг алдалгүй хүлээн авч үзээрэй
      </div>
      {!!public_movies && public_movies.length > 0 && (
        <Swiper
          centeredSlides={false}
          pagination={false}
          navigation={false}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          freeMode={true}
          speed={5000}
          grabCursor={false}
          spaceBetween={7}
          slidesPerView={"auto"}
          allowTouchMove={false}
          touchRatio={0}
          noSwiping={true}
        >
          {public_movies.map((e) => (
            <SwiperSlide key={e.id}>
              <Card movie={e} intro />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="mb-4"></div>
      {top_movies && top_movies.length > 0 && <Swiper
        centeredSlides={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        pagination={false}
        navigation={false}
        loop={true}
        freeMode={true}
        speed={3000}
        spaceBetween={7}
        slidesPerView={"auto"}
        allowTouchMove={false}
        touchRatio={0}
        noSwiping={true}
      >
        {top_movies.map((e) => (
          <SwiperSlide key={e.id}>
            <Card movie={e} intro />
          </SwiperSlide>
        ))}
      </Swiper>}
    </div>
  );
};

export default MovieIntro;
