/* eslint-disable import/no-anonymous-default-export */
import { useLocation } from "react-router-dom";

export default () => {
  return new URLSearchParams(useLocation().search);
};
