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
  Tooltip,
  Typography,
  message,
} from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import getArrayValues from "../../../utils/getArrayValues";
import { MdClose, MdDelete, MdEdit, MdLink } from "react-icons/md";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";
import dayjs from "dayjs";

const { TextArea } = Input;

const AddEditEvent = ({
  modalData,
  handleAddEditEvent,
  closeModal,
  dropdownData,
}) => {
  const [form] = Form.useForm();
  const hotspotData = Form.useWatch("hotspot", form);
  const eventStartDate = Form.useWatch("event_start_date", form);
  const eventEndDate = Form.useWatch("event_end_date", form);
  const [selectedDay, setSelectedDay] = useState([]);
  const [updatedDateList, setUpdatedDateList] = useState([]);

  const clearData = () => {
    setSelectedDay([]);
    setUpdatedDateList([]);
  };

  const dayList = [
    { id: 0, name: "Su", full_name: "sunday" },
    { id: 1, name: "M", full_name: "monday" },
    { id: 2, name: "Tu", full_name: "tuesday" },
    { id: 3, name: "W", full_name: "wednesday" },
    { id: 4, name: "Th", full_name: "thursday" },
    { id: 5, name: "F", full_name: "friday" },
    { id: 6, name: "Sa", full_name: "saturday" },
  ];

  const getDaysOfWeekBetweenDates = (sDate, eDate) => {
    const startDate = new Date(sDate);
    const endDate = new Date(eDate);

    endDate.setDate(endDate.getDate() + 1);

    const daysOfWeek = [];

    let i = 0;

    while (i < 7 && startDate < endDate) {
      daysOfWeek.push(startDate.getDay());
      startDate.setDate(startDate.getDate() + 1);
      i++;
    }

    return daysOfWeek;
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleAddEditEvent(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data && ["Update Event"].includes(modalData?.type)) {
      form.setFieldsValue({
        event_name: modalData?.data?.event_name,
        branch: modalData?.data?.branch?.id,
        hotspot_type: modalData?.data?.hotspot_type?.id,
        hotspot: modalData?.data?.hotspot?.id,
        event_cost: modalData?.data?.event_cost,
        event_start_date: dayjs(
          modalData?.data?.start_date,
          "YYYY-MM-DD HH:mm"
        ),
        event_end_date: dayjs(modalData?.data?.end_date, "YYYY-MM-DD HH:mm"),
      });
    } else {
      form.setFieldsValue({ event_start_date: null, event_end_date: null });
    }
  }, [modalData]);

  const disabledStartDate = (current) => {
    // Disable all dates before today
    return current && current < dayjs().startOf("day");
  };

  const disabledEndDate = (current) => {
    return (
      current &&
      (current < dayjs(eventStartDate).startOf("day") ||
        current > dayjs(eventStartDate).add(30, "days").endOf("day"))
    );
  };

  const renderViewDetails = (label, data, span = 1) => {
    return (
      <Descriptions.Item label={label} span={span}>
        {data}
      </Descriptions.Item>
    );
  };

  const handleCheckedList = (id) => {
    const myCheckedList = [...selectedDay];
    if (!myCheckedList.includes(id)) {
      myCheckedList.push(id);
    } else {
      if (myCheckedList.length !== 1) {
        const index = myCheckedList.indexOf(id);
        myCheckedList.splice(index, 1);
      }
    }
    setSelectedDay(myCheckedList);
  };

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={modalData?.data ? "Update Event" : "Add Event"}
          onClose={() => {
            closeModal();
            clearData();
            form.resetFields();
          }}
        />
      }
      onClose={() => {
        closeModal();
        clearData();
        form.resetFields();
      }}
      open={
        modalData?.show &&
        ["Add Event", "Update Event"].includes(modalData?.type)
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
              clearData();
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
                <Form.Item
                  name="event_name"
                  label="Event Name"
                  rules={[
                    { required: true, message: "Please Enter Event Name" },
                  ]}
                >
                  <Input maxLength={48} autoComplete="off" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="hotspot_type"
                  label="Hotspot Type"
                  rules={[
                    { required: true, message: "Please Select Hotspot TYpe" },
                  ]}
                >
                  <Select
                    className="w-100"
                    options={dropdownData?.source?.filter(
                      (each) => each.value !== 0
                    )}
                    onChange={() => {
                      form.setFieldsValue({ hotspot: null });
                    }}
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
                  name="branch"
                  label="Branch"
                  rules={[{ required: true, message: "Please Select Branch" }]}
                >
                  <Select
                    className="w-100"
                    options={dropdownData?.branch?.filter(
                      (each) => each.value !== 0
                    )}
                    onChange={() => {
                      form.setFieldsValue({ hotspot: null });
                    }}
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
                  name="hotspot"
                  label="Hotspot"
                  rules={[{ required: true, message: "Please Select Hotspot" }]}
                >
                  <Select
                    className="w-100"
                    options={[{ label: "Hotspot 1", value: "hotspot 1" }]}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              {hotspotData ? (
                <Col xs={24} className="mt-2">
                  <Row className="d-flex flex-row" gutter={[8, 8]}>
                    <Col xs={24}>
                      <Typography
                        style={{
                          textDecoration: "underline",
                        }}
                        className="th-12 th-fw-500"
                      >
                        Hotspot Details
                      </Typography>
                    </Col>
                    <Col xs={24}>
                      <Descriptions
                        column={2}
                        layout="vertical"
                        className="update-event-description"
                      >
                        {renderViewDetails("Address", "Test Address")}
                        {renderViewDetails("Contact Name", "Test Contact Name")}
                        {renderViewDetails("Contact No.", "3234232322")}
                        {renderViewDetails("Contact Email", "Test@gmail.com")}
                      </Descriptions>
                    </Col>
                  </Row>
                </Col>
              ) : null}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Event Cost"
                  name="event_cost"
                  rules={[
                    { required: true, message: "Please Enter Event Cost" },
                  ]}
                >
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="event_start_date"
                  label="Event Start Date"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Event Start Date",
                    },
                  ]}
                >
                  <DatePicker
                    showTime={{
                      use12Hours: true,
                      format: "h:mm a",
                    }}
                    onChange={() => {
                      form.setFieldsValue({ event_end_date: null });
                    }}
                    format={"DD/MM/YYYY hh:mm a"}
                    className="w-100"
                    disabledDate={disabledStartDate}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="event_end_date"
                  label="Event End Date"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Event End Date",
                    },
                  ]}
                >
                  <DatePicker
                    showTime={{
                      use12Hours: true,
                      format: "h:mm a",
                    }}
                    disabled={!eventStartDate}
                    format={"DD/MM/YYYY hh:mm a"}
                    className="w-100"
                    onChange={(date) => {
                      setSelectedDay(
                        getDaysOfWeekBetweenDates(
                          dayjs(eventStartDate).format("YYYY-MM-DD"),
                          dayjs(date).format("YYYY-MM-DD")
                        )
                      );
                      setUpdatedDateList(
                        dayList.filter((item) =>
                          getDaysOfWeekBetweenDates(
                            dayjs(eventStartDate).format("YYYY-MM-DD"),
                            dayjs(date).format("YYYY-MM-DD")
                          ).includes(item.id)
                        )
                      );
                    }}
                    disabledDate={disabledEndDate}
                  />
                </Form.Item>
              </Col>
              {eventStartDate &&
              eventEndDate &&
              dayjs(eventStartDate).format("YYYY-MM-DD") !==
                dayjs(eventEndDate).format("YYYY-MM-DD") ? (
                <Col xs={24} md={12} className="mt-3">
                  <Row>
                    <Col xs={24}>
                      <Typography className="th-11 th-fw-500">
                        Repeat On
                      </Typography>
                    </Col>
                    <Col xs={24} className="mt-1">
                      <Row className="d-flex flex-row" gutter={[6, 6]}>
                        {updatedDateList.map((item, index) => (
                          <Col key={index}>
                            <Tooltip title={item.full_name}>
                              <div
                                style={{
                                  backgroundColor: selectedDay.includes(item.id)
                                    ? "#1F74E7"
                                    : "#F1F3F4",
                                  borderRadius: 50,
                                  cursor: "pointer",
                                  padding: "7px",
                                }}
                                onClick={() => {
                                  handleCheckedList(item.id);
                                }}
                              >
                                <Typography
                                  style={{
                                    color: selectedDay.includes(item.id)
                                      ? "white"
                                      : "black",
                                    width: 14,
                                    height: 14,
                                    textAlign: "center",
                                  }}
                                  className="th-11"
                                >
                                  {item.name}
                                </Typography>
                              </div>
                            </Tooltip>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              ) : null}
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AddEditEvent;
