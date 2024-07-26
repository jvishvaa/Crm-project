import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Modal,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import "../index.scss";

const GeneratePayment = ({ modalData, handleGeneratePayment, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isAdmissionFee = Form.useWatch("is_admission_fee", form);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleGeneratePayment(values);
    form.resetFields();
  };

  const handleRegistrationFeeChange = (e) => {
    if (e.target.checked) {
      form.setFieldsValue({ is_application_fee: true });
    }
  };

  const handleAdmissionFeeChange = (e) => {
    if (e.target.checked) {
      form.setFieldsValue({
        is_application_fee: true,
        is_registration_fee: true,
        shift: "shift1",
      });
    } else {
      form.setFieldsValue({
        shift: undefined,
      });
    }
  };

  return (
    <Modal
      centered
      open={modalData?.show && ["Generate Payment"].includes(modalData?.type)}
      onCancel={() => {
        closeModal();
        form.resetFields();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            closeModal();
            form.resetFields();
          }}
          size="small"
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          loading={loading}
          size="small"
        >
          Generate Link
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <Typography style={{ fontSize: 14, fontWeight: 600 }}>
            Child Enrollment Payment
          </Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item name="is_application_fee" valuePropName="checked">
                  <Checkbox disabled={loading}>
                    Application Fee (Application Fee: Rs.200)
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="is_registration_fee" valuePropName="checked">
                  <Checkbox
                    onChange={handleRegistrationFeeChange}
                    disabled={loading}
                  >
                    Registration Fee (Registration Fee: Rs.200)
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="is_admission_fee"
                  valuePropName="checked"
                  disabled={loading}
                >
                  <Checkbox onChange={handleAdmissionFeeChange}>
                    Admission Fee
                  </Checkbox>
                </Form.Item>
              </Col>
              {isAdmissionFee ? (
                <Col xs={24}>
                  <Form.Item name="shift" className="pl-4">
                    <Radio.Group disabled={loading}>
                      <Space direction="vertical">
                        <Radio value="shift1">
                          Shift 1 (Admission Fee: Rs.1000)
                        </Radio>
                        <Radio value="shift2">
                          Shift 2 (Admission Fee: Rs.1100)
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              ) : null}
              <Col xs={24} className="mt-4">
                <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                  Total Fee: Rs: 1456
                </Typography>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default GeneratePayment;
