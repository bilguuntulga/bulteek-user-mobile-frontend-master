/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Modal, Spin, message, Skeleton } from "antd";
import { HiOutlineFlag } from "react-icons/hi";
import CopyToClipboard from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";
import { PaymentAPI } from "apis";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Payment = ({
  isModalVisible,
  setIsModalVisible,
  type,
  movieId,
  planId,
  time,
  price,
  title
}) => {
  const [selectType, setSelectType] = React.useState("bank");

  const [qpay, setQpay] = React.useState(null);
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isModalVisible && selectType === "qpay" && !qpay) {
      setLoading(true);
      (async () => {
        try {
          const qs = await PaymentAPI.pay_request({
            movieId,
            planId,
            type,
          });
          setQpay(qs);
        } catch (err) {
          console.log(err);
        }
        setTimeout(() => {
          setLoading(false);
        }, 300)
      })();
    }
  }, [isModalVisible, selectType]);

  const successCheck = () => {
    if (type === "movie") {
      history.replace(`/movie/${movieId}`);
    } else {
      history.replace("/");
    }
  }

  return (
    <Modal
      className="modal plan-card__modal modal"
      visible={isModalVisible}
      footer={null}
      onCancel={() => setIsModalVisible(false)
      }>
      <Spin size={"large"} spinning={loading && !qpay}>
        {
          type === "movie" ? (
            <div className="payment-modal__container">
              <h2 className="plan-card__modal__title pl-3">
                {title} түрээслэх
              </h2>
              <QpayView successCheck={successCheck} qpay={qpay || {}} time={time} price={price} movieId={movieId} parentLoading={loading} />
            </div>
          ) : (
            <div className="payment-modal__container">
              <h2 className="plan-card__modal__title pl-3">
                {title} түрээслэх
              </h2>

              <div className="plan-card__modal__menu pt-4 pl-3">
                <div
                  className={`plan-card__modal__menu__item ${selectType === "qpay" && "-active"
                    }`}
                  onClick={() => setSelectType("qpay")}
                >
                  <span>Qpay</span>
                </div>
                <div
                  className={`plan-card__modal__menu__item ${selectType === "bank" && "-active"
                    }`}
                  onClick={() => setSelectType("bank")}
                >
                  <span>Банк</span>
                </div>
              </div>
              {/* <Spin size="large"> */}
              {selectType === "bank" ? (
                <BankView successCheck={successCheck} time={time} price={price} />
              ) : (
                <QpayView successCheck={successCheck} qpay={qpay || {}} time={time} price={price} movieId={movieId} parentLoading={loading} />
              )}
              {/* </Spin> */}
            </div>
          )
        }
      </Spin>
    </Modal>
  );
};

const QpayView = ({ setIsModalVisible, qpay, time, price, parentLoading, successCheck }) => {

  const [loading, setLoading] = React.useState(false);

  const check = async () => {

    Modal.confirm({
      type: "info",
      content: "Төлбөрийн мэдээлэл шалгах",
      async onOk() {
        try {
          const checkData = await PaymentAPI.checkInvoice(qpay.system_invoice_id)
          if (checkData.check === true) {
            message.success("Та манай үйлчилгээг сонгосонд баярлалаа ")
          } else if (!checkData.check) {
            message.error("Та төлбөрөө төлөөгүй байна");
          }
          setLoading(false);
        } catch (err) {

        }
      }
    })
  }


  return (
    (
      <Spin spinning={loading}>
        <div className="p-3">
          <div className="plan-card__modal__item ">
            <div className="plan-card__modal__item__title">Түрээслэх хугацаа:</div>
            <div className="plan-card__modal__item__value">{time}</div>
          </div>
          <div className="plan-card__modal__item ">
            <div className="plan-card__modal__item__title">Үнэ:</div>
            <div className="plan-card__modal__item__value">{price}₮</div>
          </div>
          <div className="plan-card__modal__item payment-modal__qr">
            <div className="plan-card__modal__item__title">QRcode:</div>
            <div className="plan-card__modal__item__value">
              {
                parentLoading ? (
                  <Skeleton avatar={{ shape: "square", size: 240 }} />
                ) : (
                  <img
                    src={`data:image/png;base64,${qpay.qr_image}`}
                    alt="QR image loading"
                    onLoad={(e) => {
                      console.log("qr image load ", e)
                    }}

                  />
                )
              }
            </div>
          </div>
          <div className="payment-modal__warning p-2 m-3 mt-4">
            <div className="payment-modal__warning__icon pr-2">
              <HiOutlineFlag />
            </div>
            <div className="payment-modal__warning__text">
              Та банкны аппликейшнаар дээрх QR кодыг уншуулан төлбөр өө төлнө үү.
            </div>
          </div>
          <div className="payment-modal__btn p-3">
            <Button
              className="auth__form__button --social"
              onClick={() => {
                // setIsModalVisible(false);
                setLoading(true);
                check();
              }}
            >
              Шалгах
            </Button>
          </div>
        </div>
        {/* <Spin spinning>

        </Spin> */}
      </Spin>
    )
  )
};

const BankView = ({ time, price }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className=" d-flex align-items-center justify-content-center flex-column pt-4">
        <div className="p-3">
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
            <div className="plan-card__modal__item__title">Шилжүүлэх дүн :</div>
            <div className="plan-card__modal__item__value">{price} ₮</div>
          </div>
          <div className="plan-card__modal__item ">
            <div className="plan-card__modal__item__title">
              Түрээслэх хугацаа :
            </div>
            <div className="plan-card__modal__item__value">{time} </div>
          </div>
          <div className="plan-card__modal__item ">
            <div className="plan-card__modal__item__title">
              Гүйлгээний утга:
            </div>
            <div className="plan-card__modal__item__value">
              <span className="p-2">{user.register_num}</span>
              <CopyToClipboard
                className=""
                text={`${user.register_num}`}
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
        // onClick={() => setIsModalVisible(false)}
        >
          <span className="landing__element">Болсон</span>
        </Button>
        <div className="mb-5"></div>
      </div>
    </>
  );
};

export default Payment;
