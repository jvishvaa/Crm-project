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
  Statistic,
  Progress,
} from "antd";
import "./index.scss";
import { MdEdit, MdFilterAlt, MdListAlt, MdRefresh } from "react-icons/md";
import { RiDownloadCloudFill } from "react-icons/ri";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { IoMdEye } from "react-icons/io";
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
import { TbFileUpload } from "react-icons/tb";
import getCardDataText from "../../../component/UtilComponents/CardDataText";
import AddEditEvents from "./AddEditEvents";
import { HiMiniUser } from "react-icons/hi2";
import {
  FaCheckCircle,
  FaClock,
  FaHourglassStart,
  FaSpinner,
  FaStopwatch,
} from "react-icons/fa";

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
      color: "#65c326",
      value: 10,
      icon: <FaCheckCircle size={20} style={{ color: "#65c326" }} />,
      smallWidth: "33%",
    },
    {
      id: 2,
      label: "Pending",
      color: "#ce994e",
      value: 20,
      icon: <FaClock size={20} style={{ color: "#ce994e" }} />,
      smallWidth: "33%",
    },
    {
      id: 3,
      label: "Yet To Start",
      color: "#EF5128",
      value: 30,
      icon: <FaHourglassStart size={20} style={{ color: "#EF5128" }} />,
      smallWidth: "33%",
    },
    {
      id: 4,
      label: "In Progress",
      color: "#246CDD",
      value: 15,
      icon: <FaSpinner size={20} style={{ color: "#246CDD" }} />,
      smallWidth: "50%",
    },
    {
      id: 5,
      label: "Timed Out",
      color: "#80427B",
      value: 25,
      icon: <FaStopwatch size={20} style={{ color: "#80427B" }} />,
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
        className="search-input-lead"
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
            <Typography style={{ fontWeight: 500, fontSize: 12, marginTop: 2 }}>
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
                          fontSize: "10px",
                          paddingLeft: "2px",
                          fontWeight: 500,
                        }}
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
        <span>
          {dayjs(record?.start_date).isSame(dayjs(record?.end_date), "day")
            ? dayjs(record?.start_date).format("DD/MM/YYYY")
            : `${dayjs(record?.start_date).format("DD/MM/YYYY")} To ${dayjs(
                record?.end_date
              ).format("DD/MM/YYYY")}`}
        </span>
      ),
      align: "center",
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
        <span>
          {record?.assigned_user
            ? getArrayValues(record?.assigned_user, "name")?.join(", ")
            : "--"}
        </span>
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
  ];

  return (
    <div>
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
                                    fontSize: 18,
                                    fontWeight: 500,
                                    color: each.color,
                                  }}
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
                        <CustomCard
                          style={{ minHeight: 200 }}
                          className={
                            "d-flex justify-content-center align-items-center"
                          }
                        >
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </CustomCard>
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
                                        <Col xs={18}>
                                          <Row
                                            className={
                                              "d-flex flex-column flex-nowrap"
                                            }
                                          >
                                            <Col xs={24}>
                                              <Typography className="lead-card-header-name">
                                                {each?.event_name || "NA"}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="lead-card-subheader-text">
                                                {each?.branch?.name}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="lead-card-subheader-text">
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
                                          </Row>
                                        </Col>
                                        <Col xs={6}>
                                          <Row className="d-flex flex-row justify-content-end">
                                            <Tooltip title="Edit">
                                              <Button
                                                type="iconbutton"
                                                icon={<MdEdit size={20} />}
                                                onClick={() => {
                                                  setDrawerData({
                                                    show: true,
                                                    type: "Update Hotspot",
                                                    data: each,
                                                  });
                                                }}
                                              />
                                            </Tooltip>
                                          </Row>
                                        </Col>
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
      <AddEditEvents
        modalData={drawerData}
        handleAddEditEvent={() => {}}
        closeModal={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
        dropdownData={dropdownData}
      />
    </div>
  );
};

export default Events;
