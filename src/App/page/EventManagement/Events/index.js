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
import AddEditEvents from "./AddEditEvents";
import {
  FaCheckCircle,
  FaClock,
  FaHourglassStart,
  FaSpinner,
  FaStopwatch,
} from "react-icons/fa";
import getFilterItemFromArray from "../../../utils/getFilterItemFromArray";
import DateWiseEvent from "./DateWiseEvent";

const Events = () => {
  const defaultFilters = {
    city: [0],
    branch: [0],
    hotspot_type: [0],
    assigned_user: [0],
    date_range: [dayjs(), dayjs()],
  };
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
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
  const [eventData, setEventData] = useState(null);
  const [isList, setIsList] = useState(true);
  const searchIconRef = useRef(null);
  const [popoverVisible, setPopoverVisible] = useState(null);
  const { width } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState("");
  const [selectedAssignId, setSelectedAssignId] = useState([]);
  const [searchAssignInput, setSearchAssignInput] = useState("");
  const assignUserList = [
    { id: 1, label: "Anik", erp: 2039484838 },
    { id: 2, label: "Utpal", erp: 2039484838 },
    { id: 3, label: "Anik1", erp: 2039484838 },
    { id: 4, label: "Utpal1", erp: 2039484838 },
    { id: 5, label: "Anik2", erp: 2039484838 },
    { id: 6, label: "Utpal2", erp: 2039484838 },
    { id: 7, label: "Anik3", erp: 2039484838 },
    { id: 8, label: "Utpal3", erp: 2039484838 },
  ];
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

    source: [
      { label: "All", value: 0 },
      { label: "Apartment", value: "apartment" },
      { label: "Branch", value: "branch" },
    ],
  };

  const eventStatusCountList = [
    {
      id: 1,
      label: "Completed",
      color: "#4CAF50",
      value: 10,
      icon: <FaCheckCircle size={20} style={{ color: "#4CAF50" }} />,
      smallWidth: "33%",
    },
    {
      id: 2,
      label: "In Progress",
      color: "#8BC34A",
      value: 20,
      icon: <FaSpinner size={20} style={{ color: "#8BC34A" }} />,
      smallWidth: "33%",
    },
    {
      id: 3,
      label: "Yet To Start",
      color: "#fdb614",
      value: 30,
      icon: <FaHourglassStart size={20} style={{ color: "#fdb614" }} />,
      smallWidth: "33%",
    },
    {
      id: 4,
      label: "Pending",
      color: "#FF9800",
      value: 15,
      icon: <FaClock size={20} style={{ color: "#FF9800" }} />,
      smallWidth: "50%",
    },
    {
      id: 5,
      label: "Timed Out",
      color: "#F44336",
      value: 25,
      icon: <FaStopwatch size={20} style={{ color: "#F44336" }} />,
      smallWidth: "50%",
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

  const handleAssignCheckbox = (each) => {
    let mySelectedAssignId = [...selectedAssignId];
    if (mySelectedAssignId?.includes(each?.id)) {
      let findIndex = mySelectedAssignId.findIndex((x) => x === each.id);
      mySelectedAssignId.splice(findIndex, 1);
    } else {
      mySelectedAssignId.push(each.id);
    }
    setSelectedAssignId(mySelectedAssignId);
  };

  const getAssignContent = () => {
    return (
      <Row className="d-flex flex-column" gutter={[8, 8]}>
        <Col xs={24}>
          <Input
            placeholder="Search User"
            style={{
              height: 30,
              maxWidth: 250,
            }}
            value={searchAssignInput}
            onChange={(e) => {
              setSearchAssignInput(e.target.value);
            }}
            maxLength={48}
            suffix={
              searchAssignInput ? (
                <CloseOutlined
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    setSearchAssignInput("");
                  }}
                />
              ) : (
                <SearchOutlined />
              )
            }
          />
        </Col>
        <Col xs={24} style={{ overflow: "auto", maxHeight: 200 }}>
          <Row className="d-flex flex-column">
            {assignUserList
              ?.filter((each) =>
                searchAssignInput
                  ? each?.label
                      ?.toLowerCase()
                      ?.includes(searchAssignInput?.toLowerCase())
                  : true
              )
              ?.map((each) => (
                <Col
                  xs={24}
                  className="assign-user-list"
                  onClick={() => {
                    handleAssignCheckbox(each);
                  }}
                >
                  <Row
                    className="d-flex flex-row align-items-center"
                    style={{ minHeight: 28 }}
                  >
                    <Col xs={3} className="pl-1">
                      <Checkbox
                        checked={selectedAssignId?.includes(each?.id)}
                        onChange={() => {
                          handleAssignCheckbox(each);
                        }}
                      />
                    </Col>
                    <Col xs={21}>
                      <Typography className="mt-1 th-11 th-fw-500">
                        {each?.label}
                      </Typography>
                    </Col>
                  </Row>
                  <Divider />
                </Col>
              ))}
          </Row>
        </Col>
        <Col xs={24}>
          <Typography className="selected-count-assign">
            {selectedAssignId?.length} Selected
          </Typography>
        </Col>
        <Col xs={24} style={{ marginTop: -10 }}>
          <Row className="d-flex flex-row justify-content-end">
            <Button
              size="small"
              type="primary"
              disabled={selectedAssignId?.length === 0}
              onClick={() => {
                setPopoverVisible(null);
                setSearchAssignInput("");
                setSelectedAssignId([]);
              }}
            >
              Assign
            </Button>
          </Row>
        </Col>
      </Row>
    );
  };

  const [searchFetched, setSearchFetched] = useState(false);

  const getEventData = (page, page_size, params = {}) => {
    // setLoading(true);
    setEventData([
      {
        id: 1,
        event_name: "Test Event",
        hotspot: { id: 1, name: "Test Hotspot" },
        branch: { id: 1, name: "Branch 1" },
        source: { id: 1, name: "Source 1" },
        start_date: "2024-01-01 12:12",
        end_date: "2024-01-03 12:12",
        event_cost: 100,
        assigned_user: [
          { id: 1, name: "Test 1" },
          { id: 2, name: "Test 2" },
        ],
        status: "In Progress",
        total_lead: 100,
        created_by: "Admin",
      },
      {
        id: 2,
        event_name: "Test Event2",
        hotspot: { id: 1, name: "Test Hotspot" },
        branch: { id: 1, name: "Branch 1" },
        source: { id: 1, name: "Source 1" },
        start_date: "2024-01-01 12:12",
        end_date: "2024-01-01 12:12",
        event_cost: 100,
        assigned_user: null,
        status: "Timed Out",
        total_lead: 100,
        created_by: "Admin",
      },
    ]);
    setPageData({
      current: page,
      pageSize: page_size,
      total: 2,
    });
  };

  useEffect(() => {
    getEventData(pageData?.current, pageData?.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    window.scrollTo(0, 0);
    getEventData(pagination?.current, pagination?.pageSize);
  };

  const handleCardChange = (page) => {
    window.scrollTo(0, 0);
    getEventData(page, pageData?.pageSize);
  };

  const getSearchInput = () => {
    return (
      <Input
        placeholder="Search Event"
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
          getEventData(1, pageData?.pageSize);
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
                getEventData(1, pageData?.pageSize);
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
          getEventData(1, pageData?.pageSize);
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
            <Typography style={{ marginTop: 2 }} className="th-12 th-fw-500">
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
          {!filterData?.hotspot_type?.includes(0) ? (
            <Col>
              <RenderFilterTag
                label="Hotspot Type"
                value={getArrayValues(
                  dropdownData?.source?.filter((each) =>
                    filterData?.hotspot_type?.includes(each?.value)
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
            <Col className="pl-2">{getClearFilters()}</Col>
          ) : null}
        </Row>
      </>
    );
  };

  const renderProgressBar = (valueList) => {
    return (
      <>
        {valueList
          .filter((item1) => item1.value !== 0)
          .map((item, index) => (
            <>
              <div
                style={{
                  width: `${item.widthPercentage}%`,
                  backgroundColor: item.color,
                  ...(index === 0
                    ? { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }
                    : {}),
                  ...(index ===
                  valueList.filter((item1) => item1.value !== 0).length - 1
                    ? { borderTopRightRadius: 10, borderBottomRightRadius: 10 }
                    : {}),
                }}
              >
                <div
                  className={`d-flex flex-row ${
                    item.value < 5
                      ? "justify-content-start"
                      : "justify-content-end"
                  } align-items-center`}
                  style={{ height: 20 }}
                >
                  <div>
                    {item.widthPercentage > 5 ? (
                      <Typography
                        style={{
                          color: "white",
                          paddingRight: "5px",
                          paddingLeft: "2px",
                          fontWeight: "bold",
                        }}
                        className="th-10"
                      >
                        {item.value}%
                      </Typography>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          ))}
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
      title: "Event Name",
      key: "event_name",
      render: (record) => <span>{record?.event_name || "--"}</span>,
      align: "center",
    },
    {
      title: "Hotspot",
      key: "hotspot",
      render: (record) => <span>{record?.hotspot?.name || "--"}</span>,
      align: "center",
    },
    {
      title: "Branch",
      key: "branch",
      render: (record) => <span>{record?.branch?.name || "--"}</span>,
      align: "center",
    },
    {
      title: "Hotspot Type",
      key: "source",
      render: (record) => <span>{record?.source?.name || "--"}</span>,
      align: "center",
    },
    {
      title: "Date",
      key: "date",
      render: (record) => (
        <>
          <span>
            {dayjs(record?.start_date).isSame(dayjs(record?.end_date), "day")
              ? dayjs(record?.start_date).format("DD/MM/YYYY")
              : `${dayjs(record?.start_date).format("DD/MM/YYYY")} To ${dayjs(
                  record?.end_date
                ).format("DD/MM/YYYY")}`}
          </span>{" "}
          <br />
          {!dayjs(record?.start_date).isSame(dayjs(record?.end_date)) ? (
            <Button
              type="link"
              size="small"
              className="view-date-wise-button"
              onClick={() => {
                setDrawerData({
                  show: true,
                  type: "View Date Wise",
                  data: record,
                });
              }}
            >
              View Date Wise
            </Button>
          ) : null}
        </>
      ),
      align: "center",
      width: 180,
    },
    {
      title: "Event Cost",
      key: "event_cost",
      render: (record) => <span>{`${record?.event_cost} INR` || "0 INR"}</span>,
      align: "center",
    },
    {
      title: "BDE",
      key: "assigned_user",
      render: (record) => (
        <>
          <span>
            {record?.assigned_user
              ? getArrayValues(record?.assigned_user, "name")?.join(", ")
              : "--"}
          </span>{" "}
          <br />
          <Popover
            content={getAssignContent(record)}
            trigger="click"
            placement="bottom"
            open={popoverVisible === record.id ? true : false}
            onOpenChange={() => {
              setPopoverVisible(popoverVisible ? null : record.id);
              setSearchAssignInput("");
              setSelectedAssignId([]);
            }}
            overlayClassName="assign-popover"
          >
            <Button type="link" size="small" className="view-date-wise-button">
              Assign
            </Button>
          </Popover>
        </>
      ),
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Tag
          color={
            getFilterItemFromArray(
              eventStatusCountList,
              "label",
              record.status
            )[0].color
          }
        >
          {record?.status}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Total Leads",
      key: "total_leads",
      render: (record) => <span>{record?.total_lead || "0"}</span>,
      align: "center",
    },
    {
      title: "Created By",
      key: "created_by",
      render: (record) => <span>{record?.created_by || "--"}</span>,
      align: "center",
    },
    ...(getRoutePathDetails().modify
      ? [
          {
            title: "Action",
            key: "action",
            render: (record) => (
              <Row
                className={
                  "d-flex flex-row justify-content-center align-items-center"
                }
                gutter={[4, 4]}
              >
                <Col>
                  <Tooltip title="Update Event">
                    <Button
                      type="text"
                      size="small"
                      icon={<MdEdit size={18} />}
                      onClick={() => {
                        setDrawerData({
                          show: true,
                          type: "Update Event",
                          data: record,
                        });
                      }}
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
            align: "center",
          },
        ]
      : []),
  ];

  return (
    <CustomCard>
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Row className="d-flex flex-column" gutter={[2, 2]}>
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Event"]} />
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
                              type: "Add Event",
                            });
                          }}
                        >
                          + Add Event
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
                            getEventData(1, pageData.pageSize);
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
              <Col xs={24} className={"mt-2"}>
                <Row className="d-flex flex-row">
                  {renderProgressBar(
                    eventStatusCountList?.map((each) => {
                      return {
                        label: each?.label,
                        value: each?.value,
                        widthPercentage: each?.value,
                        color: each?.color,
                      };
                    })
                  )}
                </Row>
              </Col>
              <Col xs={24} className={"mt-2"}>
                <Row gutter={[6, 6]}>
                  {eventStatusCountList?.map((each) => (
                    <Col
                      style={{ width: width < 768 ? each?.smallWidth : "20%" }}
                    >
                      <CustomCard
                        className={
                          selectedStatus === each?.id
                            ? "event-stats-card-selected"
                            : "event-stats-card"
                        }
                        onClick={() => {
                          if (selectedStatus === each.id) {
                            setSelectedStatus(null);
                          } else {
                            setSelectedStatus(each.id);
                          }
                        }}
                      >
                        <Row>
                          <Col xs={24}>
                            <Row className="d-flex flex-row justify-content-between">
                              <Col>
                                <Typography
                                  style={{
                                    color: each.color,
                                  }}
                                  className="th-18 th-fw-500"
                                >
                                  {each.value}
                                </Typography>
                              </Col>
                              <Col>
                                <div className="card-stats-icon-div">
                                  {each?.icon}
                                </div>
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={24}>
                            <Typography className="card-label-text-followup">
                              {each.label}
                            </Typography>
                          </Col>
                        </Row>
                      </CustomCard>
                    </Col>
                  ))}
                </Row>
              </Col>
              {eventData ? (
                isList ? (
                  <Col xs={24} className={"mt-2"}>
                    <Table
                      dataSource={eventData || []}
                      columns={columns}
                      bordered={true}
                      pagination={eventData?.length > 0 ? pageData : false}
                      onChange={handleTableChange}
                    />
                  </Col>
                ) : (
                  <>
                    {eventData?.length === 0 ? (
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
                    {eventData?.length > 0 ? (
                      <>
                        <Col xs={24} className={"mt-2"}>
                          <Row className={"d-flex"} gutter={[8, 8]}>
                            {eventData?.map((each, index) => (
                              <Col xs={24} sm={12} lg={8} key={index}>
                                <CustomCard style={{ height: "100%" }}>
                                  <Row gutter={[4, 4]} className={"d-flex"}>
                                    <Col xs={24}>
                                      <Row
                                        gutter={[4, 4]}
                                        className={"d-flex flex-nowrap"}
                                      >
                                        <Col
                                          xs={
                                            getRoutePathDetails().modify
                                              ? 18
                                              : 24
                                          }
                                        >
                                          <Row
                                            className={
                                              "d-flex flex-column flex-nowrap"
                                            }
                                          >
                                            <Col xs={24}>
                                              <Typography className="th-13 th-fw-500">
                                                {each?.event_name || "NA"}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="th-12">
                                                {each?.branch?.name}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="th-12">
                                                {dayjs(each?.start_date).isSame(
                                                  dayjs(each?.end_date),
                                                  "day"
                                                )
                                                  ? dayjs(
                                                      each?.start_date
                                                    ).format("DD/MM/YYYY")
                                                  : `${dayjs(
                                                      each?.start_date
                                                    ).format(
                                                      "DD/MM/YYYY"
                                                    )} To ${dayjs(
                                                      each?.end_date
                                                    ).format("DD/MM/YYYY")}`}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Tag
                                                color={
                                                  getFilterItemFromArray(
                                                    eventStatusCountList,
                                                    "label",
                                                    each.status
                                                  )[0].color
                                                }
                                                className="mr-1"
                                              >
                                                {each?.status}
                                              </Tag>
                                              {!dayjs(each?.start_date).isSame(
                                                dayjs(each?.end_date)
                                              ) ? (
                                                <Button
                                                  type="link"
                                                  size="small"
                                                  className="view-date-wise-button"
                                                  onClick={() => {
                                                    setDrawerData({
                                                      show: true,
                                                      type: "View Date Wise",
                                                      data: each,
                                                    });
                                                  }}
                                                >
                                                  View Date Wise
                                                </Button>
                                              ) : null}
                                            </Col>
                                          </Row>
                                        </Col>
                                        {getRoutePathDetails().modify ? (
                                          <Col xs={6}>
                                            <Row
                                              className="d-flex flex-row justify-content-end align-items-center"
                                              gutter={[8, 8]}
                                            >
                                              <Col>
                                                <Tooltip title="Update Event">
                                                  <Button
                                                    type="iconbutton"
                                                    icon={<MdEdit size={20} />}
                                                    onClick={() => {
                                                      setDrawerData({
                                                        show: true,
                                                        type: "Update Event",
                                                        data: each,
                                                      });
                                                    }}
                                                  />
                                                </Tooltip>
                                              </Col>
                                              <Col>
                                                <Popover
                                                  content={getAssignContent(
                                                    each
                                                  )}
                                                  trigger="click"
                                                  placement="bottom"
                                                  open={
                                                    popoverVisible === each.id
                                                      ? true
                                                      : false
                                                  }
                                                  onOpenChange={() => {
                                                    setPopoverVisible(
                                                      popoverVisible
                                                        ? null
                                                        : each.id
                                                    );
                                                    setSearchAssignInput("");
                                                    setSelectedAssignId([]);
                                                  }}
                                                  overlayClassName="assign-popover"
                                                >
                                                  <Button
                                                    type="primary"
                                                    size="small"
                                                    className="view-date-wise-button"
                                                  >
                                                    Assign
                                                  </Button>
                                                </Popover>
                                              </Col>
                                            </Row>
                                          </Col>
                                        ) : null}
                                      </Row>
                                    </Col>
                                    <Divider />
                                    <Col xs={24}>
                                      <Descriptions column={1}>
                                        {getCardDataText(
                                          "Hotspot",
                                          each?.hotspot?.name || "--"
                                        )}
                                        {getCardDataText(
                                          "Hotspot Type",
                                          each?.source?.name || "--"
                                        )}
                                        {getCardDataText(
                                          "BDE",
                                          each?.assigned_user
                                            ? getArrayValues(
                                                each?.assigned_user,
                                                "name"
                                              )?.join(", ")
                                            : "--"
                                        )}
                                        {getCardDataText(
                                          "Event Cost",
                                          `${each?.event_cost} INR` || "0 INR"
                                        )}
                                        {getCardDataText(
                                          "Total Leads",
                                          each.total_lead || "0"
                                        )}
                                        {getCardDataText(
                                          "Created By",
                                          each.created_by || "0"
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
          getEventData(1, pageData?.pageSize);
        }}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
      />
      <DateWiseEvent
        drawerData={drawerData}
        closeDrawer={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
        setSearchAssignInput={setSearchAssignInput}
        setSelectedAssignId={setSelectedAssignId}
        getAssignContent={getAssignContent}
        eventStatusCountList={eventStatusCountList}
      />
      <AddEditEvents
        modalData={drawerData}
        handleAddEditEvent={() => {}}
        closeModal={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
        dropdownData={dropdownData}
      />
    </CustomCard>
  );
};

export default Events;
