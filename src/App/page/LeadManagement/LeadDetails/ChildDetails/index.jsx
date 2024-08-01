import React, { useState } from "react";
import CustomCard from "../../../../component/UtilComponents/CustomCard";
import { Button, Col, Divider, Empty, Row, Typography } from "antd";
import "../index.scss";
import AddUpdateChild from "../AddUpdateChildData";
import ViewChild from "../ViewChild";
import { IoEye } from "react-icons/io5";
import GeneratePayment from "../GeneratePayment";

const ChildDetails = () => {
  const [modalData, setModalData] = useState({
    show: false,
    type: null,
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
                  Child Details
                </Typography>
              </Col>
              <Col>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    setModalData({ show: true, type: "Add Child", data: null });
                  }}
                >
                  + Add Child
                </Button>
              </Col>
            </Row>
            <Divider />
          </Col>
          <Col xs={24} className="lead-child-list">
            <Row className="d-flex  " gutter={[16, 8]}>
              {[1, 2].map((each) => (
                <Col xs={24}>
                  <Row>
                    <Col xs={24}>
                      <Row
                        className="d-flex justify-content-end"
                        gutter={[8, 4]}
                      >
                        <Col>
                          <Button
                            type="link"
                            color="primary"
                            className="lead-details-card-update-button"
                            onClick={() => {
                              setModalData({
                                show: true,
                                type: "Generate Payment",
                                data: null,
                              });
                            }}
                          >
                            Payment
                          </Button>
                        </Col>
                        <Col className="child-details-button-divider">
                          {"|"}
                        </Col>
                        <Col>
                          <Button
                            type="link"
                            color="primary"
                            className="lead-details-card-update-button"
                            onClick={() => {
                              setModalData({
                                show: true,
                                type: "View Child",
                                data: null,
                              });
                            }}
                          >
                            View
                          </Button>
                        </Col>
                        <Col className="child-details-button-divider">
                          {"|"}
                        </Col>
                        <Col>
                          <Button
                            type="link"
                            color="primary"
                            className="lead-details-card-update-button"
                            onClick={() => {
                              setModalData({
                                show: true,
                                type: "Update Child",
                                data: { child_name: "Anik Chowdhury" },
                              });
                            }}
                          >
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={24}>
                      <Row
                        className="d-flex flex-column p-1"
                        style={{ backgroundColor: "#F5F5F5", borderRadius: 5 }}
                      >
                        <Col xs={24}>
                          <Typography className="child-list-details-name">
                            Anik Chowdhury
                          </Typography>
                        </Col>
                        <Col xs={24}>
                          <Typography className="child-list-details-description">
                            Grade : Grade 1
                          </Typography>
                        </Col>
                        <Col xs={24}>
                          <Typography className="child-list-details-description">
                            Date of Birth : 12 May 2022
                          </Typography>
                        </Col>
                        <Col xs={24}>
                          <Typography className="child-list-details-description">
                            Gender : Male
                          </Typography>
                        </Col>
                        <Col xs={24}>
                          <Typography className="child-list-details-description">
                            Application No : AP4545353535
                          </Typography>
                        </Col>
                        <Col xs={24}>
                          <Typography className="child-list-details-description">
                            Registration No : RG3635535353
                          </Typography>
                        </Col>{" "}
                        <Col xs={24}>
                          <Typography className="child-list-details-description">
                            Admission No : NA
                          </Typography>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              ))}
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
      <AddUpdateChild
        modalData={modalData}
        handleAddUpdateChild={() => {}}
        closeModal={() => {
          setModalData({ show: false, type: null, data: null });
        }}
      />
      <ViewChild
        modalData={modalData}
        closeModal={() => {
          setModalData({ show: false, type: null, data: null });
        }}
      />
      <GeneratePayment
        modalData={modalData}
        handleGeneratePayment={() => {}}
        closeModal={() => {
          setModalData({ show: false, type: null, data: null });
        }}
      />
    </>
  );
};

export default ChildDetails;
