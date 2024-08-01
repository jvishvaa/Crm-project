import React from "react";
import CustomCard from "../../../../component/UtilComponents/CustomCard";
import { Button, Col, Divider, Empty, Popconfirm, Row, Typography } from "antd";
import "../index.scss";

const ReEnquirySource = () => {
  return (
    <>
      <CustomCard>
        <Row className="d-flex flex-column flex-nowrap" gutter={[8, 8]}>
          <Col xs={24}>
            <Typography className="assign-details-card-header">
              ReEnquiry Source
            </Typography>
            <Divider />
          </Col>
          <Col xs={24}>
            <Row>
              <Col
                xs={24}
                style={{ backgroundColor: "#F5F5F5", borderRadius: 5 }}
                className="p-1"
              >
                <Row gutter={[2, 2]}>
                  <Col xs={24}>
                    <Typography className="th-12 th-fw-400">
                      1. &nbsp;Value Leaf
                    </Typography>
                  </Col>
                </Row>
              </Col>
              {/* <Col xs={24}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  style={{ height: 50 }}
                />
              </Col> */}
            </Row>
          </Col>
        </Row>
      </CustomCard>
    </>
  );
};

export default ReEnquirySource;
