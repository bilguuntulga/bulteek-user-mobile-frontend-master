/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import {
  BiCopyright,
  FiFile,
  BiEnvelope,
  AiOutlineQuestionCircle,
} from "react-icons/all";
import { Link } from "react-router-dom";
const Footer = ({ className }) => {
  return (
    <div className={`footer ${className && className}`}>
      <div className="footer__element">
        <BiCopyright /> <span>Bulteek</span>
      </div>
      <div className="footer__element">
        <span>Хувилбар 2.0.0</span>
      </div>
      <a
        href="mailto:bulteek.modern@gmail.com"
        className="footer__element --link"
        target="_blank"
      >
        <BiEnvelope /> <span>Bulteek.modern@gmail.com</span>
      </a>
      <Link to="/privacy" className="footer__element --link">
        <FiFile /> <span>Үйлчилгээний ерөнхий нөхцөл</span>
      </Link>
      <Link to="/faq" className="footer__element --link">
        <AiOutlineQuestionCircle /> <span>Түгээмэл асуултууд</span>
      </Link>
    </div>
  );
};

export default React.memo(Footer);
