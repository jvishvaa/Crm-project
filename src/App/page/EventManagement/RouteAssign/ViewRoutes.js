import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Drawer,
  Button,
  Timeline,
  Typography,
  Space,
  Descriptions,
  Divider,
  Popconfirm,
} from "antd";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";
import getFilterItemFromArray from "../../../utils/getFilterItemFromArray";
import { ClockCircleFilled, ClockCircleOutlined } from "@ant-design/icons";
import AssignRoute from "./AssignRoute";

const ViewRoutes = ({
  drawerData,
  closeDrawer,
  eventStatusCountList,
  dropdownData,
}) => {
  const [routeData, setRouteData] = useState(null);
  const [modalData, setModalData] = useState({
    show: false,
    data: null,
    type: null,
  });

  const getRouteData = () => {
    setRouteData([
      {
        hotspot_name: "Test Hotspot",
        time: "03:00pm - 04:00pm",
        status: "Completed",
      },
      {
        hotspot_name: "Test Hotspot 2",
        time: "04:00pm - 05:00pm",
        status: "In Progress",
      },
      {
        hotspot_name: "Test Hotspot 3",
        time: "05:00pm - 06:00pm",
        status: "Pending",
      },
    ]);
  };

  const renderContent = (each) => {
    return (
      <Row className="d-flex flex-column">
        <Descriptions column={1}>
          <Descriptions.Item label={"Hotspot"}>
            {each?.hotspot_name}
          </Descriptions.Item>
          <Descriptions.Item label={"Status"}>
            <span
              style={{
                color: getFilterItemFromArray(
                  eventStatusCountList,
                  "label",
                  each.status
                )[0].color,
              }}
              className="th-fw-600"
            >
              {each?.status}
            </span>
          </Descriptions.Item>
          <Descriptions.Item>
            <Popconfirm title="Are you sure to remove assigned hotspot?">
              <Button
                size="small"
                type="outlined"
                className="remove-assign-hotspot"
              >
                Remove
              </Button>
            </Popconfirm>
          </Descriptions.Item>
        </Descriptions>
      </Row>
    );
  };

  useEffect(() => {
    getRouteData();
  }, []);

  return (
    <Drawer
      className="lead-filter-drawer"
      title={<CustomDrawerHeader label="View Route" onClose={closeDrawer} />}
      onClose={closeDrawer}
      open={drawerData?.show && drawerData?.type === "View Route"}
      size="large"
      closable={false}
      maskClosable={false}
      footer={null}
    >
      <Row gutter={[8, 8]}>
        <Col xs={24} className="mt-2">
          <Descriptions column={2} layout="vertical">
            <Descriptions.Item label={"BDE Name"}>
              {drawerData?.data?.bde_name}
            </Descriptions.Item>
            <Descriptions.Item label={"Date"}>
              {drawerData?.data?.date}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24}>
          <Descriptions column={2} layout="vertical">
            <Descriptions.Item label={"Status"}>
              <span
                style={{
                  color: getFilterItemFromArray(
                    eventStatusCountList,
                    "label",
                    "Timed Out"
                  )[0].color,
                }}
                className="th-fw-500"
              >
                Timed Out
              </span>
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col xs={24}>
          <Typography className="th-14 th-fw-500 text-center">
            Route Details
          </Typography>
          <Timeline
            className="route-timeline"
            style={{ marginTop: 30, marginLeft: "-30%" }}
            mode={"left"}
            items={routeData?.map((each) => {
              return {
                dot: (
                  <ClockCircleFilled
                    style={{
                      fontSize: "16px",
                      color: getFilterItemFromArray(
                        eventStatusCountList,
                        "label",
                        each.status
                      )[0].color,
                    }}
                  />
                ),
                label: each?.time,
                children: renderContent(each),
              };
            })}
          />
        </Col>
        <Col
          xs={24}
          className="d-flex flex-row align-items-center justify-content-center"
          style={{ marginLeft: "-15%" }}
        >
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setModalData({
                show: true,
                data: null,
                type: "Route Assign",
              });
            }}
          >
            + Add
          </Button>
        </Col>
      </Row>
      <AssignRoute
        modalData={modalData}
        handleAssignRoute={() => {}}
        closeModal={() => {
          setModalData({ show: false, type: null, data: null });
        }}
        dropdownData={dropdownData}
      />
    </Drawer>
  );
};

export default ViewRoutes;
