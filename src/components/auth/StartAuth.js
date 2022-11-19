import React from "react";
import logoWhitePng from "@assets/images/logo-white.png";
import { Button, notification } from "antd";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { AuthAPI } from "apis"

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const StartAuth = () => {
  const history = useHistory();

  const [loadinFbutton, setLoadingFButton] = React.useState(false);
  const dispatch = useDispatch();

  const f_login = (isButton) => async (response) => {
    if (isButton) {
      setLoadingFButton(true)
      try {
        const {
          token,
          refreshToken,
          user
        } = await AuthAPI.socials_login({
          authObj: response,
          session_type: "FACEBOOK"
        });
        dispatch({
          type: "auth/change",
          payload: {
            token,
            refreshToken,
            user
          }
        });
        history.push("/")
        // console.log("authme ", await AuthAPI.me())
      } catch (err) {
        console.log(err);
        notification.error({
          message: "Файсбүүкээр нэвтрэхэд алдаа гарлаа"
        })
      }
    }
  }

  return (
    <div className="start-auth">
      <div className="start-auth__logo">
        <img src={logoWhitePng} alt="Bulteek" />
      </div>
      <div className="start-auth__btns" style={{
        width: "100%",
        padding: "0 10px",
        "margin-bottom": "6vh",
        flex: 1,
        "align-items": "center",
        "justify-content": "center",
        display: "flex",
        "flex-direction": "column"
      }}>
        <Button type="primary" onClick={() => history.push("/landing/signup")}>
          Бүртгүүлэх
        </Button>

        {/* <FacebookLogin
          appId={process.env.NODE_ENV === "development" ? "589673872112188" : "4003931809664537"}
          autoLoad={true}
          fields="name,email,picture"
          callback={f_login(false)}
          onClick={f_login(true)}
          isMobile={true}
          render={renderProps => (
            <Button
              className="start-auth__btns-fb"
              size="large"
              onClick={renderProps.onClick}
              disabled={renderProps.isDisabled || loadinFbutton}
              loading={renderProps.isProcessing || !renderProps.isSdkLoaded || loadinFbutton}
            >
              Фэйсбүүк эрхээр нэвтрэх
            </Button>
          )}
        /> */}

        {/* <Button className="start-auth__btns-fb">Фэйсбүүк эрхээр нэвтрэх</Button> */}
        <div className="start-auth__btns__qs">Та бүртгэлтэй хэрэглэгч үү?</div>
        <Button
          className="start-auth__btns-login"
          onClick={() => history.push("/landing/login")}
        >
          Нэвтрэх
        </Button>
      </div>
    </div >
  );
};

export default StartAuth;
