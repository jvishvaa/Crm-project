import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Divider, Button, Steps } from "antd";
import "../index.scss";
import { MdArrowBack } from "react-icons/md";
import CustomBreadCrumbs from "../../../../component/UtilComponents/CustomBreadCrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import CustomCard from "../../../../component/UtilComponents/CustomCard";
import PersonalDetails from "./PersonalDetails";

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
      },
    ],
  });

  useEffect(() => {
    if (!location?.state?.is_add) {
      navigate("/enquiry-form/digital-enquiry-form", { replace: true });
    }
  }, [location]);

  return (
    <div>
      <Row gutter={[16, 16]}>
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
                      items={[
                        {
                          title: "Personal Details",
                        },
                        {
                          title: "Previous School",
                        },
                      ]}
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
              </Col>
            </Row>
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
};

export default CreateEnquiry;
