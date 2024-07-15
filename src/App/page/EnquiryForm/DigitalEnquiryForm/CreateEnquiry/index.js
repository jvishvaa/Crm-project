import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Divider, Button, Steps } from "antd";
import "../index.scss";
import { MdArrowBack } from "react-icons/md";
import CustomBreadCrumbs from "../../../../component/UtilComponents/CustomBreadCrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import CustomCard from "../../../../component/UtilComponents/CustomCard";
import PersonalDetails from "./PersonalDetails";
import PreviousSchoolDetails from "./PreviousSchoolDetails";

const CreateEnquiry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [enquiryFormData, setEnquiryFormData] = useState({
    branch: null,
    academic_year: null,
    enquiry_type: null,
    lead_source: null,
    child_data: [
      {
        child_name: null,
        child_gender: null,
        child_dob: null,
        child_grade: null,
        child_previous_grade: null,
        child_previous_school: null,
        reason_for_leave_school: null,
        previous_percentage: null,
        previous_board: null,
        pre_school_tieup: null,
      },
    ],
    lead_name: null,
    lead_relation: null,
    country_code_primary: null,
    lead_contact_no: null,
    country_code_alternate: null,
    alternate_contact_no: null,
    lead_email_id: null,
    lead_occupation: null,
    lead_income: null,
    lead_address: null,
    google_address: null,
  });

  const steps = [
    {
      title: "Personal Details",
    },
    {
      title: "Previous School",
    },
  ];

  useEffect(() => {
    if (!(location?.state?.is_add || location?.state?.is_edit)) {
      navigate("/enquiry-form/digital-enquiry-form", { replace: true });
    }
  }, [location]);

  return (
    <div>
      <Row gutter={[4, 4]}>
        <Col span={24}>
          <Row className="d-flex flex-row justify-content-between align-items-center">
            <Col>
              <Button
                type="text"
                size="small"
                icon={<MdArrowBack size={16} />}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </Button>
            </Col>
            <Col>
              <CustomBreadCrumbs data={["Enquiry Form"]} />
            </Col>
            <Col></Col>
          </Row>
        </Col>
        <Col xs={24}>
          <CustomCard>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Row className="d-flex justify-content-center align-items-center">
                  <Col xs={24} sm={20} md={18} lg={16} xl={14}>
                    <Steps
                      responsive={false}
                      direction="horizontal"
                      size="small"
                      current={currentStep}
                      labelPlacement="vertical"
                      items={steps}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} className="mt-2">
                {currentStep === 0 ? (
                  <PersonalDetails
                    enquiryFormData={enquiryFormData}
                    setEnquiryFormData={setEnquiryFormData}
                  />
                ) : null}
                {currentStep === 1 ? (
                  <PreviousSchoolDetails
                    enquiryFormData={enquiryFormData}
                    setEnquiryFormData={setEnquiryFormData}
                  />
                ) : null}
              </Col>
              <Col xs={24}>
                <Row className="d-flex flex-row justify-content-between align-items-center">
                  <Col>
                    {currentStep > 0 ? (
                      <Button
                        onClick={() => {
                          setCurrentStep(currentStep - 1);
                        }}
                      >
                        Back
                      </Button>
                    ) : null}
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        setCurrentStep(currentStep + 1);
                      }}
                    >
                      {currentStep === steps?.length - 1 ? "Save" : "Next"}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
};

export default CreateEnquiry;
