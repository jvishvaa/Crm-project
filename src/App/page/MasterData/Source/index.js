import React, { useEffect, useState } from "react";
import "./index.css";
import {
  Row,
  Col,
  Divider,
  Table,
  Spin,
  Popconfirm,
  Switch,
  Button,
  Select,
  Form,
  Tabs,
  Input,
  Tag,
} from "antd";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import getRoutePathDetails from "../../../utils/getRoutePathDetails";
import { CloseOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import AddEditSource from "./addEditSource";
import CustomFilterText from "../../../component/UtilComponents/CustomFilterText";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import RenderTagMultiple from "../../../component/UtilComponents/RenderMultiple";

const Source = () => {
  const [form] = Form.useForm();
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [searchFetched, setSearchFetched] = useState(false);
  const [sourceData, setSourceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getSelected, setGetSelected] = useState(true);
  const [modalData, setModalData] = useState({ show: false, data: null });

  const { width } = useWindowDimensions();

  useEffect(() => {
    form.setFieldsValue({ is_active: true, source_type: [0] });
  }, []);

  const getSourceData = (page, page_size) => {
    setPageData({
      current: page,
      pageSize: page_size,
      total: 2,
    });
    // setLoading(true);
    setSourceData([
      {
        id: 1,
        source_name: "DM-Google",
        is_active: true,
        utm_source: "",
        utm_medium: "",
        source_type: { id: 1, name: "Digital Marketing" },
      },
      {
        id: 2,
        source_name: "DM-Direct",
        is_active: true,
        utm_source: "direct",
        utm_medium: "test",
        source_type: { id: 1, name: "Digital Marketing" },
      },
    ]);
  };

  useEffect(() => {
    getSourceData(pageData?.current, pageData?.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    getSourceData(pagination?.current, pagination?.pageSize);
  };

  const handleOnChange = () => {
    setPageData({ current: 1, pageSize: pageData?.pageSize, total: 0 });
    setSourceData(null);
    setSearch("");
    setSearchFetched("");
    setGetSelected(false);
  };

  const handleStatusChange = (data) => {};

  const columns = [
    {
      title: "Sr No.",
      key: "index",
      render: (text, record, index) =>
        index + 1 + (pageData?.current - 1) * pageData?.pageSize,
      align: "center",
      width: 70,
    },
    {
      title: "Source Name",
      key: "source_name",
      render: (record) => <span>{record?.source_name}</span>,
      align: "center",
    },
    {
      title: "Source Type",
      key: "source_type",
      render: (record) => <span>{record?.source_type?.name}</span>,
      align: "center",
    },
    {
      title: "UTM Source",
      key: "utm_source",
      render: (record) => <span>{record?.utm_source || "--"}</span>,
      align: "center",
    },
    {
      title: "UTM Medium",
      key: "utm_medium",
      render: (record) => <span>{record?.utm_medium || "--"}</span>,
      align: "center",
    },
    {
      title: "Status",
      key: "is_active",
      render: (record) => (
        <>
          {getRoutePathDetails().modify ? (
            <Popconfirm
              title={`Are you sure to update "${
                record?.source_type
              }" sorce as ${record?.is_active ? "inactive" : "active"}?`}
              onConfirm={() => handleStatusChange(record)}
              okText="Yes"
              cancelText="No"
            >
              <Switch
                checked={record?.is_active}
                style={{
                  backgroundColor: record.is_active ? "#5CB85C" : "#FC0027",
                }}
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </Popconfirm>
          ) : (
            <Tag color={record?.is_active ? "#5CB85C" : "#FC0027"}>
              {record?.is_active ? "Active" : "Inactive"}
            </Tag>
          )}
        </>
      ),
      align: "center",
      width: 120,
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
                  onClick={() => {
                    setModalData({ show: true, data: record });
                  }}
                  icon={
                    <EditOutlined style={{ paddingRight: 5, marginLeft: 5 }} />
                  }
                />
              </>
            ),
            align: "center",
            width: 90,
          },
        ]
      : []),
  ];

  const renderTagNotAll = (label, value, index, key) => {
    let selectedItems = form.getFieldsValue()?.[key];
    const showCloseIcon = selectedItems?.length > 1;
    return (
      <RenderTagMultiple
        label={label}
        value={value}
        showCloseIcon={showCloseIcon}
        onClose={(closeValue) => {
          form.setFieldsValue({
            [key]: selectedItems?.filter((each) => each !== closeValue),
          });
        }}
      />
    );
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Source"]} />
                </Col>
                {getRoutePathDetails().add ? (
                  <Col>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => {
                        setModalData({ show: true, data: null });
                      }}
                    >
                      + Add Source
                    </Button>
                  </Col>
                ) : null}
              </Row>
            </Col>
            <Col xs={24}>
              <Divider
                style={{ borderColor: "#DFE3E8", padding: 0, margin: 0 }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <CustomCard className="source-card">
            <Spin spinning={loading} tip="Loading">
              <Row gutter={[8, 8]}>
                <Col xs={24}>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={() => {
                      setGetSelected(true);
                      getSourceData(1, pageData?.pageSize);
                    }}
                  >
                    <Row gutter={[8, 0]}>
                      <Col xs={12} sm={7} xl={6}>
                        <Form.Item
                          className="w-100"
                          name="source_type"
                          label="Source Type"
                        >
                          <Select
                            className="w-100"
                            mode="multiple"
                            allowClear
                            onChange={(value) => {
                              if (value.length === 0) {
                                form.setFieldsValue({ source_type: [0] });
                              }
                            }}
                            options={[
                              {
                                value: 0,
                                label: "All",
                              },
                            ]}
                            tagRender={(props) =>
                              renderTagNotAll(
                                props.label,
                                props.value,
                                props.index,
                                "source_type"
                              )
                            }
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
                            placeholder="Search Source"
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
                {sourceData ? (
                  <Col xs={24}>
                    <Table
                      dataSource={sourceData}
                      columns={columns}
                      bordered={true}
                      pagination={pageData}
                      onChange={handleTableChange}
                    />
                  </Col>
                ) : (
                  <Col xs={24}>
                    <CustomFilterText />
                  </Col>
                )}
              </Row>
            </Spin>
          </CustomCard>
        </Col>
      </Row>
      <AddEditSource
        modalData={modalData}
        handleAddEditSource={() => {}}
        closeModal={() => {
          setModalData({ show: false, data: null });
        }}
      />
    </div>
  );
};

export default Source;
