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
  Tooltip,
  Tag,
  Popconfirm,
  Form,
  message,
  Descriptions,
} from "antd";
import "./index.scss";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import getCountryCode from "../../../utils/getCountryCode";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import { IoMdEye } from "react-icons/io";
import dayjs from "dayjs";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import getCardDataText from "../../../component/UtilComponents/CardDataText";
import axios from "axios";
import urls from "../../../utils/urls";

const AddLead = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    filterForm.setFieldsValue({ country_code: "+91" });
  }, []);

  const getBranchList = () => {
    let params = { session_year: 4 };
    axios
      .get(`${urls.masterData.branchList}`, {
        params: params,
      })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setBranchList(response?.result);
      })
      .catch(() => {})
      .finally(() => {});
  };
  const getGradeList = (branchId) => {
    let params = { session_year: 4, branch_id: branchId };
    axios
      .get(`${urls.masterData.gradeList}`, {
        params: params,
      })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setGradeList(response?.data);
      })
      .catch(() => {})
      .finally(() => {});
  };
  const getLeadData = () => {
    setLeadData([]);
    // setLeadData([
    //   {
    //     id: 4110494,
    //     enquiry_no: "ENQ50517343223458",
    //     lead_name: "Madhu Kumar S",
    //     next_follow_date: null,
    //     academic_year: "2023-24",
    //     lead_created_date: "2024-02-02",
    //     is_regen: false,
    //     in_dormant: true,
    //     is_enquiry: false,
    //     is_live: true,
    //     lead_status: {
    //       id: 29,
    //       status_name: "Call picked up",
    //     },
    //     lead_status_l2: null,
    //     tagging: null,
    //     contact_source: {
    //       id: 381,
    //       source_name: "Branch - ",
    //     },
    //     branch: {
    //       id: 151,
    //       branch_name: "Raja Test",
    //     },
    //   },
    // ]);
  };

  const handleAddLead = (values) => {
    let data = {
      name: values?.lead_name,
      contact_no: filterForm?.getFieldValue("contact_no"),
      alternate_no: values?.alternate_contact_no,
      email: values?.lead_email,
      lead_childs: [
        {
          name: values?.child_name,
          grade: values?.child_grade,
        },
      ],
      school_type: values?.school_type,
      source_id: values?.source,
      academic_year: values?.academic_year,
      branch_id: values?.branch,
    };

    setSubmitLoading(true);
    axios
      .post(`${urls.masterData.addLead}`, data)
      .then((res) => {
        let response = res.data;
        // Handle the response as needed
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error adding lead:", error);
      })
      .finally(() => {
        form.resetFields();
        setLeadData(null);
        setSubmitLoading(false);
      });
  };

  const onFinish = (values) => {
    handleAddLead(values);
  };

  const handleCountryCodeChange = (value) => {
    form.setFieldsValue({ alternate_contact_no: "" });
    form.setFieldsValue({ country_code_alternate: value });
  };

  const handleContactNumberChange = (e) => {
    const countryCode = form.getFieldsValue()?.country_code_alternate;
    const maxLength =
      getCountryCode().find((each) => each.country_code === countryCode)
        ?.max_length || Infinity;
    const contactNumber = e.target.value;
    if (contactNumber.length <= maxLength) {
      form.setFieldsValue({ alternate_contact_no: contactNumber });
    } else {
      form.setFieldsValue({ alternate_contact_no: contactNumber.slice(0, -1) });
    }
  };

  const renderLeadCard = () => {
    return (
      <Col xs={24}>
        <Row className={"d-flex"} gutter={[8, 8]}>
          {leadData?.map((each, index) => (
            <Col xs={24} sm={24} md={12} xl={8} key={index}>
              <CustomCard style={{ height: "100%" }}>
                <Row gutter={[4, 4]} className={"d-flex"}>
                  <Col xs={24}>
                    <Row gutter={[4, 4]} className={"d-flex flex-nowrap"}>
                      <Col
                        xs={each?.in_dormant ? 16 : 20}
                        md={each?.in_dormant ? 12 : 20}
                        xl={each?.in_dormant ? 16 : 20}
                      >
                        <Row className={"d-flex flex-column flex-nowrap"}>
                          <Col xs={24}>
                            <Typography className="th-13 th-fw-500">
                              {each?.lead_name || "NA"}
                            </Typography>
                          </Col>
                          <Col xs={24}>
                            <Typography className="th-12">
                              {"+917937363636"}
                            </Typography>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={each.in_dormant ? 8 : 4}
                        md={each?.in_dormant ? 12 : 4}
                        xl={each.in_dormant ? 8 : 4}
                      >
                        <Row
                          className="d-flex flex-row justify-content-end align-items-center"
                          gutter={[8, 8]}
                        >
                          <Col>
                            <Popconfirm
                              title="Are you sure to reactivate lead?"
                              onConfirm={() => {}}
                            >
                              <Button
                                type="primary"
                                size="small"
                                className="add-lead-reactivate"
                              >
                                Reactivate
                              </Button>
                            </Popconfirm>
                          </Col>
                          <Col>
                            <Tooltip title="View Lead">
                              <Button
                                type="iconbutton"
                                size="small"
                                icon={<IoMdEye size={22} />}
                                onClick={() => {
                                  navigate("/lead-management/lead-details/1", {
                                    state: { is_back: true },
                                  });
                                }}
                              />
                            </Tooltip>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Divider />
                  <Col xs={24}>
                    <Descriptions column={1}>
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
                        "Lead Status",
                        `${each.lead_status?.status_name}
                          ${
                            each.lead_status2
                              ? ` -> ${each.lead_status2?.status_name}`
                              : ""
                          }`
                      )}

                      {getCardDataText(
                        "Next Follow Up Date",
                        each?.next_follow_date
                          ? dayjs(each?.next_follow_date).format(
                              "DD MMM YYYY hh:mm a"
                            )
                          : "--"
                      )}
                    </Descriptions>
                  </Col>
                  <Divider />
                  <Col xs={24} className="mt-1">
                    <Row className={"d-flex flex-row"} gutter={[4, 4]}>
                      {each.in_dormant ? <Tag color="gold">Dormant</Tag> : null}
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

  const renderLeadForm = () => {
    return (
      <Col xs={24}>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Typography className="text-center" style={{ fontWeight: 500 }}>
              Lead Form
            </Typography>
          </Col>
          <Col xs={24}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              disabled={submitLoading}
              className="add-lead-form"
            >
              <Row>
                <Col xs={24}>
                  <Typography className="add-lead-form-header">
                    School Details
                  </Typography>
                </Col>
                <Col xs={24}>
                  <Row gutter={[12, 8]}>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="academic_year"
                        label="Academic Year"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Academic Year",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          className="add-lead-select"
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          onChange={() => {
                            getBranchList();
                          }}
                          options={[
                            { label: "2023-24", value: "2023-24" },
                            { label: "2024-25", value: "2024-25" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="branch"
                        label="Branch"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Branch",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          className="add-lead-select"
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={branchList?.map((item, ind) => {
                            return {
                              label: item?.branch_name,
                              value: item?.id,
                            };
                          })}
                          onChange={(value) => {
                            getGradeList(value);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="school_type"
                        label="School Type"
                        rules={[
                          {
                            required: true,
                            message: "Please Select School Type",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          className="add-lead-select"
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            { label: "Day", value: 1 },
                            { label: "Boarding", value: 2 },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col xs={24} style={{ marginTop: 15 }}>
                  <Typography className="add-lead-form-header">
                    Lead Details
                  </Typography>
                </Col>
                <Col xs={24}>
                  <Row gutter={[12, 8]}>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="lead_name"
                        label="Lead Name"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Lead Name",
                          },
                        ]}
                      >
                        <Input
                          maxLength={48}
                          autoComplete="off"
                          onChange={(e) => {
                            form.setFieldsValue({
                              lead_name: e.target.value
                                ?.trimStart()
                                ?.replace("  ", " "),
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="lead_email"
                        label="Lead Email"
                        rules={[
                          {
                            type: "email",
                            message: "Invalid Email",
                          },
                        ]}
                      >
                        <Input
                          type="email"
                          maxLength={48}
                          autoComplete="off"
                          onChange={(e) => {
                            form.setFieldsValue({
                              lead_email: e.target.value?.trim(),
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="source"
                        label="Lead Source"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Lead Source",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          className="add-lead-select"
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            { label: "DM-Direct", value: 1 },
                            {
                              label: "PRO Data - Field Data",
                              value: 2,
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item label="Alternate Contact">
                        <Row gutter={[4, 4]}>
                          <Col xs={7} md={6}>
                            <Form.Item name="country_code_alternate">
                              <Select
                                style={{ width: "100%" }}
                                className="add-lead-select"
                                allowClear
                                showSearch
                                filterOption={(input, option) =>
                                  option.label
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                onChange={handleCountryCodeChange}
                                options={getCountryCode().map((each) => ({
                                  label: each.country_code,
                                  value: each.country_code,
                                }))}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={17} md={18}>
                            <Form.Item shouldUpdate noStyle>
                              {({ getFieldValue }) => {
                                const countryCode = getFieldValue(
                                  "country_code_alternate"
                                );
                                return (
                                  <Form.Item name="alternate_contact_no">
                                    <Input
                                      type="number"
                                      autoComplete="off"
                                      onKeyDown={(e) => {
                                        ["e", "E", "+", "-", "."].includes(
                                          e.key
                                        ) && e.preventDefault();
                                      }}
                                      disabled={!countryCode}
                                      onChange={(e) =>
                                        handleContactNumberChange(
                                          e,
                                          countryCode
                                        )
                                      }
                                    />
                                  </Form.Item>
                                );
                              }}
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} style={{ marginTop: 15 }}>
                  <Typography className="add-lead-form-header">
                    Child Details
                  </Typography>
                </Col>
                <Col xs={24}>
                  <Row gutter={[12, 8]}>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="child_name"
                        label="Child Name"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Child Name",
                          },
                        ]}
                      >
                        <Input
                          maxLength={48}
                          autoComplete="off"
                          onChange={(e) => {
                            form.setFieldsValue({
                              child_name: e.target.value
                                ?.trimStart()
                                ?.replace("  ", " "),
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="child_grade"
                        label="Child Grade"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Child Grade",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          className="add-lead-select"
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={gradeList?.map((item, ind) => {
                            return {
                              value: item?.id,
                              label: item?.grade_name,
                            };
                          })}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24}>
                  <Row className="d-flex justify-content-end mt-2">
                    <Button
                      size="medium"
                      type="primary"
                      loading={submitLoading}
                      onClick={() => {
                        form.submit();
                      }}
                    >
                      Submit
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    );
  };

  return (
    <CustomCard>
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <CustomBreadCrumbs data={["Add Lead"]} />
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
                    gutter={[8, 8]}
                    className="d-flex flex-row"
                    style={{ marginTop: -10 }}
                  >
                    <Col xs={18} sm={12} md={10} lg={9} xl={8}>
                      <Form.Item
                        label={
                          <span>
                            <span style={{ color: "red" }}>*</span> Contact
                          </span>
                        }
                      >
                        <Row gutter={[4, 4]} style={{ marginTop: -10 }}>
                          <Col xs={7} md={6}>
                            <Form.Item name="country_code">
                              <Select
                                style={{ width: "100%" }}
                                showSearch
                                className="add-lead-select"
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
                                  form.resetFields();
                                }}
                                options={getCountryCode()?.map((each) => {
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
                                      autoComplete="off"
                                      onKeyDown={(e) => {
                                        ["e", "E", "+", "-", "."].includes(
                                          e.key
                                        ) && e.preventDefault();
                                      }}
                                      onChange={(e) => {
                                        if (
                                          e.target.value.length <=
                                          getCountryCode()?.filter(
                                            (each) =>
                                              each.country_code === countryCode
                                          )[0]?.max_length
                                        ) {
                                          filterForm.setFieldsValue({
                                            contact_no: e.target.value,
                                          });
                                          setLeadData(null);
                                          form.resetFields();
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
                                  contactNo?.length !==
                                    getCountryCode()?.filter(
                                      (each) =>
                                        each.country_code === countryCode
                                    )[0]?.max_length
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
                  <>{renderLeadForm()}</>
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
                  <Typography style={{ color: "#a9a7a7" }} className="th-16">
                    Search Number To Add Lead
                  </Typography>
                </div>
              )}
            </Row>
          </Spin>
        </Col>
      </Row>
    </CustomCard>
  );
};

export default AddLead;
