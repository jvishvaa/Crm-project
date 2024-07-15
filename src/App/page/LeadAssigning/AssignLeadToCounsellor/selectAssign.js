import {
  Button,
  Col,
  Divider,
  Form,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";

const SelectAssign = ({ modalData, handleAssign, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleAssign(values);
    form.resetFields();
  };

  return (
    <Modal
      centered
      open={modalData?.show}
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
          loading={loading}
          onClick={() => form.submit()}
          size="small"
        >
          Assign
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <Typography style={{ fontSize: 14, fontWeight: 600 }}>
            Assign Counsellor
          </Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="counsellor"
                  label="Counsellor"
                  rules={[
                    { required: true, message: "Please Enter Source Name" },
                  ]}
                >
                  <Select
                    disabled={loading}
                    className="w-100"
                    showSearch
                    allowClear
                    options={[]}
                    mode="multiple"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default SelectAssign;
