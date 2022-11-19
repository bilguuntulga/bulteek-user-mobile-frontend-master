import { notification } from "antd";
import moment from "moment";
import numeral from "numeral";
import request from "./request";

const dateFormat = (date) => moment(date).format("YYYY-MM-DD");
const datetimeFormat = (date) => moment(date).format("YYYY-MM-DD hh:mm");
const datetimeFormat2 = (date) => moment(date).format("YYYY.MM.DD");

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  style: {
    marginTop: 20,
  },
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const tugrug = (val) => numeral(val).format("0,0$");

export const errorMessage = (e) => {
  notification.error({
    message: e,
  });
};

export {
  datetimeFormat2,
  tugrug,
  request,
  dateFormat,
  datetimeFormat,
  formItemLayout,
  tailFormItemLayout,
};
