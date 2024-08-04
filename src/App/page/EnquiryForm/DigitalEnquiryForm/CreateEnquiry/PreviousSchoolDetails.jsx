import { Col, Input, Row, Select, Typography } from "antd";
import React from "react";
import "../index.scss";

const PreviousSchoolDetails = ({ enquiryFormData, setEnquiryFormData }) => {
  return (
    <Row className="d-flex flex-column" gutter={[8, 8]}>
      {enquiryFormData?.child_data?.map((each, index) => (
        <Col xs={24}>
          <Row className="d-flex flex-column" gutter={[4, 4]}>
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between align-items-center">
                <Col>
                  <Typography className="enquiry-form-header">
                    Child {index + 1}
                  </Typography>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Row className="d-flex flex-row" gutter={[12, 8]}>
                <Col xs={24} sm={12} md={6}>
                  <Typography className="enquiry-form-item-label">
                    Child Name <span>*</span>
                  </Typography>
                  <Input
                    value={each?.child_name}
                    disabled
                    onChange={(e) => {
                      let myChildData = [...enquiryFormData?.child_data];
                      myChildData[index].child_name = e.target.value;
                      setEnquiryFormData({
                        ...enquiryFormData,
                        child_data: myChildData,
                      });
                    }}
                    maxLength={48}
                    autoComplete="off"
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Typography className="enquiry-form-item-label">
                    Child Previous Class <span>*</span>
                  </Typography>
                  <Select
                    style={{ width: "100%" }}
                    className="enquiry-form-select"
                    value={each?.child_previous_grade}
                    onChange={(values) => {
                      let myChildData = [...enquiryFormData?.child_data];
                      myChildData[index].child_previous_grade = values;
                      setEnquiryFormData({
                        ...enquiryFormData,
                        child_data: myChildData,
                      });
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={[]}
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Typography className="enquiry-form-item-label">
                    Child Previous School <span>*</span>
                  </Typography>
                  <Input
                    value={each?.child_previous_school}
                    onChange={(e) => {
                      let myChildData = [...enquiryFormData?.child_data];
                      myChildData[index].child_previous_school = e.target.value
                        ?.trimStart()
                        ?.replace("  ", " ");
                      setEnquiryFormData({
                        ...enquiryFormData,
                        child_data: myChildData,
                      });
                    }}
                    maxLength={48}
                    autoComplete="off"
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Typography className="enquiry-form-item-label">
                    Reason For Leaving School <span>*</span>
                  </Typography>
                  <Input
                    value={each?.reason_for_leave_school}
                    onChange={(e) => {
                      let myChildData = [...enquiryFormData?.child_data];
                      myChildData[index].reason_for_leave_school =
                        e.target.value?.trimStart()?.replace("  ", " ");
                      setEnquiryFormData({
                        ...enquiryFormData,
                        child_data: myChildData,
                      });
                    }}
                    maxLength={64}
                    autoComplete="off"
                  />
                </Col>{" "}
                <Col xs={24} sm={12} md={6}>
                  <Typography className="enquiry-form-item-label">
                    Previous Class Percentage <span>*</span>
                  </Typography>
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                    value={each?.previous_percentage}
                    onChange={(e) => {
                      if (Number(e.target.value) <= 100) {
                        let myChildData = [...enquiryFormData?.child_data];
                        myChildData[index].previous_percentage = e.target.value;
                        setEnquiryFormData({
                          ...enquiryFormData,
                          child_data: myChildData,
                        });
                      }
                    }}
                    max={100}
                    addonAfter="%"
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Typography className="enquiry-form-item-label">
                    Child Previous Board <span>*</span>
                  </Typography>
                  <Input
                    value={each?.previous_board}
                    onChange={(e) => {
                      let myChildData = [...enquiryFormData?.child_data];
                      myChildData[index].previous_board = e.target.value
                        ?.trimStart()
                        ?.replace("  ", " ");
                      setEnquiryFormData({
                        ...enquiryFormData,
                        child_data: myChildData,
                      });
                    }}
                    maxLength={64}
                    autoComplete="off"
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Typography className="enquiry-form-item-label">
                    Pre School Tieup
                  </Typography>
                  <Select
                    style={{ width: "100%" }}
                    className="enquiry-form-select"
                    value={each?.pre_school_tieup}
                    onChange={(values) => {
                      let myChildData = [...enquiryFormData?.child_data];
                      myChildData[index].pre_school_tieup = values;
                      setEnquiryFormData({
                        ...enquiryFormData,
                        child_data: myChildData,
                      });
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={[]}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default PreviousSchoolDetails;
