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
  Flex,
} from "antd";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";
import getFilterItemFromArray from "../../../utils/getFilterItemFromArray";
import { ClockCircleFilled, ClockCircleOutlined } from "@ant-design/icons";
import AssignRoute from "./AssignRoute";

const ViewRoutes = ({ drawerData, closeDrawer, dropdownData }) => {
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
        status: "Yet To Start",
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
      // size="large"
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
          <Divider />
        </Col>
        <Col xs={24}>
          <Typography className="th-14 th-fw-500 text-center">
            Route Details
          </Typography>
          <Flex justify="center">
            <Timeline
              className="route-timeline"
              style={{ marginTop: 30 }}
              items={routeData?.map((each) => {
                return {
                  dot: (
                    <ClockCircleFilled
                      style={{
                        fontSize: "16px",
                      }}
                    />
                  ),

                  children: renderContent(each),
                };
              })}
            />
          </Flex>
        </Col>
        <Col
          xs={24}
          className="d-flex flex-row align-items-center justify-content-center"
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
