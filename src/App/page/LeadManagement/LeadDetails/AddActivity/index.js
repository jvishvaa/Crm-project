import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TimePicker,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import "../index.scss";

const { TextArea } = Input;

const AddActivity = ({ modalData, handleAddActivity, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleAddActivity(values);
    form.resetFields();
  };

  return (
    <Modal
      centered
      open={modalData?.show}
      width={700}
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
          Submit
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <Typography style={{ fontSize: 14, fontWeight: 600 }}>
            Add Activity
          </Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[16, 4]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Status",
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    disabled={loading}
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={[]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="sub_status"
                  label="Sub Status"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Sub Status",
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    disabled={loading}
                    options={[]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="next_follow_date"
                  label="Next Follow Up Date"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Next Follow Up Date",
                    },
                  ]}
                >
                  <DatePicker className="w-100" disabled={loading} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="next_follow_time"
                  label="Next Follow Up Time"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Next Follow Up Time",
                    },
                  ]}
                >
                  <TimePicker
                    className="w-100"
                    format="hh:mm a"
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

export default AddActivity;
