import React from "react";
import { Button, message } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import logoX from "@assets/images/logo-x.png";
import { useHistory } from "react-router";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import * as Yup from "yup";
import { authPasswordChange } from "@apis/auth";

const schema = Yup.object().shape({
  password: Yup.string().required("Заавал бөглөнө үү"),
  newPassword: Yup.string()
    .min(8, "Ta хамгийн багадаа 8 үсгээс дээш утга оруулана уу")
    .required("Заавал бөглөнө үү"),
});

const ResetPassword = () => {
  const history = useHistory();

  const onSubmit = async (values, formik) => {
    try {
      await authPasswordChange(values);
      message.success("Таны үйлдэлийг амжилттай хийгдлээ");
      history.goBack();
    } catch (err) {
      message.error("Таны үйлдэлийг хийхэд алдаа гарлаа");
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        newPassword: "",
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="auth__logo">
            <img src={logoX} alt="bulteek" />
          </div>
          <h2 className="auth__title">Нууц үг солих.</h2>
          <div className="auth__form ">
            <Form.Item name="password">
              <Input.Password
                name="password"
                placeholder="Одоогийн нууц үг"
                // iconRender={(visible) =>
                //   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                // }
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
              className="auth__form__button --login mt-2 mb-3"
              type="primary"
              size="large"
              htmlType="submit"
              loading={isSubmitting}
            >
              Хадгалах
            </Button>
            <Button
              className="auth__form__button --social mb-5"
              size="large"
              onClick={() => history.push("/more")}
            >
              Буцах
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
