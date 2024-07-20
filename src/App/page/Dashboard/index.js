import React, { useState } from "react";
import { Row, Col, Typography, Divider, Button } from "antd";
import "./index.scss";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";
import AddEditDashboardElements from "./AddEditDashbaordElements";

const Dashboard = () => {
  const [modalData, setModalData] = useState({ show: false, data: null });
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Dashboard"]} />
                </Col>
                <Col>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      setModalData({ show: true, data: null });
                    }}
                  >
                    + Add Dashboard Report
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Divider />
            </Col>
          </Row>
        </Col>
        <Col
          xs={24}
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <Typography style={{ fontSize: "1.5rem", textAlign: "center" }}>
            Welcome To B2B CRM
          </Typography>
        </Col>
      </Row>
      <AddEditDashboardElements
        modalData={modalData}
        handleAddEditSource={() => {}}
        closeModal={() => {
          setModalData({ show: false, data: null });
        }}
      />
    </div>
  );
};

export default Dashboard;
