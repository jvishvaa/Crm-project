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
import React, { useEffect, useState } from "react";

const AddEditSource = ({ modalData, handleAddEditSource, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleAddEditSource(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data) {
      form.setFieldsValue({
        source_name: modalData?.data?.source_name,
        source_type: modalData?.data?.source_type?.id,
        utm_source: modalData?.data?.utm_source,
        utm_medium: modalData?.data?.utm_medium,
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
          loading={loading}
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
            {modalData?.data ? "Edit Source" : "Add Source"}
          </Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="source_name"
                  label="Source Name"
                  rules={[
                    { required: true, message: "Please Enter Source Name" },
                  ]}
                >
                  <Input maxLength={48} autoComplete="off" disabled={loading} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="source_type"
                  label="Source Type"
                  rules={[
                    { required: true, message: "Please Select Source Type" },
                  ]}
                >
                  <Select
                    className="w-100"
                    options={[
                      { label: "Field Marketing", value: "field_marketing" },
                      {
                        label: "Digital Marketing",
                        value: "digital_marketing",
                      },
                    ]}
                    disabled={loading}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="utm_source" label="UTM Source">
                  <Input maxLength={48} autoComplete="off" disabled={loading} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="utm_medium" label="UTM Medium">
                  <Input maxLength={48} autoComplete="off" disabled={loading} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddEditSource;
