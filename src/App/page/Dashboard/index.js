import React, { useState } from "react";
import { Row, Col, Typography, Divider, Button } from "antd";
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

const Dashboard = () => {
  const [modalData, setModalData] = useState({ show: false, data: null });
  const [dashboardReportList, setDashboardReportList] = useState([]);
  const [layout, setLayout] = useState([]);
  console.log(dashboardReportList);
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
          <Col xs={24}>
            <GridLayout
              className="layout"
              layout={layout}
              cols={24}
              rowHeight={10}
              width={window.innerWidth - 20}
              isResizable
              isDraggable
              autoSize
              useCSSTransforms
              onLayoutChange={(layout) => setLayout(layout)}
            >
              {dashboardReportList?.map((each) => (
                <div key={each?.reportHeadData?.report_name}>
                  <CustomCard
                    style={{ width: "100%", height: "100%", overflow: "auto" }}
                    className="add-dashboard-element-preview-card px-1"
                  >
                    <Row gutter={[8, 8]} className="mb-1">
                      <Col xs={24}>
                        <Typography
                          style={{ fontSize: 14, fontWeight: "500" }}
                          className="pl-2 pt-2"
                        >
                          {each.reportHeadData?.report_name || "Report Name"}
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
                      {Object.keys(each?.graphData)?.length ? (
                        <Col xs={24}>
                          {each?.reportData?.display_type === "line-chart" ? (
                            <RenderChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              type={"line"}
                            />
                          ) : null}
                          {each?.reportData?.display_type ===
                          "vertical-bar-chart" ? (
                            <RenderChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              type={"column"}
                            />
                          ) : null}
                          {each?.reportData?.display_type ===
                          "horizontal-bar-chart" ? (
                            <RenderChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
                              type={"bar"}
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
                            />
                          ) : null}
                          {each?.reportData?.display_type === "donut-chart" ? (
                            <RenderDonutChart
                              categories={each?.graphData?.category}
                              series={each?.graphData?.series}
                              valueLabel={each?.reportData?.measure}
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
            let myDashboardReportList = dashboardReportList;
            myDashboardReportList.push(values);
            setDashboardReportList(myDashboardReportList);
            const newItem = {
              i: values?.reportHeadData?.report_name,
              x: (layout.length * 2) % 12,
              y: Infinity, // Puts it at the bottom
              w: values?.reportData?.display_type === "table" ? 12 : 8,
              h: values?.reportData?.display_type === "number" ? 10 : 16,
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
