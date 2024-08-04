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
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import "../index.scss";

const AddUpdateChild = ({ modalData, handleAddUpdateChild, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleAddUpdateChild(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data && ["Update Child"].includes(modalData?.type)) {
      form.setFieldsValue({
        child_name: modalData?.data?.child_name,
        child_grade: modalData?.data?.child_grade,
        child_dob: modalData?.data?.child_dob,
        child_gender: modalData?.data?.child_gender,
      });
    }
  }, [modalData]);

  return (
    <Modal
      centered
      open={
        modalData?.show &&
        ["Add Child", "Update Child"].includes(modalData?.type)
      }
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
          <Typography className="th-14 th-fw-600">{modalData?.type}</Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="child_name"
                  label="Child Name"
                  rules={[
                    { required: true, message: "Please Enter Child Name" },
                  ]}
                >
                  <Input
                    maxLength={48}
                    autoComplete="off"
                    disabled={loading}
                    onChange={(e) => {
                      form.setFieldsValue({
                        child_name: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="child_grade"
                  label="Child Grade"
                  rules={[
                    { required: true, message: "Please Select Child Grade" },
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
                  name="child_dob"
                  label="Child Date of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Child Date of Birth",
                    },
                  ]}
                >
                  <DatePicker className="w-100" disabled={loading} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="child_gender"
                  label="Child Gender"
                  rules={[
                    { required: true, message: "Please Select Child Gender" },
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
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddUpdateChild;
