import React from "react";

import { Link, useHistory } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { Formik } from "formik";
import { Input, Form } from "formik-antd";
import * as Yup from "yup";
import { AuthAPI } from "apis";
import Auth from ".";

const schema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Та зөвхөн имэйл оруулна уу"
    )
    .required("Заавал бөглөнө үү "),
});

const Forget = () => {

  const history = useHistory();

  const onSubmit = async (values, formik) => {
    try {
      await AuthAPI.passwordForget(values);

      notification.success({
        message:
          "Таны имэйл рүү баталгаажуулах код илгээсэн болно. inbox дотор байхгүй бол та spam доторхийг шалгана уу",
      });

      history.push(`/landing/change_password?username=${values.username}`, {
        username: values.username,
      });
    } catch (err) {
      if (err.message === "NOT_FOUND_ACCOUNT") {
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
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Auth>
            <h2 className="auth__title">Нууц үгээ солих</h2>
            <div className="auth__form mb-4 mt-4">
              <Form.Item name="username">
                <Input
                  placeholder="Имэйл"
                  size="large"
                  name="username"
                  suffix={<MailOutlined />}
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
                <Link className="auth__other__signup__link" to="/landing/login">
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

export default React.memo(Forget);
