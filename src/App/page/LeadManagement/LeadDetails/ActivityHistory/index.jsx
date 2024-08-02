import React, { useState } from "react";
import CustomCard from "../../../../component/UtilComponents/CustomCard";
import { Button, Col, Divider, Row, Typography } from "antd";
import { IoDocumentTextOutline } from "react-icons/io5";
import AddActivity from "../AddActivity";
import "../index.scss";

const ActivityHistory = () => {
  const [modalData, setModalData] = useState({
    show: false,
    data: null,
  });

  return (
    <>
      <CustomCard>
        <Row className="d-flex flex-column flex-nowrap" gutter={[8, 8]}>
          <Col xs={24}>
            <Row className="d-flex flex-row justify-content-between align-items-center mb-1">
              <Col>
                <Typography className="assign-details-card-header">
                  Lead Activity
                </Typography>
              </Col>
              <Col>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    setModalData({ show: true, data: null });
                  }}
                >
                  + Add Activity
                </Button>
              </Col>
            </Row>
            <Divider />
          </Col>
          <Col xs={24} className="activity-history-list">
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Row gutter={[8, 8]}>
                  <Col xs={24}>
                    <Typography className="activity-history-sub-header">
                      Today
                    </Typography>
                    <Divider />
                  </Col>
                  <Col xs={24}>
                    <Row gutter={[16, 16]}>
                      {[1, 2].map((each) => (
                        <Col xs={24}>
                          <Row
                            className="d-flex flex-row flex-nowrap"
                            gutter={[12, 12]}
                          >
                            <Col>
                              <Row
                                className="d-flex flex-xs-row flex-md-column flex-xl-row align-items-center flex-nowrap"
                                gutter={[6, 6]}
                              >
                                <Col>
                                  <div className="activity-list-icon-div">
                                    <IoDocumentTextOutline
                                      size="16"
                                      style={{ color: "white" }}
                                    />
                                  </div>
                                </Col>
                                <Col>
                                  <Typography className="activity-list-date-time text-xs-left text-md-center text-xl-left">
                                    <span style={{ fontWeight: 600 }}>
                                      Jul 8
                                    </span>{" "}
                                    <br />
                                    <span>3:15pm</span>
                                  </Typography>
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row gutter={[4, 4]}>
                                <Col xs={24}>
                                  <Typography className="activity-list-status">
                                    {"Call Picked Up -> Walkin Scheduled"}
                                  </Typography>
                                </Col>
                                <Col xs={24}>
                                  <Typography className="activity-list-status-description">
                                    {
                                      "looking for grade 4th for upcoming academi year. Current Branch :- ORCHIDS Horamavu"
                                    }
                                  </Typography>
                                </Col>
                                <Col xs={24}>
                                  <Typography className="activity-list-status-next-follow-date">
                                    <span>{"Next Follow Up Date: "}</span>
                                    {"21 May 2024 07:08 pm"}
                                  </Typography>
                                </Col>
                                <Col xs={24}>
                                  <Typography className="activity-list-status-next-follow-date">
                                    {"Added By "}
                                    <span>{"Admin "}</span>
                                    {"on 08 Jul 2024 12:48 pm"}
                                  </Typography>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col xs={24}>
                <Row gutter={[8, 8]}>
                  <Col xs={24}>
                    <Typography className="activity-history-sub-header">
                      July 2024
                    </Typography>
                    <Divider />
                  </Col>
                  <Col xs={24}>
                    <Row gutter={[16, 16]}>
                      {[1, 2, 3].map((each) => (
                        <Col xs={24}>
                          <Row
                            className="d-flex flex-row align-items-center flex-nowrap"
                            gutter={[12, 12]}
                          >
                            <Col>
                              <Row
                                className="d-flex flex-xs-row flex-md-column flex-xl-row align-items-center flex-nowrap"
                                gutter={[6, 6]}
                              >
                                <Col>
                                  <div className="activity-list-icon-div">
                                    <IoDocumentTextOutline
                                      size="16"
                                      style={{ color: "white" }}
                                    />
                                  </div>
                                </Col>
                                <Col>
                                  <Typography className="activity-list-date-time text-xs-left text-md-center text-xl-left">
                                    <span style={{ fontWeight: 600 }}>
                                      Jul 8
                                    </span>{" "}
                                    <br />
                                    <span>3:15pm</span>
                                  </Typography>
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row gutter={[4, 4]}>
                                <Col xs={24}>
                                  <Typography className="activity-list-status">
                                    {"Call Picked Up -> Walkin Scheduled"}
                                  </Typography>
                                </Col>
                                <Col xs={24}>
                                  <Typography className="activity-list-status-description">
                                    {
                                      "looking for grade 4th for upcoming academi year. Current Branch :- ORCHIDS Horamavu"
                                    }
                                  </Typography>
                                </Col>
                                <Col xs={24}>
                                  <Typography className="activity-list-status-next-follow-date">
                                    <span>{"Next Follow Up Date: "}</span>
                                    {"21 May 2024 07:08 pm"}
                                  </Typography>
                                </Col>
                                <Col xs={24}>
                                  <Typography className="activity-list-status-next-follow-date">
                                    {"Added By "}
                                    <span>{"Admin "}</span>
                                    {"on 08 Jul 2024 12:48 pm"}
                                  </Typography>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </CustomCard>
      <AddActivity
        modalData={modalData}
        handleAddActivity={() => {}}
        closeModal={() => {
          setModalData({ show: false, data: null });
        }}
      />
    </>
  );
};

export default ActivityHistory;
