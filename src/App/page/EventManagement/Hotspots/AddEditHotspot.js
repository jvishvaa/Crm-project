import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import getArrayValues from "../../../utils/getArrayValues";

const AddEditHotspot = ({ modalData, handleAddEditHotspot, closeModal }) => {
  const [form] = Form.useForm();
  const isDormant = Form.useWatch("is_dormant", form);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleAddEditHotspot(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data) {
      form.setFieldsValue({
        hotspot_name: modalData?.data?.hotspot_name,
      });
    }
  }, [modalData]);

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
          onClick={() => form.submit()}
          size="small"
        >
          {modalData?.data ? "Update" : "Save"}
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <Typography style={{ fontSize: 14, fontWeight: 600 }}>
            {modalData?.data ? "Edit Hotspot" : "Add Hotspot"}
          </Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="hotspot_name"
                  label="Hotspot Name"
                  rules={[
                    { required: true, message: "Please Enter Hotspot Name" },
                  ]}
                >
                  <Input maxLength={48} autoComplete="off" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddEditHotspot;
