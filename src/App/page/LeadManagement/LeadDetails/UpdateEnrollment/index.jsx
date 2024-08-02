import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import "../index.scss";

const UpdateEnrollment = ({
  modalData,
  handleUpdateEnrollment,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const registrationNo = Form.useWatch("registration_no", form);
  const registrationDate = Form.useWatch("registation_date", form);
  const admissionNo = Form.useWatch("admission_no", form);
  const admissionDate = Form.useWatch("admission_date", form);

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleUpdateEnrollment(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data && ["Update Enrollment"].includes(modalData?.type)) {
      form.setFieldsValue({
        application_no: modalData?.data?.application_no,
        application_date: modalData?.data?.application_date,
        registration_no: modalData?.data?.registration_no,
        registation_date: modalData?.data?.registation_date,
        admission_no: modalData?.data?.admission_no,
        admission_date: modalData?.data?.admission_date,
      });
    }
  }, [modalData]);

  return (
    <Modal
      centered
      open={modalData?.show && ["Update Enrollment"].includes(modalData?.type)}
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
          Update
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
                  name="application_no"
                  label="Application No"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Application No",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                    valueautoComplete="off"
                    addonBefore="AP"
                    disabled={loading}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="application_date"
                  label="Application Date"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Application Date",
                    },
                  ]}
                >
                  <DatePicker className="w-100" disabled={loading} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="registration_no"
                  label="Registration No"
                  rules={[
                    {
                      required:
                        modalData?.data?.registation_completed ||
                        registrationNo ||
                        registrationDate ||
                        admissionNo ||
                        admissionDate
                          ? true
                          : false,
                      message: "Please Enter Registration No",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                    valueautoComplete="off"
                    addonBefore="RG"
                    disabled={loading}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="registation_date"
                  label="Registration Date"
                  rules={[
                    {
                      required:
                        modalData?.data?.registation_completed ||
                        registrationNo ||
                        registrationDate ||
                        admissionNo ||
                        admissionDate
                          ? true
                          : false,
                      message: "Please Select Registration Date",
                    },
                  ]}
                >
                  <DatePicker className="w-100" disabled={loading} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="admission_no"
                  label="Admission No"
                  rules={[
                    {
                      required:
                        modalData?.data?.admission_completed ||
                        admissionNo ||
                        admissionDate
                          ? true
                          : false,
                      message: "Please Enter Admission No",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                    valueautoComplete="off"
                    addonBefore="AD"
                    disabled={loading}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="admission_date"
                  label="Admission Date"
                  rules={[
                    {
                      required:
                        modalData?.data?.admission_completed ||
                        admissionNo ||
                        admissionDate
                          ? true
                          : false,
                      message: "Please Select Admission Date",
                    },
                  ]}
                >
                  <DatePicker className="w-100" disabled={loading} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default UpdateEnrollment;
