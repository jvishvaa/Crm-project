import { Button, Col, Drawer, Row, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import "../index.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import AddUpdateChild from "../AddUpdateChildData";
import UpdatePreviousSchoolData from "../UpdatePreviousSchoolData";
import UpdateEnrollment from "../UpdateEnrollment";
import DeleteEnrollment from "../DeleteEnrollment";
import CustomDrawerHeader from "../../../../component/UtilComponents/CustomDrawerHeader";

const ViewChild = ({ modalData, closeModal }) => {
  const [subModalData, setSubModalData] = useState({
    show: false,
    type: null,
    data: null,
  });

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={"View Child"}
          onClose={() => {
            closeModal();
          }}
        />
      }
      onClose={() => {
        closeModal();
      }}
      open={modalData?.show && ["View Child"].includes(modalData?.type)}
      size="large"
      closable={false}
      maskClosable={false}
      footer={null}
    >
      <Row gutter={[8, 8]}>
        <Col xs={24} className="mt-2">
          <Row className="d-flex flex-column" gutter={[12, 12]}>
            <Col xs={24}>
              <Row className="d-flex flex-row">
                <Col xs={24}>
                  <Row
                    className="d-flex flex-row justify-content-between align-items-center"
                    gutter={[4, 4]}
                  >
                    <Col>
                      <Typography className="lead-details-view-child-header">
                        Basic Details
                      </Typography>
                    </Col>
                    <Col>
                      <Tooltip title="Update Details">
                        <Button
                          type="text"
                          size="small"
                          icon={<MdEdit size={20} />}
                          onClick={() => {
                            setSubModalData({
                              show: true,
                              type: "Update Child",
                              data: { child_name: "Anik Chowdhury" },
                            });
                          }}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24}>
                  <Row className="d-flex flex-row" gutter={[16, 8]}>
                    <Col xs={12} md={6}>
                      <Typography className="lead-details-card-data-text">
                        <span>Child Name :</span>
                        <br />
                        {"Anik Chowdhury"}
                      </Typography>
                    </Col>
                    <Col xs={12} md={6}>
                      <Typography className="lead-details-card-data-text">
                        <span>Child Grade :</span>
                        <br />
                        {"Grade 1"}
                      </Typography>
                    </Col>
                    <Col xs={12} md={6}>
                      <Typography className="lead-details-card-data-text">
                        <span>Child Date of Birth :</span>
                        <br />
                        {"30 Jun 2023"}
                      </Typography>
                    </Col>
                    <Col xs={12} md={6}>
                      <Typography className="lead-details-card-data-text">
                        <span>Child Gender :</span>
                        <br />
                        {"Male"}
                      </Typography>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Row className="d-flex flex-column">
                <Col xs={24}>
                  <Row
                    className="d-flex flex-row justify-content-between align-items-center"
                    gutter={[4, 4]}
                  >
                    <Col>
                      <Typography className="lead-details-view-child-header">
                        Previous School Details
                      </Typography>
                    </Col>
                    <Col>
                      <Tooltip title="Update Previous School Details">
                        <Button
                          type="text"
                          size="small"
                          icon={<MdEdit size={20} />}
                          onClick={() => {
                            setSubModalData({
                              show: true,
                              type: "Update Previous School",
                              data: { school_name: "Test School" },
                            });
                          }}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24}>
                  <Row className="d-flex flex-row" gutter={[16, 8]}>
                    <Col xs={12} md={6}>
                      <Typography className="lead-details-card-data-text">
                        <span>Previous School Name :</span>
                        <br />
                        {"Test School"}
                      </Typography>
                    </Col>
                    <Col xs={12} md={6}>
                      <Typography className="lead-details-card-data-text">
                        <span>Previous Grade :</span>
                        <br />
                        {"Grade 1"}
                      </Typography>
                    </Col>
                    <Col xs={12} md={6}>
                      <Typography className="lead-details-card-data-text">
                        <span>Previous School Board :</span>
                        <br />
                        {"CBSE"}
                      </Typography>
                    </Col>
                    <Col xs={12} md={6}>
                      <Typography className="lead-details-card-data-text">
                        <span>Previous Class Percentage:</span>
                        <br />
                        {"90%"}
                      </Typography>
                    </Col>
                    <Col xs={24} md={12}>
                      <Typography className="lead-details-card-data-text">
                        <span>Reason for leaving school:</span>
                        <br />
                        {
                          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
                        }
                      </Typography>
                    </Col>
                    <Col xs={24} md={12}>
                      <Typography className="lead-details-card-data-text">
                        <span>Pre-School Tieup:</span>
                        <br />
                        {"Test Pre School"}
                      </Typography>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Row className="d-flex flex-column">
                <Col xs={24}>
                  <Row
                    className="d-flex flex-row justify-content-between align-items-center"
                    gutter={[4, 4]}
                  >
                    <Col>
                      <Typography className="lead-details-view-child-header">
                        Enrollment Details
                      </Typography>
                    </Col>
                    <Col>
                      <Row
                        className="d-flex flex-row justify-content-end"
                        gutter={[8, 8]}
                      >
                        <Col>
                          <Tooltip title="Delete Enrollment">
                            <Button
                              type="text"
                              size="small"
                              icon={<MdDelete size={20} />}
                              onClick={() => {
                                setSubModalData({
                                  show: true,
                                  type: "Delete Enrollment",
                                  data: null,
                                });
                              }}
                            />
                          </Tooltip>
                        </Col>
                        <Col>
                          <Tooltip title="Update Enrollment">
                            <Button
                              type="text"
                              size="small"
                              icon={<MdEdit size={20} />}
                              onClick={() => {
                                setSubModalData({
                                  show: true,
                                  type: "Update Enrollment",
                                  data: null,
                                });
                              }}
                            />
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24}>
                  <Row className="d-flex flex-row" gutter={[16, 8]}>
                    <Col xs={12}>
                      <Typography className="lead-details-card-data-text">
                        <span>Application No :</span>
                        <br />
                        {"AP22434232232"}
                      </Typography>
                    </Col>
                    <Col xs={12}>
                      <Typography className="lead-details-card-data-text">
                        <span>Application Date :</span>
                        <br />
                        {"25 Mar 2023"}
                      </Typography>
                    </Col>
                    <Col xs={12}>
                      <Typography className="lead-details-card-data-text">
                        <span>Registration No :</span>
                        <br />
                        {"RG22434232232"}
                      </Typography>
                    </Col>
                    <Col xs={12}>
                      <Typography className="lead-details-card-data-text">
                        <span>Registration Date :</span>
                        <br />
                        {"25 Mar 2023"}
                      </Typography>
                    </Col>
                    <Col xs={12}>
                      <Typography className="lead-details-card-data-text">
                        <span>Admission No :</span>
                        <br />
                        {"NA"}
                      </Typography>
                    </Col>
                    <Col xs={12}>
                      <Typography className="lead-details-card-data-text">
                        <span>Admission Date :</span>
                        <br />
                        {"NA"}
                      </Typography>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <AddUpdateChild
        modalData={subModalData}
        handleAddUpdateChild={() => {}}
        closeModal={() => {
          setSubModalData({ show: false, type: null, data: null });
        }}
      />
      <UpdatePreviousSchoolData
        modalData={subModalData}
        handleUpdatePreviousSchoolData={() => {}}
        closeModal={() => {
          setSubModalData({ show: false, type: null, data: null });
        }}
      />
      <UpdateEnrollment
        modalData={subModalData}
        handleUpdateEnrollment={() => {}}
        closeModal={() => {
          setSubModalData({ show: false, type: null, data: null });
        }}
      />
      <DeleteEnrollment
        modalData={subModalData}
        handleDeleteEnrollment={() => {}}
        closeModal={() => {
          setSubModalData({ show: false, type: null, data: null });
        }}
      />
    </Drawer>
  );
};

export default ViewChild;
