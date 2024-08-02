import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Tooltip,
  Popconfirm,
  message,
  Segmented,
} from "antd";
import "./index.scss";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";
import CustomCard from "../../component/UtilComponents/CustomCard";
import RenderChart from "./RenderChart";
import RenderTable from "./RenderTable";
import RenderDonutChart from "./RenderDonutChart";
import RenderNumber from "./RenderNumber";
import RenderGaugeChart from "./RenderGaugeChart";
import { AiOutlineDrag } from "react-icons/ai";
import { MdDeleteOutline, MdEdit, MdEvent, MdSave } from "react-icons/md";
import { HiDocumentChartBar } from "react-icons/hi2";
import getArrayValues from "../../utils/getArrayValues";
import AddDashboardReport from "./AddDashboardReport";
import AddEditDashboardElements from "./AddEditDashbaordElements";
import { GrConfigure } from "react-icons/gr";
import useWindowDimensions from "../../component/UtilComponents/useWindowDimensions";
import dayjs from "dayjs";
import getFilterItemFromArray from "../../utils/getFilterItemFromArray";
import { FaFileDownload } from "react-icons/fa";
import SelectDate from "./SelectDate";
import DownloadReport from "./DownloadReport";

const Dashboard = () => {
  const [modalData, setModalData] = useState({
    show: false,
    type: "Add Report",
    data: null,
  });
  const reportHeaderRefs = useRef([]);
  const dashboardAreaRef = useRef();
  const [dashboardReportList, setDashboardReportList] = useState([]);
  const [layout, setLayout] = useState([]);
  const [isEditView, setIsEditView] = useState(false);
  const [reportHeaderHeights, setReportHeaderHeights] = useState([]);
  const [dashboardAreaWidth, setDashboardAreaWidth] = useState(0);
  const { width } = useWindowDimensions();

  const dateData = [
    { label: "T", value: "T", dateData: [dayjs(), dayjs()], key: "T" },
    {
      label: "5D",
      value: "5D",
      dateData: [dayjs(), dayjs().subtract(4, "days")],
    },
    {
      label: "7D",
      value: "7D",
      dateData: [dayjs(), dayjs().subtract(6, "days")],
    },
    {
      label: "15D",
      value: "15D",
      dateData: [dayjs(), dayjs().subtract(14, "days")],
    },
    {
      label: "30D",
      value: "30D",
      dateData: [dayjs(), dayjs().subtract(29, "days")],
    },
  ];

  const setRefHeaderRef = (el, index) => {
    reportHeaderRefs.current[index] = el;
  };

  useEffect(() => {
    // Measure the height for each Col and update state
    const heights = reportHeaderRefs.current.map(
      (col) => col?.offsetHeight || 0
    );
    setReportHeaderHeights(heights);
  }, [layout, dashboardReportList]);

  useEffect(() => {
    const handleResize = () => {
      if (dashboardAreaRef.current) {
        setDashboardAreaWidth(dashboardAreaRef.current.offsetWidth);
      }
    };

    // Create a ResizeObserver to observe changes in the width of the Col component
    const resizeObserver = new ResizeObserver(handleResize);
    if (dashboardAreaRef.current) {
      resizeObserver.observe(dashboardAreaRef.current);
    }

    // Initial width update
    handleResize();

    // Clean up the observer on component unmount
    return () => {
      if (dashboardAreaRef.current) {
        resizeObserver.unobserve(dashboardAreaRef.current);
      }
    };
  }, [dashboardReportList]);

  const getHeight = (index) => {
    return 2 * layout[index].h * 10 - (25 + (reportHeaderHeights[index] || 60));
  };

  const renderItem = (each, index) => {
    return (
      <CustomCard
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
        className="add-dashboard-element-preview-card px-1"
      >
        <Row
          gutter={[4, 4]}
          className="mb-1"
          style={{
            height:
              width < 768
                ? `calc(100% - ${reportHeaderHeights[index] + 20}px )`
                : `calc(100% - ${reportHeaderHeights[index] + 10}px )`,
          }}
        >
          <Col xs={24} ref={(el) => setRefHeaderRef(el, index)}>
            <Row>
              <Col xs={12}>
                <Row className="d-flex flex-row" gutter={[2, 2]}>
                  <Col style={{ maxWidth: "80%" }}>
                    <Typography className="pl-2 pt-2 th-12 th-fw-500">
                      {each.report_name || "Report Name"}
                    </Typography>
                  </Col>
                  {Object.keys(each?.resultData || {})?.length ? (
                    <Col xs={4}>
                      <Tooltip title="Download Report">
                        <Button
                          type="text"
                          size="small"
                          disabled={isEditView}
                          className="mt-1"
                          icon={<FaFileDownload size={20} />}
                          onClick={() => {
                            setModalData({
                              show: true,
                              type: "Download Report",
                              data: each,
                            });
                          }}
                        />
                      </Tooltip>
                    </Col>
                  ) : null}
                </Row>
              </Col>

              <Col xs={12} className="mt-1">
                <Row
                  className="d-flex flex-row justify-content-end"
                  gutter={[4, 4]}
                >
                  <Col>
                    <Segmented
                      className={`dashboard-segmented ${
                        width < 768 ? "th-10" : "th-11"
                      }`}
                      value={each.date_type}
                      disabled={isEditView}
                      onClick={(e) => {
                        if (
                          e.target.tagName === "DIV" &&
                          e.target.getAttribute("title") === null
                        ) {
                          setModalData({
                            show: true,
                            type: "Select Report Date",
                            data: {
                              date:
                                dashboardReportList[index].date_type ===
                                "custom"
                                  ? dashboardReportList[index].date
                                  : [dayjs(), dayjs()],
                              index: index,
                            },
                          });
                        }
                      }}
                      onChange={(value) => {
                        let myDashboardReportList = [...dashboardReportList];
                        myDashboardReportList[index].date_type = value;
                        myDashboardReportList[index].date =
                          getFilterItemFromArray(
                            [
                              ...dateData,
                              {
                                label: (
                                  <MdEvent
                                    size={14}
                                    style={{
                                      marginTop: -2,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      setModalData({
                                        show: true,
                                        type: "Select Report Date",
                                        data: {
                                          date: [dayjs(), dayjs()],
                                          index: index,
                                        },
                                      });
                                    }}
                                  />
                                ),
                                value: "custom",
                                dateData: [dayjs(), dayjs()],
                              },
                            ],
                            "value",
                            value
                          )[0]?.dateData;
                        setDashboardReportList(myDashboardReportList);
                      }}
                      options={[
                        ...dateData,
                        {
                          label: (
                            <MdEvent
                              size={14}
                              style={{
                                marginTop: -2,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setModalData({
                                  show: true,
                                  type: "Select Report Date",
                                  data: {
                                    date: [dayjs(), dayjs()],
                                    index: index,
                                  },
                                });
                              }}
                            />
                          ),
                          value: "custom",
                          dateData: [dayjs(), dayjs()],
                        },
                      ]}
                    />
                    {each?.date_type === "custom" ? (
                      <Typography className="mt-1 text-right th-10 th-fw-500">
                        Date: {dayjs(each.date[0]).format("DD/MM/YYYY")}{" "}
                        {!dayjs(each.date[0]).isSame(each.date[1])
                          ? `to
                                    ${dayjs(each.date[1]).format("DD/MM/YYYY")}`
                          : ""}
                      </Typography>
                    ) : null}
                  </Col>
                </Row>
              </Col>
              {each.report_description ? (
                <Col xs={24}>
                  <Typography className="pl-2 dashboard-report-description th-10">
                    {each?.report_description}
                  </Typography>
                </Col>
              ) : null}
            </Row>
          </Col>
          {Object.keys(each?.resultData || {})?.length ? (
            <Col xs={24} style={{ height: "100%" }}>
              {each?.reportConfigData?.display_type === "line-chart" ? (
                <RenderChart
                  categories={each?.resultData?.category}
                  series={each?.resultData?.series}
                  valueLabel={each?.reportConfigData?.measure}
                  type={"line"}
                  height={getHeight(index)}
                />
              ) : null}
              {each?.reportConfigData?.display_type === "vertical-bar-chart" ? (
                <RenderChart
                  categories={each?.resultData?.category}
                  series={each?.resultData?.series}
                  valueLabel={each?.reportConfigData?.measure}
                  type={"column"}
                  height={getHeight(index)}
                />
              ) : null}
              {each?.reportConfigData?.display_type ===
              "horizontal-bar-chart" ? (
                <RenderChart
                  categories={each?.resultData?.category}
                  series={each?.resultData?.series}
                  valueLabel={each?.reportConfigData?.measure}
                  type={"bar"}
                  height={getHeight(index)}
                />
              ) : null}
              {each?.reportConfigData?.display_type ===
              "vertical-stacked-bar-chart" ? (
                <RenderChart
                  categories={each?.resultData?.category}
                  series={each?.resultData?.series}
                  valueLabel={each?.reportConfigData?.measure}
                  type="column"
                  stacked={true}
                  height={getHeight(index)}
                />
              ) : null}
              {each?.reportConfigData?.display_type ===
              "horizontal-stacked-bar-chart" ? (
                <RenderChart
                  categories={each?.resultData?.category}
                  series={each?.resultData?.series}
                  valueLabel={each?.reportConfigData?.measure}
                  type="bar"
                  stacked={true}
                  height={getHeight(index)}
                />
              ) : null}
              {each?.reportConfigData?.display_type === "table" ? (
                <RenderTable
                  category_name={
                    each?.reportConfigData?.datapoint_category?.name
                  }
                  categories={each?.resultData?.category}
                  series={each?.resultData?.series}
                  valueLabel={each?.reportConfigData?.measure}
                  height={getHeight(index)}
                />
              ) : null}
              {each?.reportConfigData?.display_type === "donut-chart" ? (
                <RenderDonutChart
                  categories={each?.resultData?.category}
                  series={each?.resultData?.series}
                  valueLabel={each?.reportConfigData?.measure}
                  height={getHeight(index)}
                />
              ) : null}
              {each?.reportConfigData?.display_type === "number" ? (
                <RenderNumber count={each?.resultData?.count} />
              ) : null}
              {each?.reportConfigData?.display_type === "gauge" ? (
                <RenderGaugeChart
                  count={each?.resultData?.count}
                  valueLabel={each?.reportConfigData?.measure}
                  plotBandData={each?.plotBandData}
                  height={getHeight(index)}
                />
              ) : null}
            </Col>
          ) : (
            <Col xs={24} style={{ height: "100%" }}>
              <Row
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <Col>
                  <GrConfigure style={{ color: "#DCDCDC" }} size={60} />
                </Col>
                <Col>
                  <Button
                    type="outlined"
                    className="mt-2"
                    onClick={() => {
                      setModalData({
                        show: true,
                        type: "Configure Report",
                        data: each,
                      });
                    }}
                  >
                    Configure Report
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </CustomCard>
    );
  };

  return (
    <CustomCard>
      <Row gutter={[4, 4]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Dashboard"]} />
                </Col>
                <Col>
                  <Row
                    className="d-flex flex-row justify-content-end"
                    gutter={[4, 4]}
                  >
                    {isEditView && dashboardReportList?.length ? (
                      <Col>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            setModalData({
                              show: true,
                              type: "Add Report",
                              data: null,
                            });
                          }}
                        >
                          + Add Report
                        </Button>
                      </Col>
                    ) : null}
                    {isEditView ? (
                      <Col>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            if (
                              dashboardReportList?.filter(
                                (each) =>
                                  Object.keys(each?.resultData || {})
                                    ?.length === 0
                              )?.length
                            ) {
                              message.error(
                                "Please Configure All Report To Save Layout"
                              );
                              return;
                            }
                            setIsEditView(false);
                          }}
                          icon={<MdSave size={16} />}
                        >
                          Save Layout
                        </Button>
                      </Col>
                    ) : null}
                    {!isEditView &&
                    dashboardReportList?.length > 0 &&
                    width >= 768 ? (
                      <Col>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            setIsEditView(true);
                          }}
                          icon={<MdEdit size={16} />}
                        >
                          Edit Dashboard
                        </Button>
                      </Col>
                    ) : null}
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Divider />
            </Col>
          </Row>
        </Col>
        {dashboardReportList?.length ? (
          <Col xs={24} ref={dashboardAreaRef}>
            {width < 768 ? (
              <Row gutter={[8, 8]}>
                {dashboardReportList?.map((each, index) => (
                  <Col xs={24}>{renderItem(each, index)}</Col>
                ))}
              </Row>
            ) : (
              <GridLayout
                className="layout"
                layout={layout}
                cols={24}
                rowHeight={10}
                width={(dashboardAreaWidth || window.innerWidth) - 20}
                isResizable={isEditView}
                isDraggable={isEditView}
                autoSize
                useCSSTransforms
                draggableHandle=".drag-handle"
                onLayoutChange={(layout) => {
                  setLayout(layout);
                }}
              >
                {dashboardReportList?.map((each, index) => (
                  <div
                    key={each?.id?.toString()}
                    style={{ position: "relative", zIndex: 0 }}
                  >
                    {isEditView ? (
                      <Row
                        className="d-flex flex-row justify-content-center align-items-center"
                        style={{
                          position: "absolute",
                          top: -10,
                          left: "46%",
                          zIndex: 1,
                        }}
                      >
                        <Col>
                          <CustomCard className="add-dashboard-element-preview-card">
                            <Row className="d-flex flex-row justify-content-center align-items-center">
                              {Object.keys(each?.resultData || {})?.length ? (
                                <Col>
                                  <Tooltip title="Edit Report">
                                    <Button
                                      size="small"
                                      type="text"
                                      icon={<MdEdit size={16} />}
                                      onClick={() => {
                                        setModalData({
                                          show: true,
                                          type: "Configure Report",
                                          data: each,
                                        });
                                      }}
                                    />
                                  </Tooltip>
                                </Col>
                              ) : null}
                              <Col>
                                <Tooltip title="Remove Report">
                                  <Popconfirm
                                    title="Are you sure to remove report?"
                                    onConfirm={() => {
                                      let myDashboardReportList = [
                                        ...dashboardReportList,
                                      ];
                                      let myDashboardLayout = [...layout];
                                      let findIndex = layout.findIndex(
                                        (obj) =>
                                          Number(obj.i) === Number(each.id)
                                      );
                                      myDashboardLayout.splice(findIndex, 1);
                                      myDashboardReportList.splice(index, 1);
                                      setDashboardReportList(
                                        myDashboardReportList
                                      );
                                      setLayout(myDashboardLayout);
                                    }}
                                  >
                                    <Button
                                      size="small"
                                      type="text"
                                      icon={
                                        <MdDeleteOutline
                                          size={16}
                                          style={{ color: "red" }}
                                        />
                                      }
                                    />
                                  </Popconfirm>
                                </Tooltip>
                              </Col>
                              <Col>
                                <Button
                                  type="text"
                                  size="small"
                                  className="drag-handle"
                                  style={{ cursor: "move" }}
                                  icon={<AiOutlineDrag size={16} />}
                                />
                              </Col>
                            </Row>
                          </CustomCard>
                        </Col>
                      </Row>
                    ) : null}
                    {renderItem(each, index)}
                  </div>
                ))}
              </GridLayout>
            )}
          </Col>
        ) : (
          <Col xs={24} style={{ minHeight: "60vh" }}>
            <Row
              className="d-flex justify-content-center align-items-center flex-column h-100"
              gutter={[4, 4]}
            >
              <HiDocumentChartBar style={{ color: "#DCDCDC" }} size={120} />
              <Typography
                style={{
                  color: "gray",
                }}
                className="mt-4 text-center th-18 th-fw-500"
              >
                {width < 768 ? "No Report Found" : "Add Report in Dashboard"}
              </Typography>
              {width >= 768 ? (
                <Button
                  type="primary"
                  size="small"
                  className="mt-2"
                  onClick={() => {
                    setModalData({
                      show: true,
                      type: "Add Report",
                      data: null,
                    });
                  }}
                >
                  + Add Report
                </Button>
              ) : null}
            </Row>
          </Col>
        )}
      </Row>
      <AddDashboardReport
        modalData={modalData}
        handleAddDashboard={(values) => {
          let myDashboardReportList = [...dashboardReportList];
          let myLayout = [...layout];
          values?.map((each, index) => {
            myDashboardReportList.push({
              id:
                Math.max(getArrayValues(dashboardReportList, "id")) + index + 1,
              report_name: each,
            });
            myLayout.push({
              i: `${
                Math.max(getArrayValues(dashboardReportList, "id")) + index + 1
              }`,
              x: 0,
              y: Infinity, // Puts it at the bottom
              w: 11,
              h: 16,
              minW: 8,
              minH: 7,
            });
          });
          setDashboardReportList(myDashboardReportList);
          setLayout(myLayout);
          setIsEditView(true);
        }}
        closeModal={() => {
          setModalData({
            show: false,
            type: null,
            data: null,
          });
        }}
      />
      <AddEditDashboardElements
        modalData={modalData}
        handleAddEditDashboardElement={(values) => {
          let myDashboardReportList = [...dashboardReportList];
          let findIndex = myDashboardReportList.findIndex(
            (obj) => obj.id === values.id
          );
          myDashboardReportList[findIndex] = {
            ...myDashboardReportList[findIndex],
            ...values,
            date_type: "T",
            date: [dayjs(), dayjs()],
          };
          setDashboardReportList(myDashboardReportList);
        }}
        closeModal={() => {
          setModalData({ show: false, type: null, data: null });
        }}
      />
      <SelectDate
        modalData={modalData}
        handleSelectDate={(values) => {
          let myDashboardReportList = [...dashboardReportList];
          myDashboardReportList[values.index].date = values?.date;
          setDashboardReportList(myDashboardReportList);
        }}
        closeModal={() => {
          setModalData({ show: false, type: null, data: null });
        }}
      />
      <DownloadReport
        modalData={modalData}
        closeModal={() => {
          setModalData({ show: false, type: null, data: null });
        }}
      />
    </CustomCard>
  );
};

export default Dashboard;