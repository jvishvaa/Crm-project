import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Modal,
  Progress,
  Row,
  Select,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CustomFilterText from "../../../component/UtilComponents/CustomFilterText";

const { RangePicker } = DatePicker;

const RegenHistory = ({ modalData, closeModal }) => {
  const [form] = Form.useForm();
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getHistoryData = (page, page_size) => {
    setPageData({
      current: page,
      pageSize: page_size,
      total: 2,
    });
    // setLoading(true);
    setHistoryData([
      {
        id: 1,
        started_at: "2022-02-02 05:00",
        completed_at: "2022-02-02 05:00",
        lead_count: 2,
        progress: 100,
        status: "Completed",
        updated_by: "Admin",
      },
      {
        id: 2,
        started_at: "2022-02-02 05:00",
        completed_at: null,
        lead_count: 0,
        progress: 60,
        status: "In Progress",
        updated_by: "Admin",
      },
    ]);
  };

  useEffect(() => {
    getHistoryData(pageData?.current, pageData?.pageSize);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ date_range: [dayjs(), dayjs()] });
  }, []);

  const handleTableChange = (pagination) => {
    window.scrollTo(0, 0);
    getHistoryData(pagination?.current, pagination?.pageSize);
  };

  const columns = [
    {
      title: "Sr. No.",
      key: "index",
      render: (text, record, index) =>
        index + 1 + (pageData?.current - 1) * pageData?.pageSize,
      align: "center",
    },
    {
      title: "Started At",
      key: "started_at",
      dataIndex: "started_at",
      render: (text) =>
        text ? dayjs(text)?.format("DD/MM/YYYY hh:mm a") : "--",
      align: "center",
    },
    {
      title: "Completed At",
      key: "completed_at",
      dataIndex: "completed_at",
      render: (text) =>
        text ? dayjs(text)?.format("DD/MM/YYYY hh:mm a") : "--",
      align: "center",
    },
    {
      title: "Lead Count",
      key: "lead_count",
      dataIndex: "lead_count",
      align: "center",
    },
    {
      title: "Progress",
      key: "progress",
      render: (record) => (
        <>
          <Progress
            percent={record.progress}
            status="active"
            style={{ margin: 0, width: 150 }}
          />
        </>
      ),
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <>
          {record?.status === "Completed" ? (
            <Tag color="green">Completed</Tag>
          ) : null}
          {record?.status === "In Progress" ? (
            <Tag color="gold">In Progress</Tag>
          ) : null}
          {record?.status === "Failed" ? <Tag color="red">Failed</Tag> : null}
        </>
      ),
      align: "center",
    },
    {
      title: "Process Started By",
      key: "updated_by",
      dataIndex: "updated_by",
      align: "center",
    },
  ];

  return (
    <Modal
      centered
      width={800}
      open={modalData?.show && modalData?.type === "Regen History"}
      onCancel={() => {
        closeModal();
      }}
      footer={null}
    >
      <Row>
        <Col xs={24}>
          <Typography className="th-14 th-fw-600">Regen History</Typography>
          <Divider />
        </Col>
        <Col xs={24}>
          <Spin spinning={loading} tip="Loading">
            <Row className="d-flex flex-column" gutter={[0, 8]}>
              <Col xs={24}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={() => {
                    getHistoryData(1, pageData?.pageSize);
                  }}
                >
                  <Row className="d-flex flex-row" gutter={[8, 8]}>
                    <Col xs={18} sm={12} md={10}>
                      <Form.Item
                        name="date_range"
                        label="Date Range"
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
                          inputReadOnly
                          allowClear={false}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={6} sm={3} md={2}>
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
                  </Row>
                </Form>
              </Col>
              <Col xs={24}>
                {historyData ? (
                  <Col xs={24}>
                    <Table
                      dataSource={historyData}
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
              </Col>
            </Row>
          </Spin>
        </Col>
      </Row>
    </Modal>
  );
};

export default RegenHistory;
