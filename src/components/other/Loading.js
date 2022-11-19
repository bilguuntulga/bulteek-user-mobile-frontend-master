import React from "react";
// import { Spin } from "antd";
import PropTypes from "prop-types";
import { LoadingOutlined } from "@ant-design/icons";
import Logo from "assets/images/logo-sm.png";
export const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

const Loading = (props) => {
  const { align, cover } = props;
  return (
    <div className={`loading text-${align} cover-${cover}`}>
      {/* <Spin indicator={Icon} /> */}
      <div className="d-flex justify-content align-items-center flex-column">
        <img src={Logo} alt="loading..." />
        <div className="mb-6"></div>
        <LoadingOutlined spin />
        {/* <p className="mt-2 loading__text">{first ? "Bulteek-д тавтай морил..." : "Уншиж байна..."}</p> */}
      </div>
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  cover: PropTypes.string,
  first: PropTypes.bool
};

Loading.defaultProps = {
  align: "center",
  cover: "page",
  first: false
};

export default Loading;
