import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";
import "../index.scss";

const { TextArea } = Input;

const ReassignPRM = ({ modalData, handleReassignPRM, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleReassignPRM(values);
    form.resetFields();
  };

  return (
    <Modal
      centered
      open={modalData?.show && modalData?.type === "Reassign PRM"}
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
          Submit
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24} className="mt-1">
          <Typography className="th-14 th-fw-600">Reassign PRM</Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[16, 4]}>
              <Col xs={24}>
                <Form.Item
                  name="prm"
                  label="PRM"
                  rules={[
                    {
                      required: true,
                      message: "Please Select PRM",
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={[]}
                    disabled={loading}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="remarks"
                  label="Remarks"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Remarks",
                    },
                  ]}
                >
                  <TextArea
                    rows={3}
                    disabled={loading}
                    onChange={(e) => {
                      form.setFieldsValue({
                        remarks: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
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

export default ReassignPRM;
