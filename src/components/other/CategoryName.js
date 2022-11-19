import React from "react";
import { useHistory } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { ArrowLeftOutlined } from "@ant-design/icons";

function CategoryName({ children, noMore = false, id, text = false }) {
  const history = useHistory();
  if (text) {
    return (
      <h2 className="card-row__header --text">
        <div className="card-row__title">
          <div className="card-row__header--title">{children}</div>
        </div>
      </h2>
    );
  }
  return (
    <h2 className="card-row__header">
      <div
        className="card-row__title"
        onClick={
          !noMore ? () => history.push(`/movies/${id}`) : () => history.goBack()
        }
      >
        <div className="card-row__header--title">
          {noMore && <ArrowLeftOutlined />}
          {children}
          {!noMore && (
            <FaChevronRight className="card-row__header--title__chevron" />
          )}
        </div>
      </div>
    </h2>
  );
}

export default CategoryName;
