import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Popconfirm,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import { MdDeleteOutline } from "react-icons/md";

const PersonalDetails = ({ enquiryFormData, setEnquiryFormData }) => {
  return (
    <Row className="d-flex flex-row" gutter={[8, 16]}>
      <Col xs={24}>
        <Row className="d-flex flex-row" gutter={[12, 8]}>
          <Col xs={24} sm={12} md={6}>
            <Typography className="enquiry-form-item-label">
              Academic Year <span>*</span>
            </Typography>
            <Select
              style={{ width: "100%" }}
              className="enquiry-form-select"
              value={enquiryFormData?.academic_year}
              onChange={(values) => {
                setEnquiryFormData({
                  ...enquiryFormData,
                  academic_year: values,
                });
              }}
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={[
                { label: "2023-24", value: "2023-24" },
                { label: "2024-25", value: "2024-25" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Typography className="enquiry-form-item-label">
              Branch <span>*</span>
            </Typography>
            <Select
              style={{ width: "100%" }}
              className="enquiry-form-select"
              value={enquiryFormData?.branch}
              onChange={(values) => {
                setEnquiryFormData({
                  ...enquiryFormData,
                  branch: values,
                });
              }}
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  label: "Orchids BTM Layout",
                  value: "btm-layout",
                },
                {
                  label: "Orchids Banerghata",
                  value: "banerghata",
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Typography className="enquiry-form-item-label">
              Enquiry Type <span>*</span>
            </Typography>
            <Select
              style={{ width: "100%" }}
              className="enquiry-form-select"
              value={enquiryFormData?.enquiry_type}
              onChange={(values) => {
                setEnquiryFormData({
                  ...enquiryFormData,
                  enquiry_type: values,
                });
              }}
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  label: "Create Enquiry",
                  value: "create-enquiry",
                },
                {
                  label: "Application Request",
                  value: "application-request",
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Typography className="enquiry-form-item-label">
              Lead Source <span>*</span>
            </Typography>
            <Select
              style={{ width: "100%" }}
              className="enquiry-form-select"
              value={enquiryFormData?.lead_source}
              onChange={(values) => {
                setEnquiryFormData({
                  ...enquiryFormData,
                  lead_source: values,
                });
              }}
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={[
                { label: "DM-Direct", value: "dm-direct" },
                {
                  label: "PRO Data - Field Data",
                  value: "pro data -field data",
                },
              ]}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <Row className="d-flex flex-row" gutter={[12, 8]}>
          <Col xs={24}>
            <Row className="d-flex flex-row justify-content-between align-items-center">
              <Col>
                <Typography className="enquiry-form-header">
                  Child Details
                </Typography>
              </Col>
              <Col>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    let myChildData = [...enquiryFormData.child_data];
                    myChildData.push({
                      child_name: null,
                      child_gender: null,
                      child_dob: null,
                      child_grade: null,
                    });
                    setEnquiryFormData({
                      ...enquiryFormData,
                      child_data: myChildData,
                    });
                  }}
                >
                  + Add New Child
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Row className="d-flex flex-column" gutter={[16, 16]}>
              {enquiryFormData?.child_data?.map((each, index) => (
                <Col xs={24}>
                  <Row
                    className="d-flex flex-row align-items-center"
                    gutter={[4, 4]}
                  >
                    <Col xs={2} sm={1}>
                      <Typography className="enquiry-form-child-number">
                        {index + 1} .
                      </Typography>
                    </Col>
                    <Col xs={22} sm={23}>
                      <Row
                        className="d-flex flex-row align-items-center"
                        gutter={[12, 8]}
                      >
                        <Col xs={24} sm={12} md={6}>
                          <Typography className="enquiry-form-item-label">
                            Child Name <span>*</span>
                          </Typography>
                          <Input
                            maxLength={48}
                            autoComplete="off"
                            value={each?.child_name}
                            onChange={(e) => {
                              let myChildData = [
                                ...enquiryFormData?.child_data,
                              ];
                              myChildData[index].child_name = e.target.value;
                              setEnquiryFormData({
                                ...enquiryFormData,
                                child_data: myChildData,
                              });
                            }}
                          />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Typography className="enquiry-form-item-label">
                            Child Gender <span>*</span>
                          </Typography>
                          <Select
                            style={{ width: "100%" }}
                            className="enquiry-form-select"
                            value={each?.child_gender}
                            onChange={(values) => {
                              let myChildData = [
                                ...enquiryFormData?.child_data,
                              ];
                              myChildData[index].child_gender = values;
                              setEnquiryFormData({
                                ...enquiryFormData,
                                child_data: myChildData,
                              });
                            }}
                            showSearch
                            filterOption={(input, option) =>
                              option.label
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={[
                              { label: "Male", value: "male" },
                              { label: "Female", value: "female" },
                            ]}
                          />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Typography className="enquiry-form-item-label">
                            Child Date of Birth <span>*</span>
                          </Typography>
                          <DatePicker
                            allowClear={false}
                            className="w-100"
                            value={each?.child_dob}
                            onChange={(values) => {
                              let myChildData = [
                                ...enquiryFormData?.child_data,
                              ];
                              myChildData[index].child_dob = values;
                              setEnquiryFormData({
                                ...enquiryFormData,
                                child_data: myChildData,
                              });
                            }}
                          />
                        </Col>
                        <Col xs={20} sm={10} md={5}>
                          <Typography className="enquiry-form-item-label">
                            Child Grade <span>*</span>
                          </Typography>
                          <Select
                            style={{ width: "100%" }}
                            className="enquiry-form-select"
                            value={each?.child_grade}
                            onChange={(values) => {
                              let myChildData = [
                                ...enquiryFormData?.child_data,
                              ];
                              myChildData[index].child_grade = values;
                              setEnquiryFormData({
                                ...enquiryFormData,
                                child_data: myChildData,
                              });
                            }}
                            showSearch
                            filterOption={(input, option) =>
                              option.label
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={[
                              { label: "Grade 1", value: "grade_1" },
                              { label: "Grade 2", value: "grade_2" },
                            ]}
                          />
                        </Col>
                        <Col xs={4} sm={2} md={1}>
                          <Tooltip title="Delete">
                            <Popconfirm
                              disabled={
                                enquiryFormData?.child_data?.length <= 1
                              }
                              title="Are you sure to remove child?"
                              onConfirm={() => {
                                let myChildData = [
                                  ...enquiryFormData?.child_data,
                                ];

                                myChildData = myChildData.filter(
                                  (eachitem, eachindex) => index !== eachindex
                                );
                                setEnquiryFormData({
                                  ...enquiryFormData,
                                  child_data: myChildData,
                                });
                              }}
                            >
                              <Button
                                type="text"
                                size="small"
                                icon={
                                  <MdDeleteOutline
                                    size={22}
                                    style={{
                                      color:
                                        enquiryFormData?.child_data?.length > 1
                                          ? "red"
                                          : "#BFBFBF",
                                    }}
                                  />
                                }
                                className="mt-3"
                              />
                            </Popconfirm>
                          </Tooltip>
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
  );
};

export default PersonalDetails;
