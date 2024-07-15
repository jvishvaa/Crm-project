import React from "react";
import CustomCard from "../../../../component/UtilComponents/CustomCard";
import { Button, Col, Divider, Empty, Popconfirm, Row, Typography } from "antd";
import "../index.scss";

const AssigningDetailsCard = () => {
  return (
    <>
      <CustomCard>
        <Row className="d-flex flex-column flex-nowrap" gutter={[8, 8]}>
          <Col xs={24}>
            <Typography className="assign-details-card-header">
              Assign Details
            </Typography>
            <Divider />
          </Col>
          <Col xs={24}>
            <Row className="d-flex flex-row" gutter={[16, 8]}>
              <Col xs={24} md={24} lg={24}>
                <Row>
                  <Col xs={24}>
                    <Row className="d-flex flex-row justify-content-between align-items-center">
                      <Col>
                        <Typography className="assign-details-card-subheader">
                          Counsellor
                        </Typography>
                      </Col>
                      <Col>
                        <Popconfirm title="Are you sure to remove counsellor?">
                          <Button
                            type="link"
                            color="primary"
                            className="lead-details-card-update-button assign-remove-button"
                          >
                            Remove
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={24}
                    style={{ backgroundColor: "#F5F5F5", borderRadius: 5 }}
                    className="p-1"
                  >
                    <Row>
                      <Col xs={24}>
                        <Typography className="assign-details-name">
                          Anik Chowdhury
                        </Typography>
                      </Col>
                      <Col xs={24}>
                        <Typography className="assign-details-assign-date">
                          Assign Date : {"30/06/2024"}
                        </Typography>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={24} lg={24}>
                <Row>
                  <Col xs={24}>
                    <Row className="d-flex flex-row justify-content-between align-items-center">
                      <Col>
                        <Typography className="assign-details-card-subheader">
                          CCA
                        </Typography>
                      </Col>
                      <Col>
                        <Popconfirm title="Are you sure to remove CCA?">
                          <Button
                            type="link"
                            color="primary"
                            className="lead-details-card-update-button assign-remove-button"
                          >
                            Remove
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={24}
                    style={{ backgroundColor: "#F5F5F5", borderRadius: 5 }}
                    className="p-1"
                  >
                    <Row>
                      <Col xs={24}>
                        <Typography className="assign-details-name">
                          Anik Chowdhury
                        </Typography>
                      </Col>
                      <Col xs={24}>
                        <Typography
                          className="assign-details-card-data-text"
                          style={{ fontSize: 11 }}
                        >
                          Assign Date : {"30/06/2024"}
                        </Typography>
                      </Col>
                    </Row>
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

export default AssigningDetailsCard;
