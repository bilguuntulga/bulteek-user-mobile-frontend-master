import React from "react";
import { Button, Empty } from "antd";
import { BiPlay } from "react-icons/bi";

const Card = ({ item, onClick }) => (
  <div className="detail__episodes__episode" onClick={() => onClick(item)}>
    <div className="detail__episodes__episode__img__wrapper">
      <img src={item.thumbnail} alt="angi" />
      <div className="detail__episodes__episode__img__play">
        <Button type="default" shape="circle" icon={<BiPlay />} size="large" />
      </div>
    </div>
    <div className="detail__episodes__episode__meta-data">
      <h2 className="detail__episodes__episode__meta-data__title">
        {item.title}
      </h2>
      <div className="detail__episodes__episode__meta-data__time">
        {Math.round(item.length / 60)} мин
      </div>
    </div>
  </div>
);
const ListCard = ({ isView, items = [], onClick }) => {
  return (
    <>
      {items && items.length > 0 ? (
        items.map((item) => <Card onClick={onClick} item={item} />)
      ) : (
        <div
          style={{
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Empty
            description="Анги алга байна"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )}
      <div className="p-5"></div>
    </>
  );
};

export default ListCard;
