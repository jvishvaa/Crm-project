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
  message,
} from "antd";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import getRoutePathDetails from "../../../utils/getRoutePathDetails";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import AddEditSource from "./addEditSource";
import CustomFilterText from "../../../component/UtilComponents/CustomFilterText";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import RenderTagMultiple from "../../../component/UtilComponents/RenderMultiple";
import { MdEdit } from "react-icons/md";
import getColour from "../../../utils/getColour";
import axios from "axios";
import urls from "../../../utils/urls";
import getSelectArray from "../../../utils/getSelectArray";

const Source = () => {
  const defaultValue = { status: true, source_type: [0] };
  const [form] = Form.useForm();
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [sourceTypeList, setSourceTypeList] = useState([]);
  const [searchFetched, setSearchFetched] = useState(false);
  const [sourceData, setSourceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getSelected, setGetSelected] = useState(true);
  const [modalData, setModalData] = useState({ show: false, data: null });

  const { width } = useWindowDimensions();

  const getValues = (obj) => {
    return {
      ...form.getFieldsValue(),
      search: search,
      ...obj,
    };
  };

  useEffect(() => {
    form.setFieldsValue(defaultValue);
    getSourceTypeList();
    getSourceData(
      pageData?.current,
      pageData?.pageSize,
      getValues({
        ...defaultValue,
      })
    );
  }, []);

  const getSourceData = (page, page_size, values) => {
    let params = {
      ...(values.status !== 0 ? { status: values.status } : {}),
      ...(values.source_type.includes(0)
        ? { source_type: values?.source_type?.join(",") }
        : {}),
      ...(values?.search?.trim() ? { search: values?.search?.trim() } : {}),
      page: page,
      page_size: page_size,
    };
    setLoading(true);
    axios
      .get(`${urls.masterData.leadSource}`, {
        params: params,
      })
      .then((res) => {
        let response = res.data;
        setSourceData(response?.result);
        setPageData({
          current: page,
          pageSize: page_size,
          total: response?.result?.count,
        });
      })
      .catch((err) => {
        message.error(err?.response?.data?.message ?? "Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log({ sourceData });

  const getSourceTypeList = () => {
    axios
      .get(`${urls.masterData.sourceType}`, {
        params: { status: true },
      })
      .then((res) => {
        let response = res.data;
        // if ([200, 201].includes(response?.status_code)) {
        setSourceTypeList(response?.result);
        // } else {
        //   message.error(response?.message);
        // }
      })
      .catch((err) => {
        message.error(err?.response?.data?.message ?? "Something went wrong!");
      });
  };

  const handleTableChange = (pagination) => {
    getSourceData(pagination?.current, pagination?.pageSize, getValues());
  };

  const handleOnChange = () => {
    setPageData({ current: 1, pageSize: pageData?.pageSize, total: 0 });
    setSourceData(null);
    setSearch("");
    setSearchFetched("");
    setGetSelected(false);
  };

  const handleStatusChange = (data, value) => {
    setLoading(true);
    axios
      .put(`${urls.masterData.leadSource}${data?.id}`, { status: value })
      .then((res) => {
        let response = res.data;
        // if ([200, 201].includes(response?.status_code)) {
        getSourceData(
          pageData?.current > 0 &&
            sourceData?.length === 1 &&
            form?.getFieldsValue()?.status !== 0
            ? pageData?.current - 1
            : pageData?.current,
          pageData?.pageSize,
          getValues()
        );
        message.success(response.message);
        // } else {
        //   message.error(response?.message);
        // }
      })
      .catch((err) => {
        message.error(err?.response?.data?.message ?? "Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
      key: "source_type_name",
      render: (record) => <span>{record?.source_name}</span>,
      align: "center",
    },
    {
      title: "Source Type",
      key: "source_type",
      render: (record) => <span>{record?.source_type_name}</span>,
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
      key: "status",
      render: (record) => (
        <>
          {getRoutePathDetails().modify ? (
            <Popconfirm
              title={`Are you sure to update "${
                record?.source_type
              }" source as ${record?.status ? "inactive" : "active"}?`}
              onConfirm={() => handleStatusChange(record, !record?.status)}
              okText="Yes"
              cancelText="No"
            >
              <Switch
                checked={record?.status}
                style={{
                  backgroundColor: record.status
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
                record?.status ? getColour("active") : getColour("inactive")
              }
            >
              {record?.status ? "Active" : "Inactive"}
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
                  icon={<MdEdit size={20} />}
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
    <CustomCard>
      <Row gutter={[8, 0]}>
        <Col span={24} style={{ zIndex: 1 }}>
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
        <Col xs={24} style={{ marginTop: -10, zIndex: 0 }}>
          <Spin spinning={loading} tip="Loading">
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={() => {
                    setGetSelected(true);
                    getSourceData(1, pageData?.pageSize, getValues());
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
                          maxTagCount={1}
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
                            ...getSelectArray(
                              sourceTypeList,
                              "source_type_name",
                              "id"
                            ),
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
                      <Form.Item className="w-100" name="status" label="Status">
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
                            setSearch(
                              e.target.value?.trimStart()?.replace("  ", " ")
                            );
                            setSearchFetched(false);
                          }}
                          onPressEnter={() => {
                            if (search?.trim()) {
                              setSearchFetched(true);
                              getSourceData(1, pageData?.pageSize, getValues());
                            }
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
                                  getSourceData(
                                    1,
                                    pageData?.pageSize,
                                    getValues()
                                  );
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
        </Col>
      </Row>
      <AddEditSource
        modalData={modalData}
        onSubmit={(values) => {
          getSourceData(
            modalData?.data &&
              pageData?.current > 0 &&
              sourceData?.length === 1 &&
              ((!form.getFieldsValue()?.source_type?.includes(0) &&
                !form
                  .getFieldsValue()
                  ?.source_type?.includes(values?.source_type)) ||
                (search?.trim() &&
                  !values.source_name
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase())))
              ? pageData?.current - 1
              : pageData?.current,
            pageData?.pageSize,
            getValues()
          );
        }}
        closeModal={() => {
          setModalData({ show: false, data: null });
        }}
        dropdownData={{ sourceTypeList: sourceTypeList }}
      />
    </CustomCard>
  );
};

export default Source;
