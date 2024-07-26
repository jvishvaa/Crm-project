import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

const SelectDate = ({ modalData, handleSelectDate, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleSelectDate({ date: values?.date, index: modalData?.data?.index });
    closeModal();
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data && modalData.type === "Select Report Date") {
      form.setFieldsValue({
        date: modalData?.data?.date,
      });
    }
  }, [modalData]);

  return (
    <Modal
      centered
      open={modalData?.show && modalData.type === "Select Report Date"}
      maskClosable={false}
      width={300}
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
            Select Report Date
          </Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="date"
                  label="Select Date"
                  rules={[{ required: true, message: "Please Select Date" }]}
                >
                  <RangePicker />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default SelectDate;
