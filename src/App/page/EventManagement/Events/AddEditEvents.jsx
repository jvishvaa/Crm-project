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
import { MdOutlineCurrencyRupee } from "react-icons/md";
import getArrayValues from "../../../utils/getArrayValues";
import { MdClose, MdDelete, MdEdit, MdLink } from "react-icons/md";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";
import dayjs from "dayjs";
import axios from "axios";
import urls from "../../../utils/urls";
import RenderTagMultiple from "../../../component/UtilComponents/RenderMultiple";

const { TextArea } = Input;

const AddEditEvent = ({
  modalData,
  handleAddEditEvent,
  closeModal,
  dropdownData,
}) => {
  const [form] = Form.useForm();
  const hotspotData = Form.useWatch("hotspot", form);
  const eventStartDate = Form.useWatch("event_start_date_time", form);
  const eventEndDate = Form.useWatch("event_start_date_time", form);
  const [selectedDay, setSelectedDay] = useState([]);
  const [updatedDateList, setUpdatedDateList] = useState([]);
  const [loading, setLoading] = useState(false);

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

  console.log("selectedDay", modalData?.data);

  const onFinish = (values) => {
    console.log("Received values:", values);
    setLoading(true);

    if (!modalData?.data) {
      // Add new event
      axios
        .post(`${urls.eventManagement.events}`, values)
        .then((res) => {
          const data = res?.data;
          console.log(data, "data");
          message.success(data?.message || "Event added successfully");
          handleAddEditEvent(data); // Update parent component state if needed
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response?.data?.message || "Something went wrong");
        })
        .finally(() => {
          closeModal();
          setLoading(false);
          form.resetFields();
        });
    } else {
      // Update existing event
      let event_id = modalData?.data?.id;
      axios
        .put(`${urls.eventManagement.events}${event_id}/`, values)
        .then((res) => {
          const data = res?.data;
          console.log(data, "data");
          message.success(data?.message || "Event updated successfully");
          handleAddEditEvent(data); // Update parent component state if needed
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response?.data?.message || "Something went wrong");
        })
        .finally(() => {
          closeModal();
          setLoading(false);
          form.resetFields();
        });
    }
  };
  console.log(modalData, 'modalDataevents');

  const renderTagAll = (label, value, index, key) => {
    let selectedItems = form.getFieldsValue()?.[key];
    const showCloseIcon = !selectedItems?.includes(0);
    return (
      <RenderTagMultiple
        label={label}
        value={value}
        showCloseIcon={showCloseIcon}
        onClose={(closeValue) => {
          if (selectedItems?.length === 1) {
            form.setFieldsValue({ [key]: [0] });
          } else {
            form.setFieldsValue({
              [key]: selectedItems.filter((each) => each !== closeValue),
            });
          }
        }}
      />
    );
  };

  useEffect(() => {
    if (modalData?.data && ["Update Event"].includes(modalData?.type)) {
      form.setFieldsValue({
        event_name: modalData?.data?.event_name,
        branch: modalData?.data?.branch_name,
        hotspot_type: modalData?.data?.hotspotdata?.hotspot_type,
        hotspot_data: modalData?.data?.hotspotdata?.hotspot_name,
        event_cost: modalData?.data?.event_cost,
        event_start_date_time: dayjs(
          modalData?.data?.event_start_date_time,
          "YYYY-MM-DD HH:mm"
        ),
        event_end_date_time: dayjs(modalData?.data?.event_end_date_time, "YYYY-MM-DD HH:mm"),
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
      closable={false}
      maskClosable={false}
      footer={
        <div style={{ textAlign: "right" }}>
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
            loading={loading}
            disabled={loading}
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
              <Col span={24}>
                <Form.Item
                  name="event_name"
                  label="Event Name"
                  rules={[
                    { required: true, message: "Please Enter Event Name" },
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
              <Col span={24}>
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
                      form.setFieldsValue({ hotspot_data: null });
                    }}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="branch"
                  label="Branch"
                  rules={[{ required: true, message: "Please Select Branch" }]}
                >
                  <Select
                    className="w-100"
                    mode="single"
                    options={dropdownData?.branch?.map((item, ind) => {
                      return {
                        value: item?.id,
                        label: item?.branch_name,
                      };
                    })}
                    tagRender={(props) =>
                      renderTagAll(
                        props.label,
                        props.value,
                        props.index,
                        "branch"
                      )
                    }
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="hotspot_data"
                  label="Hotspot"
                  rules={[{ required: true, message: "Please Select Hotspot" }]}
                >
                  <Select
                    className="w-100"
                    mode="single"
                    options={dropdownData?.hotspot?.map((item, ind) => {
                      return {
                        value: item?.id,
                        label: item?.hotspot_name,
                      };
                    })}
                    tagRender={(props) =>
                      renderTagAll(
                        props.label,
                        props.value,
                        props.index,
                        "hotspot_data"
                      )
                    }
                    showSearch
                    allowClear
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
              <Col span={24}>
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
                    onChange={(e) => {
                      if (Number(e.target.value) <= 99999999999999) {
                        form.setFieldsValue({
                          event_cost: e.target.value,
                        });
                      } else {
                        form.setFieldsValue({
                          event_cost: Number(
                            e.target.value?.toString()?.slice(0, -1)
                          ),
                        });
                      }
                    }}
                    prefix={<MdOutlineCurrencyRupee />}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="event_start_date_time"
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
                      form.setFieldsValue({ event_end_date_time: null });
                    }}
                    format={"DD/MM/YYYY hh:mm a"}
                    className="w-100"
                    disabledDate={disabledStartDate}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="event_end_date_time"
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
