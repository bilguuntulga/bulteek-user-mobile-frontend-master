import React, {useMemo} from "react";
import { Button } from "antd";
import { FaPlay, FiInfo, BiMovie } from "react-icons/all";
import { useHistory } from "react-router";
import useFetch from "@hooks/useFetch";
import { MovieAPI } from "@apis/";
import transparentPng from "@assets/images/vertical-transparent.png";
import NewCardModal from "@components/NewCardModal";
const Banner = () => {
  const history = useHistory();
  const { result, loading } = useFetch(MovieAPI.banner, null)([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [previousPath, setPreviousPath] = React.useState(null);

  const isShowBanner = useMemo(() => {
    return result?.length && result[0].mobile_img && !loading;
  }, [result, loading])
  
  return (
    <div className="banner__wrapper">
      <div className="banner__image__wrapper">
        {isShowBanner ? (
          <div
            className="banner__image"
            style={{
              backgroundImage: `url('${result[0]?.mobile_img}')`,
            }}
          ></div>
        ):<></>}
      </div>
      <div className="banner__shadow__wrapper">
        <div className="banner__shadow"></div>
        <div className="banner__shadow__bottom"></div>
      </div>
      <div className="banner__content__wrapper">
        <div className="banner__content__logo">
          {!loading && result && result[0] && result[0].name_img && (
            <img
              src={result[0].name_img}
              alt="dsd"
              className="banner__content__logo__img"
            />
          )}
        </div>
        {result && result[0] && (
          <div className="banner__content__control">
            
            <Button icon={<FaPlay />} onClick={() => history.push(`/movie/${result[0].movie}`)} type="primary">
              Үзэх
            </Button>
            <Button
              icon={<FiInfo />}
              type="link"
              onClick={() =>
              {
                setPreviousPath(window.location)
                setIsModalVisible(true);
              }
              }
            >
              Тойм
            </Button>
          </div>
        )}
      </div>
      {!loading && <NewCardModal
        isModalVisible={isModalVisible}
        id={result[0].movie}
        previousPath={previousPath}
        setIsModalVisible={setIsModalVisible}
      />}
      
    </div>
  );
};

export default React.memo(Banner);
