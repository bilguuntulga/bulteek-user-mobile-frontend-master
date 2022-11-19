/* eslint-disable no-useless-concat */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import pinkBg from "@assets/images/pink-bg.webp";
import purpleBg from "@assets/images/purple-bg.png";
import "swiper/swiper.scss";
import "swiper";
import MovieIntro from "@components/sections/MovieIntro";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import StartAuth from "@components/auth/StartAuth";
import PlanIntro from "@components/sections/PlanIntro";



SwiperCore.use([Mousewheel, Pagination]);
const Landing = () => {
  return (
    <div className="landing">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' + className + ' landing__bullet">' + "</span>"
            );
          },
        }}
      >
        <SwiperSlide>
          <div className="landing__container">
            <img
              src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60s"
              alt="please refresh and check your internet"
              className="landing__container__image"
            />
            <StartAuth />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="landing__container">
            <img
              src={pinkBg}
              alt="bulteek"
              className="plan-slide__container__image landing__container__image"
            />
            <MovieIntro />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="landing__container">
            <img
              src={purpleBg}
              alt="bulteek"
              className="plan-slide__container__image landing__container__image"
            />
            <PlanIntro />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default React.memo(Landing);
