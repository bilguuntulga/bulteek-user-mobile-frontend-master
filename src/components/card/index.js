/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useHistory } from "react-router";
import colorsArr from "@data/loading-colors";
import verticalTransparentPng from "@assets/images/vertical-transparent.png";
import _ from "lodash";
import NewCardModal from "@components/NewCardModal";
import MyImage from "@components/MyImage";

const Card = ({ loading = false, movie, calendar = false, intro = false }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);

  if (loading) {
    return (
      <div
        className="card"
        style={{
          backgroundColor: `${colorsArr[Math.floor(Math.random() * colorsArr.length)]
            }`,
        }}
      >
        <img src={verticalTransparentPng} alt={_.get(movie, "name")} />
      </div>
    );
  }

  const { verticals } = movie.posters;
  const randomElement = verticals[Math.floor(Math.random() * verticals.length)];

  if (intro) {
    return (
      <div
        className="card d-flex flex-column"
        style={{
          backgroundColor: `${colorsArr[Math.floor(Math.random() * colorsArr.length)]
            }`,
        }}
      >
        <img src={verticalTransparentPng} alt="fg" />
        <MyImage
          isS3Host
          src={randomElement}
          alt="Зураг татахад алдаа гарлаа"
          className="card__image"
        />
      </div>
    );
  }
  return (
    <>
      <div
        className="card d-flex flex-column"
        style={{
          backgroundColor: `${colorsArr[Math.floor(Math.random() * colorsArr.length)]
            }`,
        }}
        //window.history.replaceState(null, "", "/pathname"
        onClick={(e) => {
          e.stopPropagation();
          // history.replace(`${window.location.pathname}?movie=${movie.id}`);
          setPreviousPath(location.pathname);
          setIsModalVisible(true);
        }}
      >
        {/* <div className={`card__tag ${calendar && "-calendar"}`}>Шинэ анги</div> */}
        {movie.status === "NEW_EPISODE" && (
          <div className="card__tag">Шинэ анги</div>
        )}
        <img src={verticalTransparentPng} alt="Зураг татахад алдаа гарлаа" />
        <MyImage isS3Host src={randomElement} alt={movie.name} className="card__image" />
        {calendar && (
          <div className="card__calendar">
            <p>{calendar}</p>
          </div>
        )}
      </div>
      <NewCardModal
        isModalVisible={isModalVisible}
        id={movie?.id}
        previousPath={previousPath}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default React.memo(Card);
