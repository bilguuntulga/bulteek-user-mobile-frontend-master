/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Tooltip, Modal, message, Avatar } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  HiOutlinePencil,
  FaChevronRight,
  AiOutlineCreditCard,
  FiLogOut,
  AiOutlineQuestionCircle,
  FiFile,
  AiOutlineShoppingCart,
  BiKey,
} from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import data from "data/Social";
import { AuthAPI } from "apis";
import moment from "moment";

const MoreLayout = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  function confirm() {
    Modal.confirm({
      title: "Bulteek-ээс гарах",
      icon: <ExclamationCircleOutlined />,
      content: "Та гарахдаа итгэлтэй байна уу?",
      okText: "Гарах",
      cancelText: "Үгүй",
      centered: true,
      onOk: logout,
      className: "more__logout",
    });
  }

  const logout = async () => {
    try {
      await AuthAPI.logout();
      dispatch({
        type: "auth/logout",
      });
      history.replace("/landing");
    } catch (err) {
      message.error("Таны үйлдлийг хийхэд алдаа гарлаа");
    }
  };

  return (
    <>
      <div className="more__info__pencil__container">
        <div
          className="more__info__pencil"
          onClick={() => {
            history.push(`${match.url}/edit`);
          }}
        >
          <Tooltip title="Засварлах">
            <HiOutlinePencil />
          </Tooltip>
        </div>
      </div>
      <div className="pb-5"></div>
      {/* <div className="more__info__avatar">B</div> */}
      {user.profile_img && user.profile_img.length > 0 ? (
        <Avatar src={user.profile_img} size={80} />
      ) : (
        <div className="more__info__avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="more__info__name m-3 mb-1">{user.name}</div>
      <div className="more__info__email m-3 mt-2">{user.email}</div>
      <div className="more__info__email m-3 mt-2">{user.register_num}</div>
      {user.plan && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div className="more__info__plan mb-2 ">
            Эхлэх:{" "}
            <span className="more__info__plan__date ml-2 ">
              {` ${moment(user.plan.start_date).format("YYYY-MM-DD")}`}{" "}
            </span>
          </div>
          <div className="more__info__plan mb-2 ">
            Дуусах:
            <span className="more__info__plan__date ml-2 ">
              {` ${moment(user.plan.end_date).format("YYYY-MM-DD")}`}
            </span>
          </div>
        </div>
      )}
      {/* <div className="more__info__plan mb-4">
        Эрхийн хугацаа:{" "}
        <span className="more__info__plan__date ml-2">
          42 хоног (2021-11-04)
        </span>
      </div> */}
      <div className="more__menu mb-6">
        <div className="more__menu__item" onClick={() => history.push("/plan")}>
          <span>
            <AiOutlineCreditCard />
            Эрх сунгах
          </span>
          <FaChevronRight />
        </div>
        <div
          className="more__menu__item"
          onClick={() => history.push("/more/reset_password")}
        >
          <span>
            <BiKey />
            Нууц үг солих
          </span>
          <FaChevronRight />
        </div>
        <div
          className="more__menu__item"
          onClick={() => history.push("/purchase-history")}
        >
          <span>
            <AiOutlineShoppingCart />
            Худалдан авалтын түүх
          </span>
          <FaChevronRight />
        </div>
        <div className="more__menu__item" onClick={() => history.push("/faq")}>
          <span>
            <AiOutlineQuestionCircle />
            Түгээмэл асуултууд
          </span>
          <FaChevronRight />
        </div>
        <div
          className="more__menu__item"
          onClick={() => history.push("/privacy")}
        >
          <span>
            <FiFile />
            Үйлчилгээний ерөнхий нөхцөл
          </span>
          <FaChevronRight />
        </div>
        <div className="more__menu__item" onClick={confirm}>
          <span>
            <FiLogOut />
            Гарах
          </span>
          <FaChevronRight />
        </div>
      </div>
      <div className="more__social pb-5">
        {data.map((e) => (
          <Tooltip
            key={e.id}
            title={<p className="more__social__tooltip">{e.title}</p>}
          >
            <a
              href={e.link}
              target="_blank"
              className="more__social__item"
              key={e.id}
            >
              {e.icon}
            </a>
          </Tooltip>
        ))}
      </div>
    </>
  );
};

export default MoreLayout;
