import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Typography, Divider, Button, Tooltip } from "antd";
import "./index.scss";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";
import AddEditDashboardElements from "./AddEditDashbaordElements";
import CustomCard from "../../component/UtilComponents/CustomCard";
import RenderChart from "./RenderChart";
import RenderTable from "./RenderTable";
import RenderDonutChart from "./RenderDonutChart";
import RenderNumber from "./RenderNumber";
import RenderGaugeChart from "./RenderGaugeChart";
import { AiOutlineDrag } from "react-icons/ai";

const Dashboard = () => {
  const [modalData, setModalData] = useState({ show: false, data: null });
  const reportHeaderRefs = useRef([]);
  const dashboardAreaRef = useRef();
  const [dashboardReportList, setDashboardReportList] = useState([
    {
      reportData: {
        display_type: "line-chart",
        measure: "Lead Count",
        datapoint_category: {
          name: "Source",
          type: "select_item",
          value: [
            "Source 1",
            "Source 2",
            "Source 4",
            "Source 5",
            "Source 3",
            "Source 6",
          ],
        },
        datapoint_subcategory: {
          name: null,
          type: null,
          value: [],
        },
        filter: [],
      },
      reportHeadData: {
        report_name: "Source Wise Lead",
        description: "Test Description",
      },
      plotBandData: {
        threshold1: null,
        threshold2: null,
      },
      graphData: {
        category: [
          "Source 1",
          "Source 2",
          "Source 4",
          "Source 5",
          "Source 3",
          "Source 6",
        ],
        series: [
          {
            data: [3, 12, 22, 42, 6, 97],
          },
        ],
      },
    },
  ]);
  const [layout, setLayout] = useState([
    {
      i: "Source Wise Lead",
      x: 0,
      y: Infinity, // Puts it at the bottom
      w: 8,
      h: 16,
    },
  ]);
  const [reportHeaderHeights, setReportHeaderHeights] = useState([]);
  const [dashboardAreaWidth, setDashboardAreaWidth] = useState(0);

  const setRefHeaderRef = (el, index) => {
    reportHeaderRefs.current[index] = el;
  };

  useEffect(() => {
    // Measure the height for each Col and update state
    const heights = reportHeaderRefs.current.map(
      (col) => col?.offsetHeight || 0
    );
    setReportHeaderHeights(heights);
  }, [layout]);

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
  }, []);

  const getHeight = (index) => {
    return 2 * layout[index].h * 10 - (25 + (reportHeaderHeights[index] || 60));
  };

  console.log(dashboardReportList, reportHeaderHeights, dashboardAreaWidth);
  return (
    <div>
      <Row gutter={[4, 4]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Dashboard"]} />
                </Col>
                <Col>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      setModalData({ show: true, data: null });
                    }}
                  >
                    + Add Dashboard Report
                  </Button>
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
            <GridLayout
              className="layout"
              layout={layout}
              cols={24}
              rowHeight={10}
              width={(dashboardAreaWidth || window.innerWidth) - 20}
              isResizable
              isDraggable
              autoSize
              useCSSTransforms
              draggableHandle=".drag-handle"
              onLayoutChange={(layout) => setLayout(layout)}
            >
              {dashboardReportList?.map((each, index) => (
                <div key={each?.reportHeadData?.report_name}>
                  <CustomCard
                    style={{ width: "100%", height: "100%", overflow: "auto" }}
                    className="add-dashboard-element-preview-card px-1"
                  >
                    <Row gutter={[4, 4]} className="mb-1">
                      <Col xs={24} ref={(el) => setRefHeaderRef(el, index)}>
                        <Row>
                          <Col xs={18}>
                            <Typography
                              style={{ fontSize: 14, fontWeight: "500" }}
                              className="pl-2 pt-2"
                            >
                              {each.reportHeadData?.report_name ||
                                "Report Name"}
                            </Typography>
                            {each.reportHeadData?.description ? (
                              <Typography
                                style={{
                                  fontSize: 11,
                                  fontWeight: "500",
                                  color: "#7a7a7a",
                                }}
                                className="pl-2"
                              >
                                {each?.reportHeadData?.description}
                              </Typography>
                            ) : null}
                          </Col>
                          <Col xs={6}>
                            <Row className="d-flex flex-row justify-content-end">
                              <Button
                                type="text"
                                className="drag-handle mt-1"
                                icon={<AiOutlineDrag size="25" />}
                              />
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      {Object.keys(each?.graphData)?.length ? (
                        <Col xs={24}>
                          {each?.reportData?.display_type === "line-chart" ? (
                            <RenderChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              type={"line"}
                              height={getHeight(index)}
                            />
                          ) : null}
                          {each?.reportData?.display_type ===
                          "vertical-bar-chart" ? (
                            <RenderChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              type={"column"}
                              height={getHeight(index)}
                            />
                          ) : null}
                          {each?.reportData?.display_type ===
                          "horizontal-bar-chart" ? (
                            <RenderChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              type={"bar"}
                              height={getHeight(index)}
                            />
                          ) : null}
                          {each?.reportData?.display_type ===
                          "vertical-stacked-bar-chart" ? (
                            <RenderChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              type="column"
                              stacked={true}
                              height={getHeight(index)}
                            />
                          ) : null}
                          {each?.reportData?.display_type ===
                          "horizontal-stacked-bar-chart" ? (
                            <RenderChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              type="bar"
                              stacked={true}
                              height={getHeight(index)}
                            />
                          ) : null}
                          {each?.reportData?.display_type === "table" ? (
                            <RenderTable
                              category_name={
                                each?.reportData?.datapoint_category?.name
                              }
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              height={getHeight(index)}
                            />
                          ) : null}
                          {each?.reportData?.display_type === "donut-chart" ? (
                            <RenderDonutChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              height={getHeight(index)}
                            />
                          ) : null}
                          {each?.reportData?.display_type === "number" ? (
                            <RenderNumber count={each?.graphData?.count} />
                          ) : null}
                          {each?.reportData?.display_type === "gauge" ? (
                            <RenderGaugeChart
                              count={each?.graphData?.count}
                              valueLabel={each?.reportData?.measure}
                              plotBandData={each?.plotBandData}
                              height={getHeight(index)}
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
                </div>
              ))}
            </GridLayout>
          </Col>
        ) : (
          <Col
            xs={24}
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "60vh" }}
          >
            <Typography style={{ fontSize: "1.5rem", textAlign: "center" }}>
              Welcome To B2B CRM
            </Typography>
          </Col>
        )}
      </Row>
      <AddEditDashboardElements
        modalData={modalData}
        handleAddEditDashboardElement={(values) => {
          if (modalData?.data) {
          } else {
            console.log(values);
            let myDashboardReportList = dashboardReportList;
            myDashboardReportList.push(values);
            setDashboardReportList(myDashboardReportList);
            const newItem = {
              i: values?.reportHeadData?.report_name,
              x: 0,
              y: Infinity, // Puts it at the bottom
              w: values?.reportData?.display_type === "table" ? 12 : 8,
              h: values?.reportData?.display_type === "number" ? 8 : 16,
            };
            setLayout([...layout, newItem]);
          }
        }}
        closeModal={() => {
          setModalData({ show: false, data: null });
        }}
      />
    </div>
  );
};

export default Dashboard;
