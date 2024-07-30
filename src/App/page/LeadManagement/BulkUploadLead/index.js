import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Divider,
  Form,
  Select,
  Upload,
  Button,
  message,
  Input,
  DatePicker,
  Spin,
  Table,
  Radio,
  Empty,
  Pagination,
  Descriptions,
} from "antd";
import "./index.scss";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import UploadFile from "../../../component/UtilComponents/UploadFile";
import dayjs from "dayjs";
import CustomFilterText from "../../../component/UtilComponents/CustomFilterText";
import { MdListAlt } from "react-icons/md";
import { BiIdCard } from "react-icons/bi";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import getCardDataText from "../../../component/UtilComponents/CardDataText";
const { RangePicker } = DatePicker;

const BulkUploadLead = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const { width } = useWindowDimensions();
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [isList, setIsList] = useState(false);

  useEffect(() => {
    if (width <= 991) {
      setIsList(false);
    } else {
      setIsList(true);
    }
  }, [width]);

  const onFinish = (values) => {
    if (!selectedFile) {
      message.error("Please Select File");
      return;
    }
  };

  useEffect(() => {
    filterForm.setFieldsValue({ date_range: [dayjs(), dayjs()] });
  }, []);

  const getHistoryData = (page, page_size) => {
    setPageData({
      current: page,
      pageSize: page_size,
      total: 2,
    });
    setHistoryData([
      {
        id: 1,
        upload_date: "2021-01-10 23:34",
        file_name: "terfc.xlsx",
        uploaded_by: "admin",
        success_count: 10,
        failed_count: 2,
        is_completed: true,
        completed_date: "2021-01-10 23:34",
      },
      {
        id: 2,
        upload_date: "2021-01-10 23:34",
        file_name: "terfc.xlsx",
        uploaded_by: "admin",
        is_completed: false,
        success_count: 0,
        failed_count: 0,
        completed_date: null,
      },
    ]);
  };

  useEffect(() => {
    getHistoryData(pageData.current, pageData.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    window.scrollTo(0, 0);
    getHistoryData(pagination?.current, pagination?.pageSize);
  };

  const columns = [
    {
      title: "Upload Date",
      key: "upload_date",
      render: (record) => (
        <span>
          {record?.upload_date
            ? dayjs(record.upload_date).format("DD/MM/YYYY hh:mma")
            : "--"}
        </span>
      ),
      align: "center",
    },
    {
      title: "File Name",
      key: "file_name",
      render: (record) => <span>{record?.file_name || "--"}</span>,
      align: "center",
    },
    {
      title: "Uploaded By",
      key: "uploaded_by",
      render: (record) => <span>{record?.uploaded_by || "--"}</span>,
      align: "center",
    },
    {
      title: "Success Count",
      key: "success_count",
      render: (record) =>
        record.is_completed ? (
          <span
            style={{
              color: "green",
              fontWeight: 700,
            }}
          >
            {record.success_count}
          </span>
        ) : (
          <span
            style={{
              color: "#F0AD4E",
              fontWeight: 700,
            }}
          >
            Pending
          </span>
        ),
      align: "center",
    },
    {
      title: "Failed Count",
      key: "failed_count",
      render: (record) =>
        record.is_completed ? (
          <span
            style={{
              color: "red",
              fontWeight: 700,
            }}
          >
            {record.failed_count}
          </span>
        ) : (
          <span
            style={{
              color: "#F0AD4E",
              fontWeight: 700,
            }}
          >
            Pending
          </span>
        ),
      align: "center",
    },
    {
      title: "Completed Date",
      key: "completed_date",
      render: (record) => (
        <span>
          {record?.completed_date
            ? dayjs(record.completed_date).format("DD/MM/YYYY hh:mma")
            : "--"}
        </span>
      ),
      align: "center",
    },
  ];

  const handleCardChange = (page) => {
    window.scrollTo(0, 0);
    getHistoryData(page, pageData?.pageSize);
  };

  const fileUploadChangeHandler = (e) => {
    const file = e.target.files[0];
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setSelectedFile(file);
    } else {
      message.error("Allowed only xlsx file");
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <CustomBreadCrumbs data={["Bulk Upload Lead"]} />
            </Col>
            <Col xs={24}>
              <Divider />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className="d-flex flex-row" gutter={[8, 8]}>
            <Col xs={24} sm={10} lg={8}>
              <CustomCard className="bulk-upload-lead-card">
                <Form
                  form={form}
                  disabled={submitLoading}
                  layout="vertical"
                  onFinish={onFinish}
                  className="w-100"
                >
                  <Row>
                    <Col xs={24}>
                      <Form.Item
                        name="academic_year"
                        label="Academic Year"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Academic Year",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            { label: "2023-24", value: "2023-24" },
                            { label: "2024-25", value: "2024-25" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        name="lead_source"
                        label="Lead Source"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Lead Source",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            { label: "DM-Direct", value: "dm-direct" },
                            {
                              label: "PRO Data - Field Data",
                              value: "pro data -field data",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        name="branch"
                        label="Branch"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Branch",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            {
                              label: "Orchids BTM Layout",
                              value: "btm-layout",
                            },
                            {
                              label: "Orchids Banerghata",
                              value: "banerghata",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        name="school_type"
                        label="School Type"
                        rules={[
                          {
                            required: true,
                            message: "Please Select School Type",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            { label: "Day", value: "day" },
                            { label: "Boarding", value: "boarding" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <UploadFile
                        selectedFile={selectedFile}
                        fileUploadChangeHandler={fileUploadChangeHandler}
                        accept={".xlsx"}
                        type={"single"}
                        disabled={submitLoading}
                      />
                      <div className="helpertext-div">
                        <span className="upload-xlsx-text">
                          Upload File xlsx format only
                        </span>
                        <a className="download-sample-format" download>
                          Download Sample Format
                        </a>
                      </div>
                    </Col>
                    <Col xs={24} className="text-center mt-2">
                      <Button
                        onClick={() => {
                          form.submit();
                        }}
                        loading={submitLoading}
                        type="primary"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CustomCard>
            </Col>
            <Col xs={24} sm={14} lg={16}>
              <CustomCard>
                <Spin spinning={loading} tip="Loading">
                  <Row gutter={[8, 8]}>
                    <Col xs={24}>
                      <Typography style={{ fontSize: 12, fontWeight: 500 }}>
                        Upload History
                      </Typography>
                      <Divider />
                    </Col>
                    <Col xs={24}>
                      <Form
                        form={filterForm}
                        layout="vertical"
                        onFinish={() => {
                          getHistoryData(1, pageData?.pageSize);
                        }}
                      >
                        <Row
                          className="d-flex flex-row"
                          gutter={[8, 8]}
                          style={{ marginTop: -10 }}
                        >
                          <Col xs={16} sm={13} md={12} lg={12} xl={10}>
                            <Form.Item
                              name="date_range"
                              label={"Date Range"}
                              rules={[
                                {
                                  required: true,
                                  message: "Please Select Date Range",
                                },
                              ]}
                            >
                              <RangePicker
                                className="w-100"
                                format={"DD MMM YYYY"}
                                onChange={() => {
                                  setHistoryData(null);
                                }}
                                inputReadOnly
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={4} sm={5} lg={4} xl={3}>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                size="middle"
                                style={{ marginTop: 23, height: 30 }}
                              >
                                Filter
                              </Button>
                            </Form.Item>
                          </Col>
                          {historyData ? (
                            <Col xs={4} sm={6} md={7} lg={8} xl={11}>
                              <Row className="d-flex justify-content-end">
                                <Col>
                                  <Radio.Group
                                    style={{ marginTop: 32 }}
                                    className="lead-radio"
                                    options={[
                                      {
                                        value: true,
                                        label: <MdListAlt size={20} />,
                                      },
                                      {
                                        value: false,
                                        label: <BiIdCard size={20} />,
                                      },
                                    ]}
                                    onChange={(e) => {
                                      setIsList(e.target.value);
                                    }}
                                    value={isList}
                                    optionType="button"
                                    buttonStyle="solid"
                                  />
                                </Col>
                              </Row>
                            </Col>
                          ) : null}
                        </Row>
                      </Form>
                    </Col>
                    {historyData ? (
                      <Col xs={24}>
                        {isList ? (
                          <Table
                            dataSource={historyData}
                            columns={columns}
                            bordered={true}
                            pagination={pageData}
                            onChange={handleTableChange}
                          />
                        ) : (
                          <>
                            {historyData?.length === 0 ? (
                              <Col xs={24} className={"mt-2"}>
                                <Row
                                  style={{ minHeight: 200 }}
                                  className={
                                    "d-flex justify-content-center align-items-center"
                                  }
                                >
                                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </Row>
                              </Col>
                            ) : null}
                            {historyData?.length > 0 ? (
                              <>
                                <Col xs={24} className={"mt-2"}>
                                  <Row className={"d-flex"} gutter={[8, 8]}>
                                    {historyData?.map((each, index) => (
                                      <Col xs={24} lg={12} key={index}>
                                        <CustomCard style={{ height: "100%" }}>
                                          <Descriptions column={1}>
                                            {getCardDataText(
                                              "Upload Date",
                                              each?.upload_date
                                                ? dayjs(
                                                    each.upload_date
                                                  ).format("DD/MM/YYYY hh:mma")
                                                : "--"
                                            )}
                                            {getCardDataText(
                                              "File Name",
                                              each?.file_name || "--"
                                            )}
                                            {getCardDataText(
                                              "Uploaded By",
                                              each?.uploaded_by || "--"
                                            )}
                                            {getCardDataText(
                                              "Success Count",
                                              each.is_completed ? (
                                                <span
                                                  style={{
                                                    color: "green",
                                                    fontWeight: 700,
                                                  }}
                                                >
                                                  {each.success_count}
                                                </span>
                                              ) : (
                                                <span
                                                  style={{
                                                    color: "#F0AD4E",
                                                    fontWeight: 700,
                                                  }}
                                                >
                                                  Pending
                                                </span>
                                              )
                                            )}
                                            {getCardDataText(
                                              "Failed Count",
                                              each.is_completed ? (
                                                <span
                                                  style={{
                                                    color: "red",
                                                    fontWeight: 700,
                                                  }}
                                                >
                                                  {each.failed_count}
                                                </span>
                                              ) : (
                                                <span
                                                  style={{
                                                    color: "#F0AD4E",
                                                    fontWeight: 700,
                                                  }}
                                                >
                                                  Pending
                                                </span>
                                              )
                                            )}
                                            {getCardDataText(
                                              "Completed Date",
                                              each?.completed_date
                                                ? dayjs(
                                                    each.completed_date
                                                  ).format("DD/MM/YYYY hh:mma")
                                                : "--"
                                            )}
                                          </Descriptions>
                                        </CustomCard>
                                      </Col>
                                    ))}
                                  </Row>
                                </Col>
                                <Col
                                  xs={24}
                                  className="mt-2 d-flex justify-content-center"
                                >
                                  <Pagination
                                    current={pageData?.page}
                                    pageSize={pageData?.pageSize}
                                    onChange={handleCardChange}
                                    total={pageData?.total}
                                  />
                                </Col>
                              </>
                            ) : null}
                          </>
                        )}
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
        </Col>
      </Row>
    </div>
  );
};

export default BulkUploadLead;
