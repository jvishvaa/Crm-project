import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  TimePicker,
  Tooltip,
  Typography,
  message,
} from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import getArrayValues from "../../../utils/getArrayValues";
import { MdClose, MdDelete, MdEdit, MdLink } from "react-icons/md";
import getRoutePathDetails from "../../../utils/getRoutePathDetails";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const AssignRoute = ({
  modalData,
  handleAssignRoute,
  closeModal,
  dropdownData,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleAssignRoute(values);
    form.resetFields();
  };

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={"Route Assign"}
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
      open={modalData?.show && ["Route Assign"].includes(modalData?.type)}
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
            {modalData?.data ? "Update" : "Save"}
          </Button>
        </div>
      }
    >
      <Row>
        <Col xs={24} className="pb-2">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[8, 0]}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="branch"
                  label="Branch"
                  rules={[{ required: true, message: "Please Select Branch" }]}
                >
                  <Select
                    className="w-100"
                    options={dropdownData?.branch}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="bde"
                  label="BDE"
                  rules={[{ required: true, message: "Please Select BDE" }]}
                >
                  <Select
                    className="w-100"
                    options={[]}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[{ required: true, message: "Please Select Date" }]}
                >
                  <DatePicker className="w-100" />
                </Form.Item>
              </Col>
              <Col xs={24} className="mt-2">
                <Divider />
              </Col>
              <Col xs={24} className="mt-2">
                <Typography className="th-12 th-fw-500">Hotspot</Typography>
              </Col>
              <Col xs={24}>
                <Row gutter={[4, 4]}>
                  <Form.List name="hotspots" initialValue={[{}]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <Col xs={24} key={field.key}>
                            <Row gutter={[8, 0]}>
                              <Col
                                xs={1}
                                className="d-flex flex-row align-items-end"
                              >
                                <Typography className="th-12 mb-2">
                                  {index + 1}
                                </Typography>
                              </Col>
                              <Col xs={11} sm={7}>
                                <Form.Item
                                  {...field}
                                  name={[field.name, "hotspotName"]}
                                  label="Hotspot Name"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Hotspot name is required",
                                    },
                                  ]}
                                >
                                  <Select
                                    className="w-100"
                                    options={[]}
                                    allowClear
                                    showSearch
                                    filterOption={(input, option) =>
                                      option.label
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                  />
                                </Form.Item>
                              </Col>

                              <Col xs={12} sm={4}>
                                <Row
                                  className="d-flex flex-row align-items-end h-100"
                                  gutter={[8, 8]}
                                >
                                  {index === fields.length - 1 ? (
                                    <Col>
                                      <Tooltip title="Add Hotspot">
                                        <Button
                                          type="outlined"
                                          onClick={() => add()}
                                          icon={<PlusOutlined />}
                                        />
                                      </Tooltip>
                                    </Col>
                                  ) : null}
                                  {fields?.length > 1 ? (
                                    <Col>
                                      <Tooltip title="Delete Hotspot">
                                        <Popconfirm
                                          title="Are You Sure to remove hotspot? "
                                          onConfirm={() => {
                                            remove(field.name);
                                          }}
                                        >
                                          <Button
                                            type="outlined"
                                            icon={<DeleteOutlined />}
                                          />
                                        </Popconfirm>
                                      </Tooltip>
                                    </Col>
                                  ) : null}
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </>
                    )}
                  </Form.List>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AssignRoute;
