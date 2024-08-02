import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";

const AddEditSourceType = ({
  modalData,
  handleAddEditSourceType,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleAddEditSourceType(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data) {
      form.setFieldsValue({ academic_year: modalData?.data?.academic_year });
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
          loading={loading}
          size="small"
        >
          {modalData?.data ? "Update" : "Save"}
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24} className="mt-1">
          <Typography className="th-14 th-fw-600">
            {modalData?.data ? "Edit Source Type" : "Add Source Type"}
          </Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="source_type"
              label="Source Type"
              rules={[{ required: true, message: "Please Enter Source Type" }]}
            >
              <Input maxLength={48} autoComplete="off" disabled={loading} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddEditSourceType;
