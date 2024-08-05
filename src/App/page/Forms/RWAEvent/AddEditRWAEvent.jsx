import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Progress,
  Radio,
  Row,
  Select,
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
import dayjs from "dayjs";
import UploadFile from "../../../component/UtilComponents/UploadFile";
import getExtensions from "../../../utils/getExtensions";
import VideoPreview from "../../../assest/images/video-thumbnail.png";

const { TextArea } = Input;

const AddEditRWAEvent = ({
  modalData,
  handleAddEditRWAEvent,
  closeModal,
  dropdownData,
}) => {
  const [form] = Form.useForm();

  const { width } = useWindowDimensions();

  const onFinish = (values) => {
    handleAddEditRWAEvent(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data && ["Update RWA Event"].includes(modalData?.type)) {
      form.setFieldsValue({
        event_name: modalData?.data?.event_name,
        date: modalData?.data?.date ? dayjs(modalData?.data?.date) : null,
        branch: modalData?.data?.branch?.id,
        total_cost: modalData?.data?.total_event_cost,
        total_lead_collected: modalData?.data?.total_lead_collected,
        total_handi_lead_collected: modalData?.data?.total_handi_lead_collected,
        cpr: modalData?.data?.cpr,
      });
    }
  }, [modalData]);

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={modalData?.data ? "Update RWA Event" : "Add RWA Event"}
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
      open={
        modalData?.show &&
        ["Add RWA Event", "Update RWA Event"].includes(modalData?.type)
      }
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
              <Col xs={12} md={12}>
                <Form.Item
                  label="Event Name"
                  name="event_name"
                  rules={[
                    { required: true, message: "Please Input Event Name" },
                  ]}
                >
                  <Input
                    maxLength={48}
                    autoComplete="off"
                    onChange={(e) => {
                      form.setFieldsValue({
                        event_name: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[{ required: true, message: "Please Select Date" }]}
                >
                  <DatePicker
                    className="w-100"
                    format={"DD/MM/YYYY"}
                    maxDate={dayjs()}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="branch"
                  label="Branch"
                  rules={[{ required: true, message: "Please Select Branch" }]}
                >
                  <Select
                    className="w-100"
                    options={dropdownData?.branch?.filter(
                      (each) => each.value !== 0
                    )}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="total_cost"
                  label="Total Cost (Rs.)"
                  rules={[
                    { required: true, message: "Please Input Total Cost" },
                  ]}
                >
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                    onChange={(e) => {
                      if (Number(e.target.value) <= 99999999999999) {
                        form.setFieldsValue({
                          total_cost: e.target.value,
                        });
                      } else {
                        form.setFieldsValue({
                          total_cost: Number(
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
                  name="total_lead_collected"
                  label="Total Lead Collected"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Total Lead Collected",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                    onChange={(e) => {
                      if (Number(e.target.value) <= 99999999999999) {
                        form.setFieldsValue({
                          total_lead_collected: e.target.value,
                        });
                      } else {
                        form.setFieldsValue({
                          total_lead_collected: Number(
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
                  name="total_handi_lead_collected"
                  label="Total H&I Lead Collected"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Total H&I Lead Collected",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                    onChange={(e) => {
                      if (Number(e.target.value) <= 99999999999999) {
                        form.setFieldsValue({
                          total_handi_lead_collected: e.target.value,
                        });
                      } else {
                        form.setFieldsValue({
                          total_handi_lead_collected: Number(
                            e.target.value?.toString()?.slice(0, -1)
                          ),
                        });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="cpr" label="CPR">
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                    onChange={(e) => {
                      if (Number(e.target.value) <= 99999999999999) {
                        form.setFieldsValue({
                          cpr: e.target.value,
                        });
                      } else {
                        form.setFieldsValue({
                          cpr: Number(e.target.value?.toString()?.slice(0, -1)),
                        });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} className="mt-3">
                <Typography className="th-11 th-fw-500">
                  Note : You can update the details in the form until today.
                </Typography>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AddEditRWAEvent;
