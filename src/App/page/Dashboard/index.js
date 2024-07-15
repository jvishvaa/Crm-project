import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";

const Dashboard = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <CustomBreadCrumbs data={["Dashboard"]} />
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
    </div>
  );
};

export default Dashboard;
