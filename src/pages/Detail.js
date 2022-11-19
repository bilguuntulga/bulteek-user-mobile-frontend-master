/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import EpisodeCard from "@components/sections/EpisodeCard";
import moment from "moment";
import {
  AiOutlineArrowLeft,
  FaPlay,
  BiPlay,
  FiPlus,
  FiCheck,
} from "react-icons/all";
import { Button, Select, Divider, Modal, message } from "antd";
import { MovieAPI } from "apis";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "hooks/useQuery";
import useFetch from "@hooks/useFetch";
import Loading from "@components/other/Loading";
import classnames from "classnames";
import Player from "./Player";

const { Option } = Select;

const Detail = () => {
  const history = useHistory();
  const { id: movieId } = useParams();
  const query = useQuery();
  const { user } = useSelector((state) => state.auth);
  const [selectSeason, setSelectSeason] = useState(null);
  const [loading, setLoading] = React.useState(true);

  const [data, setData] = React.useState();
  const [config, setConfig] = React.useState({});

  const episodeCardOnClick = (item) => {
    if (data.isView) {
      if (config.id !== item.id) {
        setConfig({
          ...item,
        });
        (async () => {
          try {
            await MovieAPI.count_view_movie({
              movie: movieId,
              episode: item.id
            })
          }catch(err) {
            console.log(err)
          }
        })()
      }
    } else {
      if (data.price > 0) {
        Modal.confirm({
          title: "Худалдан авах",
          content: "Кино худалдана авах",
          okText: "Тийм",
          cancelText: "Үгүй",
          onOk: async () => { },
        });
      } else {
        Modal.confirm({
          title: "Худалдана авах",
          content: "План худалдана авах",
          okText: "Тийм",
          cancelText: "Үгүй",
          onOk: async () => {
            history.push("/plan");
          },
        });
      }
    }
  }

  const userLikeObject =
    user && user.likeList
      ? user.likeList.reduce((pre, curr) => {
        return {
          ...pre,
          [curr.video]: curr,
        };
      }, {})
      : {};

  const reload = React.useCallback(async (signal) => {
    try {
      setLoading(true);

      let res = await MovieAPI.view(
        {
          movieId,
          seasonId: query.get("seasonId"),
          episodeId: query.get("episodeId"),
        },
        { signal }
      );

      setData(res);

      let config = {
        type: res.viewVideo.type,
      };

      if (
        res.movie_type === "MANY_EPISODES" &&
        res.seasons &&
        res.seasons.length > 0
      ) {
        setSelectSeason(res.viewVideo.season_id);
      }

      // if (res.viewVideo.pppp) {
      //   config.sub_titles = subDec(user, res.viewVideo.pppp);
      // }
      setConfig({
        ...config,
        ...res.viewVideo,
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      message.error("Кино тоглуулахад алдаа гарлаа");
      history.replace("/")
    }
  }, []);

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectSeason(value);
  }

  // useEffect(() => {
  //   if (!selectSeason && result.seasons && result.seasons.length > 0) {
  //     setSelectSeason(result.seasons[0].id);
  //   }
  // }, [result]);

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    reload(signal);

    return () => abortController.abort();
  }, [movieId, query.get("seasonId"), query.get("episodeId")]);

  if (loading) {
    return <Loading cover="content" />;
  }

  return (
    <div className="detail">
      <Layout>
        <div className="detail__content">
          <h2
            className="detail__back pl-3 pr-3"
            onClick={() => {
              history.goBack();
            }}
          >
            <AiOutlineArrowLeft />
            Буцах
          </h2>
          {/* Ene zuragiin orond trailer orno  */}
          <div className="detail__image">
            <Player key={config.id} id={config.id} config={config} />
          </div>

          <div className="detail__description">
            <h2 className="detail__name pl-3 pr-3 pt-4">
              {data?.name}{" "}
              {data.movie_type === "MANY_EPISODES" && (
                <p className="mini_name" style={{ fontSize: 14 }}>
                  {config.title}
                </p>
              )}
            </h2>
            <div className="detail__info pl-3 pr-3 pt-2">
              {data?.description}
            </div>
            {data?.movie_type === "MANY_EPISODES" &&
              data?.seasons &&
              data?.seasons.length > 0 && (
                <div className="detail__episodes pl-3 pr-3 pt-4 pb-4">
                  <div className="detail__episodes__controls">
                    <h2 className="detail__episodes__title">Ангиуд</h2>
                    {
                      // data.seasons.length === 1 ? (
                      //   <h3 className="detail__episodes__controls__s1">{"asd"}</h3>
                      // ) : (
                      <Select
                        value={selectSeason}
                        onChange={handleChange}
                        size="large"
                        className=""
                        style={{ width: 250 }}
                      >
                        {data.seasons.map((item) => (
                          <Select key={item.id} value={item.id}>
                            {item.title}
                          </Select>
                        ))}
                      </Select>
                      // )
                    }
                  </div>
                  <div className="detail__episodes__wrapper pt-4">
                    <EpisodeCard
                      items={
                        data.seasons &&
                        data.seasons.filter((item) => item.id === selectSeason)
                          .length > 0 &&
                        data.seasons.filter(
                          (item) => item.id === selectSeason
                        )[0].episodes
                      }
                      onClick={episodeCardOnClick}
                    />
                  </div>
                </div>
              )}

            {data && data.calendars && (
              <div className="calendar">
                <div>
                  <h3>Киноны хуваарь</h3>
                  <Divider />
                </div>
                {data.calendars.map((item) => (
                  <div key={item.id} className="calendar__item">
                    <div className="calendar__item__title">
                      <div>{item.title}</div>
                      <div className="calendar__item__title__date">
                        {moment(item.date).format("MMMM d, YYYY")}
                      </div>
                    </div>

                    <div className="calendar__item__title">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Detail;
