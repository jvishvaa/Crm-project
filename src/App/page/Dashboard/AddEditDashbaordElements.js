import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
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
  MdClose,
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
import CustomCard from "../../component/UtilComponents/CustomCard";
import RenderChart from "./RenderChart";
import getArrayValues from "../../utils/getArrayValues";
import getFilterItemFromArray from "../../utils/getFilterItemFromArray";
import useWindowDimensions from "../../component/UtilComponents/useWindowDimensions";
import RenderTable from "./RenderTable";
import RenderDonutChart from "./RenderDonutChart";
import RenderNumber from "./RenderNumber";
import RenderGaugeChart from "./RenderGaugeChart";

const { TextArea } = Input;

const CustomHeader = ({ label, onClose }) => (
  <Row
    className="d-flex flex-row justify-content-between align-items-center"
    gutter={[4, 4]}
  >
    <Col xs={20}>
      <Typography>{label}</Typography>
      <Typography style={{ fontSize: 10, fontWeight: 500, lineHeight: 1.4 }}>
        Note: If no date parameters are specified, the dashboard report will
        default to displaying data for the current day.{" "}
      </Typography>
    </Col>
    <Col xs={4}>
      <Row className="d-flex justify-content-end">
        <Button
          type="link"
          size="small"
          onClick={onClose}
          icon={<MdClose size={20} />}
        />
      </Row>
    </Col>
  </Row>
);
const AddEditDashboardElements = ({
  modalData,
  handleAddEditDashboardElement,
  closeModal,
}) => {
  const defaultReportData = {
    display_type: "table",
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
  };
  const [reportData, setReportData] = useState(defaultReportData);
  const defaultPlotBandData = {
    threshold1: null,
    threshold2: null,
  };
  const [plotBandData, setPlotBandData] = useState(defaultPlotBandData);
  const defaultReportHeadData = {
    report_name: "",
    description: "",
  };
  const [reportHeadData, setReportHeadData] = useState(defaultReportHeadData);
  const [graphData, setGraphData] = useState({});
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();

  const measureList = [
    { label: "Lead Count", value: "Lead Count" },
    { label: "Child Count", value: "Child Count" },
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
      value: "table",
      icon: <LuTable size={20} />,
      label: "Table",
      is_sub_category: true,
      is_category: true,
    },
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
      value: "gauge",
      icon: <MdOutlineSpeed size={20} />,
      label: "Gauge",
      is_sub_category: false,
      is_category: false,
    },
  ];

  const categoryListType = [
    { label: "Top 5", value: "top_5", maxLength: 5 },
    { label: "Worst 5", value: "worst_5", maxLength: 5 },
    { label: "Custom", value: "select_item" },
  ];

  const checkFilter = () => {
    return (
      (reportData?.filter.length &&
        reportData?.filter?.filter((each) => !each.name || !each.value?.length)
          ?.length === 0) ||
      !reportData?.filter?.length
    );
  };

  const checkCategory = () => {
    return (
      (getFilterItemFromArray(
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
      )[0]?.is_category
    );
  };
  const checkSubCategory = () => {
    return (
      (reportData?.datapoint_subcategory?.name &&
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
      !reportData?.datapoint_subcategory?.name
    );
  };

  useEffect(() => {
    if (
      ["number", "gauge"].includes(reportData?.display_type) &&
      reportData?.measure &&
      checkFilter()
    ) {
      setGraphData({
        count: 1334,
      });
    } else if (
      checkCategory() &&
      reportData?.measure &&
      checkSubCategory() &&
      checkFilter()
    ) {
      setGraphData({ category: getCategory(), series: getSeries() });
    } else {
      setGraphData({});
    }
  }, [reportData]);

  useEffect(() => {
    if (
      reportData?.display_type === "gauge" &&
      Object.keys(graphData)?.length
    ) {
      if (!plotBandData?.threshold1 && !plotBandData?.threshold2) {
        setPlotBandData({
          threshold1: Math.round(
            Math.round(graphData.count * (125 / 100)) * (40 / 100)
          ),
          threshold2: Math.round(
            Math.round(graphData.count * (125 / 100)) * (70 / 100)
          ),
        });
      }
    } else {
      setPlotBandData(defaultPlotBandData);
    }
  }, [reportData, graphData]);

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
            </Row>
          </Col>
          <Col xs={24}>
            <Row
              className="d-flex flex-row justify-content-between align-items-center"
              gutter={[24, 8]}
            >
              {reportData?.filter?.map((each, index) => (
                <Col xs={24} lg={12}>
                  <Row
                    className="d-flex flex-row align-items-center"
                    gutter={[4, 4]}
                  >
                    <Col xs={2} md={1}>
                      <Typography
                        style={{ fontSize: 14, fontWeight: 500, marginTop: 15 }}
                      >
                        {index + 1}.
                      </Typography>
                    </Col>
                    <Col xs={20} md={22}>
                      <Row className="d-flex flex-row" gutter={[8, 8]}>
                        <Col xs={24} md={12}>
                          <Typography
                            className={"add-dashboard-form-item-header"}
                          >
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
                                      ...(reportData?.datapoint_subcategory
                                        ?.name
                                        ? [
                                            reportData?.datapoint_subcategory
                                              ?.name,
                                          ]
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
                              mode={
                                getFilterItemFromArray(
                                  datapointList,
                                  "value",
                                  each.name
                                )[0]?.type === "date"
                                  ? "single"
                                  : "multiple"
                              }
                              allowClear
                              value={
                                getFilterItemFromArray(
                                  datapointList,
                                  "value",
                                  each.name
                                )[0]?.type === "date"
                                  ? each.value[0]
                                  : each.value
                              }
                              options={
                                getFilterItemFromArray(
                                  datapointList,
                                  "value",
                                  each.name
                                )[0]?.type === "date"
                                  ? getFilterItemFromArray(
                                      dateTypeList,
                                      "type",
                                      "single"
                                    )
                                  : getFilterItemFromArray(
                                      datapointList,
                                      "value",
                                      each.name
                                    )[0]?.valueList
                              }
                              onChange={(values) => {
                                let myFilterData = [...reportData?.filter];
                                myFilterData[index].value =
                                  getFilterItemFromArray(
                                    datapointList,
                                    "value",
                                    each.name
                                  )[0]?.type === "date"
                                    ? [values]
                                    : values;
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
                          style={{ marginTop: 15 }}
                          icon={
                            <MdDeleteOutline
                              size={20}
                              style={{ color: "red" }}
                            />
                          }
                        />
                      </Popconfirm>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    );
  };

  return (
    <Drawer
      className="add-dashboard-drawer"
      title={
        <CustomHeader
          label={
            modalData?.data ? "Edit Dashboard Report" : "Add Dashboard Report"
          }
          onClose={() => {
            closeModal();
          }}
        />
      }
      onClose={() => {
        closeModal();
      }}
      open={modalData?.show}
      width={"92%"}
      closable={false}
      maskClosable={false}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            key="back"
            style={{ marginRight: 8 }}
            onClick={() => {
              closeModal();
            }}
            size="small"
          >
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              handleAddEditDashboardElement({
                reportData: reportData,
                reportHeadData: reportHeadData,
                plotBandData: plotBandData,
                graphData: graphData,
              });
              setReportData(defaultReportData);
              setReportHeadData(defaultReportHeadData);
              setPlotBandData(defaultPlotBandData);
              setGraphData({});
            }}
            size="small"
          >
            {modalData?.data ? "Update" : "Save"}
          </Button>
        </div>
      }
    >
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Row gutter={[16, 12]}>
            <Col xs={24} md={11} lg={13}>
              <Row gutter={[8, 12]}>
                <Col xs={24} lg={12}>
                  <Typography className={"add-dashboard-form-item-header"}>
                    Report Name <span>*</span>
                  </Typography>
                  <Input
                    maxLength={48}
                    value={reportHeadData?.report_name}
                    onChange={(e) => {
                      setReportHeadData({
                        ...reportHeadData,
                        report_name: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Typography className={"add-dashboard-form-item-header"}>
                    Description
                  </Typography>
                  <TextArea
                    rows={2}
                    value={reportHeadData?.description}
                    onChange={(e) => {
                      setReportHeadData({
                        ...reportHeadData,
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
                  <Col
                    xs={24}
                    lg={
                      getFilterItemFromArray(
                        displayTypeList,
                        "value",
                        reportData?.display_type
                      )[0]?.is_sub_category
                        ? 12
                        : 24
                    }
                  >
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
                  <Col xs={24} lg={12}>
                    <Typography className={"add-dashboard-form-item-header"}>
                      Datapoint SubCategory{" "}
                      {reportData?.datapoint_subcategory?.name ? (
                        <span>*</span>
                      ) : null}
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
                {reportData?.display_type === "gauge" &&
                Object.keys(graphData)?.length ? (
                  <>
                    <Col xs={24} lg={12}>
                      <Typography className={"add-dashboard-form-item-header"}>
                        Threshold 1 <span>*</span>
                      </Typography>
                      <Input
                        type="number"
                        value={plotBandData?.threshold1}
                        onKeyDown={(e) => {
                          ["e", "E", "+", "-", "."].includes(e.key) &&
                            e.preventDefault();
                        }}
                        onChange={(e) => {
                          setPlotBandData({
                            ...plotBandData,
                            threshold1: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col xs={24} lg={12}>
                      <Typography className={"add-dashboard-form-item-header"}>
                        Threshold 2 <span>*</span>
                      </Typography>
                      <Input
                        type="number"
                        value={plotBandData?.threshold2}
                        onKeyDown={(e) => {
                          ["e", "E", "+", "-", "."].includes(e.key) &&
                            e.preventDefault();
                        }}
                        onChange={(e) => {
                          setPlotBandData({
                            ...plotBandData,
                            threshold2: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </>
                ) : null}
              </Row>
            </Col>
            {width < 768 ? renderFilter() : null}
            <Col xs={24} md={13} lg={11} style={{ backgroundColor: "#EFF1F6" }}>
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
                          {reportHeadData?.report_name || "Report Name"}
                        </Typography>
                        {reportHeadData?.description ? (
                          <Typography
                            style={{
                              fontSize: 11,
                              fontWeight: "500",
                              color: "#7a7a7a",
                            }}
                            className="pl-2"
                          >
                            {reportHeadData?.description}
                          </Typography>
                        ) : null}
                      </Col>
                      {Object.keys(graphData)?.length ? (
                        <Col xs={24}>
                          {reportData?.display_type === "line-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={reportData?.measure}
                              type={"line"}
                            />
                          ) : null}
                          {reportData?.display_type === "vertical-bar-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={reportData?.measure}
                              type={"column"}
                            />
                          ) : null}
                          {reportData?.display_type ===
                          "horizontal-bar-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={reportData?.measure}
                              type={"bar"}
                            />
                          ) : null}
                          {reportData?.display_type ===
                          "vertical-stacked-bar-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={reportData?.measure}
                              type="column"
                              stacked={true}
                            />
                          ) : null}
                          {reportData?.display_type ===
                          "horizontal-stacked-bar-chart" ? (
                            <RenderChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={reportData?.measure}
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
                              valueLabel={reportData?.measure}
                            />
                          ) : null}
                          {reportData?.display_type === "donut-chart" ? (
                            <RenderDonutChart
                              categories={graphData?.category}
                              series={graphData?.series}
                              valueLabel={reportData?.measure}
                              type="bar"
                              stacked={true}
                            />
                          ) : null}
                          {reportData?.display_type === "number" ? (
                            <RenderNumber count={graphData?.count} />
                          ) : null}
                          {reportData?.display_type === "gauge" ? (
                            <RenderGaugeChart
                              count={graphData?.count}
                              valueLabel={reportData?.measure}
                              plotBandData={plotBandData}
                            />
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
    </Drawer>
  );
};

export default AddEditDashboardElements;
