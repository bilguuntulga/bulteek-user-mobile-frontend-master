import React from "react";
import fbLogo from "@assets/images/fb-logo.png";
import { Link, useHistory } from "react-router-dom";
import {
  MailOutlined,
} from "@ant-design/icons";
import { Switch, Button, Divider, notification } from "antd";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AuthAPI } from "apis";
import { Formik } from "formik";
import { Input, Form } from "formik-antd";
import Auth from ".";

const schema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Та зөвхөн имэйл оруулна уу"
    )
    .required("Заавал бөглөнө үү "),
  password: Yup.string().required("Заавал бөглөнө үү "),
});
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  const onSubmit = async (values, formik) => {
    try {
      const { token, refreshToken, user } = await AuthAPI.login(values);

      dispatch({
        type: "auth/change",
        payload: {
          token,
          refreshToken,
          user,
        },
      });

      history.push("/");
    } catch (err) {
      if (err.message === "CREDINTIAL_ERROR") {
        notification.error({
          message: "Таны нууц үг эсвэл е-шуудан буруу байна",
        });
      } else if (err.message === "NOT_FOUND_ACCOUNT") {
        notification.error({
          message: "Та бүртгэлгүй байна",
        });
      } else {
        notification.error({
          message: "Таны үйлдэлийг хийхэд алдаа гарлаа.",
        });
      }
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={schema}
      initialValues={{
        username: "",
        password: "",
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Auth>
            <h2 className="auth__title">Эхлээд нэвтрэнэ үү.</h2>
            <div className="auth__form mb-4 mt-4">
              <Form.Item name="username">
                <Input
                  name="username"
                  placeholder="Имэйл"
                  size="large"
                  suffix={<MailOutlined />}
                />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password
                  name="password"
                  placeholder="Нууц үг"
                // iconRender={(visible) =>
                //   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                // }
                />
              </Form.Item>
              <Link to="/landing/reset_password" className="auth__form__forget">
                Нууц Үгээ Солих
              </Link>
              <div className="auth__form__remember ">
                <p>Намайг санаaрай</p>
                <Switch defaultChecked onChange={onChange} />
              </div>
              <Button
                className="auth__form__button --login"
                type="primary"
                size="large"
                htmlType="submit"
                loading={isSubmitting}
              >
                Нэвтрэх
              </Button>
            </div>
           
          </Auth>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
