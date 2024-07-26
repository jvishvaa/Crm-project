import { Button, Col, Form, Input, Row, Tooltip, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "../index.css";
import { useLocation, useNavigate } from "react-router-dom";
import CRMLoginImage from "../../../assest/images/CrmLoginImage.jpg";
import CrmLogo from "../../../assest/images/CRMLogo.png";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import { ArrowLeftOutlined, InfoCircleFilled } from "@ant-design/icons";
const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(120);
  console.log(time);
  const [isActive, setIsActive] = useState(true);

  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  const onFinish = (values) => {
    navigate("/login", { replace: true });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (!location?.state?.erp_id) {
      navigate("/forgot-password");
    }
  }, [location]);

  function validatePassword(password, erp) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const containsERP = password.includes(erp);

    if (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar &&
      !containsERP
    ) {
      return true;
    } else {
      return false;
    }
  }

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
                <Col className="mb-2 mt-4">
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
                      Reset Password
                    </Typography>
                    <Typography
                      className={`${
                        width >= 768 ? "text-left" : "text-center"
                      } reset-password-text mt-1`}
                    >
                      OTP has been sent successfully to your registered mail id
                      and mobile number
                    </Typography>
                  </div>
                </Col>
                <Col className="w-100">
                  <Form
                    name="resetpasswordForm"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <Form.Item
                      className="mt-3"
                      label={
                        <span>
                          New Password{" "}
                          <Tooltip
                            title={
                              "Your password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, one special character, and must not contain your ERP."
                            }
                          >
                            <InfoCircleFilled style={{ marginLeft: 5 }} />
                          </Tooltip>
                        </span>
                      }
                      name="new_password"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter New Password",
                        },
                      ]}
                    >
                      <Input.Password
                        autoComplete="new-password"
                        placeholder="Enter New Password"
                      />
                    </Form.Item>

                    <Form.Item
                      className="mt-4"
                      label="Re-Enter New Password"
                      name="renter_new_password"
                      rules={[
                        {
                          required: true,
                          message: "Please Re-Enter New Password",
                        },
                      ]}
                    >
                      <Input.Password
                        autoComplete="new-password"
                        placeholder="Re-Enter New Password"
                      />
                    </Form.Item>
                    <Form.Item
                      className="mt-4"
                      label="OTP"
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter OTP",
                        },
                      ]}
                    >
                      <Input placeholder="Enter OTP" />
                    </Form.Item>
                    <Button
                      type="link"
                      style={{ height: 10 }}
                      disabled={isActive}
                      onClick={() => {
                        setIsActive(true);
                      }}
                    >
                      Resend OTP {isActive ? `in ${formatTime(time)}` : ""}
                    </Button>

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
                        Reset Password
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

export default ResetPassword;
