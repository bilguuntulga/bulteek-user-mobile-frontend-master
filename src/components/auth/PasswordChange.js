import React from "react";

import { Link, useHistory, useLocation } from "react-router-dom";
import {
  MailOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Button, notification } from "antd";
import { Formik } from "formik";
import { Input, Form } from "formik-antd";
import * as Yup from "yup";
import { AuthAPI } from "apis";
import { useDispatch } from "react-redux";
import Auth from ".";

const schema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Та хамгын багадаа 8 үсгээс дээш утга оруулна уу")
    .required("Заавал бөглөнө үү "),
  activate_code: Yup.string().required("Заавал бөглөнө үү"),
});

const PasswordChange = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  const onSubmit = async (values, formik) => {
    try {
      const { token, refreshToken, user } = await AuthAPI.passwordChange(
        values
      );

      notification.success({
        message: "Таны нууц үг амжилттай солигдлоо",
      });

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
      if (err.message === "ACTIVATE_CODE_NOTMATCHED") {
        notification.error({
          message: "Таны баталгаажуулах код таарахгүй байна!",
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

  if (!location.state || (location.state && !location.state.username)) {
    history.goBack();
    return;
  }

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={schema}
      initialValues={{
        username: location.state.username,
        newPassword: "",
        activate_code: "",
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Auth>
            <h2 className="auth__title">Нууц үг баталгаажуулах</h2>
            <div className="auth__form mb-6 mt-6">
              <Form.Item name="username">
                <Input
                  placeholder="Имэйл"
                  disabled
                  size="large"
                  name="username"
                  suffix={<MailOutlined />}
                />
              </Form.Item>

              <Form.Item name="activate_code">
                <Input
                  placeholder="Баталгаажуулах код"
                  size="large"
                  name="activate_code"
                  suffix={<KeyOutlined />}
                />
              </Form.Item>

              <Form.Item name="newPassword">
                <Input.Password
                  name="newPassword"
                  placeholder="Шинэ нууц үг"
                  // iconRender={(visible) =>
                  //   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  // }
                />
              </Form.Item>

              <Button
                className="auth__form__button --login"
                type="primary"
                size="large"
                loading={isSubmitting}
                htmlType="submit"
              >
                Үргэлжлүүлэх
              </Button>
            </div>
            <div className="auth__other mb-5">
              <div className="auth__other__signup mt-6">
                <span className="auth__other__signup__qs">
                  Нэвтрэх рүү буцах?{" "}
                </span>
                <Link className="auth__other__signup__link" to="/landing">
                  Нэвтрэх
                </Link>
              </div>
            </div>
          </Auth>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordChange;
