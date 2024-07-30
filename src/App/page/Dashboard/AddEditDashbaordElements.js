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
  message,
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
import RenderTagMultiple from "../../component/UtilComponents/RenderMultiple";
import CustomDrawerHeader from "../../component/UtilComponents/CustomDrawerHeader";

const { TextArea } = Input;

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
      value: [],
    },
    datapoint_subcategory: {
      name: null,
      value: [],
    },
    filter: [],
  };
  const [reportConfigData, setReportConfigData] = useState(defaultReportData);
  const defaultPlotBandData = {
    threshold1: null,
    threshold2: null,
  };
  const [plotBandData, setPlotBandData] = useState(defaultPlotBandData);
  const [reportDescription, setReportDescription] = useState("");
  const [resultData, setResultData] = useState({});
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();

  const measureList = [
    { label: "Lead Count", value: "Lead Count" },
    { label: "Child Count", value: "Child Count" },
  ];

  const selectLimit = 10;

  const datapointList = [
    {
      label: "Status",
      value: "Status",
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
      value: "Source",
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
      label: "Lead Category",
      value: "Lead Category",
      valueList: [
        { label: "Hot", value: "Hot" },
        { label: "Interested", value: "Interested" },
        { label: "Normal", value: "Normal" },
      ],
    },
    {
      label: "Lead Created Date",
      value: "Lead Created Date",
    },
  ];

  const dateTypeList = [
    {
      label: "Day Wise",
      value: "day-wise",
      valueList: [
        { label: "Day 1", value: "Day 1" },
        { label: "Day 2", value: "Day 2" },
        { label: "Day 3", value: "Day 3" },
        { label: "Day 4", value: "Day 4" },
        { label: "Day 5", value: "Day 5" },
      ],
    },
    {
      label: "Week Wise",
      value: "week-wise",
      valueList: [
        { label: "Week 1", value: "Week 1" },
        { label: "Week 2", value: "Week 2" },
        { label: "Week 3", value: "Week 3" },
        { label: "Week 4", value: "Week 4" },
        { label: "Week 5", value: "Week 5" },
      ],
    },
    {
      label: "Month Wise",
      value: "month-wise",
      valueList: [
        { label: "Month 1", value: "Month 1" },
        { label: "Month 2", value: "Month 2" },
        { label: "Month 3", value: "Month 3" },
        { label: "Month 4", value: "Month 4" },
        { label: "Month 5", value: "Month 5" },
      ],
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

  const checkFilter = () => {
    return (
      (reportConfigData?.filter.length &&
        reportConfigData?.filter?.filter(
          (each) => !each.name || !each.value?.length
        )?.length === 0) ||
      !reportConfigData?.filter?.length
    );
  };

  const checkCategory = () => {
    return (
      (getFilterItemFromArray(
        displayTypeList,
        "value",
        reportConfigData?.display_type
      )[0]?.is_category &&
        reportConfigData?.datapoint_category?.name &&
        reportConfigData?.datapoint_category?.value?.length) ||
      !getFilterItemFromArray(
        displayTypeList,
        "value",
        reportConfigData?.display_type
      )[0]?.is_category
    );
  };
  const checkSubCategory = () => {
    return (
      (reportConfigData?.datapoint_subcategory?.name &&
        reportConfigData?.datapoint_subcategory?.value?.length) ||
      !reportConfigData?.datapoint_subcategory?.name
    );
  };

  useEffect(() => {
    if (modalData?.data && modalData?.type === "Configure Report") {
      setReportConfigData(
        modalData?.data?.reportConfigData || defaultReportData
      );
      setPlotBandData(modalData?.data?.plotBandData || defaultPlotBandData);
      setReportDescription(modalData?.data?.report_description || "");
      setResultData(modalData?.data?.resultData || {});
      setTimeout(() => {
        setIsDataUpdated(true);
      }, [2000]);
    }
  }, [modalData]);

  useEffect(() => {
    if (!modalData?.data || (modalData?.data && isDataUpdated)) {
      if (
        ["number", "gauge"].includes(reportConfigData?.display_type) &&
        reportConfigData?.measure &&
        checkFilter()
      ) {
        setResultData({
          count: 1334,
        });
      } else if (
        checkCategory() &&
        reportConfigData?.measure &&
        checkSubCategory() &&
        checkFilter()
      ) {
        setResultData({ category: getCategory(), series: getSeries() });
      } else {
        setResultData({});
      }
    }
  }, [reportConfigData]);

  useEffect(() => {
    if (!modalData?.data || (modalData?.data && isDataUpdated)) {
      if (
        reportConfigData?.display_type === "gauge" &&
        Object.keys(resultData)?.length
      ) {
        if (!plotBandData?.threshold1 && !plotBandData?.threshold2) {
          setPlotBandData({
            threshold1: Math.round(
              Math.round(resultData.count * (125 / 100)) * (40 / 100)
            ),
            threshold2: Math.round(
              Math.round(resultData.count * (125 / 100)) * (70 / 100)
            ),
          });
        }
      } else {
        setPlotBandData(defaultPlotBandData);
      }
    }
  }, [reportConfigData, resultData]);

  const getCategory = () => {
    return reportConfigData?.datapoint_category?.name
      ?.toLowerCase()
      ?.includes("date")
      ? getArrayValues(
          getFilterItemFromArray(
            dateTypeList,
            "value",
            reportConfigData?.datapoint_category?.value[0]
          )[0]?.valueList,
          "value"
        )
      : reportConfigData?.datapoint_category?.value?.length &&
        reportConfigData?.datapoint_category?.value[0] === 0
      ? getArrayValues(
          getFilterItemFromArray(
            datapointList,
            "value",
            reportConfigData?.datapoint_category?.name
          )[0]?.valueList,
          "value"
        )
      : reportConfigData?.datapoint_category?.value;
  };

  function getRandomValue() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const getSeries = () => {
    const categoryList = getCategory();
    let seriesList = [];
    if (reportConfigData?.datapoint_subcategory?.name) {
      let seriesNameList = reportConfigData?.datapoint_subcategory?.name
        ?.toLowerCase()
        ?.includes("date")
        ? getArrayValues(
            getFilterItemFromArray(
              dateTypeList,
              "value",
              reportConfigData?.datapoint_subcategory?.value[0]
            )[0]?.valueList,
            "value"
          )
        : reportConfigData?.datapoint_subcategory?.value;
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
                    const myFilterData = [...reportConfigData?.filter];
                    myFilterData.push({
                      name: null,
                      value: [],
                    });
                    setReportConfigData({
                      ...reportConfigData,
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
              {reportConfigData?.filter?.map((each, index) => (
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
                              let myFilterData = [...reportConfigData?.filter];
                              myFilterData[index].name = values;
                              myFilterData[index].value = [];
                              setReportConfigData({
                                ...reportConfigData,
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
                              reportConfigData?.datapoint_subcategory?.name ||
                              reportConfigData?.datapoint_category?.name
                                ? getFilterItemFromArray(
                                    datapointList?.filter(
                                      (each) =>
                                        !each.value
                                          ?.toLowerCase()
                                          .includes("date")
                                    ),
                                    "value",
                                    [
                                      ...(reportConfigData
                                        ?.datapoint_subcategory?.name
                                        ? [
                                            reportConfigData
                                              ?.datapoint_subcategory?.name,
                                          ]
                                        : []),
                                      ...(reportConfigData?.datapoint_category
                                        ?.name
                                        ? [
                                            reportConfigData?.datapoint_category
                                              ?.name,
                                          ]
                                        : []),
                                    ],
                                    true
                                  )?.filter((eachItem) =>
                                    reportConfigData?.filter?.filter(
                                      (eachItem1) => eachItem1?.name
                                    )?.length
                                      ? eachItem?.value === each.name
                                        ? true
                                        : !getArrayValues(
                                            reportConfigData?.filter?.filter(
                                              (eachItem1) => eachItem1?.name
                                            ),
                                            "name"
                                          ).includes(eachItem?.value)
                                      : true
                                  )
                                : datapointList?.filter(
                                    (each) =>
                                      !each.value
                                        ?.toLowerCase()
                                        .includes("date")
                                  )
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
                              mode={"multiple"}
                              allowClear
                              value={each.value}
                              options={
                                getFilterItemFromArray(
                                  datapointList,
                                  "value",
                                  each.name
                                )[0]?.valueList
                              }
                              onChange={(values) => {
                                let myFilterData = [
                                  ...reportConfigData?.filter,
                                ];
                                myFilterData[index].value = values;
                                setReportConfigData({
                                  ...reportConfigData,
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
                          let myReportFilterData = [
                            ...reportConfigData?.filter,
                          ];
                          myReportFilterData?.splice(index, 1);
                          setReportConfigData({
                            ...reportConfigData,
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

  const setDefaultState = () => {
    setReportConfigData(defaultReportData);
    setReportDescription("");
    setPlotBandData(defaultPlotBandData);
    setResultData({});
  };

  return (
    <Drawer
      className="add-dashboard-drawer"
      title={
        <CustomDrawerHeader
          label={"Configure Report"}
          onClose={() => {
            setDefaultState();
            closeModal();
          }}
        />
      }
      onClose={() => {
        setDefaultState();
        closeModal();
      }}
      open={modalData?.show && modalData?.type === "Configure Report"}
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
              setDefaultState();
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
            disabled={Object.keys(resultData)?.length === 0}
            onClick={() => {
              handleAddEditDashboardElement({
                reportConfigData: reportConfigData,
                report_description: reportDescription,
                plotBandData: plotBandData,
                resultData: resultData,
                ...(modalData?.data ? { id: modalData?.data?.id } : {}),
              });
              setDefaultState();
              closeModal();
            }}
            size="small"
          >
            Submit
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
                    value={modalData?.data?.report_name}
                    disabled
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Typography className={"add-dashboard-form-item-header"}>
                    Description
                  </Typography>
                  <TextArea
                    rows={2}
                    value={reportDescription}
                    onChange={(e) => {
                      setReportDescription(e.target.value);
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
                      setReportConfigData({
                        ...reportConfigData,
                        display_type: e.target.value,
                        ...(reportConfigData?.datapoint_category?.value
                          ?.length &&
                        reportConfigData?.datapoint_category?.value[0] === 0
                          ? {
                              datapoint_category: {
                                ...reportConfigData?.datapoint_category,
                                value: [],
                              },
                            }
                          : {}),
                        ...(!getFilterItemFromArray(
                          displayTypeList,
                          "value",
                          e.target.value
                        )[0]?.is_sub_category
                          ? {
                              datapoint_subcategory: {
                                name: null,
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
                                value: [],
                              },
                            }
                          : {}),
                      });
                    }}
                    value={reportConfigData?.display_type}
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
                    value={reportConfigData?.measure}
                    onChange={(values) => {
                      setReportConfigData({
                        ...reportConfigData,
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
                  reportConfigData?.display_type
                )[0]?.is_category ? (
                  <Col
                    xs={24}
                    lg={
                      getFilterItemFromArray(
                        displayTypeList,
                        "value",
                        reportConfigData?.display_type
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
                      value={reportConfigData?.datapoint_category?.name}
                      onChange={(values) => {
                        setReportConfigData({
                          ...reportConfigData,
                          datapoint_category: {
                            name: values,
                            value: [],
                          },
                        });
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }
                      options={
                        reportConfigData?.datapoint_subcategory?.name ||
                        getFilterItemFromArray(
                          reportConfigData?.filter,
                          "name",
                          null,
                          true
                        )?.length
                          ? getFilterItemFromArray(
                              datapointList,
                              "value",
                              [
                                ...(reportConfigData?.datapoint_subcategory
                                  ?.name
                                  ? [
                                      reportConfigData?.datapoint_subcategory
                                        ?.name,
                                    ]
                                  : []),
                                ...getArrayValues(
                                  reportConfigData?.filter?.filter(
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

                    {reportConfigData?.datapoint_category?.name ? (
                      <>
                        {reportConfigData?.datapoint_category?.name
                          ?.toLowerCase()
                          ?.includes("date") ? (
                          <Select
                            className="w-100 mt-2"
                            allowClear
                            placeholder="Select Value"
                            value={
                              reportConfigData?.datapoint_category?.value[0]
                            }
                            options={dateTypeList}
                            onChange={(values) => {
                              setReportConfigData({
                                ...reportConfigData,
                                datapoint_category: {
                                  ...reportConfigData?.datapoint_category,
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
                        ) : (
                          <Select
                            className="w-100 mt-2"
                            mode={"multiple"}
                            allowClear
                            placeholder="Select Value"
                            value={reportConfigData?.datapoint_category?.value}
                            options={[
                              ...(reportConfigData?.display_type === "table"
                                ? [{ label: "All", value: 0 }]
                                : []),
                              ...getFilterItemFromArray(
                                datapointList,
                                "value",
                                reportConfigData?.datapoint_category?.name
                              )[0]?.valueList,
                            ]}
                            onChange={(values) => {
                              if (values.length <= selectLimit) {
                                setReportConfigData({
                                  ...reportConfigData,
                                  datapoint_category: {
                                    ...reportConfigData?.datapoint_category,
                                    value:
                                      values.length &&
                                      values[values.length - 1] === 0
                                        ? [0]
                                        : values?.filter((each) => each !== 0),
                                  },
                                });
                              }
                            }}
                            tagRender={(props) => (
                              <RenderTagMultiple
                                label={props.label}
                                value={props.value}
                                showCloseIcon={
                                  !reportConfigData?.datapoint_category?.value?.includes(
                                    0
                                  )
                                }
                                onClose={(closeValue) => {
                                  setReportConfigData({
                                    ...reportConfigData,
                                    datapoint_category: {
                                      ...reportConfigData?.datapoint_category,
                                      value:
                                        reportConfigData?.datapoint_category?.value?.filter(
                                          (each) => each !== closeValue
                                        ),
                                    },
                                  });
                                }}
                              />
                            )}
                            showSearch
                            filterOption={(input, option) =>
                              option.label
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        )}
                      </>
                    ) : null}
                  </Col>
                ) : null}
                {getFilterItemFromArray(
                  displayTypeList,
                  "value",
                  reportConfigData?.display_type
                )[0]?.is_sub_category ? (
                  <Col xs={24} lg={12}>
                    <Typography className={"add-dashboard-form-item-header"}>
                      Datapoint SubCategory{" "}
                      {reportConfigData?.datapoint_subcategory?.name ? (
                        <span>*</span>
                      ) : null}
                    </Typography>
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      value={reportConfigData?.datapoint_subcategory?.name}
                      onChange={(values) => {
                        setReportConfigData({
                          ...reportConfigData,
                          datapoint_subcategory: {
                            name: values,
                            value: [],
                          },
                        });
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }
                      options={
                        reportConfigData?.datapoint_category?.name ||
                        getFilterItemFromArray(
                          reportConfigData?.filter,
                          "name",
                          null,
                          true
                        )?.length
                          ? getFilterItemFromArray(
                              datapointList,
                              "value",
                              [
                                ...(reportConfigData?.datapoint_category?.name
                                  ? [reportConfigData?.datapoint_category?.name]
                                  : []),
                                ...getArrayValues(
                                  reportConfigData?.filter?.filter(
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
                    {reportConfigData?.datapoint_subcategory?.name ? (
                      <>
                        {reportConfigData?.datapoint_subcategory?.name
                          ?.toLowerCase()
                          ?.includes("date") ? (
                          <Select
                            className="w-100 mt-2"
                            allowClear
                            placeholder="Select Value"
                            value={
                              reportConfigData?.datapoint_subcategory?.value[0]
                            }
                            options={dateTypeList}
                            onChange={(values) => {
                              setReportConfigData({
                                ...reportConfigData,
                                datapoint_subcategory: {
                                  ...reportConfigData?.datapoint_subcategory,
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
                        ) : (
                          <Select
                            className="w-100 mt-2"
                            mode="multiple"
                            allowClear
                            placeholder="Select Value"
                            value={
                              reportConfigData?.datapoint_subcategory?.value
                            }
                            options={
                              getFilterItemFromArray(
                                datapointList,
                                "value",
                                reportConfigData?.datapoint_subcategory?.name
                              )[0]?.valueList
                            }
                            onChange={(values) => {
                              if (values.length <= selectLimit) {
                                setReportConfigData({
                                  ...reportConfigData,
                                  datapoint_subcategory: {
                                    ...reportConfigData?.datapoint_subcategory,
                                    value: values,
                                  },
                                });
                              }
                            }}
                            showSearch
                            filterOption={(input, option) =>
                              option.label
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        )}
                      </>
                    ) : null}
                  </Col>
                ) : null}
                {reportConfigData?.display_type === "gauge" &&
                Object.keys(resultData)?.length ? (
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
                          {modalData?.data?.report_name || "Report Name"}
                        </Typography>
                        {reportDescription ? (
                          <Typography
                            style={{
                              fontSize: 11,
                            }}
                            className="pl-2 dashboard-report-description"
                          >
                            {reportDescription}
                          </Typography>
                        ) : null}
                      </Col>
                      {Object.keys(resultData)?.length ? (
                        <Col xs={24}>
                          {reportConfigData?.display_type === "line-chart" ? (
                            <RenderChart
                              categories={resultData?.category}
                              series={resultData?.series}
                              valueLabel={reportConfigData?.measure}
                              type={"line"}
                              height={"300px"}
                            />
                          ) : null}
                          {reportConfigData?.display_type ===
                          "vertical-bar-chart" ? (
                            <RenderChart
                              categories={resultData?.category}
                              series={resultData?.series}
                              valueLabel={reportConfigData?.measure}
                              type={"column"}
                              height={"300px"}
                            />
                          ) : null}
                          {reportConfigData?.display_type ===
                          "horizontal-bar-chart" ? (
                            <RenderChart
                              categories={resultData?.category}
                              series={resultData?.series}
                              valueLabel={reportConfigData?.measure}
                              type={"bar"}
                              height={"300px"}
                            />
                          ) : null}
                          {reportConfigData?.display_type ===
                          "vertical-stacked-bar-chart" ? (
                            <RenderChart
                              categories={resultData?.category}
                              series={resultData?.series}
                              valueLabel={reportConfigData?.measure}
                              type="column"
                              stacked={true}
                              height={"300px"}
                            />
                          ) : null}
                          {reportConfigData?.display_type ===
                          "horizontal-stacked-bar-chart" ? (
                            <RenderChart
                              categories={resultData?.category}
                              series={resultData?.series}
                              valueLabel={reportConfigData?.measure}
                              type="bar"
                              stacked={true}
                              height={"300px"}
                            />
                          ) : null}
                          {reportConfigData?.display_type === "table" ? (
                            <RenderTable
                              category_name={
                                reportConfigData?.datapoint_category?.name
                              }
                              categories={resultData?.category}
                              series={resultData?.series}
                              valueLabel={reportConfigData?.measure}
                            />
                          ) : null}
                          {reportConfigData?.display_type === "donut-chart" ? (
                            <RenderDonutChart
                              categories={resultData?.category}
                              series={resultData?.series}
                              valueLabel={reportConfigData?.measure}
                              height={"280px"}
                            />
                          ) : null}
                          {reportConfigData?.display_type === "number" ? (
                            <RenderNumber count={resultData?.count} />
                          ) : null}
                          {reportConfigData?.display_type === "gauge" ? (
                            <RenderGaugeChart
                              count={resultData?.count}
                              valueLabel={reportConfigData?.measure}
                              plotBandData={plotBandData}
                              height={"220px"}
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
