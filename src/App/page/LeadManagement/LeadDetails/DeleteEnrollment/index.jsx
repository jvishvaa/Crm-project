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

const DeleteEnrollment = ({
  modalData,
  handleDeleteEnrollment,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const deleteType = Form.useWatch("delete_type", form);

  const renderHelpText = () => {
    if (deleteType === "application") {
      return "Registration Number and Admission Number will also be removed";
    } else if (deleteType === "registration") {
      return "Admission Number will also be removed";
    }
    return null; // Return null if no delete_type is selected or for other cases
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleDeleteEnrollment(values);
    form.resetFields();
  };

  return (
    <Modal
      centered
      open={modalData?.show && ["Delete Enrollment"].includes(modalData?.type)}
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
          Delete
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <Typography className="th-14 th-fw-600">{modalData?.type}</Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="delete_type"
                  label="Delete Type"
                  help={renderHelpText()}
                  rules={[
                    {
                      required: true,
                      message: "Please Select Delete Type",
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    allowClear
                    disabled={loading}
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      { label: "Application", value: "application" },
                      { label: "Registration", value: "registration" },
                      { label: "Admission", value: "admission" },
                    ]}
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
                  <TextArea rows={3} disabled={loading} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default DeleteEnrollment;
