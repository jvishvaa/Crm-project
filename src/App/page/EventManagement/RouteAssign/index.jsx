import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Radio,
  Input,
  Tag,
  Spin,
  Table,
  Tooltip,
  Pagination,
  Empty,
  Descriptions,
  Popover,
  Checkbox,
} from "antd";
import "./index.scss";
import { MdEdit, MdFilterAlt, MdListAlt, MdRefresh } from "react-icons/md";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import DrawerFilter from "./drawerFilter";
import dayjs from "dayjs";
import getArrayValues from "../../../utils/getArrayValues";
import RenderFilterTag from "../../../component/UtilComponents/RenderFilterTag";
import { BiIdCard } from "react-icons/bi";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import { useLocation, useNavigate } from "react-router-dom";
import getChangedCountValues from "../../../utils/getChangeCountObject";
import getRoutePathDetails from "../../../utils/getRoutePathDetails";
import getCardDataText from "../../../component/UtilComponents/CardDataText";
import getFilterItemFromArray from "../../../utils/getFilterItemFromArray";
import AssignRoute from "./AssignRoute";
import ViewRoutes from "./ViewRoutes";

const RouteAssign = () => {
  const defaultFilters = {
    city: [0],
    branch: [0],
    assigned_user: [0],
    date_range: [dayjs(), dayjs()],
  };
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    ...defaultFilters,
  });
  const [searchValue, setSearchValue] = useState("");
  const [drawerData, setDrawerData] = useState({
    show: false,
    type: null,
    data: null,
  });
  const [showFilterView, setShowFilterView] = useState(false);
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [routeAssignData, setRouteAssignData] = useState(null);
  const [isList, setIsList] = useState(true);
  const searchIconRef = useRef(null);
  const { width } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState("");

  const dropdownData = {
    city: [
      { label: "All", value: 0 },
      { label: "Bangallore", value: "bangalore" },
      { label: "Kolkata", value: "kolkata" },
      { label: "Chennal", value: "chennai" },
    ],

    branch: [
      { label: "All", value: 0 },
      { label: "Orchids BTM Layout", value: "btm-layout" },
      { label: "Orchids Banerghata", value: "banerghata" },
      { label: "Orchids Newtown", value: "newtown" },
    ],
  };

  const eventStatusCountList = [
    {
      id: 1,
      label: "Completed",
      color: "#4CAF50",
    },
    {
      id: 2,
      label: "In Progress",
      color: "#fdb614",
    },
    {
      id: 3,
      label: "Yet To Start",
      color: "#F44336",
    },
  ];

  useEffect(() => {
    if (width <= 991) {
      setShowFilterView(false);
      setIsList(false);
    } else {
      setShowFilterView(true);
      setIsList(true);
    }
  }, [width]);

  const checkFilterDifference = () => {
    return getChangedCountValues(
      {
        ...defaultFilters,
        date_range: [
          dayjs().format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ],
      },
      {
        ...filterData,
        date_range: [
          dayjs(filterData?.date_range[0]).format("YYYY-MM-DD"),
          dayjs(filterData?.date_range[1]).format("YYYY-MM-DD"),
        ],
      }
    );
  };

  const [searchFetched, setSearchFetched] = useState(false);

  const getRouteAssignData = (page, page_size, params = {}) => {
    // setLoading(true);
    setRouteAssignData([
      {
        id: 1,
        bde_name: "ANIKUSER",
        erp_no: "12345678900",
        branch: { id: 1, name: "ORCHIDS BTM Layout" },
        date: "01/08/2024",
        route_count: 1,
        lead_collected: 0,
      },
      {
        id: 2,
        bde_name: "JOHNSMITH",
        erp_no: "98765432100",
        branch: { id: 1, name: "ORCHIDS BTM Layout" },
        date: "02/08/2024",
        route_count: 2,
        lead_collected: 3,
      },
      {
        id: 3,
        bde_name: "SARAHLEE",
        erp_no: "45678901234",
        branch: { id: 1, name: "ORCHIDS BTM Layout" },
        date: "03/08/2024",
        route_count: 3,
        lead_collected: 1,
      },
    ]);
    setPageData({
      current: page,
      pageSize: page_size,
      total: 2,
    });
  };

  useEffect(() => {
    getRouteAssignData(pageData?.current, pageData?.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    window.scrollTo(0, 0);
    getRouteAssignData(pagination?.current, pagination?.pageSize);
  };

  const handleCardChange = (page) => {
    window.scrollTo(0, 0);
    getRouteAssignData(page, pageData?.pageSize);
  };

  const getSearchInput = () => {
    return (
      <Input
        placeholder="Search BDE"
        style={{
          height: 30,
          maxWidth: 250,
        }}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setSearchFetched(false);
        }}
        onPressEnter={() => {
          setSearchFetched(true);
          setSearchValue(searchInput);
          getRouteAssignData(1, pageData?.pageSize);
        }}
        onBlur={(e) => {
          if (
            searchIconRef.current &&
            searchIconRef.current.contains(e.relatedTarget)
          ) {
            return;
          }
          if (searchInput !== searchValue) {
            setSearchInput(searchValue);
          }
        }}
        maxLength={48}
        suffix={
          searchFetched ? (
            <CloseOutlined
              ref={searchIconRef}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                setSearchFetched(true);
                setSearchValue("");
                setSearchInput("");
              }}
            />
          ) : (
            <SearchOutlined
              ref={searchIconRef}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSearchFetched(true);
                setSearchValue(searchInput);
                getRouteAssignData(1, pageData?.pageSize);
              }}
            />
          )
        }
      />
    );
  };

  const getClearFilters = () => {
    return (
      <Button
        size="small"
        type="link"
        style={{ whiteSpace: "normal" }}
        onClick={() => {
          setFilterData({ ...defaultFilters });
          getRouteAssignData(1, pageData?.pageSize);
        }}
      >
        Clear Filters
      </Button>
    );
  };

  const renderFilterView = () => {
    return (
      <>
        <Row className="d-flex flex-row align-items-center" gutter={[4, 4]}>
          <Col>
            <Typography style={{ marginTop: 4 }} className="th-12 th-fw-500">
              Filter:
            </Typography>
          </Col>
          {!filterData?.branch?.includes(0) ? (
            <Col>
              <RenderFilterTag
                label="Branch"
                value={getArrayValues(
                  dropdownData?.branch?.filter((each) =>
                    filterData?.branch?.includes(each?.value)
                  ),
                  "label"
                )?.join(", ")}
              />
            </Col>
          ) : !filterData?.city?.includes(0) ? (
            <Col>
              <RenderFilterTag
                label="City"
                value={getArrayValues(
                  dropdownData?.city?.filter((each) =>
                    filterData?.city?.includes(each?.value)
                  ),
                  "label"
                )?.join(", ")}
              />
            </Col>
          ) : null}

          {!filterData?.assigned_user?.includes(0) ? (
            <Col>
              <RenderFilterTag
                label="BDE"
                value={getArrayValues(
                  dropdownData?.assigned_user?.filter((each) =>
                    filterData?.assigned_user?.includes(each?.value)
                  ),
                  "label"
                )?.join(", ")}
              />
            </Col>
          ) : null}
          <Col>
            <RenderFilterTag
              label="Date"
              value={
                dayjs(filterData?.date_range[0]).isSame(
                  filterData?.date_range[1]
                )
                  ? dayjs(filterData?.date_range[0]).format("DD MMM YYYY")
                  : `${dayjs(filterData?.date_range[0]).format(
                      "DD MMM YYYY"
                    )} to ${dayjs(filterData?.date_range[1]).format(
                      "DD MMM YYYY"
                    )}`
              }
            />
          </Col>
          {checkFilterDifference() && width > 768 ? (
            <Col className="pl-2" style={{ marginTop: 4 }}>
              {getClearFilters()}
            </Col>
          ) : null}
        </Row>
      </>
    );
  };

  const columns = [
    {
      title: "Sr. No.",
      key: "index",
      render: (text, record, index) =>
        index + 1 + (pageData?.current - 1) * pageData?.pageSize,
      align: "center",
    },
    {
      title: "BDE Name & ERP",
      key: "bde_name",
      render: (record) => (
        <Row className={"d-flex flex-column flex-nowrap"}>
          <Col>
            <Typography className="th-12">{record.bde_name}</Typography>
          </Col>
          <Col>
            <Typography style={{ whiteSpace: "nowrap" }} className="th-10">
              ({record?.erp_no})
            </Typography>
          </Col>
        </Row>
      ),
      align: "center",
    },
    {
      title: "Branch",
      key: "branch",
      render: (record) => <span>{record?.branch?.name}</span>,
      align: "center",
    },
    {
      title: "Date",
      key: "date",
      render: (record) => <span>{record?.date}</span>,
      align: "center",
    },
    {
      title: "Routes",
      key: "routes",
      render: (record) => (
        <>
          <span>{record?.route_count || 0} assigned</span>
          <br />
          <Button
            type="link"
            size="small"
            className="view-date-wise-button"
            onClick={() => {
              setDrawerData({ show: true, data: record, type: "View Route" });
            }}
          >
            View Routes
          </Button>
        </>
      ),
      align: "center",
    },
    {
      title: "Lead Collected",
      key: "lead_collected",
      render: (record) => <span>{record?.lead_collected}</span>,
      align: "center",
    },
  ];

  return (
    <CustomCard>
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Row className="d-flex flex-column" gutter={[2, 2]}>
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Route Assign"]} />
                </Col>
                <Col>
                  <Row className="d-flex flex-row" gutter={[8, 4]}>
                    {getRoutePathDetails().add ? (
                      <Col>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            setDrawerData({
                              show: true,
                              data: null,
                              type: "Route Assign",
                            });
                          }}
                        >
                          + Route Assign
                        </Button>
                      </Col>
                    ) : null}
                    <Col>
                      <Tooltip title="Refresh">
                        <Button
                          size="small"
                          type="text"
                          disabled={loading}
                          icon={<MdRefresh size={20} />}
                          onClick={() => {
                            getRouteAssignData(1, pageData.pageSize);
                          }}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Divider />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Spin spinning={loading} tip="Loading">
            <Row
              className="d-flex flex-column flex-nowrap"
              style={{ minHeight: "60vh" }}
            >
              <Col xs={24}>
                <Row className="d-flex flex-row justify-content-between align-items-center">
                  <Col xs={13} sm={8} md={8} lg={14}>
                    <Row
                      className="d-flex flex-row align-items-center"
                      gutter={[8, 8]}
                    >
                      <Col xs={24} md={22} lg={12}>
                        {getSearchInput()}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={11} sm={16} md={16} lg={10}>
                    <Row
                      className="d-flex flex-row justify-content-end align-items-center"
                      gutter={[8, 8]}
                    >
                      <Col>
                        <Radio.Group
                          className="lead-radio"
                          options={[
                            { value: true, label: <MdListAlt size={20} /> },
                            { value: false, label: <BiIdCard size={20} /> },
                          ]}
                          onChange={(e) => {
                            setIsList(e.target.value);
                          }}
                          value={isList}
                          optionType="button"
                          buttonStyle="solid"
                        />
                      </Col>
                      <Col>
                        <Button
                          size="medium"
                          type="primary"
                          className="lead-button"
                          onClick={() => {
                            setDrawerData({
                              show: true,
                              type: "Filter",
                              data: filterData,
                            });
                          }}
                          icon={<MdFilterAlt size={14} />}
                        >
                          Filter
                          {checkFilterDifference()
                            ? `(${checkFilterDifference()})`
                            : ""}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              {width <= 768 ? (
                <Col xs={24} className={width < 576 ? "mt-1" : "mt-0"}>
                  <Row
                    className="d-flex flex-row justify-content-end align-items-center"
                    gutter={[8, 8]}
                  >
                    {checkFilterDifference() ? (
                      <Col style={{ textAlign: "right" }}>
                        {getClearFilters()}
                      </Col>
                    ) : null}
                    <Col style={{ textAlign: "right" }}>
                      <Button
                        type="link"
                        size="small"
                        onClick={() => {
                          setShowFilterView(!showFilterView);
                        }}
                        style={{ whiteSpace: "normal" }}
                      >
                        {showFilterView ? "Hide Filters" : "Show Filters"}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              ) : null}
              {showFilterView ? (
                <Col xs={24} className={"mt-1"}>
                  {renderFilterView()}
                </Col>
              ) : null}
              {routeAssignData ? (
                isList ? (
                  <Col xs={24} className={"mt-2"}>
                    <Table
                      dataSource={routeAssignData || []}
                      columns={columns}
                      bordered={true}
                      pagination={
                        routeAssignData?.length > 0 ? pageData : false
                      }
                      onChange={handleTableChange}
                    />
                  </Col>
                ) : (
                  <>
                    {routeAssignData?.length === 0 ? (
                      <Col xs={24} className={"mt-2"}>
                        <Row
                          style={{ minHeight: 200 }}
                          className={
                            "d-flex justify-content-center align-items-center"
                          }
                        >
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Row>
                      </Col>
                    ) : null}
                    {routeAssignData?.length > 0 ? (
                      <>
                        <Col xs={24} className={"mt-2"}>
                          <Row className={"d-flex"} gutter={[8, 8]}>
                            {routeAssignData?.map((each, index) => (
                              <Col xs={24} sm={12} lg={8} key={index}>
                                <CustomCard style={{ height: "100%" }}>
                                  <Row gutter={[4, 4]} className={"d-flex"}>
                                    <Col xs={24}>
                                      <Row
                                        gutter={[4, 4]}
                                        className={"d-flex flex-nowrap"}
                                      >
                                        <Col xs={24}>
                                          <Row
                                            className={
                                              "d-flex flex-column flex-nowrap"
                                            }
                                          >
                                            <Col xs={24}>
                                              <Typography className="th-13 th-fw-500">
                                                {each?.bde_name || "NA"}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="th-12">
                                                ERP: {each?.erp_no}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="th-12">
                                                {each?.date}
                                              </Typography>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Divider />
                                    <Col xs={24}>
                                      <Descriptions column={1}>
                                        {getCardDataText(
                                          "Branch",
                                          each?.branch?.name || "--"
                                        )}
                                        {getCardDataText(
                                          "Routes",
                                          <Row
                                            className="d-flex flex-row align-items-center"
                                            gutter={[8, 0]}
                                            style={{ marginTop: -3 }}
                                          >
                                            <Col>
                                              <Typography className="th-12">{`${
                                                each?.route_count || 0
                                              } assigned`}</Typography>
                                            </Col>
                                            <Col>
                                              <Button
                                                type="link"
                                                size="small"
                                                className="view-date-wise-button"
                                                onClick={() => {
                                                  setDrawerData({
                                                    show: true,
                                                    data: each,
                                                    type: "View Route",
                                                  });
                                                }}
                                              >
                                                View Routes
                                              </Button>
                                            </Col>
                                          </Row>
                                        )}
                                        {getCardDataText(
                                          "Lead Collected",
                                          each?.lead_collected || 0
                                        )}
                                      </Descriptions>
                                    </Col>
                                  </Row>
                                </CustomCard>
                              </Col>
                            ))}
                          </Row>
                        </Col>
                        <Col
                          xs={24}
                          className="mt-2 d-flex justify-content-center"
                        >
                          <Pagination
                            current={pageData?.page}
                            pageSize={pageData?.pageSize}
                            onChange={handleCardChange}
                            total={pageData?.total}
                          />
                        </Col>
                      </>
                    ) : null}
                  </>
                )
              ) : null}
            </Row>
          </Spin>
        </Col>
      </Row>
      <DrawerFilter
        drawerData={drawerData}
        onSubmit={(values) => {
          setDrawerData({ show: false, type: null, data: null });
          setFilterData({ ...filterData, ...values });
          getRouteAssignData(1, pageData?.pageSize);
        }}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
      />
      <AssignRoute
        modalData={drawerData}
        handleAssignRoute={() => {}}
        closeModal={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
        dropdownData={dropdownData}
      />
      <ViewRoutes
        drawerData={drawerData}
        closeDrawer={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
        dropdownData={dropdownData}
        eventStatusCountList={eventStatusCountList}
      />
    </CustomCard>
  );
};

export default RouteAssign;
