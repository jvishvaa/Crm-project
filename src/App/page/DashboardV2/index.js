import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Tooltip,
  Popconfirm,
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
import { MdDeleteOutline, MdEdit, MdSave } from "react-icons/md";
import { HiDocumentChartBar } from "react-icons/hi2";
import getArrayValues from "../../utils/getArrayValues";
import AddDashboardReport from "./AddDashboardReport";
import AddEditDashboardElements from "./AddEditDashbaordElements";
import { GrConfigure } from "react-icons/gr";

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

  console.log(dashboardReportList, layout);
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
                            setIsEditView(false);
                          }}
                          icon={<MdSave size={16} />}
                        >
                          Save Layout
                        </Button>
                      </Col>
                    ) : null}
                    {!isEditView && dashboardReportList?.length > 0 ? (
                      <Col>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            setIsEditView(true);
                          }}
                          icon={<MdEdit size={16} />}
                        >
                          Edit Layout
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
              onLayoutChange={(layout) => setLayout(layout)}
            >
              {dashboardReportList?.map((each, index) => (
                <div key={each?.id?.toString()}>
                  <CustomCard
                    style={{ width: "100%", height: "100%", overflow: "auto" }}
                    className="add-dashboard-element-preview-card px-1"
                  >
                    <Row gutter={[4, 4]} className="mb-1">
                      <Col xs={24} ref={(el) => setRefHeaderRef(el, index)}>
                        <Row>
                          <Col xs={16}>
                            <Typography
                              style={{ fontSize: 12, fontWeight: "500" }}
                              className="pl-2 pt-2"
                            >
                              {each.report_name || "Report Name"}
                            </Typography>
                          </Col>
                          <Col xs={8}>
                            <Row className="d-flex flex-row justify-content-end align-items-center">
                              {isEditView ? (
                                <>
                                  {Object.keys(each?.resultData || {})
                                    ?.length ? (
                                    <Col>
                                      <Tooltip title="Edit Report">
                                        <Button
                                          size="small"
                                          type="text"
                                          icon={<MdEdit size={24} />}
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
                                          myDashboardLayout.splice(
                                            findIndex,
                                            1
                                          );
                                          myDashboardReportList.splice(
                                            index,
                                            1
                                          );
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
                                              size={24}
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
                                      className="drag-handle"
                                      style={{ cursor: "move" }}
                                      icon={<AiOutlineDrag size={24} />}
                                    />
                                  </Col>
                                </>
                              ) : null}
                            </Row>
                          </Col>
                          {each.report_description ? (
                            <Col xs={24}>
                              <Typography
                                style={{
                                  fontSize: 10,
                                  fontWeight: "500",
                                  color: "#7a7a7a",
                                }}
                                className="pl-2"
                              >
                                {each?.report_description}
                              </Typography>
                            </Col>
                          ) : null}
                        </Row>
                      </Col>
                      {Object.keys(each?.resultData || {})?.length ? (
                        <Col xs={24}>
                          {each?.reportConfigData?.display_type ===
                          "line-chart" ? (
                            <RenderChart
                              categories={each?.resultData?.category}
                              series={each?.resultData?.series}
                              valueLabel={each?.reportConfigData?.measure}
                              type={"line"}
                              height={getHeight(index)}
                            />
                          ) : null}
                          {each?.reportConfigData?.display_type ===
                          "vertical-bar-chart" ? (
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
                          {each?.reportConfigData?.display_type ===
                          "donut-chart" ? (
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
                            style={{ minHeight: 150 }}
                          >
                            <Col>
                              <GrConfigure
                                style={{ color: "#DCDCDC" }}
                                size={60}
                              />
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
                </div>
              ))}
            </GridLayout>
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
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "gray",
                }}
                className="mt-4 text-center"
              >
                Add Report in Dashboard
              </Typography>
              <Button
                type="outlined"
                size="small"
                className="mt-2"
                onClick={() => {
                  setModalData({ show: true, type: "Add Report", data: null });
                }}
              >
                + Add Report
              </Button>
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
          };
          setDashboardReportList(myDashboardReportList);
        }}
        closeModal={() => {
          setModalData({ show: false, data: null });
        }}
      />
    </div>
  );
};

export default Dashboard;
