import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import CustomDrawerHeader from "../../component/UtilComponents/CustomDrawerHeader";
import useWindowDimensions from "../../component/UtilComponents/useWindowDimensions";

const { TextArea } = Input;

const UpdateUser = ({
  modalData,
  handleUpdateUser,
  closeModal,
  dropdownData,
}) => {
  const [form] = Form.useForm();
  const { width } = useWindowDimensions();

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleUpdateUser(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data && ["Update User"].includes(modalData?.type)) {
      form.setFieldsValue({
        contact_no: modalData?.data?.contact_no,
        email: modalData?.data?.email,
        field_type: modalData?.data?.field_type,
      });
    }
  }, [modalData]);

  const renderViewDetails = (label, data, span = 1) => {
    return (
      <Descriptions.Item label={label} span={span}>
        {data}
      </Descriptions.Item>
    );
  };

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={"Update User"}
          onClose={() => {
            closeModal();
            form.resetFields();
          }}
        />
      }
      onClose={() => {
        closeModal();
        form.resetFields();
      }}
      open={modalData?.show && ["Update User"].includes(modalData?.type)}
      size="large"
      closable={false}
      maskClosable={false}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            size="small"
            onClick={() => {
              closeModal();
              form.resetFields();
            }}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            onClick={() => {
              form.submit();
            }}
            type="primary"
          >
            Update
          </Button>
        </div>
      }
    >
      <Row>
        <Col xs={24} className="pb-2">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[8, 0]}>
              <Col xs={24} className="mt-2">
                <Descriptions
                  column={2}
                  layout="vertical"
                  className="update-user-description"
                >
                  {renderViewDetails("Name", "Anik Chowdhury")}
                  {renderViewDetails("ERP", "20398383773_OLV")}
                  {renderViewDetails(
                    "Branch",
                    "Branch 1, Branch 2",
                    width < 768 ? 2 : 1
                  )}
                  {renderViewDetails("UserLevel", "Superadmin")}
                </Descriptions>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="contact_no"
                  label="Contact Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your contact number!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault();
                    }}
                    onChange={(e) => {
                      if (Number(e.target.value) <= 9999999999) {
                        form.setFieldsValue({
                          contact_no: e.target.value,
                        });
                      } else {
                        form.setFieldsValue({
                          contact_no: Number(
                            e.target.value?.toString()?.slice(0, -1)
                          ),
                        });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    type="email"
                    onChange={(e) => {
                      form.setFieldsValue({
                        email: e.target.value?.trimStart()?.replace("  ", " "),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="field_type"
                  label="Field Type"
                  rules={[
                    { required: true, message: "Please Select Field Type!" },
                  ]}
                >
                  <Select
                    className="w-100"
                    options={[]}
                    onChange={() => {
                      form.setFieldsValue({ hotspot: null });
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
};

export default UpdateUser;
