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
} from "antd";
import React, { useEffect } from "react";
import "../index.scss";

const { TextArea } = Input;

const UpdatePreviousSchoolData = ({
  modalData,
  handleUpdatePreviousSchoolData,
  closeModal,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleUpdatePreviousSchoolData(values);
    form.resetFields();
  };

  useEffect(() => {
    if (
      modalData?.data &&
      ["Update Previous School"].includes(modalData?.type)
    ) {
      form.setFieldsValue({
        previous_school_name: modalData?.data?.previous_school_name,
        previous_grade: modalData?.data?.previous_grade,
        previous_board_name: modalData?.data?.previous_board,
        previous_percentage: modalData?.data?.previous_percentage,
        reason_for_leaving_school: modalData?.data?.reason_for_leaving_school,
        pre_school_tieup: modalData?.data?.pre_school_tieup,
      });
    }
  }, [modalData]);

  const validateMax = (rule, value) => {
    if (value > 100) {
      return Promise.reject("Percentage cannot exceed 100");
    }
    return Promise.resolve();
  };

  return (
    <Modal
      centered
      open={
        modalData?.show && ["Update Previous School"].includes(modalData?.type)
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
          onClick={() => form.submit()}
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
                  name="previous_school_name"
                  label="Previous School Name"
                >
                  <Input
                    maxLength={48}
                    autoComplete="off"
                    onChange={(e) => {
                      form.setFieldsValue({
                        previous_school_name: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="previous_grade" label="Previous Child Grade">
                  <Select
                    className="w-100"
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={[]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="previous_board_name"
                  label="Previous Board Name"
                >
                  <Input
                    maxLength={48}
                    autoComplete="off"
                    onChange={(e) => {
                      form.setFieldsValue({
                        previous_board_name: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="previous_percentage"
                  label="Previous Percentage"
                  rules={[{ validator: validateMax }]}
                >
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                    max={100}
                    addonAfter="%"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="reason_for_leaving_school"
                  label="Reason For Leaving School"
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="pre_school_tieup" label="Pre School Tieup">
                  <Select
                    className="w-100"
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={[]}
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

export default UpdatePreviousSchoolData;
