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

const AddEditActivityStatus = ({
  modalData,
  handleAddEditActvityStatus,
  closeModal,
  statusList,
}) => {
  const [form] = Form.useForm();
  const isDormant = Form.useWatch("is_dormant", form);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleAddEditActvityStatus(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data) {
      form.setFieldsValue({
        status_name: modalData?.data?.status_name,
        type: modalData?.data?.type,
        next_status: getArrayValues(modalData?.data?.next_status, "id"),
        is_datetime_required: modalData?.data?.is_datetime_required,
        is_check_in_out_required: modalData?.data?.is_check_in_out_required,
        is_schedule_date_time_required:
          modalData?.data?.is_schedule_date_time_required,
        is_dormant: modalData?.data?.is_dormant,
        no_of_time_to_dormant: modalData?.data?.no_of_time_to_dormant,
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
            {modalData?.data ? "Edit Activity Status" : "Add Activity Status"}
          </Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="status_name"
                  label="Status Name"
                  rules={[
                    { required: true, message: "Please Enter Status Name" },
                  ]}
                >
                  <Input maxLength={48} autoComplete="off" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: "Please Select Type" }]}
                >
                  <Select
                    className="w-100"
                    options={[
                      { label: "Level 1", value: "Level 1" },
                      { label: "Level 2", value: "Level 2" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="next_status" label="Next Status">
                  <Select
                    className="w-100"
                    mode="multiple"
                    options={
                      statusList
                        ? statusList?.map((each) => {
                            return {
                              label: each?.status_name,
                              value: each?.id,
                            };
                          })
                        : []
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="is_datetime_required" valuePropName="checked">
                  <Checkbox className="activity-type-checkbox">
                    Is Date Time Required
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="is_check_in_out_required"
                  valuePropName="checked"
                >
                  <Checkbox className="activity-type-checkbox">
                    Is Check In Out Required
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="is_check_in_out_required"
                  valuePropName="checked"
                >
                  <Checkbox className="activity-type-checkbox">
                    Is Schedule DateTime Required
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={10}>
                <Form.Item name="is_dormant" valuePropName="checked">
                  <Checkbox
                    className="activity-type-checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        form.setFieldsValue({ no_of_time_to_dormant: 1 });
                      } else {
                        form.setFieldsValue({ no_of_time_to_dormant: null });
                      }
                    }}
                  >
                    Is Dormant
                  </Checkbox>
                </Form.Item>
              </Col>
              {isDormant ? (
                <Col xs={14}>
                  <Row
                    className="d-flex flex-row align-items-center"
                    gutter={[8, 8]}
                  >
                    <Col xs={8}>
                      <Form.Item name="no_of_time_to_dormant">
                        <Input
                          type="number"
                          autoComplete="off"
                          onKeyDown={(e) => {
                            ["e", "E", "+", "-", "."].includes(e.key) &&
                              e.preventDefault();
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={16}>
                      <Typography
                        style={{ fontSize: 12, lineHeight: 1.4 }}
                        className="mt-2"
                      >
                        {" "}
                        times to make dormant
                      </Typography>
                    </Col>
                  </Row>
                </Col>
              ) : null}
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddEditActivityStatus;
