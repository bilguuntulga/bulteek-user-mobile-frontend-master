import React from "react";
import logoX from "@assets/images/logo-x.png";
const Auth = ({ children }) => {
  return (
    <div className={`auth`}>
      <div className="auth__logo">
        <img src={logoX} alt="bulteek" />
      </div>
      {children}
    </div>
  );
};

export default Auth;
