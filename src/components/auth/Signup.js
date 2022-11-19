import React from "react";
import fbLogo from "@assets/images/fb-logo.png";
import { Link, useHistory } from "react-router-dom";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, notification } from "antd";
import { Formik } from "formik";
import { Input, Form } from "formik-antd";
import * as Yup from "yup";
import { AuthAPI } from "apis";
import { useDispatch } from "react-redux";
import Auth from ".";

const schema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Та зөвхөн имэйл оруулна уу"
    )
    .required("Заавал бөглөнө үү "),
  phone: Yup.string()
    .min(6, "Та хамгын багадаа 6 үсгээс дээш утга оруулна уу")
    .required("Заавал бөглөнө үү "),
  name: Yup.string()
    .min(3, "Та хамгын багадаа 3 үсгээс дээш утга оруулна уу")
    .required("Заавал бөглөнө үү "),
  password: Yup.string()
    .min(8, "Та хамгын багадаа 8 үсгээс дээш утга оруулна уу")
    .required("Заавал бөглөнө үү "),
});

const Signup = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = async (values, formik) => {
    try {
      const { token, refreshToken, user } = await AuthAPI.signup(values);

      dispatch({
        type: "auth/change",
        payload: {
          token,
          refreshToken,
          user,
        },
      });

      history.push("/");
      notification.success({
        message: "Та амжилттай бүртгэгдлээ",
      });
    } catch (err) {
      if (err.message === "SYSTEM_ACCOUNT_UNIQUE") {
        notification.error({
          message: "Та бүртгэлтэй байна. Та өөрийн аккоунтаар нэвтэрч орно уу",
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
        email: "",
        phone: "",
        name: "",
        password: "",
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Auth>
            <h2 className="auth__title">Шинэ хэрэглэгч болох</h2>
            <div className="auth__form mb-6 mt-6">
              <Form.Item name="email">
                <Input
                  placeholder="Имэйл"
                  name="email"
                  size="large"
                  suffix={<MailOutlined />}
                />
              </Form.Item>
              <Form.Item name="phone">
                <Input
                  placeholder="Утасны дугаар"
                  size="large"
                  suffix={<PhoneOutlined />}
                  name="phone"
                />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password
                  name="password"
                  placeholder="Нууц үг"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item name="name">
                <Input
                  placeholder="Taныг бид хэн гэж дуудах вэ?"
                  size="large"
                  suffix={<UserOutlined />}
                  name="name"
                />
              </Form.Item>
              <div className="mb-5"></div>
              <Button
                className="auth__form__button --login"
                type="primary"
                size="large"
                htmlType="submit"
                loading={isSubmitting}
              >
                Үргэлжлүүлэх
              </Button>
            </div>
            <Divider className="mb-6">Эсвэл</Divider>
            {/* <div className="auth__other mb-5">
              <Button
                className="auth__form__button --social"
                size="large"
                icon={<img src={fbLogo} alt="f" />}
              >
                Фэйсбүүк эрхээр бүртгүүлэх
              </Button>
              <div className="auth__other__signup mt-6">
                <span className="auth__other__signup__qs">
                  Та бүртгэлтэй хэрэглэгч үү?{" "}
                </span>
                <Link className="auth__other__signup__link" to="/landing/login">
                  Нэвтрэх
                </Link>
              </div>
            </div> */}
          </Auth>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
