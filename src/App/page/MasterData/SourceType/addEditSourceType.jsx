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
import urls from "../../../utils/urls";
import axios from "axios";

const AddEditSourceType = ({ modalData, onSubmit, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    let payload = {
      source_name: values.source_type,
    };
    setLoading(true);
    if (modalData?.data) {
      axios
        .put(`${urls.masterData.sourceType}${modalData.data?.id}`, payload)
        .then((res) => {
          let response = res.data;
          if ([200, 201].includes(response?.status_code)) {
            form.resetFields();
            onSubmit();
            closeModal();
          } else {
            message.error(response?.message);
          }
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .post(urls.masterData.sourceType, payload)
        .then((res) => {
          let response = res.data;
          if ([200, 201].includes(response?.status_code)) {
            form.resetFields();
            onSubmit();
            closeModal();
          } else {
            message.error(response?.message);
          }
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (modalData?.data) {
      form.setFieldsValue({ source_type: modalData?.data?.source_name });
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
      maskClosable={false}
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
