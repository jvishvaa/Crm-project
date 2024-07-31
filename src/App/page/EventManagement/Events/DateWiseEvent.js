import React, { useEffect, useState } from "react";
import { Row, Col, Drawer, Descriptions, Table, Tag } from "antd";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";
import dayjs from "dayjs";
import getFilterItemFromArray from "../../../utils/getFilterItemFromArray";
import getArrayValues from "../../../utils/getArrayValues";

const DateWiseEvent = ({ drawerData, closeDrawer, eventStatusCountList }) => {
  const [dateWiseEventData, setDateWiseEventData] = useState([]);

  const getDateWiseEventData = () => {
    setDateWiseEventData([
      {
        id: 1,
        date: "2024-01-01",
        assigned_user: [
          { id: 1, name: "Test 1" },
          { id: 2, name: "Test 2" },
        ],
        status: "In Progress",
        total_lead: 100,
      },
      {
        id: 2,
        date: "2024-01-02",
        assigned_user: null,
        status: "Timed Out",
        total_lead: 100,
      },
      {
        id: 2,
        date: "2024-01-03",
        assigned_user: null,
        status: "Timed Out",
        total_lead: 100,
      },
    ]);
  };

  useEffect(() => {
    getDateWiseEventData();
  }, []);

  const columns = [
    {
      title: "Sr. No.",
      key: "index",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Date",
      key: "date",
      render: (record) => (
        <span>{dayjs(record?.date).format("DD/MM/YYYY")}</span>
      ),
      align: "center",
    },

    {
      title: "BDE",
      key: "assigned_user",
      render: (record) => (
        <span>
          {record?.assigned_user
            ? getArrayValues(record?.assigned_user, "name")?.join(", ")
            : "--"}
        </span>
      ),
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Tag
          color={
            getFilterItemFromArray(
              eventStatusCountList,
              "label",
              record.status
            )[0].color
          }
        >
          {record?.status}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Total Leads",
      key: "total_leads",
      render: (record) => <span>{record?.total_lead || "0"}</span>,
      align: "center",
    },
  ];

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader label="Date Wise Event" onClose={closeDrawer} />
      }
      onClose={closeDrawer}
      open={drawerData?.show && drawerData?.type === "View Date Wise"}
      size="large"
      closable={false}
      maskClosable={false}
      footer={null}
    >
      <Row className="d-flex" gutter={[8, 8]}>
        <Col xs={24} className="mt-2">
          <Descriptions column={2} layout="vertical">
            <Descriptions.Item label={"Event Name"}>
              {drawerData?.data?.event_name}
            </Descriptions.Item>
            <Descriptions.Item label={"Event Date"}>
              {`${dayjs(drawerData?.data?.start_date).format(
                "DD/MM/YYYY"
              )} To ${dayjs(drawerData?.data?.end_date).format("DD/MM/YYYY")}`}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24}>
          <Table
            dataSource={dateWiseEventData || []}
            columns={columns}
            bordered={true}
            pagination={false}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default DateWiseEvent;
