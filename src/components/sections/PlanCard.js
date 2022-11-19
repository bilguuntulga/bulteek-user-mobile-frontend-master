import React from "react";
import {  Button } from "antd";
const PlanCard = ({
  title,
  icon,
  time,
  price,
  auth,
  premium,
  onClick,
  description,
}) => {
  return (
    <div className="plan-card">
      <div className="plan-card__title">
        {title} {time}
      </div>
      {/* <div className="plan-card__logo">
        <p>{icon}</p>
      </div> */}
      {description && description.length > 0 && (
        <div className="plan-card__logo " style={{ minHeight: "200px" }}>
          {description}
        </div>
      )}
      {/* {premium && (
        <div className="plan-card__premium p-2 pr-3 pl-3 landing__element ">
          premium
        </div>
      )} */}
      <div className="plan-card__price pb-5">
        <div className="plan-card__price__number">{price}</div>
        <span>₮</span>
      </div>
      {!!auth && (
        <Button className="plan-card__btn" onClick={onClick}>
          <span className="landing__element">Авах</span>
        </Button>
      )}
      <div className="mb-5"></div>
      {/* <Modal
        visible={isModalVisible}
        className="modal plan-card__modal"
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        centered
      >
        <div className=" d-flex align-items-center justify-content-center flex-column">
          <h2 className="plan-card__modal__title mb-3">Эрх худалдан авах</h2>
          <div className="p-2">
            <div className="plan-card__modal__item ">
              <div className="plan-card__modal__item__title">Данс: </div>
              <div className="plan-card__modal__item__value">
                Хаан банк 5301035866
              </div>
            </div>
            <div className="plan-card__modal__item ">
              <div className="plan-card__modal__item__title">
                Төлбөр хүлээн авагч:{" "}
              </div>
              <div className="plan-card__modal__item__value">Aмартүвшин</div>
            </div>
            <div className="plan-card__modal__item ">
              <div className="plan-card__modal__item__title">
                Шилжүүлэх дүн :
              </div>
              <div className="plan-card__modal__item__value">{price} ₮</div>
            </div>
            <div className="plan-card__modal__item ">
              <div className="plan-card__modal__item__title">
                Гүйлгээний утга:
              </div>
              <div className="plan-card__modal__item__value">
                <span className="p-2">{"hashbaterdene@gmail.com"}</span>
                <CopyToClipboard
                  className=""
                  text={`${"hashbaterdene@gmail.com"}`}
                  onCopy={() => message.info("Copy үйлдэл хийгдлээ")}
                >
                  <Button size="large" shape="circle" icon={<CopyOutlined />} />
                </CopyToClipboard>
              </div>
            </div>
            <div className="mb-3"></div>
          </div>
          <Button
            className="plan-card__modal__btn plan-card__btn"
            type="primary"
            size="large"
            onClick={() => setIsModalVisible(false)}
          >
            <span className="landing__element">Болсон</span>
          </Button>
          <div className="mb-5"></div>
        </div>
      </Modal> */}
    </div>
  );
};

export default PlanCard;
