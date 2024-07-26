import { Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import CRMLoginImage from "../../../assest/images/CrmLoginImage.jpg";
import CrmLogo from "../../../assest/images/CRMLogo.png";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import { ArrowLeftOutlined } from "@ant-design/icons";
const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate("/reset-password", { state: { erp_id: values.erp } });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col xs={24} lg={12} style={{ backgroundColor: "#F6F6F6" }}>
        <Row justify={"center"} align={"center"}>
          <Col xs={20} sm={14} md={20} lg={18} xl={16}>
            <Row
              justify={width >= 768 ? "start" : "center"}
              align={"middle"}
              className={"min-vh-100"}
            >
              <div
                className={`d-flex flex-column  w-100 ${
                  width >= 768 ? "align-items-start" : "align-items-center"
                }`}
              >
                <Col
                  className={`mb-2 pt-1 d-flex flex-column ${
                    width >= 768 ? "align-items-start" : "align-items-center"
                  } justify-content-center`}
                  style={{ width: "100%" }}
                >
                  <img src={CrmLogo} className="crm-logo-style" />
                </Col>
                <Col className="mb-3 mt-4">
                  <div
                    className={`d-flex flex-column w-100 ${
                      width >= 768 ? "align-items-start" : "align-items-center"
                    }`}
                  >
                    <Typography
                      className={`${
                        width >= 768 ? "text-left" : "text-center"
                      } welcome-to-crm-text`}
                      style={{ fontSize: width < 500 ? 18 : 21 }}
                    >
                      Forgot Password
                    </Typography>
                  </div>
                </Col>
                <Col className="w-100">
                  <Form
                    name="forgetpasswordForm"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    requiredMark
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <Form.Item
                      label={"ERP ID"}
                      name="erp"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Please Enter ERP ID!",
                        },
                      ]}
                    >
                      <Input placeholder="For Eg: 20200000000_OLV" required />
                    </Form.Item>

                    <Form.Item
                      className={`d-flex flex-column ${
                        width >= 768
                          ? "align-items-start"
                          : "align-items-center"
                      }`}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="mt-4 login-button"
                        loading={loading}
                      >
                        Send OTP
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
                <Col className="pb-4">
                  <Button
                    type="link"
                    onClick={() => {
                      navigate("/login", { replace: true });
                    }}
                  >
                    <ArrowLeftOutlined /> Go to Login
                  </Button>
                </Col>
              </div>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={0} lg={12}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundImage: `url(${CRMLoginImage})`,
            backgroundPosition: "center",
          }}
        />
      </Col>
    </Row>
  );
};

export default ForgetPassword;
