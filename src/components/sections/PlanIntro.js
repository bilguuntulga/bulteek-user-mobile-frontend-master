import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/swiper.scss";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import PlanCard from "./PlanCard";
import { IoRocketOutline, GiCutDiamond, AiOutlineCrown } from "react-icons/all";
SwiperCore.use([Pagination, Navigation, Autoplay]);
const PlanIntro = () => {
  return (
    <div className="plan-intro">
      <h1 className="plan-intro__title mt-5 mb-3">
        Taнд дараах эрхүүдийг санал болгож байна
      </h1>
      <p className="plan-intro__desc mb-4">
        Манайд орж буй дэлхийн шилдэг Кино , ТВ цувралуудыг өөрт тохирсон сараар
        сунгаад хязгааргүй үз
      </p>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        spaceBetween={0}
        slidesPerView={"auto"}
        allowTouchMove
      >
        <SwiperSlide>
          <PlanCard icon={<IoRocketOutline />} time="1 сар" price="6.500" />
        </SwiperSlide>
        <SwiperSlide>
          <PlanCard icon={<AiOutlineCrown />} time="3 сар" price="18.500" />
        </SwiperSlide>
        <SwiperSlide>
          <PlanCard icon={<GiCutDiamond />} time="2 сар" price="12.500" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PlanIntro;
