import React, { useEffect, useState } from "react";
import "./index.scss";
import {
  Row,
  Col,
  Divider,
  Table,
  Spin,
  Button,
  Form,
  Select,
  Switch,
  Popconfirm,
  Tag,
  Input,
} from "antd";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import CustomFilterText from "../../../component/UtilComponents/CustomFilterText";
import getRoutePathDetails from "../../../utils/getRoutePathDetails";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import AddEditActivityStatus from "./addEditActivityStatus";
import getArrayValues from "../../../utils/getArrayValues";
import { MdEdit } from "react-icons/md";
import getColour from "../../../utils/getColour";

const ActivityStatus = () => {
  const [form] = Form.useForm();
  const [selectedTab, setSelectedTab] = useState(1);
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFetched, setSearchFetched] = useState(false);
  const [getSelected, setGetSelected] = useState(true);
  const [modalData, setModalData] = useState({ show: false, data: null });
  const { width } = useWindowDimensions();

  useEffect(() => {
    form.setFieldsValue({ is_active: true, type: 0 });
  }, []);

  const items = [
    {
      key: 1,
      label: "Tabular",
    },
    {
      key: 2,
      label: "Hierarchical",
    },
  ];

  const onChangeTab = (key) => {
    setSelectedTab(key);
  };

  const getActivityData = () => {
    // setLoading(true);
    setStatusData([
      {
        id: 1,
        status_name: "Call Not Made",
        is_default: true,
        is_active: true,
        is_datetime_required: false,
        is_schedule_datetime_required: false,
        is_check_in_out_required: false,
        is_dormant: false,
        no_of_time_to_dormant: null,
        type: "Level 1",
        next_status: [
          { id: 2, status_name: "Call Picked Up" },
          { id: 3, status_name: "Not Responding" },
        ],
      },
      {
        id: 2,
        status_name: "Call Picked Up",
        is_default: false,
        is_active: true,
        is_datetime_required: true,
        is_schedule_datetime_required: false,
        is_check_in_out_required: false,
        is_dormant: false,
        no_of_time_to_dormant: null,
        type: "Level 1",
        next_status: [
          { id: 4, status_name: "Home Counselling Scheduled" },
          { id: 5, status_name: "Walkin Scheduled" },
        ],
      },
      {
        id: 3,
        status_name: "Not Responding",
        is_default: false,
        is_active: true,
        is_datetime_required: false,
        is_schedule_datetime_required: false,
        is_check_in_out_required: false,
        is_dormant: true,
        no_of_time_to_dormant: 3,
        type: "Level 1",
        next_status: [
          { id: 6, status_name: "Invalid Number" },
          { id: 7, status_name: "Ringing" },
        ],
      },
    ]);
  };

  useEffect(() => {
    getActivityData();
  }, []);

  const handleOnChange = () => {
    setStatusData(null);
    setSearch("");
    setSearchFetched("");
    setGetSelected(false);
  };

  const handleStatusChange = (data) => {};

  const columns = [
    {
      title: "Sr No.",
      key: "index",
      render: (text, record, index) => index + 1,
      align: "center",
      width: 70,
    },
    {
      title: "Status Name",
      key: "status_name",
      render: (record) => <span>{record?.status_name}</span>,
      align: "center",
    },
    {
      title: "Type",
      key: "type",
      render: (record) => <span>{record?.type}</span>,
      align: "center",
      width: 80,
    },
    {
      title: "Next Status",
      key: "next_status",
      render: (record) => (
        <span>
          {record?.next_status?.length
            ? getArrayValues(record?.next_status, "status_name")?.join(", ")
            : "--"}
        </span>
      ),
      align: "center",
    },
    {
      title: "Is Date Time Required",
      key: "is_date_time_required",
      render: (record) => (
        <span>{record?.is_datetime_required ? "Yes" : "No"}</span>
      ),
      align: "center",
      width: 70,
    },
    {
      title: "Is Check In Out Required",
      key: "is_check_in_out_required",
      render: (record) => (
        <span>{record?.is_check_in_out_required ? "Yes" : "No"}</span>
      ),
      align: "center",
      width: 70,
    },
    {
      title: "Is Schedule Date Time Required",
      key: "is_schedule_date_time_required",
      render: (record) => (
        <span>{record?.is_schedule_date_time_required ? "Yes" : "No"}</span>
      ),
      align: "center",
      width: 100,
    },
    {
      title: "Is Dormant (No. of times to make dormant)",
      key: "is_dormant",
      render: (record) => (
        <span>
          {record?.is_dormant
            ? `Yes (${record?.no_of_time_to_dormant} times)`
            : "No"}
        </span>
      ),
      align: "center",
      width: 130,
    },
    {
      title: "Default",
      key: "default",
      render: (record) => <span>{record?.is_default ? "Yes" : "No"}</span>,
      align: "center",
      width: 70,
    },
    {
      title: "Status",
      key: "is_active",
      render: (record) => (
        <>
          {getRoutePathDetails().modify && !record.is_default ? (
            <Popconfirm
              title={`Are you sure to update "${record?.status_name}" as ${
                record?.is_active ? "inactive" : "active"
              }?`}
              onConfirm={() => handleStatusChange(record)}
              okText="Yes"
              cancelText="No"
            >
              <Switch
                checked={record?.is_active}
                style={{
                  backgroundColor: record.is_active
                    ? getColour("active")
                    : getColour("inactive"),
                }}
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </Popconfirm>
          ) : (
            <Tag
              color={
                record?.is_active ? getColour("active") : getColour("inactive")
              }
            >
              {record?.is_active ? "Active" : "Inactive"}
            </Tag>
          )}
        </>
      ),
      align: "center",
      width: 100,
    },
    ...(getRoutePathDetails().modify
      ? [
          {
            title: "Action",
            key: "action",
            render: (record) => (
              <>
                <Button
                  type="text"
                  size="small"
                  className="edit-button"
                  onClick={() => {
                    setModalData({ show: true, data: record });
                  }}
                  icon={<MdEdit size={20} />}
                />
              </>
            ),
            align: "center",
            width: 70,
          },
        ]
      : []),
  ];

  return (
    <CustomCard>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between align-content-center">
                <Col>
                  <CustomBreadCrumbs data={["Activity Status"]} />
                </Col>
                {selectedTab === 1 ? (
                  <Col>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        setModalData({ show: true, data: null });
                      }}
                    >
                      + Add Activity Status
                    </Button>
                  </Col>
                ) : null}
              </Row>
            </Col>
            <Col xs={24} className="mt-1">
              <Divider />
            </Col>
          </Row>
        </Col>
        <Col xs={24} style={{ marginTop: -10 }}>
          <Spin spinning={loading} tip="Loading">
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={() => {
                    setGetSelected(true);
                    getActivityData();
                  }}
                >
                  <Row gutter={[8, 0]}>
                    <Col xs={12} sm={7} xl={6}>
                      <Form.Item className="w-100" name="type" label="Type">
                        <Select
                          className="w-100"
                          onChange={(value) => {
                            handleOnChange();
                          }}
                          options={[
                            {
                              value: 0,
                              label: "All",
                            },
                            {
                              value: "level 1",
                              label: "Level 1",
                            },
                            {
                              value: "Level 2",
                              label: "Level 2",
                            },
                          ]}
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={7} xl={6}>
                      <Form.Item
                        className="w-100"
                        name="is_active"
                        label="Status"
                      >
                        <Select
                          className="w-100"
                          onChange={() => {
                            handleOnChange();
                          }}
                          options={[
                            {
                              value: 0,
                              label: "All",
                            },
                            {
                              value: true,
                              label: "Active",
                            },
                            {
                              value: false,
                              label: "Inactive",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={5}
                      sm={3}
                      md={3}
                      lg={1}
                      className="d-flex align-items-end"
                    >
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Filter
                        </Button>
                      </Form.Item>
                    </Col>
                    {getSelected ? (
                      <Col
                        xs={19}
                        sm={7}
                        md={7}
                        lg={9}
                        xl={11}
                        className="d-flex justify-content-end"
                      >
                        <Input
                          placeholder="Search Status"
                          style={{
                            height: 30,
                            maxWidth: 220,
                            marginTop: width < 576 ? 14 : 34,
                          }}
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setSearchFetched(false);
                          }}
                          onPressEnter={() => {
                            setSearchFetched(true);
                          }}
                          maxLength={48}
                          suffix={
                            searchFetched ? (
                              <CloseOutlined
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setSearchFetched(true);
                                  setSearch("");
                                }}
                              />
                            ) : (
                              <SearchOutlined
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setSearchFetched(true);
                                }}
                              />
                            )
                          }
                        />
                      </Col>
                    ) : null}
                  </Row>
                </Form>
              </Col>
              <Col xs={24}>
                {statusData ? (
                  <Table
                    dataSource={statusData || []}
                    columns={columns}
                    pagination={false}
                    bordered={true}
                  />
                ) : (
                  <CustomFilterText />
                )}
              </Col>
            </Row>
          </Spin>
        </Col>
      </Row>
      <AddEditActivityStatus
        modalData={modalData}
        handleAddEditActvityStatus={() => {}}
        closeModal={() => {
          setModalData({ show: false, data: null });
        }}
        statusList={statusData}
      />
    </CustomCard>
  );
};

export default ActivityStatus;
