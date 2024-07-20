import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import {
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

const AddEditDashboardElements = ({
  modalData,
  handleAddEditDashboardElement,
  closeModal,
}) => {
  const [reportData, setReportData] = useState({
    report_name: "",
    display_type: "line-chart",
    measure: "",
    datapoint_type: "",
    datapoint_subtype: [],
    subdatapoint_type: "",
    subdatapoint_subtype: [],
  });

  const measureList = [
    { label: "Lead Count", value: "lead_count" },
    { label: "Child Count", value: "child_count" },
  ];

  const datapointList = [
    { label: "Status", value: "status" },
    { label: "Source", value: "source" },
    { label: "Lead Created Date", value: "lead_created_date" },
  ];

  const dateValue = [
    { type: "day-wise", value: ["Day1", "Day2", "Day3", "Day4", "Day5"] },
    {
      type: "month-wise",
      value: ["Month1", "Month2", "Month3", "Month4", "Month5"],
    },
    { type: "week-wise", value: ["Week1", "Week2", "Week3", "Week4", "Week5"] },
  ];

  const datapointSubTypeList = [
    { label: "Series 1", value: "series 1" },
    { label: "Series 2", value: "series 2" },
    { label: "Series 3", value: "series 3" },
    { label: "Series 4", value: "series 4" },
    { label: "Series 5", value: "series 5" },
    { label: "Series 6", value: "series 6" },
  ];

  const datapointDateTypeList = [
    { label: "Day Wise", value: "day-wise", type: "multiple" },
    { label: "Week Wise", value: "week-wise", type: "multiple" },
    { label: "Month Wise", value: "month-wise", type: "multiple" },
  ];

  const subDatapointDateTypeList = [
    { label: "Today", value: "today", type: "single" },
    { label: "Day Wise", value: "day-wise", type: "multiple" },
    { label: "Current Week", value: "current-week", type: "single" },
    { label: "Week Wise", value: "week-wise", type: "multiple" },
    { label: "Current Month", value: "current-month", type: "single" },
    { label: "Month Wise", value: "month-wise", type: "multiple" },
  ];

  const displayTypeList = [
    {
      value: "line-chart",
      icon: <RiLineChartFill size={20} />,
      label: "Line Chart",
    },
    {
      value: "vertical-bar-chart",
      icon: <MdOutlineBarChart size={20} />,
      label: "Vertical Bar Chart",
    },
    {
      value: "horizontal-bar-chart",
      icon: (
        <MdOutlineBarChart size={20} style={{ transform: "rotate(90deg)" }} />
      ),
      label: "Horizontal Bar Chart",
    },
    {
      value: "vertical-stacked-bar-chart",
      icon: <MdStackedBarChart size={20} />,
      label: "Vertical Stacked Bar Chart",
    },
    {
      value: "horizontal-stacked-bar-chart",
      icon: (
        <MdStackedBarChart size={20} style={{ transform: "rotate(90deg)" }} />
      ),
      label: "Horizontal Stacked Bar Chart",
    },
    {
      value: "donut-chart",
      icon: <MdDonutLarge size={20} />,
      label: "Donut Chart",
    },
    {
      value: "number",
      icon: <TbNumber123 size={20} />,
      label: "Number",
    },
    {
      value: "guage",
      icon: <MdOutlineSpeed size={20} />,
      label: "Gauge",
    },
    {
      value: "table",
      icon: <LuTable size={20} />,
      label: "Table",
    },
  ];

  const [loading, setLoading] = useState(false);

  const renderTagAll = (label, value, index, key) => {
    let selectedItems = reportData?.[key];
    const showCloseIcon = !selectedItems?.includes(0);
    return (
      <RenderTagMultiple
        label={label}
        value={value}
        showCloseIcon={showCloseIcon}
        onClose={(closeValue) => {
          if (selectedItems?.length === 1) {
            setReportData({ ...reportData, [key]: [0] });
          } else {
            setReportData({
              ...reportData,
              [key]: selectedItems?.filter((each) => each !== closeValue),
            });
          }
        }}
      />
    );
  };

  const getCategory = () => {
    return reportData?.datapoint_type?.includes("date")
      ? datapointDateTypeList?.filter((each) =>
          reportData?.datapoint_subtype?.includes(each?.value)
        )[0]?.type === "multiple"
        ? dateValue?.filter((each) =>
            reportData?.datapoint_subtype?.includes(each?.type)
          )[0]?.value
        : []
      : getArrayValues(
          datapointSubTypeList?.filter((each) =>
            reportData?.datapoint_subtype?.includes(each?.value)
          ),
          "label"
        );
  };

  function getRandomValue() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const getValueLabel = () => {
    return measureList?.filter((each) => each.value === reportData?.measure)[0]
      .label;
  };

  const getSeries = () => {
    const seriesNameList = reportData?.subdatapoint_type?.includes("date")
      ? subDatapointDateTypeList?.filter((each) =>
          reportData?.subdatapoint_subtype?.includes(each?.value)
        )[0]?.type === "multiple"
        ? dateValue?.filter((each) =>
            reportData?.subdatapoint_subtype?.includes(each?.type)
          )[0]?.value
        : []
      : getArrayValues(
          datapointSubTypeList?.filter((each) =>
            reportData?.subdatapoint_subtype?.includes(each?.value)
          ),
          "label"
        );

    const categoryList = getCategory();
    let seriesList = [];
    if (seriesNameList?.length) {
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

  return (
    <Modal
      centered
      open={modalData?.show}
      onCancel={() => {
        closeModal();
      }}
      width={765}
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
        <Col xs={24}>
          <Row gutter={[16, 12]}>
            <Col xs={24} md={10}>
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
                    Display Type <span>*</span>
                  </Typography>
                  <Radio.Group
                    className="add-dashboard-form-item-radio"
                    onChange={(e) => {
                      setReportData({
                        ...reportData,
                        display_type: e.target.value,
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
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={measureList}
                  />
                </Col>
                <Col xs={24}>
                  <Typography className={"add-dashboard-form-item-header"}>
                    DataPoint <span>*</span>
                  </Typography>
                  <Select
                    style={{ width: "100%" }}
                    value={reportData?.datapoint_type}
                    allowClear
                    onChange={(values) => {
                      setReportData({
                        ...reportData,
                        datapoint_type: values,
                        datapoint_subtype: [],
                      });
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={datapointList?.filter((each) =>
                      reportData?.subdatapoint_type
                        ? (reportData?.subdatapoint_type?.includes("date") &&
                            !each?.value.includes("date")) ||
                          (!reportData?.subdatapoint_type?.includes("date") &&
                            each?.value.includes("date"))
                        : true
                    )}
                  />
                  {reportData?.datapoint_type ? (
                    <>
                      {reportData?.datapoint_type?.includes("date") ? (
                        <Select
                          style={{ width: "100%" }}
                          className="mt-2"
                          value={
                            reportData?.datapoint_subtype?.length
                              ? reportData?.datapoint_subtype[0]
                              : null
                          }
                          onChange={(values) => {
                            setReportData({
                              ...reportData,
                              datapoint_subtype: [values],
                            });
                          }}
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={datapointDateTypeList}
                        />
                      ) : (
                        <Select
                          className="w-100 mt-2"
                          mode="multiple"
                          value={reportData?.datapoint_subtype}
                          options={datapointSubTypeList}
                          onChange={(values) => {
                            setReportData({
                              ...reportData,
                              datapoint_subtype: values,
                            });
                          }}
                          showSearch
                          allowClear
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
                <Col xs={24}>
                  <Typography className={"add-dashboard-form-item-header"}>
                    Sub DataPoint <span>*</span>
                  </Typography>
                  <Select
                    style={{ width: "100%" }}
                    value={reportData?.subdatapoint_type}
                    onChange={(values) => {
                      setReportData({
                        ...reportData,
                        subdatapoint_type: values,
                        subdatapoint_subtype: [],
                      });
                    }}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={datapointList?.filter((each) =>
                      reportData?.datapoint_type
                        ? (reportData?.datapoint_type?.includes("date") &&
                            !each?.value.includes("date")) ||
                          (!reportData?.datapoint_type?.includes("date") &&
                            each?.value.includes("date"))
                        : true
                    )}
                  />
                  {reportData?.subdatapoint_type ? (
                    <>
                      {reportData?.subdatapoint_type?.includes("date") ? (
                        <Select
                          style={{ width: "100%" }}
                          className="mt-2"
                          value={
                            reportData?.subdatapoint_subtype?.length
                              ? reportData?.subdatapoint_subtype[0]
                              : null
                          }
                          onChange={(values) => {
                            setReportData({
                              ...reportData,
                              subdatapoint_subtype: [values],
                            });
                          }}
                          showSearch
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={subDatapointDateTypeList}
                        />
                      ) : (
                        <Select
                          className="w-100 mt-2"
                          mode="multiple"
                          value={reportData?.subdatapoint_subtype}
                          options={[
                            { label: "Series 1", value: "series 1" },
                            { label: "Series 2", value: "series 2" },
                          ]}
                          tagRender={(props) =>
                            renderTagAll(
                              props.label,
                              props.value,
                              props.index,
                              "subdatapoint_subtype"
                            )
                          }
                          onChange={(values) => {
                            if (
                              values?.length === 0 ||
                              (values.length > 0 &&
                                values[values.length - 1] === 0)
                            ) {
                              setReportData({
                                ...reportData,
                                subdatapoint_subtype: [0],
                              });
                            } else {
                              setReportData({
                                ...reportData,
                                subdatapoint_subtype: values.filter(
                                  (each) => each !== 0
                                ),
                              });
                            }
                          }}
                          showSearch
                          allowClear
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
              </Row>
            </Col>
            <Col xs={24} md={14} style={{ backgroundColor: "#EFF1F6" }}>
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
                          style={{ fontSize: 13, fontWeight: "500" }}
                          className="pl-2 pt-2"
                        >
                          {reportData?.report_name || "Report Name"}
                        </Typography>
                      </Col>
                      {reportData?.datapoint_type &&
                      reportData?.subdatapoint_type &&
                      reportData?.measure &&
                      reportData?.datapoint_subtype?.length &&
                      reportData?.subdatapoint_subtype?.length ? (
                        <Col xs={24}>
                          {reportData?.display_type === "line-chart" ? (
                            <RenderChart
                              categories={getCategory()}
                              series={getSeries()}
                              valueLabel={getValueLabel()}
                              type={"line"}
                            />
                          ) : null}
                          {reportData?.display_type === "vertical-bar-chart" ? (
                            <RenderChart
                              categories={getCategory()}
                              series={getSeries()}
                              valueLabel={getValueLabel()}
                              type={"column"}
                            />
                          ) : null}
                          {reportData?.display_type ===
                          "horizontal-bar-chart" ? (
                            <RenderChart
                              categories={getCategory()}
                              series={getSeries()}
                              valueLabel={getValueLabel()}
                              type={"bar"}
                            />
                          ) : null}
                          {reportData?.display_type ===
                          "vertical-stacked-bar-chart" ? (
                            <RenderChart
                              categories={getCategory()}
                              series={getSeries()}
                              valueLabel={getValueLabel()}
                              type="column"
                              stacked={true}
                            />
                          ) : null}
                          {reportData?.display_type ===
                          "horizontal-stacked-bar-chart" ? (
                            <RenderChart
                              categories={getCategory()}
                              series={getSeries()}
                              valueLabel={getValueLabel()}
                              type="bar"
                              stacked={true}
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
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddEditDashboardElements;
