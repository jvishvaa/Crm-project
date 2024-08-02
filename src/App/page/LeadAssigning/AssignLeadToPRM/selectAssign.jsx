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
        <Col xs={24} className="mt-1">
          <Typography className="th-14 th-fw-600">Assign PRM</Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="prm"
                  label="PRM"
                  rules={[{ required: true, message: "Please Select PRM" }]}
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
