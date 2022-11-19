import React from "react";
import { useHistory } from "react-router";
import { AuthAPI } from "apis";
import useFetch from "@hooks/useFetch";
import { Divider, Button, message, Spin, Avatar } from "antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/swiper.scss";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "formik-antd";

import * as Yup from "yup";

SwiperCore.use([Pagination, Navigation]);

const schema = Yup.object().shape({
  phone: Yup.string().required("Та заавал бөглөнө үү"),
  name: Yup.string().required("Та заавал бөглөнө үү"),
  profile_img: Yup.string(),
});

const Edit = () => {
  const history = useHistory();
  const [filter] = React.useState({});
  const { result: profile_images, loading: profile_images_loading } = useFetch(
    AuthAPI.profile_images,
    filter
  )([]);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onSubmit = async (values, formik) => {
    try {
      await AuthAPI.profile_change(values);
      try {
        const res = await AuthAPI.me();
        dispatch({
          type: "auth/me",
          payload: {
            ...res,
          },
        });
      } catch (err) {}
      history.goBack();
      message.success("Таны үйлдлийг хийхэд амжилттай хийгдлээ");
    } catch (err) {
      message.error("Таны үйлдлийг хийхэд алдаа гарлаа");
    }
  };

  const _user = {
    ...user,
  };

  if (!_user.profile_img) {
    _user.profile_img = "";
  }

  return (
    <Formik
      initialValues={{
        ..._user,
      }}
      onSubmit={onSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {({ isSubmitting, values, setValues }) => (
        <Spin size="large" spinning={profile_images_loading}>
          <Form layout="vertical">
            <div className="more__edit p-3">
              <h2 className="auth__title mb-5">Ерөнхий мэдээлэл засварлах</h2>
              <div className="auth__form">
                <Form.Item name="name">
                  <Input
                    name="name"
                    placeholder="Taныг бид хэн гэж дуудах вэ?"
                    size="large"
                    suffix={<UserOutlined />}
                  />
                </Form.Item>
                <Form.Item name="phone">
                  <Input
                    placeholder="Утас"
                    size="large"
                    name="phone"
                    suffix={<PhoneOutlined />}
                  />
                </Form.Item>
              </div>
              <Divider orientation="left">Хөрөг сонгох</Divider>
              <Swiper loop={true} spaceBetween={0} slidesPerView={"auto"}>
                <SwiperSlide key="1" style={{ width: "35%" }}>
                  <div
                    className={`more__edit__avatar-bg ${
                      (values.profile_img || "").trim() === ""
                        ? "--selected"
                        : ""
                    }`}
                  >
                    <div className="more__info__avatar ">
                      {values.name && values.name.length > 0 && values.name[0]}
                    </div>
                  </div>
                </SwiperSlide>
                {profile_images.map((item) => (
                  <SwiperSlide key={item.id} style={{ width: "35%" }}>
                    <div
                      className={`more__edit__avatar-bg ${
                        item.img.trim() === (values.profile_img || "").trim()
                          ? "--selected"
                          : ""
                      }`}
                      onClick={() => {
                        setValues({
                          ...values,
                          profile_img: item.img,
                        });
                      }}
                    >
                      <Avatar src={item.img} size={80} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <Row gutter={[16, 16]}>
                <Col span={6}>
                  <div className="more__edit__avatar-bg --selected">
                    <div className="more__info__avatar ">b</div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="more__edit__avatar-bg">
                    <div className="more__info__avatar ">b</div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="more__edit__avatar-bg">
                    <div className="more__info__avatar ">b</div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="more__edit__avatar-bg">
                    <div className="more__info__avatar ">b</div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="more__edit__avatar-bg">
                    <div className="more__info__avatar ">b</div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="more__edit__avatar-bg">
                    <div className="more__info__avatar ">b</div>
                  </div>
                </Col>
              </Row> */}
              <div className="mb-5"></div>

              <div className="more__edit__btns">
                <Button
                  className="auth__form__button --social -center mb-5"
                  size="large"
                  onClick={() => history.push("/more")}
                >
                  Буцах
                </Button>
                <Button
                  className="auth__form__button --login mt-2 mb-3"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isSubmitting}
                >
                  Хадгалах
                </Button>
              </div>
            </div>
          </Form>
        </Spin>
      )}
    </Formik>
  );
};

export default Edit;
