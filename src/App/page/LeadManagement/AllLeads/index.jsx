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
  Drawer,
  message,
} from "antd";
import "./index.css";
import { MdFilterAlt, MdListAlt, MdRefresh } from "react-icons/md";
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
import AddLead from "../AddLead";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";
import urls from "../../../utils/urls";
import axios from "axios";

const LeadManagement = () => {
  const defaultFilters = {
    academic_year: ["2024-25"],
    school_type: 0,
    city: [0],
    zone_id: [0],
    branch: [0],
    source_type: [0],
    lead_source: [0],
    status: [0],
    lead_type: [0],
    lead_category: [0],
    date_type: 1,
    date_range: [dayjs().subtract(1, "month"), dayjs()],
  };
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    ...defaultFilters,
  });
  const [searchValue, setSearchValue] = useState("");
  const [leadType, setLeadType] = useState("fresh");
  const [drawerData, setDrawerData] = useState({ show: false, data: null });
  const [showFilterView, setShowFilterView] = useState(false);
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [leadData, setLeadData] = useState(null);
  const [isList, setIsList] = useState(true);
  const searchIconRef = useRef(null);
  const { width } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dropdownData, setDropdownData] = useState({
    academicYear: [
      { label: "2023-24", value: "2023-24" },
      { label: "2024-25", value: "2024-25" },
    ],
    schoolType: [
      { label: "All", value: 0 },
      { label: "Day", value: "day" },
      { label: "Boarding", value: "boarding" },
    ],
    city: [{ city_name: "All", id: 0 }],
    zone: [{ zone_name: "All", id: 0 }],
    branch: [{ branch_name: "All", id: 0 }],
    sourceType: [{ source_name: "All", id: 0 }],
    source: [
      { label: "All", value: 0 },
      { label: "DM - Website", value: "dm-website" },
      { label: "DM - Edustroke", value: "dm-edustroke" },
      {
        label: "Pro Data - Apartment",
        value: "pro-data-apartment",
      },
    ],
    leadStatus: [
      { label: "All", value: 0 },
      { label: "Call Not Made", value: "call-not-made" },
      { label: "Home Counselling Scheduled", value: "hc-scheduled" },
      {
        label: "Admission Done",
        value: "admission-done",
      },
    ],
    leadType: [{ lead_name: "All", id: 0 }],
    leadCategory: [
      { label: "All", value: 0 },
      { label: "Hot", value: 1 },
      { label: "Interested", value: 2 },
      { label: "Normal", value: 3 },
    ],
    dateType: [
      { label: "Lead Created Date", value: 1 },
      { label: "Next Followup Date", value: 2 },
      { label: "ReEnquiry Date", value: 3 },
      { label: "Regen Date", value: 4 },
    ],
  });

  useEffect(() => {
    if (width <= 991) {
      setShowFilterView(false);
      setIsList(false);
    } else {
      setShowFilterView(true);
      setIsList(true);
    }
  }, [width]);

  useEffect(() => {
    if (location?.state?.data) {
      setFilterData({
        ...filterData,
        ...location?.state?.data?.filterData,
        date_range: [
          dayjs(location?.state?.data?.filterData?.date_range[0]),
          dayjs(location?.state?.data?.filterData?.date_range[1]),
        ],
      });
      setSearchValue(location?.state?.data?.searchValue);
      setLeadType(location?.state?.data?.leadType);
      setShowFilterView(location?.state?.data?.showFilterView);
      setIsList(location?.state?.data?.isList);
      setSearchInput(location?.state?.data?.searchInput);
    }
  }, [location]);

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

  const leadTypeList = [
    { label: "Fresh", value: "fresh" },
    { label: "Duplicate", value: "duplicate" },
  ];
  const getBranchList = (zoneId = 2, cityId = 1) => {
    let params = { zone_id: zoneId, city_id: cityId };
    axios
      .get(`${urls.masterData.branchList}`, {
        params: params,
      })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setDropdownData((p) => {
          return {
            ...p,
            branch: [{ branch_name: "All", id: 0 }, ...response?.result],
          };
        });
      })
      .catch(() => {})
      .finally(() => {});
  };
  const getCityList = () => {
    axios
      .get(`${urls.masterData.cityList}`)
      .then((res) => {
        let response = res.data;
        console.log(response);
        setDropdownData((p) => {
          return {
            ...p,
            city: [{ city_name: "All", id: 0 }, ...response?.result],
          };
        });
      })
      .catch(() => {})
      .finally(() => {});
  };
  const getZoneList = (values) => {
    axios
      .get(`${urls.masterData.zoneList}`)
      .then((res) => {
        let response = res.data;
        console.log(response);
        setDropdownData((p) => {
          return {
            ...p,
            zone: [{ zone_name: "All", id: 0 }, ...response?.result],
          };
        });
      })
      .catch(() => {})
      .finally(() => {});
  };
  const getLeadTypeList = (values) => {
    axios
      .get(`${urls.masterData.leadTypeList}`)
      .then((res) => {
        let response = res.data;
        console.log(response);
        setDropdownData((p) => {
          return {
            ...p,
            leadType: [{ lead_name: "All", id: 0 }, ...response?.result],
          };
        });
      })
      .catch(() => {})
      .finally(() => {});
  };
  const getSourceTypeList = (values) => {
    axios
      .get(`${urls.masterData.sourceTypeList}`)
      .then((res) => {
        let response = res.data;
        console.log(response);
        setDropdownData((p) => {
          return {
            ...p,
            sourceType: [{ source_name: "All", id: 0 }, ...response?.result],
          };
        });
      })
      .catch(() => {})
      .finally(() => {});
  };
  const getLeadData = (page, page_size, filteredParams = {}) => {
    let param = {};
    Object.entries(filteredParams).forEach(([key, value]) => {
      if (key === "date_range" && Array.isArray(value) && value.length === 2) {
        const [startDate, endDate] = value.map(
          (date) => new Date(date).toISOString().split("T")[0]
        );
        param["start_date"] = startDate;
        param["end_date"] = endDate;
      } else if (Array.isArray(value)) {
        const filteredValues = value.filter((v) => v !== 0);
        if (filteredValues.length > 0) {
          param[key] = filteredValues.join(",");
        }
      } else if (value !== 0) {
        param[key] = value;
      }
    });
    console.log(filteredParams, param, "pp");
    axios
      .get(`${urls.masterData.leadInfo}`, {
        params: param,
      })
      .then((res) => {
        let response = res.data;
        setLeadData(response);
        message.success("Lead info fetched successfully.");
        // setPageData({
        //   current: response?.current_page,
        //   pageSize: 15,
        //   total: response?.count,
        // });
      })
      .catch((err) => {
        message.error(err?.message ?? "Failed to fetched lead info");
      })
      .finally(() => {
        setLoading(false);
      });
    setPageData({
      current: page,
      pageSize: page_size,
      total: 15,
    });
  };

  useEffect(() => {
    getLeadData(pageData?.current, pageData?.pageSize);
    getCityList();
    getBranchList();
    getZoneList();
    getLeadTypeList();
    getSourceTypeList();
  }, []);

  const handleTableChange = (pagination) => {
    window.scrollTo(0, 0);
    getLeadData(pagination?.current, pagination?.pageSize);
  };

  const handleCardChange = (page) => {
    window.scrollTo(0, 0);
    getLeadData(page, pageData?.pageSize);
  };

  const getSearchInput = () => {
    return (
      <Input
        placeholder="Search Lead"
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
          getLeadData(1, pageData?.pageSize);
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
                getLeadData(1, pageData?.pageSize);
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
          getLeadData(1, pageData?.pageSize);
        }}
      >
        Clear Filters
      </Button>
    );
  };

  const renderFilterView = () => {
    return (
      <Row className="d-flex flex-row align-items-center" gutter={[4, 4]}>
        <Col>
          <Typography style={{ marginTop: 4 }} className="th-12 th-fw-500">
            Filter:
          </Typography>
        </Col>
        <Col>
          <RenderFilterTag
            label="Academic Year"
            value={getArrayValues(
              dropdownData?.academicYear?.filter((each) =>
                filterData?.academic_year?.includes(each?.value)
              ),
              "label"
            )?.join(", ")}
          />
        </Col>
        {filterData?.school_type !== 0 ? (
          <Col>
            <RenderFilterTag
              label="School Type"
              value={getArrayValues(
                dropdownData?.schoolType?.filter(
                  (each) => filterData?.school_type === each?.value
                ),
                "label"
              )?.join(", ")}
            />
          </Col>
        ) : null}
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
        ) : !filterData?.zone_id?.includes(0) ? (
          <Col>
            <RenderFilterTag
              label="Zone"
              value={getArrayValues(
                dropdownData?.zone?.filter((each) =>
                  filterData?.zone_id?.includes(each?.value)
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
        {!filterData?.lead_source?.includes(0) ? (
          <Col>
            <RenderFilterTag
              label="Source"
              value={getArrayValues(
                dropdownData?.source?.filter((each) =>
                  filterData?.lead_source?.includes(each?.value)
                ),
                "label"
              )?.join(", ")}
            />
          </Col>
        ) : !filterData?.source_type?.includes(0) ? (
          <Col>
            <RenderFilterTag
              label="Source Type"
              value={getArrayValues(
                dropdownData?.sourceType?.filter((each) =>
                  filterData?.source_type?.includes(each?.value)
                ),
                "label"
              )?.join(", ")}
            />
          </Col>
        ) : null}
        {!filterData?.status?.includes(0) ? (
          <Col>
            <RenderFilterTag
              label="Lead Status"
              value={getArrayValues(
                dropdownData?.leadStatus?.filter((each) =>
                  filterData?.status?.includes(each?.value)
                ),
                "label"
              )?.join(", ")}
            />
          </Col>
        ) : null}
        {!filterData?.lead_type?.includes(0) ? (
          <Col>
            <RenderFilterTag
              label="Lead Type"
              value={getArrayValues(
                dropdownData?.leadType?.filter((each) =>
                  filterData?.lead_type?.includes(each?.value)
                ),
                "label"
              )?.join(", ")}
            />
          </Col>
        ) : null}
        {!filterData?.lead_category?.includes(0) ? (
          <Col>
            <RenderFilterTag
              label="Lead Category"
              value={getArrayValues(
                dropdownData?.leadCategory?.filter((each) =>
                  filterData?.lead_category?.includes(each?.value)
                ),
                "label"
              )?.join(", ")}
            />
          </Col>
        ) : null}
        <Col>
          <RenderFilterTag
            label="Date Type"
            value={getArrayValues(
              dropdownData?.dateType?.filter(
                (each) => filterData?.date_type === each?.value
              ),
              "label"
            )?.join(", ")}
          />
        </Col>
        <Col>
          <RenderFilterTag
            label="Date"
            value={
              dayjs(filterData?.date_range[0]).isSame(filterData?.date_range[1])
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
    );
  };

  const renderTag = (each) => {
    return (
      <>
        {each.pro_status === "HOT Lead" ? <Tag color="red">Hot</Tag> : null}
        {each?.is_regen ? <Tag color="magenta">Regen</Tag> : null}
        {each?.in_dormant ? <Tag color="gold">Dormant</Tag> : null}
        {!each?.is_dormant && each?.is_enquiry ? (
          <Tag color="green">ReEnquiry (A)</Tag>
        ) : null}
        {each?.is_dormant && each?.is_enquiry ? (
          <Tag color="orange">ReEnquiry (D)</Tag>
        ) : null}
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
      title: "Lead Name",
      key: "lead",
      render: (record) => (
        <Row
          className={"d-flex flex-row align-items-center flex-nowrap"}
          gutter={[12, 4]}
        >
          <Col>
            <Row className={"d-flex flex-column flex-nowrap"}>
              <Col>
                <Typography
                  style={{
                    whiteSpace:
                      record?.name?.length <= 30 ? "nowrap" : "normal",
                  }}
                  className="th-12"
                >
                  {record?.name || "NA"}
                </Typography>
              </Col>
              <Col>
                <Row className={"d-flex flex-row"} gutter={[4, 4]}>
                  {renderTag(record)}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      ),
      width: 200,
    },
    {
      title: "Lead Contact Details",
      key: "lead",
      render: (record) => (
        <Row className={"d-flex flex-column flex-nowrap"}>
          <Col>
            <Typography className="th-12">{record?.contact_no}</Typography>
          </Col>
          <Col>
            <Typography className="th-10">{record?.email}</Typography>
          </Col>
        </Row>
      ),
    },
    {
      title: "Source",
      key: "source",
      // dataIndex: "contact_source",
      render: (record) =>
        record?.source_type?.name ? record?.source_type?.name : "--",
      align: "center",
    },
    {
      title: "Branch",
      key: "branch",
      // dataIndex: "branch",
      render: (text) =>
        text?.branch_id?.branch_name ? text?.branch_id?.branch_name : "--",
      align: "center",
    },
    {
      title: "Lead Status",
      key: "lead_status",
      render: (record) => (
        <span>
          {record?.status?.status}
          {/* {record.lead_status2 ? ` -> ${record.lead_status2}` : ""} */}
        </span>
      ),
      align: "center",
    },
    {
      title: "Created Date",
      key: "created_date",
      render: (record) => (
        <>
          <span style={{ whiteSpace: "nowrap" }}>
            {dayjs(record?.lead_created_date).format("DD MMM YYYY")}
          </span>{" "}
          <br />{" "}
          <span> {dayjs(record?.lead_created_date).format("hh:mm a")}</span>
        </>
      ),
      align: "center",
    },
    {
      title: "Call Count",
      key: "call count",
      render: (record) => (
        <span>
          {[null, undefined].includes(record.call_count)
            ? "--"
            : record.call_count}
        </span>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Tooltip title="View Lead">
          <Button
            type="text"
            icon={<IoMdEye size={20} />}
            onClick={() => {
              navigate(`/lead-management/lead-details/1`);
              // navigate(`/lead-management/lead-details/${record?.id}`);
            }}
          />
        </Tooltip>
      ),
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
                  <CustomBreadCrumbs data={["All Leads"]} />
                </Col>
                <Col>
                  <Row
                    className="d-flex flex-row align-items-center"
                    gutter={[8, 4]}
                  >
                    <Col>
                      <Tooltip title="Refresh">
                        <Button
                          size="small"
                          type="text"
                          disabled={loading}
                          icon={<MdRefresh size={20} />}
                          onClick={() => {
                            getLeadData(1, pageData.pageSize);
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
                  {width >= 576 ? (
                    <Col xs={24} sm={8} md={8} lg={14}>
                      <Row
                        className="d-flex flex-row align-items-center"
                        gutter={[8, 8]}
                      >
                        <Col>{getSearchInput()}</Col>
                        <Col>
                          <Button
                            size="small"
                            type="primary"
                            icon={<TbFileUpload size={18} />}
                            onClick={() => {
                              navigate("/lead-management/bulk-upload-lead");
                            }}
                          >
                            Bulk Upload
                          </Button>
                        </Col>
                        {getRoutePathDetails().add ? (
                          <Col>
                            <Button
                              size="small"
                              type="primary"
                              // onClick={() => {
                              //   navigate("/lead-management/add-lead");
                              // }}
                              onClick={() => setDrawerVisible(true)}
                            >
                              + Add Lead
                            </Button>
                          </Col>
                        ) : null}
                      </Row>
                    </Col>
                  ) : null}
                  <Col xs={24} sm={16} md={16} lg={10}>
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
                        <Radio.Group
                          className="lead-radio"
                          options={leadTypeList}
                          onChange={(e) => {
                            setLeadType(e.target.value);
                            getLeadData(1, pageData?.pageSize);
                          }}
                          value={leadType}
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
                            setDrawerData({ show: true, data: filterData });
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
                <Col xs={24} className={width < 576 ? "mt-2" : "mt-0"}>
                  <Row
                    className="d-flex flex-row justify-content-end align-items-center"
                    gutter={[4, 4]}
                  >
                    {width < 576 ? (
                      <>
                        <Col
                          xs={16}
                          className="d-flex flex-row justify-content-end"
                        >
                          {getSearchInput()}
                        </Col>
                        <Col>
                          <Button
                            size="small"
                            type="primary"
                            icon={<TbFileUpload size={18} />}
                            onClick={() => {
                              navigate("/lead-management/bulk-upload-lead");
                            }}
                          >
                            Bulk Upload
                          </Button>
                        </Col>
                        {getRoutePathDetails().add ? (
                          <Col>
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => {
                                navigate("/lead-management/add-lead");
                              }}
                            >
                              + Add Lead
                            </Button>
                          </Col>
                        ) : null}
                      </>
                    ) : null}
                    {checkFilterDifference() ? (
                      <Col xs={4} style={{ textAlign: "right" }}>
                        {getClearFilters()}
                      </Col>
                    ) : null}
                    <Col xs={4} style={{ textAlign: "right" }}>
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
              {/* {showFilterView ? (
                <Col xs={24} className={"mt-1"}>
                  {renderFilterView()}
                </Col>
              ) : null} */}
              {leadData ? (
                isList ? (
                  <Col xs={24} className={"mt-2"}>
                    <Table
                      dataSource={leadData || []}
                      columns={columns}
                      // bordered={true}
                      loading={loading}
                      pagination={leadData?.length > 0 ? pageData : false}
                      onChange={handleTableChange}
                    />
                  </Col>
                ) : (
                  <>
                    {leadData?.length === 0 ? (
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
                    {leadData?.length > 0 ? (
                      <>
                        <Col xs={24} className={"mt-2"}>
                          <Row className={"d-flex"} gutter={[8, 8]}>
                            {leadData?.map((each, index) => (
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
                                                {each?.lead_name || "NA"}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="th-12">
                                                {"+917937363636"}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography
                                                className="th-12"
                                                style={{
                                                  whiteSpace: "nowrap",
                                                }}
                                              >
                                                {
                                                  "anik.chowdhury@orchids.edu.in"
                                                }
                                              </Typography>
                                            </Col>
                                          </Row>
                                        </Col>
                                        <Col xs={6}>
                                          <Row className="d-flex flex-row justify-content-end">
                                            <Tooltip title="View Lead">
                                              <Button
                                                type="iconbutton"
                                                icon={<IoMdEye size={25} />}
                                                onClick={() => {
                                                  navigate(
                                                    "/lead-management/lead-details/1",
                                                    {
                                                      state: { is_back: true },
                                                    }
                                                  );
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
                                          "Source",
                                          each?.contact_source || "--"
                                        )}
                                        {getCardDataText(
                                          "Branch",
                                          each?.branch || "--"
                                        )}
                                        {getCardDataText(
                                          "Lead Status",
                                          `${each.lead_status}
                                                ${
                                                  each.lead_status2
                                                    ? ` -> ${each.lead_status2}`
                                                    : ""
                                                }`
                                        )}
                                        {getCardDataText(
                                          "Created Date",
                                          dayjs(each?.lead_created_date).format(
                                            "DD MMM YYYY hh:mm a"
                                          )
                                        )}

                                        {getCardDataText(
                                          "Call Count",
                                          [null, undefined].includes(
                                            each.call_count
                                          )
                                            ? "--"
                                            : each.call_count
                                        )}
                                      </Descriptions>
                                    </Col>
                                    <Divider />
                                    <Col xs={24} className="mt-1">
                                      <Row
                                        className={"d-flex flex-row"}
                                        gutter={[4, 4]}
                                      >
                                        {renderTag(each)}
                                      </Row>
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
          setDrawerData({ show: false, data: null });
          setFilterData({ ...filterData, ...values });
          getLeadData(1, pageData?.pageSize, { ...filterData, ...values });
        }}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, data: null });
        }}
      />
      <Drawer
        title={
          <CustomDrawerHeader
            label="Add Lead"
            onClose={() => setDrawerVisible(false)}
          />
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={720}
        closable={false}
        maskClosable={false}
      >
        <AddLead onClose={() => setDrawerVisible(false)} />
      </Drawer>
    </CustomCard>
  );
};

export default LeadManagement;
