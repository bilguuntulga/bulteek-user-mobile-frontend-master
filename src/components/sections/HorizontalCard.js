import React from "react";
import transparentPng from "@assets/images/transparent.png";
import colorsArr from "@data/loading-colors";
const HorizontalCard = () => {
  return (
    <div
      className="horizontal-card card"
      style={{
        backgroundColor: `${
          colorsArr[Math.floor(Math.random() * colorsArr.length)]
        }`,
      }}
    >
      <div className="horizontal">
        <img src={transparentPng} alt="hey" />
      </div>
    </div>
  );
};

export default HorizontalCard;
