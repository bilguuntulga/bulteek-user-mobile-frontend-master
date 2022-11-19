/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Drawer, Button, Modal, message } from "antd";
import classnames from "classnames";
import { CloseOutlined } from "@ant-design/icons";
import { FaPlay, BiMovie, FiPlus, FiCheck, ImAngry } from "react-icons/all";
import { MovieAPI } from "apis";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useQuery from "hooks/useQuery";
import modalBackPng from "@assets/images/modal-back.png";
import Payment from "@components/sections/Payment";
import MyImage from "@components/MyImage";
import TrailerModal from "components/TrailerModal";

const NewCardModal = ({ id, isModalVisible, previousPath, setIsModalVisible }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();

  const [viewTrailer, setViewTrailer] = React.useState(false);

  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [added, setAdded] = useState(false);
  const [movie, setMovie] = useState({});
  // const [selectSeason, setSelectSeason] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const userLikeObject =
    user && user.likeList
      ? user.likeList.reduce((pre, curr) => {
        return {
          ...pre,
          [curr.video]: curr,
        };
      }, {})
      : {};

  const onClickLike = async () => {
    if (user) {
      setLoadingAdd(true);
      setAdded(true);
      try {
        if (userLikeObject[movie.id]) {
          await MovieAPI.like_list.remove(movie.id);
        } else {
          await MovieAPI.like_list.create({ movieId: movie.id });
        }
        // const res = await MovieAPI.like_list.list();
        // dispatch({
        //   payload: res,
        //   type: "auth/change_like_list",
        // });
      } catch (err) { }
      setAdded(false);
      setLoadingAdd(false);
    } else {
      history.push(`${window.location.pathname}?auth=login`);
    }
  };

  const onHandleView = () => {
    if (movie.isView) {
      if (movie.movie_type === "MANY_EPISODES") {
        if (!movie.seasons || movie.seasons.length === 0) {
          message.error("Энэ киног үзэх боломжгүй байна!");
        } else {
          handleCancel();
          history.push(`/movie/${movie.id}`);
          return;
        }
      } else {
        if (!movie.movie) {
          message.error("Энэ киног үзэх боломжгүй байна!");
        } else {
          handleCancel();
          history.push(`/movie/${movie.id}`);
          return;
        }
      }
    } else {
      const onHandlePlanCost = () => {
        handleCancel();
        Modal.destroyAll();
        history.push("/plan");
      };

      const onFreeVievEpisode = () => {
        if (movie.seasons && movie.seasons.length > 0) {
          Modal.destroyAll();
          handleCancel();
          history.push(`/movie/${movie.id}`);
        }
      };

      if (movie.price > 0 && movie.movie_type === "MANY_EPISODES") {
        // setIsModalVisible(true);
        // setPaymentModal(true);
        Modal.confirm({
          title: "Кино үзэх",
          centered: true,
          width: 600,
          content: (
            <div className="p-4">
              <Button
                block
                size="large"
                onClick={onFreeVievEpisode}
                className={"mt-2"}
              >
                1-р анги үнэгүй
              </Button>
              <Button
                block
                size="large"
                onClick={() => setPaymentModal(true)}
                className={"mt-4"}
              >
                Кино худалдана авах
              </Button>
            </div>
          ),
          footer: null,
        });
      } else if (movie.price <= 0 && movie.movie_type === "MANY_EPISODES") {
        Modal.confirm({
          title: "Кино үзэх",
          centered: true,
          width: 600,
          content: (
            <div className="p-4">
              <Button
                block
                size="large"
                onClick={onFreeVievEpisode}
                className={"mt-2"}
              >
                1-р анги үнэгүй
              </Button>
              <Button
                block
                size="large"
                onClick={onHandlePlanCost}
                className={"mt-4"}
              >
                План худалдана авах
              </Button>
            </div>
          ),
          footer: null,
        });
      } else if (movie.price <= 0 && movie.movie_type === "ONE_EPISODE") {
        Modal.confirm({
          title: "Кино үзэх",
          centered: true,
          width: 600,
          content: (
            <div className="p-4">
              Та план худалдана авах шаардлагатай
              <Button
                block
                size="large"
                onClick={onHandlePlanCost}
                className={"mt-4"}
              >
                План худалдана авах
              </Button>
            </div>
          ),
          footer: null,
        });
      } else if (movie.price > 0 && movie.movie_type === "ONE_EPISODE") {
        setPaymentModal(true);
      }
    }
  };
  // function handleChange(value) {
  //   setSelectSeason(value);
  // }

  const handleCancel = () => {
    setIsModalVisible(false);
    // setSelectSeason(null);
  };

  React.useEffect(() => {
    isModalVisible && (async () => {
      if (id) {
        setIsModalVisible(true);
        setLoading(true);
        try {
          const res = await MovieAPI.get(id);
          // if (res.seasons && res.seasons.length > 0) {
          //   setSelectSeason(res.seasons[0].id);
          // }
          setMovie(res);
        } catch (err) {
          handleCancel();
          return;
        }
        setLoading(false);
      }
    })();
    // ene yah ystoi baisii

    // return handleCancel;
  }, [isModalVisible]);

  if (!isModalVisible && !loading) {
    return null;
  }
  return (
    <Drawer
      footer={null}
      visible={isModalVisible}
      placement="bottom"
      onClose={handleCancel}
      closeIcon={<CloseOutlined />}
      className="movie-drawer"
    >
      <div className="movie-modal__container">
        <div className="movie-modal">
          <div className="movie-modal__image">
            {/* {!loading && (
              <img
                src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABc59q5v-lcSuWMTx482PFTBWlQCQeAvDOka-OBE5JN-l8ERt9X1jpCFvEjOZHOUrcB1B1ZRwFsu5S0nGbv9BfuKg8PkN.webp?r=002"
                alt="hey"
              />
            )} */}
            {loading ? (
              <img src={modalBackPng} alt="loading..." />
            ) : (
              <MyImage
                isS3Host
                src={movie.main_poster}
                // src={movie.poster}
                alt="hey"
              />
            )}
            <div className="movie-modal__image__bottom"></div>
          </div>
          {!loading && (
            <div className="movie-modal__title__container">
              <div className="movie-modal__title">
                {
                  !loading && (
                    <MyImage
                      isS3Host
                      src={movie && movie.name_image_mobile}
                      alt={movie.name}
                    />
                  )
                }
                <div className="movie-modal__title__btns">
                  {
                    movie.isLike ? (
                      <Button
                        type="link"
                        onClick={() => onClickLike()}
                        loading={loadingAdd}
                        className={classnames({
                          "movie-modal__title__btns--added": added,
                        })}
                        icon={added ? <FiCheck /> : <ImAngry />}
                      >
                        Таалагдаагүй
                        {" "}
                      </Button>
                    ) : (
                      <Button
                        type="link"
                        onClick={() => onClickLike()}
                        loading={loadingAdd}
                        className={classnames({
                          "movie-modal__title__btns--added": added,
                        })}
                        icon={added ? <FiCheck /> : <FiPlus />}
                      >
                        Хадгалах
                      </Button>
                    )
                  }
                  <Button
                    size="large"
                    type="primary"
                    icon={<FaPlay />}
                    onClick={onHandleView}
                  >
                    Үзэх
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      setViewTrailer(true)
                    }}
                    // loading={loadingAdd}
                    icon={<BiMovie />}
                  >
                    Трэйлэр
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="movie-modal__info__container pt-4 pl-2 pr-2">
          <div className="movie-modal__info">
            {!loading ? (
              <>
                <p className="movie-modal__info__text pb-6">
                  {movie.description}
                </p>
              </>
            ) : (
              <>
                <p className="pt-2 pb-2 movie-modal__info__loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </p>
                <div className="pb-6"></div>
              </>
            )}
          </div>
        </div>
      </div>
      {!loading && movie && movie.price > 0 && !movie.isView && (
        <Payment
          isModalVisible={paymentModal}
          setIsModalVisible={setPaymentModal}
          movieId={movie.id}
          type="movie"
          time="72 Цаг"
          price={movie.price}
          title={movie.name}
        />
      )}
      {!loading && <TrailerModal visible={viewTrailer} trailerId={movie.trailer} setVisible={setViewTrailer} />}
    </Drawer>
  );
};

export default NewCardModal;
