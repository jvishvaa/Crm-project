import {
  Button,
  Checkbox,
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

const { RangePicker } = DatePicker;

const DownloadReport = ({ modalData, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data && modalData.type === "Download Report") {
      form.setFieldsValue({});
    }
  }, [modalData]);

  return (
    <Modal
      centered
      open={modalData?.show && modalData.type === "Download Report"}
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
          loading={loading}
          onClick={() => form.submit()}
          size="small"
        >
          Download
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <Typography style={{ fontSize: 14, fontWeight: 600 }}>
            Download Report
          </Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="report_column"
                  label="Select Column"
                  rules={[
                    { required: true, message: "Please Select Report Column" },
                  ]}
                >
                  <Select
                    className="w-100"
                    mode="multiple"
                    options={[
                      { label: "Lead Name", value: "Lead Name" },
                      { label: "Lead Status", value: "Lead Status" },
                      { label: "Lead Source", value: "Lead Source" },
                    ]}
                    allowClear
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
    </Modal>
  );
};

export default DownloadReport;
