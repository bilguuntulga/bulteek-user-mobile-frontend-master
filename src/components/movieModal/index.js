/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Drawer, Button, Modal, message } from "antd";
import classnames from "classnames";
import { CloseOutlined } from "@ant-design/icons";
import { FaPlay, FiInfo, FiPlus, FiCheck } from "react-icons/all";
import { MovieAPI } from "apis";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useQuery from "hooks/useQuery";
import modalBackPng from "@assets/images/modal-back.png";
import Payment from "@components/sections/Payment";

const MovieModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();

  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [added, setAdded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState();
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
      setLoadingAdd(false);
      try {
        if (userLikeObject[id]) {
          await MovieAPI.likeList.remove(id);
        } else {
          await MovieAPI.likeList.create({ video: id });
        }
        const res = await MovieAPI.likeList.list();
        dispatch({
          payload: res,
          type: "auth/change_like_list",
        });
      } catch (err) {}
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
          history.push(`/player/${movie.id}`);
          return;
        }
      } else {
        if (!movie.movie) {
          message.error("Энэ киног үзэх боломжгүй байна!");
        } else {
          handleCancel();
          history.push(`/player/${movie.id}`);
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
          history.push(`/player/${movie.id}`);
        }
      };

      if (movie.price > 0 && movie.movie_type === "MANY_EPISODES") {
        // setIsModalVisible(true);
        setIsModalVisible(true);
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
                1-р бүлэгийн эхний анги үнэгүй үзэх
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
        setIsModalVisible(true);
      }
    }
  };

  // function handleChange(value) {
  //   setSelectSeason(value);
  // }

  const handleCancel = () => {
    setIsModalVisible(false);
    query.delete("episode");
    history.replace(window.location.pathname);
    // setSelectSeason(null);
  };

  React.useEffect(() => {
    (async () => {
      if (query.get("movie")) {
        setIsModalVisible(true);
        setLoading(true);
        const movieId = query.get("movie");
        try {
          const res = await MovieAPI.get(movieId);
          // if (res.seasons && res.seasons.length > 0) {
          //   setSelectSeason(res.seasons[0].id);
          // }
          console.log("res", res);
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
  }, [query.get("movie")]);

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
              <img
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
                <img
                  src="https://occ-0-2909-325.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABalT4UWp7RLdT8KR3SharQBQH0V0AQDgf2XPDA3aF24T8tIlOVH67hAmw06LCth02IG_5xjzFpEkOWHaPMoecftBbE_rLsh9arJxWLyp1By635NyoE24onNMS6jLxLmCWLdh8O6pzOp_8Iz3enYLYrCYBPSiDzp5dFD_KWCTXOJW.webp?r=33d"
                  alt={movie.name}
                />
                <div className="movie-modal__title__btns">
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
                      setIsModalVisible(false);
                      history.push(`/movie/${movie.id}`);
                    }}
                    loading={loadingAdd}
                    icon={<FiInfo />}
                  >
                    Дэлгэрэнгүй
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
          movieId={query.get("movie")}
          type="movie"
          time="72 Цаг"
          price={movie.price}
        />
      )}
    </Drawer>
  );
};

export default MovieModal;
