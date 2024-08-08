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
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import getSelectArray from "../../../utils/getSelectArray";
import urls from "../../../utils/urls";
import axios from "axios";

const AddEditSource = ({ modalData, onSubmit, closeModal, dropdownData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const utmSource = Form.useWatch("utm_source", form);

  const onFinish = (values) => {
    let payload = {
      source_name: values.source_name?.trim(),
      source_type: values.source_type,
      // UTM_Source: values.utm_source || null,
      // UTM_Source: values.utm_medium || null,
    };
    setLoading(true);
    if (modalData?.data) {
      axios
        .put(`${urls.masterData.leadSource}${modalData.data?.id}`, payload)
        .then((res) => {
          let response = res.data;
          // if ([200, 201].includes(response?.status_code)) {
          form.resetFields();
          onSubmit(values);
          closeModal();
          message.success(response.message);
          // } else {
          //   message.error(response?.message);
          // }
        })
        .catch((err) => {
          message.error(
            err?.response?.data?.message ?? "Something went wrong!"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .post(urls.masterData.leadSource, payload)
        .then((res) => {
          let response = res.data;
          // if ([200, 201].includes(response?.status_code)) {
          form.resetFields();
          onSubmit(values);
          closeModal();
          message.success(response.message);
          // } else {
          //   message.error(response?.message);
          // }
        })
        .catch((err) => {
          message.error(
            err?.response?.data?.message ?? "Something went wrong!"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (modalData?.data) {
      form.setFieldsValue({
        source_name: modalData?.data?.source_name,
        source_type: modalData?.data?.source_type,
        utm_source: modalData?.data?.UTM_Source,
        utm_medium: modalData?.data?.UTM_Medium,
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
        <Col xs={24} className="mt-1">
          <Typography className="th-14 th-fw-600">
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
                    {
                      required: true,
                      message: "Please Input Source Name",
                    },
                  ]}
                >
                  <Input
                    maxLength={48}
                    autoComplete="off"
                    disabled={loading}
                    onChange={(e) => {
                      form.setFieldsValue({
                        source_name: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
                  />
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
                    options={getSelectArray(
                      dropdownData?.sourceTypeList,
                      "source_type_name",
                      "id"
                    )}
                    disabled={loading}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="utm_source" label="UTM Source">
                  <Input
                    maxLength={48}
                    autoComplete="off"
                    disabled={loading}
                    onChange={(e) => {
                      form.setFieldsValue({
                        utm_source: e.target.value?.trim(),
                      });
                      if (!e.target.value?.trim()) {
                        form.setFieldsValue({ utm_medium: null });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              {utmSource?.trim() ? (
                <Col xs={24}>
                  <Form.Item name="utm_medium" label="UTM Medium">
                    <Input
                      maxLength={48}
                      autoComplete="off"
                      disabled={loading}
                      onChange={(e) => {
                        form.setFieldsValue({
                          utm_medium: e.target.value?.trim(),
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
              ) : null}
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddEditSource;
