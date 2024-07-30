import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Tooltip,
  Typography,
  message,
} from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import getArrayValues from "../../utils/getArrayValues";
import { MdClose, MdDelete, MdEdit, MdLink } from "react-icons/md";
import CustomDrawerHeader from "../../component/UtilComponents/CustomDrawerHeader";
import dayjs from "dayjs";

const { TextArea } = Input;

const UpdateUser = ({
  modalData,
  handleAddEditEvent,
  closeModal,
  dropdownData,
}) => {
  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={modalData?.data ? "Edit Event" : "Add Event"}
          onClose={() => {
            closeModal();
          }}
        />
      }
      onClose={() => {
        closeModal();
      }}
      open={
        modalData?.show && ["Add Event", "View Event"].includes(modalData?.type)
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
            }}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button size="small" onClick={() => {}} type="primary">
            {modalData?.data ? "Update" : "Save"}
          </Button>
        </div>
      }
    >
      <Row>
        <Col xs={24} className="pb-2"></Col>
      </Row>
    </Drawer>
  );
};

export default UpdateUser;
