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
import { GoFileDirectoryFill } from "react-icons/go";
import PreviewMedia from "../../../component/UtilComponents/PreviewMedia";
import AddEditRWAEvent from "./AddEditRWAEvent";

const RWAEvent = () => {
  const defaultFilters = {
    zone: [0],
    branch: [0],
    city: [0],
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
  const [rwaEventData, setRWAEventData] = useState(null);
  const [isList, setIsList] = useState(true);
  const searchIconRef = useRef(null);
  const { width } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState("");
  const dropdownData = {
    city: [
      { label: "All", value: 0 },
      { label: "City 1", value: "city 1" },
      { label: "City 2", value: "city 2" },
      { label: "City 3", value: "city 3" },
    ],
    zone: [
      { label: "All", value: 0 },
      { label: "Zone 1", value: "zone 1" },
      { label: "Zone 1A", value: "zone 1A" },
      { label: "Zone 2", value: "zone 2" },
    ],

    branch: [
      { label: "All", value: 0 },
      { label: "Orchids BTM Layout", value: "btm-layout" },
      { label: "Orchids Banerghata", value: "banerghata" },
      { label: "Orchids Newtown", value: "newtown" },
    ],
  };

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

  const getRWAEventData = (page, page_size, params = {}) => {
    // setLoading(true);
    setRWAEventData([
      {
        id: 1,
        event_name: "Test Event",
        date: "02/08/2024",
        branch: { name: "ORCHIDS Yelahanka", id: 2 },
        total_event_cost: 100,
        total_lead_collected: 1000,
        total_handi_lead_collected: 1000,
        cpr: 100,
      },
      {
        id: 2,
        date: "02/08/2024",
        event_name: "Test Event 2",
        branch: { name: "ORCHIDS Yelahanka", id: 2 },
        branch: { name: "ORCHIDS Yelahanka", id: 2 },
        total_event_cost: 100,
        total_lead_collected: 1000,
        total_handi_lead_collected: 1000,
        cpr: 100,
      },
    ]);
    setPageData({
      current: page,
      pageSize: page_size,
      total: 2,
    });
  };

  useEffect(() => {
    getRWAEventData(pageData?.current, pageData?.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    window.scrollTo(0, 0);
    getRWAEventData(pagination?.current, pagination?.pageSize);
  };

  const handleCardChange = (page) => {
    window.scrollTo(0, 0);
    getRWAEventData(page, pageData?.pageSize);
  };

  const getSearchInput = () => {
    return (
      <Input
        placeholder="Search Event Name"
        style={{
          height: 30,
          maxWidth: 250,
        }}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value?.trimStart()?.replace("  ", " "));
          setSearchFetched(false);
        }}
        onPressEnter={() => {
          setSearchFetched(true);
          setSearchValue(searchInput);
          getRWAEventData(1, pageData?.pageSize);
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
                getRWAEventData(1, pageData?.pageSize);
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
          getRWAEventData(1, pageData?.pageSize);
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
          ) : !filterData?.zone?.includes(0) ? (
            <Col>
              <RenderFilterTag
                label="Zone"
                value={getArrayValues(
                  dropdownData?.zone?.filter((each) =>
                    filterData?.zone?.includes(each?.value)
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
      title: "Event Name",
      key: "event_name",
      render: (record) => <span>{record?.event_name || "--"}</span>,
      align: "center",
    },
    {
      title: "Date",
      key: "date",
      render: (record) => <span>{record?.date || "--"}</span>,
      align: "center",
    },
    {
      title: "Branch",
      key: "branch",
      render: (record) => <span>{record?.branch?.name || "--"}</span>,
      align: "center",
    },
    {
      title: "Total Cost (Rs.)",
      key: "total_cost",
      render: (record) => <span>{record?.total_event_cost || "--"}</span>,
      align: "center",
    },
    {
      title: "Total Lead Collected",
      key: "total_lead_collected",
      render: (record) => <span>{record?.total_lead_collected || "--"}</span>,
      align: "center",
    },
    {
      title: "Total H&I Lead Collected",
      key: "total_handi_lead_collected",
      render: (record) => (
        <span>{record?.total_handi_lead_collected || "--"}</span>
      ),
      align: "center",
    },
    {
      title: "CPR",
      key: "cpr",
      render: (record) => <span>{record?.cpr || "--"}</span>,
      align: "center",
    },
    ...(getRoutePathDetails().modify
      ? [
          {
            title: "Action",
            key: "action",
            render: (record) => (
              <Tooltip title="Update RWA Event">
                <Button
                  type="text"
                  size="small"
                  icon={<MdEdit size={18} />}
                  onClick={() => {
                    setDrawerData({
                      show: true,
                      type: "Update RWA Event",
                      data: record,
                    });
                  }}
                />
              </Tooltip>
            ),
            align: "center",
          },
        ]
      : []),
  ];

  const renderAddRWAEvent = () => {
    return (
      <>
        {getRoutePathDetails().add ? (
          <Col>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                setDrawerData({
                  show: true,
                  data: null,
                  type: "Add RWA Event",
                });
              }}
            >
              + RWA Event
            </Button>
          </Col>
        ) : null}
      </>
    );
  };

  return (
    <CustomCard>
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Row className="d-flex flex-column" gutter={[2, 2]}>
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["RWA Event"]} />
                </Col>
                <Col>
                  <Row className="d-flex flex-row" gutter={[8, 4]}>
                    {width < 768 ? renderAddRWAEvent() : null}
                    <Col>
                      <Tooltip title="Refresh">
                        <Button
                          size="small"
                          type="text"
                          disabled={loading}
                          icon={<MdRefresh size={20} />}
                          onClick={() => {
                            getRWAEventData(1, pageData.pageSize);
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
                  <Col xs={13} sm={8} md={14} lg={14}>
                    <Row
                      className="d-flex flex-row align-items-center"
                      gutter={[8, 8]}
                    >
                      <Col>{getSearchInput()}</Col>
                      {width >= 768 ? renderAddRWAEvent() : null}
                    </Row>
                  </Col>
                  <Col xs={11} sm={16} md={10} lg={10}>
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
                    {checkFilterDifference() ? (
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
                    ) : null}
                  </Row>
                </Col>
              ) : null}
              {showFilterView ? (
                <Col xs={24} className={"mt-1"}>
                  {renderFilterView()}
                </Col>
              ) : null}
              {rwaEventData ? (
                isList ? (
                  <Col xs={24} className={"mt-2"}>
                    <Table
                      dataSource={rwaEventData || []}
                      columns={columns}
                      pagination={rwaEventData?.length > 0 ? pageData : false}
                      onChange={handleTableChange}
                    />
                  </Col>
                ) : (
                  <>
                    {rwaEventData?.length === 0 ? (
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
                    {rwaEventData?.length > 0 ? (
                      <>
                        <Col xs={24} className={"mt-2"}>
                          <Row className={"d-flex"} gutter={[8, 8]}>
                            {rwaEventData?.map((each, index) => (
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
                                                {each?.date}
                                              </Typography>
                                            </Col>
                                          </Row>
                                        </Col>
                                        <Col xs={6}>
                                          <Row
                                            className="d-flex flex-row justify-content-end"
                                            gutter={[4, 4]}
                                          >
                                            {getRoutePathDetails().modify ? (
                                              <Col>
                                                <Tooltip title="Update RWA Event">
                                                  <Button
                                                    type="iconbutton"
                                                    icon={<MdEdit size={20} />}
                                                    onClick={() => {
                                                      setDrawerData({
                                                        show: true,
                                                        type: "Update RWA Event",
                                                        data: each,
                                                      });
                                                    }}
                                                  />
                                                </Tooltip>
                                              </Col>
                                            ) : null}
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Divider />
                                    <Col xs={24}>
                                      <Descriptions column={1}>
                                        {getCardDataText(
                                          "Total Cost",
                                          each?.total_event_cost
                                            ? `Rs. ${each?.total_event_cost}`
                                            : "--"
                                        )}
                                        {getCardDataText(
                                          "Total Lead Collected",
                                          each?.total_lead_collected || "--"
                                        )}
                                        {getCardDataText(
                                          "Total H&I Lead Collected",
                                          each?.total_handi_lead_collected ||
                                            "--"
                                        )}
                                        {getCardDataText(
                                          "CPR",
                                          each?.cpr || "--"
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
          getRWAEventData(1, pageData?.pageSize);
        }}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
      />
      <AddEditRWAEvent
        modalData={drawerData}
        handleAddEditRWAEvent={() => {}}
        closeModal={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
        dropdownData={dropdownData}
      />
    </CustomCard>
  );
};

export default RWAEvent;
