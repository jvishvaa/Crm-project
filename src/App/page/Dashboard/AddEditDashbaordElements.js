import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import {
  MdDeleteOutline,
  MdDonutLarge,
  MdListAlt,
  MdOutlineBarChart,
  MdOutlineSpeed,
  MdStackedBarChart,
} from "react-icons/md";
import { RiLineChartFill } from "react-icons/ri";
import { TbNumber123 } from "react-icons/tb";
import { LuTable } from "react-icons/lu";
import RenderTagMultiple from "../../component/UtilComponents/RenderMultiple";
import CustomCard from "../../component/UtilComponents/CustomCard";
import RenderChart from "./RenderChart";
import getArrayValues from "../../utils/getArrayValues";
import getFilterItemFromArray from "../../utils/getFilterItemFromArray";
import useWindowDimensions from "../../component/UtilComponents/useWindowDimensions";
import RenderTable from "./RenderTable";
import RenderDonutChart from "./RenderDonutChart";
import RenderNumber from "./RenderNumber";

const { TextArea } = Input;

const AddEditDashboardElements = ({
  modalData,
  handleAddEditDashboardElement,
  closeModal,
}) => {
  const [reportData, setReportData] = useState({
    report_name: "",
    description: "",
    display_type: "line-chart",
    measure: null,
    datapoint_category: {
      name: null,
      type: null,
      value: [],
    },
    datapoint_subcategory: {
      name: null,
      type: null,
      value: [],
    },
    filter: [],
  });

  const [graphData, setGraphData] = useState({});

  const { width } = useWindowDimensions();
  console.log(reportData);

  useEffect(() => {
    if (reportData?.display_type === "number" && reportData?.measure) {
      setGraphData({ count: 1334 });
    } else if (
      ((getFilterItemFromArray(
        displayTypeList,
        "value",
        reportData?.display_type
      )[0]?.is_category &&
        reportData?.datapoint_category?.name &&
        ((getFilterItemFromArray(
          datapointList,
          "value",
          reportData?.datapoint_category?.name
        )[0]?.type !== "sub-field" &&
          reportData?.datapoint_category?.type) ||
          getFilterItemFromArray(
            datapointList,
            "value",
            reportData?.datapoint_category?.name
          )[0]?.type === "sub-field") &&
        reportData?.datapoint_category?.value?.length) ||
        !getFilterItemFromArray(
          displayTypeList,
          "value",
          reportData?.display_type
        )[0]?.is_category) &&
      reportData?.measure &&
      ((reportData?.datapoint_subcategory?.name &&
        ((getFilterItemFromArray(
          datapointList,
          "value",
          reportData?.datapoint_subcategory?.name
        )[0]?.type !== "sub-field" &&
          reportData?.datapoint_subcategory?.type) ||
          getFilterItemFromArray(
            datapointList,
            "value",
            reportData?.datapoint_subcategory?.name
          )[0]?.type === "sub-field") &&
        reportData?.datapoint_subcategory?.value?.length) ||
        !reportData?.datapoint_subcategory?.name)
    ) {
      setGraphData({ category: getCategory(), series: getSeries() });
    } else {
      setGraphData({});
    }
  }, [reportData]);
  const measureList = [
    { label: "Lead Count", value: "lead_count" },
    { label: "Child Count", value: "child_count" },
  ];

  const datapointList = [
    {
      label: "Status",
      value: "status",
      type: "list",
      valueList: [
        { label: "Status 1", value: "Status 1" },
        { label: "Status 2", value: "Status 2" },
        { label: "Status 3", value: "Status 3" },
        { label: "Status 4", value: "Status 4" },
        { label: "Status 5", value: "Status 5" },
        { label: "Status 6", value: "Status 6" },
      ],
    },
    {
      label: "Source",
      value: "source",
      type: "list",
      valueList: [
        { label: "Source 1", value: "Source 1" },
        { label: "Source 2", value: "Source 2" },
        { label: "Source 3", value: "Source 3" },
        { label: "Source 4", value: "Source 4" },
        { label: "Source 5", value: "Source 5" },
        { label: "Source 6", value: "Source 6" },
      ],
    },
    {
      label: "Academic Year",
      value: "academic_year",
      type: "list",
      valueList: [
        { label: "Academic Year 1", value: "Academic Year 1" },
        { label: "Academic Year 2", value: "Academic Year 2" },
        { label: "Academic Year 3", value: "Academic Year 3" },
        { label: "Academic Year 4", value: "Academic Year 4" },
        { label: "Academic Year 5", value: "Academic Year 5" },
        { label: "Academic Year 6", value: "Academic Year 6" },
      ],
    },
    {
      label: "Lead Category",
      value: "lead_category",
      type: "list",
      valueList: [
        { label: "Hot", value: "Hot" },
        { label: "Interested", value: "Interested" },
        { label: "Normal", value: "Normal" },
      ],
    },
    {
      label: "Lead Properties",
      value: "lead_properties",
      type: "sub-field",
      valueList: [
        { label: "Dormant", value: "Dormant" },
        { label: "Active", value: "Active" },
        { label: "Regen", value: "Regen" },
      ],
    },
    {
      label: "Lead Created Date",
      value: "lead_created_date",
      type: "date",
    },
  ];

  const dateTypeList = [
    {
      label: "Today",
      value: "today",
      type: "single",
      keyData: "Day",
      maxData: 1,
    },
    {
      label: "Day Wise",
      value: "day-wise",
      type: "multiple",
      keyData: "Day",
      maxData: 31,
    },
    {
      label: "Current Week",
      value: "current-week",
      type: "single",
      keyData: "Week",
      maxData: 1,
    },
    {
      label: "Week Wise",
      value: "week-wise",
      type: "multiple",
      keyData: "Week",
      maxData: 5,
    },
    {
      label: "Current Month",
      value: "current-month",
      type: "single",
      keyData: "Month",
      maxData: 1,
    },
    {
      label: "Month Wise",
      value: "month-wise",
      type: "multiple",
      keyData: "Month",
      maxData: 12,
    },
  ];

  const displayTypeList = [
    {
      value: "line-chart",
      icon: <RiLineChartFill size={20} />,
      label: "Line Chart",
      is_sub_category: true,
      is_category: true,
    },
    {
      value: "vertical-bar-chart",
      icon: <MdOutlineBarChart size={20} />,
      label: "Vertical Bar Chart",
      is_sub_category: true,
      is_category: true,
    },
    {
      value: "horizontal-bar-chart",
      icon: (
        <MdOutlineBarChart size={20} style={{ transform: "rotate(90deg)" }} />
      ),
      label: "Horizontal Bar Chart",
      is_sub_category: true,
      is_category: true,
    },
    {
      value: "vertical-stacked-bar-chart",
      icon: <MdStackedBarChart size={20} />,
      label: "Vertical Stacked Bar Chart",
      is_sub_category: true,
      is_category: true,
    },
    {
      value: "horizontal-stacked-bar-chart",
      icon: (
        <MdStackedBarChart size={20} style={{ transform: "rotate(90deg)" }} />
      ),
      label: "Horizontal Stacked Bar Chart",
      is_sub_category: true,
      is_category: true,
    },
    {
      value: "donut-chart",
      icon: <MdDonutLarge size={20} />,
      label: "Donut Chart",
      is_sub_category: false,
      is_category: true,
    },
    {
      value: "number",
      icon: <TbNumber123 size={20} />,
      label: "Number",
      is_sub_category: false,
      is_category: false,
    },
    {
      value: "guage",
      icon: <MdOutlineSpeed size={20} />,
      label: "Gauge",
      is_sub_category: false,
      is_category: true,
    },
    {
      value: "table",
      icon: <LuTable size={20} />,
      label: "Table",
      is_sub_category: true,
      is_category: true,
    },
  ];

  const categoryListType = [
    { label: "Top 5", value: "top_5", maxLength: 5 },
    { label: "Worst 5", value: "worst_5", maxLength: 5 },
    { label: "Custom", value: "select_item" },
  ];

  const [loading, setLoading] = useState(false);

  const getCategory = () => {
    return getFilterItemFromArray(
      datapointList,
      "value",
      reportData?.datapoint_category?.name
    )[0]?.type === "date"
      ? Array.from(
          {
            length: reportData?.datapoint_category?.value[0],
          },
          (v, i) => i + 1
        )?.map((each, index) => {
          return `${
            getFilterItemFromArray(
              dateTypeList,
              "value",
              reportData?.datapoint_category?.type
            )[0]?.keyData
          } ${index + 1}`;
        })
      : reportData?.datapoint_category?.value;
  };

  function getRandomValue() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const getValueLabel = () => {
    return measureList?.filter((each) => each.value === reportData?.measure)[0]
      .label;
  };

  const getSeries = () => {
    const categoryList = getCategory();
    let seriesList = [];
    if (reportData?.datapoint_subcategory?.name) {
      let seriesNameList =
        getFilterItemFromArray(
          datapointList,
          "value",
          reportData?.datapoint_subcategory?.name
        )[0]?.type === "date"
          ? Array.from(
              {
                length: reportData?.datapoint_subcategory?.value[0],
              },
              (v, i) => i + 1
            )?.map((each, index) => {
              return `${
                getFilterItemFromArray(
                  dateTypeList,
                  "value",
                  reportData?.datapoint_subcategory?.type
                )[0]?.keyData
              } ${index + 1}`;
            })
          : reportData?.datapoint_subcategory?.value;
      seriesNameList?.map((each) => {
        let seriesData = [];
        categoryList?.map((eachItem) => {
          seriesData.push(getRandomValue());
        });
        seriesList.push({
          name: each,
          data: seriesData,
        });
      });
    } else {
      let seriesData = [];
      categoryList?.map((each) => {
        seriesData.push(getRandomValue());
      });
      seriesList = [{ data: seriesData }];
    }
    return seriesList;
  };

  const renderFilter = () => {
    return (
      <Col xs={24}>
        <Row
          className="d-flex flex-row justify-content-between align-items-center"
          gutter={[8, 8]}
        >
          <Col>
            <Typography style={{ fontSize: 13, fontWeight: 500 }}>
              Filter
            </Typography>
          </Col>
          <Col>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                const myFilterData = [...reportData?.filter];
                myFilterData.push({
                  name: null,
                  value: [],
                });
                setReportData({
                  ...reportData,
                  filter: myFilterData,
                });
              }}
            >
              Add Filter
            </Button>
          </Col>
          {reportData?.filter?.map((each, index) => (
            <Col xs={24}>
              <Row
                className="d-flex flex-row align-items-center"
                gutter={[4, 4]}
              >
                <Col xs={2} md={1}>
                  <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                    {index + 1}.
                  </Typography>
                </Col>
                <Col xs={20} md={22}>
                  <Row className="d-flex flex-row" gutter={[8, 8]}>
                    <Col xs={24} md={12}>
                      <Typography className={"add-dashboard-form-item-header"}>
                        Filter Name <span>*</span>
                      </Typography>
                      <Select
                        style={{ width: "100%" }}
                        value={each?.name}
                        allowClear
                        onChange={(values) => {
                          let myFilterData = [...reportData?.filter];
                          myFilterData[index].name = values;
                          myFilterData[index].value = [];
                          setReportData({
                            ...reportData,
                            filter: myFilterData,
                          });
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={
                          reportData?.datapoint_subcategory?.name ||
                          reportData?.datapoint_category?.name
                            ? getFilterItemFromArray(
                                datapointList,
                                "value",
                                [
                                  ...(reportData?.datapoint_subcategory?.name
                                    ? [reportData?.datapoint_subcategory?.name]
                                    : []),
                                  ...(reportData?.datapoint_category?.name
                                    ? [reportData?.datapoint_category?.name]
                                    : []),
                                ],
                                true
                              )?.filter((eachItem) =>
                                reportData?.filter?.filter(
                                  (eachItem1) => eachItem1?.name
                                )?.length
                                  ? eachItem?.value === each.name
                                    ? true
                                    : !getArrayValues(
                                        reportData?.filter?.filter(
                                          (eachItem1) => eachItem1?.name
                                        ),
                                        "name"
                                      ).includes(eachItem?.value)
                                  : true
                              )
                            : datapointList
                        }
                      />
                    </Col>
                    {each.name ? (
                      <Col xs={24} md={12}>
                        <Typography
                          className={"add-dashboard-form-item-header"}
                        >
                          Filter Value <span>*</span>
                        </Typography>
                        <Select
                          className="w-100 "
                          mode="multiple"
                          allowClear
                          value={each.value}
                          options={
                            getFilterItemFromArray(
                              datapointList,
                              "value",
                              each.name
                            )[0]?.type !== "date"
                              ? getFilterItemFromArray(
                                  datapointList,
                                  "value",
                                  each.name
                                )[0]?.valueList
                              : getFilterItemFromArray(
                                  dateTypeList,
                                  "type",
                                  "single"
                                )
                          }
                          onChange={(values) => {
                            let myFilterData = [...reportData?.filter];
                            myFilterData[index].value = values;
                            setReportData({
                              ...reportData,
                              filter: myFilterData,
                            });
                          }}
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
                <Col xs={2} md={1}>
                  <Popconfirm
                    title="Are you sure to remove filter?"
                    onConfirm={() => {
                      let myReportFilterData = [...reportData?.filter];
                      myReportFilterData?.splice(index, 1);
                      setReportData({
                        ...reportData,
                        filter: myReportFilterData,
                      });
                    }}
                  >
                    <Button
                      size="small"
                      type="text"
                      icon={
                        <MdDeleteOutline size={20} style={{ color: "red" }} />
                      }
                    />
                  </Popconfirm>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Col>
    );
  };

  return (
    <Modal
      centered
      open={modalData?.show}
      onCancel={() => {
        closeModal();
      }}
      width={900}
      footer={[
        <Button
          key="back"
          onClick={() => {
            closeModal();
          }}
          size="small"
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => {}}
          size="small"
        >
          {modalData?.data ? "Update" : "Save"}
        </Button>,
      ]}
    >
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Typography style={{ fontSize: 14, fontWeight: 600 }}>
            {modalData?.data ? "Edit Dashboard Report" : "Add Dashboard Report"}
          </Typography>
          <Divider />
        </Col>
        <Col
          xs={24}
          style={{ maxHeight: "80vh", overflowY: "auto", overflowX: "hidden" }}
        >
          <Row gutter={[16, 12]}>
            <Col xs={24} md={11}>
              <Row gutter={[8, 12]}>
                <Col xs={24}>
                  <Typography className={"add-dashboard-form-item-header"}>
                    Report Name <span>*</span>
                  </Typography>
                  <Input
                    maxLength={48}
                    value={reportData?.report_name}
                    onChange={(e) => {
                      setReportData({
                        ...reportData,
                        report_name: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col xs={24}>
                  <Typography className={"add-dashboard-form-item-header"}>
                    Description
                  </Typography>
                  <TextArea
                    rows={2}
                    value={reportData?.description}
                    onChange={(e) => {
                      setReportData({
                        ...reportData,
                        description: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col xs={24}>
                  <Typography className={"add-dashboard-form-item-header"}>
                    Display Type <span>*</span>
                  </Typography>
                  <Radio.Group
                    className="add-dashboard-form-item-radio"
                    onChange={(e) => {
                      setReportData({
                        ...reportData,
                        display_type: e.target.value,
                        ...(!getFilterItemFromArray(
                          displayTypeList,
                          "value",
                          e.target.value
                        )[0]?.is_sub_category
                          ? {
                              datapoint_subcategory: {
                                name: null,
                                type: null,
                                value: [],
                              },
                            }
                          : {}),
                        ...(!getFilterItemFromArray(
                          displayTypeList,
                          "value",
                          e.target.value
                        )[0]?.is_category
                          ? {
                              datapoint_category: {
                                name: null,
                                type: null,
                                value: [],
                              },
                            }
                          : {}),
                      });
                    }}
                    value={reportData?.display_type}
                    optionType="button"
                    buttonStyle="solid"
                  >
                    {displayTypeList?.map((each) => (
                      <Tooltip title={each.label}>
                        <Radio value={each.value}>{each.icon}</Radio>
                      </Tooltip>
                    ))}
                  </Radio.Group>
                </Col>
                <Col xs={24}>
                  <Typography className={"add-dashboard-form-item-header"}>
                    Measure <span>*</span>
                  </Typography>
                  <Select
                    style={{ width: "100%" }}
                    value={reportData?.measure}
                    onChange={(values) => {
                      setReportData({
                        ...reportData,
                        measure: values,
                      });
                    }}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={measureList}
                  />
                </Col>
                {getFilterItemFromArray(
                  displayTypeList,
                  "value",
                  reportData?.display_type
                )[0]?.is_category ? (
                  <Col xs={24}>
                    <Typography className={"add-dashboard-form-item-header"}>
                      Datapoint Category <span>*</span>
                    </Typography>
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      value={reportData?.datapoint_category?.name}
                      onChange={(values) => {
                        setReportData({
                          ...reportData,
                          datapoint_category: {
                            name: values,
                            type: null,
                            value: [],
                          },
                        });
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }
                      options={
                        reportData?.datapoint_subcategory?.name ||
                        getFilterItemFromArray(
                          reportData?.filter,
                          "name",
                          null,
                          true
                        )?.length
                          ? getFilterItemFromArray(
                              datapointList,
                              "value",
                              [
                                ...(reportData?.datapoint_subcategory?.name
                                  ? [reportData?.datapoint_subcategory?.name]
                                  : []),
                                ...getArrayValues(
                                  reportData?.filter?.filter(
                                    (each) => each.name
                                  ),
                                  "name"
                                ),
                              ],
                              true
                            )
                          : datapointList
                      }
                    />
                    {reportData?.datapoint_category?.name &&
                    getFilterItemFromArray(
                      datapointList,
                      "value",
                      reportData?.datapoint_category?.name
                    )[0]?.type !== "sub-field" ? (
                      <Select
                        style={{ width: "100%" }}
                        className="mt-2"
                        placeholder="Select Type"
                        allowClear
                        value={reportData?.datapoint_category?.type}
                        onChange={(values) => {
                          setReportData({
                            ...reportData,
                            datapoint_category: {
                              ...reportData?.datapoint_category,
                              type: values,
                              value:
                                values !== "select_item" ||
                                getFilterItemFromArray(
                                  datapointList,
                                  "value",
                                  reportData?.datapoint_category?.name
                                )[0]?.type !== "date"
                                  ? Array.from(
                                      {
                                        length: getFilterItemFromArray(
                                          categoryListType,
                                          "value",
                                          values
                                        )[0]?.maxLength,
                                      },
                                      (v, i) => i + 1
                                    )?.map((each, index) => {
                                      return `${
                                        getFilterItemFromArray(
                                          datapointList,
                                          "value",
                                          reportData?.datapoint_category?.name
                                        )[0].label
                                      } ${index + 1}`;
                                    })
                                  : [],
                            },
                          });
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={
                          getFilterItemFromArray(
                            datapointList,
                            "value",
                            reportData?.datapoint_category?.name
                          )[0]?.type === "date"
                            ? getFilterItemFromArray(
                                dateTypeList,
                                "type",
                                "multiple"
                              )
                            : categoryListType
                        }
                      />
                    ) : null}
                    {reportData?.datapoint_category?.type === "select_item" ||
                    getFilterItemFromArray(
                      datapointList,
                      "value",
                      reportData?.datapoint_category?.name
                    )[0]?.type === "sub-field" ? (
                      <Select
                        className="w-100 mt-2"
                        mode="multiple"
                        allowClear
                        placeholder="Select Value"
                        value={reportData?.datapoint_category?.value}
                        options={
                          getFilterItemFromArray(
                            datapointList,
                            "value",
                            reportData?.datapoint_category?.name
                          )[0]?.valueList
                        }
                        onChange={(values) => {
                          setReportData({
                            ...reportData,
                            datapoint_category: {
                              ...reportData?.datapoint_category,
                              value: values,
                            },
                          });
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    ) : null}
                    {getFilterItemFromArray(
                      datapointList,
                      "value",
                      reportData?.datapoint_category?.name
                    )[0]?.type === "date" &&
                    reportData?.datapoint_category?.type ? (
                      <Select
                        className="w-100 mt-2"
                        allowClear
                        placeholder="Select Value"
                        value={reportData?.datapoint_category?.value[0]}
                        options={Array.from(
                          {
                            length: getFilterItemFromArray(
                              dateTypeList,
                              "value",
                              reportData?.datapoint_category?.type
                            )[0]?.maxData,
                          },
                          (v, i) => i + 1
                        )
                          ?.filter((each) => each > 1)
                          ?.map((each) => {
                            return {
                              label: `${each} ${
                                getFilterItemFromArray(
                                  dateTypeList,
                                  "value",
                                  reportData?.datapoint_category?.type
                                )[0]?.keyData
                              }${each > 1 ? "s" : ""} `,
                              value: each,
                            };
                          })}
                        onChange={(values) => {
                          setReportData({
                            ...reportData,
                            datapoint_category: {
                              ...reportData?.datapoint_category,
                              value: [values],
                            },
                          });
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    ) : null}
                  </Col>
                ) : null}
                {getFilterItemFromArray(
                  displayTypeList,
                  "value",
                  reportData?.display_type
                )[0]?.is_sub_category ? (
                  <Col xs={24}>
                    <Typography className={"add-dashboard-form-item-header"}>
                      Datapoint SubCategory
                    </Typography>
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      value={reportData?.datapoint_subcategory?.name}
                      onChange={(values) => {
                        setReportData({
                          ...reportData,
                          datapoint_subcategory: {
                            name: values,
                            type: null,
                            value: [],
                          },
                        });
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }
                      options={
                        reportData?.datapoint_category?.name ||
                        getFilterItemFromArray(
                          reportData?.filter,
                          "name",
                          null,
                          true
                        )?.length
                          ? getFilterItemFromArray(
                              datapointList,
                              "value",
                              [
                                ...(reportData?.datapoint_category?.name
                                  ? [reportData?.datapoint_category?.name]
                                  : []),
                                ...getArrayValues(
                                  reportData?.filter?.filter(
                                    (each) => each.name
                                  ),
                                  "name"
                                ),
                              ],
                              true
                            )
                          : datapointList
                      }
                    />
                    {reportData?.datapoint_subcategory?.name &&
                    getFilterItemFromArray(
                      datapointList,
                      "value",
                      reportData?.datapoint_subcategory?.name
                    )[0]?.type !== "sub-field" ? (
                      <Select
                        style={{ width: "100%" }}
                        className="mt-2"
                        allowClear
                        placeholder="Select Type"
                        value={reportData?.datapoint_subcategory?.type}
                        onChange={(values) => {
                          setReportData({
                            ...reportData,
                            datapoint_subcategory: {
                              ...reportData?.datapoint_subcategory,
                              type: values,
                              value:
                                values !== "select_item" ||
                                getFilterItemFromArray(
                                  datapointList,
                                  "value",
                                  reportData?.datapoint_subcategory?.name
                                )[0]?.type !== "date"
                                  ? Array.from(
                                      {
                                        length: getFilterItemFromArray(
                                          categoryListType,
                                          "value",
                                          values
                                        )[0]?.maxLength,
                                      },
                                      (v, i) => i + 1
                                    )?.map((each, index) => {
                                      return `${
                                        getFilterItemFromArray(
                                          datapointList,
                                          "value",
                                          reportData?.datapoint_subcategory
                                            ?.name
                                        )[0].label
                                      } ${index + 1}`;
                                    })
                                  : [],
                            },
                          });
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={
                          getFilterItemFromArray(
                            datapointList,
                            "value",
                            reportData?.datapoint_subcategory?.name
                          )[0]?.type === "date"
                            ? getFilterItemFromArray(
                                dateTypeList,
                                "type",
                                "multiple"
                              )
                            : categoryListType
                        }
                      />
                    ) : null}
                    {reportData?.datapoint_subcategory?.type ===
                      "select_item" ||
                    getFilterItemFromArray(
                      datapointList,
                      "value",
                      reportData?.datapoint_subcategory?.name
                    )[0]?.type === "sub-field" ? (
                      <Select
                        className="w-100 mt-2"
                        mode="multiple"
                        allowClear
                        placeholder="Select Value"
                        value={reportData?.datapoint_subcategory?.value}
                        options={
                          getFilterItemFromArray(
                            datapointList,
                            "value",
                            reportData?.datapoint_subcategory?.name
                          )[0]?.valueList
                        }
                        onChange={(values) => {
                          setReportData({
                            ...reportData,
                            datapoint_subcategory: {
                              ...reportData?.datapoint_subcategory,
                              value: values,
                            },
                          });
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    ) : null}
                    {getFilterItemFromArray(
                      datapointList,
                      "value",
                      reportData?.datapoint_subcategory?.name
                    )[0]?.type === "date" &&
                    reportData?.datapoint_subcategory?.type ? (
                      <Select
                        className="w-100 mt-2"
                        allowClear
                        placeholder="Select Value"
                        value={reportData?.datapoint_subcategory?.value[0]}
                        options={Array.from(
                          {
                            length: getFilterItemFromArray(
                              dateTypeList,
                              "value",
                              reportData?.datapoint_subcategory?.type
                            )[0]?.maxData,
                          },
                          (v, i) => i + 1
                        )
                          ?.filter((each) => each > 1)
                          ?.map((each) => {
                            return {
                              label: `${each} ${
                                getFilterItemFromArray(
                                  dateTypeList,
                                  "value",
                                  reportData?.datapoint_subcategory?.type
                                )[0]?.keyData
                              }${each > 1 ? "s" : ""} `,
                              value: each,
                            };
                          })}
                        onChange={(values) => {
                          setReportData({
                            ...reportData,
                            datapoint_subcategory: {
                              ...reportData?.datapoint_subcategory,
                              value: [values],
                            },
                          });
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    ) : null}
                  </Col>
                ) : null}
              </Row>
            </Col>
            {width < 768 ? renderFilter() : null}
            <Col xs={24} md={13} style={{ backgroundColor: "#EFF1F6" }}>
              <Row gutter={[4, 4]}>
                <Col xs={24}>
                  <Typography style={{ fontSize: 12 }} className="mt-2">
                    Preview
                  </Typography>
                </Col>
                <Col xs={24}>
                  <CustomCard
                    style={{ minHeight: 200 }}
                    className="add-dashboard-element-preview-card"
                  >
                    <Row gutter={[8, 8]} className="mb-1">
                      <Col xs={24}>
                        <Typography
                          style={{ fontSize: 14, fontWeight: "500" }}
                          className="pl-2 pt-2"
                        >
                          {reportData?.report_name || "Report Name"}
                        </Typography>
                        {reportData?.description ? (
                          <Typography
                            style={{
                              fontSize: 11,
                              fontWeight: "500",
                              color: "#7a7a7a",
                            }}
                            className="pl-2"
                          >
                            {reportData?.description || "Report Name"}
                          </Typography>
                        ) : null}
                      </Col>
                      {Object.keys(graphData)?.length ? (
                        <Col xs={24}>
                          {reportData?.display_type === "line-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={getValueLabel()}
                              type={"line"}
                            />
                          ) : null}
                          {reportData?.display_type === "vertical-bar-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={getValueLabel()}
                              type={"column"}
                            />
                          ) : null}
                          {reportData?.display_type ===
                          "horizontal-bar-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={getValueLabel()}
                              type={"bar"}
                            />
                          ) : null}
                          {reportData?.display_type ===
                          "vertical-stacked-bar-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={getValueLabel()}
                              type="column"
                              stacked={true}
                            />
                          ) : null}
                          {reportData?.display_type ===
                          "horizontal-stacked-bar-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={getValueLabel()}
                              type="bar"
                              stacked={true}
                            />
                          ) : null}
                          {reportData?.display_type === "table" ? (
                            <RenderTable
                              category_name={
                                getFilterItemFromArray(
                                  datapointList,
                                  "value",
                                  reportData?.datapoint_category?.name
                                )?.length
                                  ? getFilterItemFromArray(
                                      datapointList,
                                      "value",
                                      reportData?.datapoint_category?.name
                                    )[0].label
                                  : ""
                              }
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={getValueLabel()}
                            />
                          ) : null}
                          {reportData?.display_type === "donut-chart" ? (
                            <RenderDonutChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={getValueLabel()}
                              type="bar"
                              stacked={true}
                            />
                          ) : null}
                          {reportData?.display_type === "number" ? (
                            <RenderNumber count={graphData?.count} />
                          ) : null}
                        </Col>
                      ) : (
                        <Col xs={24}>
                          <Row
                            className="d-flex flex-row justify-content-center align-content-center"
                            style={{ minHeight: 100 }}
                          >
                            <Typography
                              className="text-center"
                              style={{ fontSize: 14, fontWeight: 500 }}
                            >
                              Fill all value to preview chart
                            </Typography>
                          </Row>
                        </Col>
                      )}
                    </Row>
                  </CustomCard>
                </Col>
              </Row>
            </Col>
            {width >= 768 ? renderFilter() : null}
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddEditDashboardElements;
