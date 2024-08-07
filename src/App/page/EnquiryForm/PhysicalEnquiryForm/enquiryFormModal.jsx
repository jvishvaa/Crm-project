import { Col, Form, Input, message, Modal, Row } from "antd";
import React from "react";
import { useState } from "react";
import FileUpload from "./fileUpload";

const EnquiryFormModal = ({ modalData, onClose }) => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);
  const handleClose = () => {
    form.resetFields(["enquiry_no"]);
    setFiles([]);
    onClose();
  };
  return (
    <Modal
      open={modalData?.open}
      onCancel={handleClose}
      title={modalData?.details ? "Edit Enquiry Form" : "Upload Enquiry Form"}
    >
      <Form form={form} layout="vertical" onFinish={handleClose}>
        <Row>
          <Col xs={24}>
            <Form.Item
              name="enquiry_no"
              initialValue={
                modalData?.details ? modalData?.details?.enquiry_no : ""
              }
              label="Enquiry No."
              rules={[{ required: true, message: "Please Select PRM" }]}
            >
              <Input disabled={modalData?.details} className="w-100" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <FileUpload files={files} setFiles={setFiles} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EnquiryFormModal;
