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

const { TextArea } = Input;

const AddEditNewspaperInsert = ({
  modalData,
  handleAddEditNewspaperInsert,
  closeModal,
  dropdownData,
}) => {
  const [form] = Form.useForm();

  const { width } = useWindowDimensions();

  const onFinish = (values) => {
    handleAddEditNewspaperInsert(values);

    form.resetFields();
  };

  const clearData = () => {};

  useEffect(() => {
    if (modalData?.data) {
      form.setFieldsValue({});
    }
    if (!modalData?.data) {
      form.setFieldsValue({ date: dayjs("2022-02-02", "YYYY-MM-DD") });
    }
  }, [modalData]);

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={
            modalData?.data ? "Update Newspaper Insert" : "Add Newspaper Insert"
          }
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
        ["Add Newspaper Insert", "Update Newspaper Insert"].includes(
          modalData?.type
        )
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
              <Col xs={24} md={12}>
                <Form.Item name="date" label="Date">
                  <DatePicker className="w-100" format={"DD/MM/YYYY"} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AddEditNewspaperInsert;
