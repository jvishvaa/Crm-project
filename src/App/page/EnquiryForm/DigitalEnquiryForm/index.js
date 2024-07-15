import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Divider,
  Spin,
  Input,
  Select,
  Button,
  Form,
  Tag,
  Tooltip,
} from "antd";
import "./index.scss";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import getCountryCode from "../../../utils/getCountryCode";
import { MdAdd, MdEdit, MdPrint, MdSearch, MdSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import { PlusOutlined } from "@ant-design/icons";
import getCardDataText from "../../../component/UtilComponents/CardDataText";

const DigitalEnquiryForm = () => {
  const [filterForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const navigate = useNavigate();

  const allCountryCodeList = [
    { country_code: "ENQ", max_length: 14 },
    ...getCountryCode(),
  ];

  useEffect(() => {
    filterForm.setFieldsValue({
      country_code: "+91",
      academic_year: "2024-25",
    });
  }, []);

  const getLeadData = () => {
    // setLeadData([]);
    setLeadData([
      {
        id: 4110494,
        enquiry_no: "ENQ50517343223458",
        lead_name: "Madhu Kumar S",
        next_follow_date: null,
        academic_year: "2023-24",
        lead_created_date: "2024-02-02",
        is_regen: true,
        in_dormant: true,
        is_enquiry: false,
        is_live: true,
        lead_status: {
          id: 29,
          status_name: "Call picked up",
        },
        lead_status_l2: null,
        tagging: null,
        contact_source: {
          id: 381,
          source_name: "Branch - ",
        },
        branch: {
          id: 151,
          branch_name: "Raja Test",
        },
      },
    ]);
  };

  const renderLeadNotExist = () => {
    return (
      <Col xs={24}>
        <Row gutter={[8, 8]}>
          <Col xs={8}>
            <CustomCard
              className={"enquiry-form-no-lead-card"}
              onClick={() => {
                navigate("/enquiry-form/digital-enquiry-form/create-enquiry", {
                  state: { is_add: true },
                });
              }}
            >
              <Row
                className="d-flex flex-column justify-content-center align-items-center"
                gutter={[8, 8]}
              >
                <Col>
                  <div className="enquiry-form-no-lead-icon-div">
                    <MdAdd size={30} className="enquiry-from-no-lead-icon" />
                  </div>
                </Col>
                <Col>
                  <Typography className="enquiry-form-no-lead-text">
                    Create Enquiry
                  </Typography>
                </Col>
              </Row>
            </CustomCard>
          </Col>
          <Col xs={8}>
            <CustomCard className={"enquiry-form-no-lead-card"}>
              <Row
                className="d-flex flex-column justify-content-center align-items-center"
                gutter={[8, 8]}
              >
                <Col>
                  <div className="enquiry-form-no-lead-icon-div">
                    <MdSend size={30} className="enquiry-from-no-lead-icon" />
                  </div>
                </Col>
                <Col>
                  <Typography className="enquiry-form-no-lead-text">
                    Send Enquiry Form
                  </Typography>
                </Col>
              </Row>
            </CustomCard>
          </Col>
          <Col xs={8}>
            <CustomCard className={"enquiry-form-no-lead-card"}>
              <Row
                className="d-flex flex-column justify-content-center align-items-center"
                gutter={[8, 8]}
              >
                <Col>
                  <div className="enquiry-form-no-lead-icon-div">
                    <MdPrint size={30} className="enquiry-from-no-lead-icon" />
                  </div>
                </Col>
                <Col>
                  <Typography className="enquiry-form-no-lead-text">
                    Print Enquiry Form
                  </Typography>
                </Col>
              </Row>
            </CustomCard>
          </Col>
        </Row>
      </Col>
    );
  };

  const renderLeadCard = () => {
    return (
      <Col xs={24}>
        <Row className={"d-flex"} gutter={[8, 8]}>
          {leadData?.map((each, index) => (
            <Col xs={24} sm={24} md={12} xl={12} key={index}>
              <CustomCard style={{ height: "100%" }}>
                <Row gutter={[4, 4]} className={"d-flex"}>
                  <Col xs={24}>
                    <Row gutter={[4, 4]} className={"d-flex flex-nowrap"}>
                      <Col xs={16} md={18} xl={19}>
                        <Row className={"d-flex flex-column flex-nowrap"}>
                          <Col xs={24}>
                            <Typography className="enquiry-form-card-header-name">
                              {each?.lead_name || "NA"}
                            </Typography>
                          </Col>
                          <Col xs={24}>
                            <Typography className="enquiry-form-card-subheader-text">
                              {"+917937363636"}
                            </Typography>
                          </Col>
                          <Col xs={24}>
                            <Typography className="enquiry-form-card-subheader-text">
                              {each?.enquiry_no || "NA"}
                            </Typography>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={8} md={6} xl={5}>
                        <Row
                          className="d-flex flex-row justify-content-end"
                          gutter={[4, 4]}
                        >
                          <Col>
                            <Tooltip title="Update Enquiry Form">
                              <Button
                                size="small"
                                type="text"
                                icon={<MdEdit size="20" />}
                                onClick={() => {
                                  navigate(
                                    "/enquiry-form/digital-enquiry-form/create-enquiry",
                                    {
                                      state: { is_edit: true },
                                    }
                                  );
                                }}
                              />
                            </Tooltip>
                          </Col>
                          <Col>
                            <Tooltip title="Send Enquiry Form">
                              <Button
                                size="small"
                                type="text"
                                icon={<MdSend size="20" />}
                              />
                            </Tooltip>
                          </Col>
                          <Col>
                            <Tooltip title="Print Enquiry Form">
                              <Button
                                size="small"
                                type="text"
                                icon={<MdPrint size="20" />}
                              />
                            </Tooltip>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Divider />
                  <Col xs={24}>
                    <Row className={"d-flex"} gutter={[4, 4]}>
                      {getCardDataText(
                        "Academic Year",
                        each?.academic_year || "--"
                      )}
                      {getCardDataText(
                        "Source",
                        each?.contact_source?.source_name || "--"
                      )}
                      {getCardDataText(
                        "Branch",
                        each?.branch?.branch_name || "--"
                      )}
                      {getCardDataText(
                        "Counsellor Name",
                        "Test Counsellor" || ""
                      )}
                    </Row>
                  </Col>
                  <Divider />
                  <Col xs={24} className="mt-1">
                    <Row className={"d-flex flex-row"} gutter={[4, 4]}>
                      {each?.is_regen ? <Tag color="magenta">Regen</Tag> : null}
                      {each.pro_status === "HOT Lead" ? (
                        <Tag color="red">Hot</Tag>
                      ) : null}
                      {each.is_enquiry ? (
                        <Tag color="green">ReEnquiry</Tag>
                      ) : null}
                    </Row>
                  </Col>
                </Row>
              </CustomCard>
            </Col>
          ))}
        </Row>
      </Col>
    );
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <CustomBreadCrumbs data={["Enquiry Form"]} />
            </Col>
            <Col xs={24}>
              <Divider />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Spin spinning={loading} tip="Loading">
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Form
                  form={filterForm}
                  layout="vertical"
                  onFinish={() => {
                    getLeadData();
                  }}
                >
                  <Row
                    gutter={[8, 0]}
                    className="d-flex flex-row"
                    style={{ marginTop: -10 }}
                  >
                    <Col xs={24} sm={9} md={10} lg={9} xl={8}>
                      <Form.Item name="academic_year" label="Academic Year">
                        <Select
                          style={{ width: "100%", marginTop: 3 }}
                          className="enquiry-form-select-filter"
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            { label: "2023-24", value: "2023-24" },
                            { label: "2024-25", value: "2024-25" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={18} sm={11} md={10} lg={9} xl={8}>
                      <Form.Item
                        label={
                          <span>
                            <span style={{ color: "red" }}>*</span> Mobile or
                            Enquiry
                          </span>
                        }
                      >
                        <Row gutter={[4, 4]} style={{ marginTop: -10 }}>
                          <Col xs={7} md={6}>
                            <Form.Item name="country_code">
                              <Select
                                style={{ width: "100%" }}
                                className="enquiry-form-select-country-code"
                                showSearch
                                filterOption={(input, option) =>
                                  option.label
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                onChange={(value) => {
                                  filterForm.setFieldsValue({
                                    country_code: value,
                                    contact_no: "",
                                  });
                                  setLeadData(null);
                                }}
                                options={allCountryCodeList?.map((each) => {
                                  return {
                                    label: each?.country_code,
                                    value: each?.country_code,
                                  };
                                })}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={17} md={18}>
                            <Form.Item shouldUpdate noStyle>
                              {({ getFieldValue }) => {
                                const countryCode =
                                  getFieldValue("country_code");
                                return (
                                  <Form.Item name="contact_no">
                                    <Input
                                      type="number"
                                      className="enquiry-form-select-contact"
                                      autoComplete="off"
                                      onKeyDown={(e) => {
                                        ["e", "E", "+", "-", "."].includes(
                                          e.key
                                        ) && e.preventDefault();
                                      }}
                                      onChange={(e) => {
                                        if (
                                          e.target.value.length <=
                                          allCountryCodeList?.filter(
                                            (each) =>
                                              each.country_code === countryCode
                                          )[0]?.max_length
                                        ) {
                                          filterForm.setFieldsValue({
                                            contact_no: e.target.value,
                                          });
                                          setLeadData(null);
                                        } else {
                                          filterForm.setFieldsValue({
                                            contact_no: e.target.value?.slice(
                                              0,
                                              -1
                                            ),
                                          });
                                        }
                                      }}
                                    />
                                  </Form.Item>
                                );
                              }}
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item shouldUpdate noStyle>
                        {({ getFieldValue }) => {
                          const countryCode = getFieldValue("country_code");
                          const contactNo = getFieldValue("contact_no");
                          return (
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                  leadData ||
                                  (countryCode === "ENQ"
                                    ? contactNo?.length <
                                      allCountryCodeList?.filter(
                                        (each) =>
                                          each.country_code === countryCode
                                      )[0]?.max_length -
                                        1
                                    : contactNo?.length !==
                                      allCountryCodeList?.filter(
                                        (each) =>
                                          each.country_code === countryCode
                                      )[0]?.max_length)
                                }
                                size="middle"
                                style={{ marginTop: 26, height: 28 }}
                              >
                                Search
                              </Button>
                            </Form.Item>
                          );
                        }}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col xs={24}>
                <Divider />
              </Col>
              {leadData ? (
                leadData?.length === 0 ? (
                  <>{renderLeadNotExist()}</>
                ) : (
                  <>{renderLeadCard()}</>
                )
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center flex-column"
                  style={{ height: "30vh", width: "100%" }}
                >
                  <MdSearch
                    style={{ color: "#a9a7a7", height: 50, width: 50 }}
                  />
                  <Typography style={{ color: "#a9a7a7", fontSize: "16px" }}>
                    Search Contact No or Enquiry
                  </Typography>
                </div>
              )}
            </Row>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default DigitalEnquiryForm;
