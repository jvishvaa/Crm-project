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
} from "antd";
import "./index.scss";
import { MdFilterAlt, MdListAlt, MdRefresh } from "react-icons/md";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { IoMdEye } from "react-icons/io";
import useWindowDimensions from "../../component/UtilComponents/useWindowDimensions";
import DrawerFilter from "./drawerFilter";
import dayjs from "dayjs";
import getArrayValues from "../../utils/getArrayValues";
import RenderFilterTag from "../../component/UtilComponents/RenderFilterTag";
import { BiIdCard } from "react-icons/bi";
import CustomCard from "../../component/UtilComponents/CustomCard";
import { useLocation, useNavigate } from "react-router-dom";
import getChangedCountValues from "../../utils/getChangeCountObject";
import getCardDataText from "../../component/UtilComponents/CardDataText";
import { HiMiniUser } from "react-icons/hi2";

const FollowUp = () => {
  const defaultFilters = {
    academic_year: ["2024-25"],
    school_type: 0,
    branch: [0],
    source_type: [0],
    lead_source: [0],
    lead_status: [0],
    lead_type: [0],
    lead_category: [0],
    date_type: "lead_created_date",
    date_range: [dayjs(), dayjs()],
  };
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    ...defaultFilters,
  });
  const [searchValue, setSearchValue] = useState("");
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
  const [selectedCardType, setSelectedCardType] = useState(null);
  const dropdownData = {
    academicYear: [
      { label: "2023-24", value: "2023-24" },
      { label: "2024-25", value: "2024-25" },
    ],
    schoolType: [
      { label: "All", value: 0 },
      { label: "Day", value: "day" },
      { label: "Boarding", value: "boarding" },
    ],
    branch: [
      { label: "All", value: 0 },
      { label: "Orchids BTM Layout", value: "btm-layout" },
      { label: "Orchids Banerghata", value: "banerghata" },
      { label: "Orchids Newtown", value: "newtown" },
    ],
    sourceType: [
      { label: "All", value: 0 },
      { label: "Field Marketing", value: "field_marketing" },
      { label: "Email Marketing", value: "email_marketing" },
      { label: "Digital Marketing", value: "digital_marketing" },
    ],
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
    leadType: [
      { label: "All", value: 0 },
      { label: "Active", value: "active" },
      { label: "Dormant", value: "dormant" },
      { label: "Active ReEnquiry", value: "active_reenquiry" },
      { label: "Dormant ReEnquiry", value: "dormant_reenquiry" },
      { label: "Regen", value: "reben" },
    ],
    leadCategory: [
      { label: "All", value: 0 },
      { label: "Normal", value: "normal" },
      { label: "Interested", value: "interested" },
      { label: "Hot", value: "hot" },
    ],
    dateType: [
      { label: "Lead Created Date", value: "lead_created_date" },
      { label: "Assign Date", value: "assign_date" },
    ],
  };

  const followUpPendingList = [
    { id: 1, label: "Total Followup Pending", value: 25, color: "#AB89FF" },
    {
      id: 2,
      label: "Fresh Lead Followup Pending",
      value: 25,
      color: "#F3917A",
    },
    {
      id: 3,
      label: "Followup Pending (1-2 Days)",
      value: 25,
      color: "#6FD956",
    },
    {
      id: 4,
      label: "Followup Pending (3-4 Days)",
      value: 25,
      color: "#57C9C5",
    },
    {
      id: 5,
      label: "Followup Pending (5-6 Days)",
      value: 25,
      color: "#F3C845",
    },
    { id: 6, label: "Followup Pending (7+ Days)", value: 25, color: "#E54C16" },
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

  const getLeadData = (page, page_size, params = {}) => {
    // setLoading(true);
    setLeadData([
      {
        branch: "Raja Test",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "PRO Data - Apartment",
        lead_created_date: "2024-03-26 13:22:51",
        lead_status: "Lead Created",
        lead_status2: null,
        pro_status: "Interested",
        next_followup_date: "",
        is_duplicate: false,
        id: 4110729,
        lead_name: "test new",
        is_dormant: false,
        in_dormant: false,
        is_regen: false,
        is_enquiry: true,
        lead_status_id: 103,
        lead_status_l2_id: null,
        is_parent_updated: false,
        pro_status_id: 9,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "ORCHIDS BTM Layout",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "PRO Data - Field Data",
        lead_created_date: "2024-03-26 12:41:47",
        lead_status: "Virtual counselling cancel",
        lead_status2: "Walkin scheduled",
        pro_status: "Normal",
        next_followup_date: "2024-04-02 14:50:00",
        is_duplicate: false,
        id: 4110728,
        lead_name: "bdm lead 2",
        is_dormant: false,
        in_dormant: false,
        is_regen: true,
        is_enquiry: false,
        lead_status_id: 92,
        lead_status_l2_id: 55,
        is_parent_updated: false,
        pro_status_id: 10,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "Raja Test",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "PRO Data - Apartment",
        lead_created_date: "2024-03-26 12:09:28",
        lead_status: "Admission done",
        lead_status2: null,
        pro_status: "HOT Lead",
        next_followup_date: "2024-04-02 14:09:00",
        is_duplicate: false,
        id: 4110727,
        lead_name: "Bdmfield lead",
        is_dormant: false,
        in_dormant: false,
        is_regen: false,
        is_enquiry: false,
        lead_status_id: 49,
        lead_status_l2_id: null,
        is_parent_updated: false,
        pro_status_id: 11,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "ORCHIDS BTM Layout",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "PRO Data - Apartment",
        lead_created_date: "2024-03-26 12:04:47",
        lead_status: "Walkin done",
        lead_status2: "Will Come Again",
        pro_status: "HOT Lead",
        next_followup_date: "2024-04-02 13:42:00",
        is_duplicate: false,
        id: 4110726,
        lead_name: "new report",
        is_dormant: false,
        in_dormant: false,
        is_regen: false,
        is_enquiry: false,
        lead_status_id: 47,
        lead_status_l2_id: 89,
        is_parent_updated: false,
        pro_status_id: 11,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "ORCHIDS BTM Layout",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "Direct-walkin",
        lead_created_date: "2024-03-18 15:29:19",
        lead_status: "Virtual counselling cancel",
        lead_status2: "Virtual counselling scheduled",
        pro_status: null,
        next_followup_date: "2024-05-07 11:52:00",
        is_duplicate: false,
        id: 4110723,
        lead_name: "test one",
        is_dormant: false,
        in_dormant: false,
        is_regen: false,
        is_enquiry: false,
        contact_source__sub_name: null,
        lead_status_id: 92,
        lead_status_l2_id: 41,
        is_parent_updated: false,
        pro_status_id: null,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "ORCHIDS BTM Layout",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "Branch",
        lead_created_date: "2024-03-15 14:34:50",
        lead_status: "Walkin cancel",
        lead_status2: "Walkin scheduled",
        pro_status: null,
        next_followup_date: "2024-03-18 15:32:00",
        is_duplicate: false,
        id: 4110722,
        lead_name: "Automation Lead",
        is_dormant: true,
        in_dormant: false,
        is_regen: false,
        is_enquiry: true,
        contact_source__sub_name: null,
        lead_status_id: 94,
        lead_status_l2_id: 55,
        is_parent_updated: false,
        pro_status_id: null,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "Raja Test",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "AOL",
        lead_created_date: "2024-03-14 15:28:12",
        lead_status: "Walkin cancel",
        lead_status2: "Walkin scheduled",
        pro_status: null,
        next_followup_date: "2024-03-15 15:14:00",
        is_duplicate: false,
        id: 4110721,
        lead_name: "admission test",
        is_dormant: false,
        in_dormant: false,
        is_regen: false,
        is_enquiry: false,
        contact_source__sub_name: null,
        lead_status_id: 94,
        lead_status_l2_id: 55,
        is_parent_updated: false,
        pro_status_id: null,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "Raja Test",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "Branch",
        lead_created_date: "2024-03-12 15:18:19",
        lead_status: "Walkin cancel",
        lead_status2: "Walkin scheduled",
        pro_status: null,
        next_followup_date: "2024-03-12 19:45:00",
        is_duplicate: false,
        id: 4110720,
        lead_name: "TEST",
        is_dormant: false,
        in_dormant: false,
        is_regen: false,
        is_enquiry: false,
        contact_source__sub_name: null,
        lead_status_id: 94,
        lead_status_l2_id: 55,
        is_parent_updated: false,
        pro_status_id: null,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "Raja Test",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "PRO Data - Apartment",
        lead_created_date: "2024-03-07 13:02:50",
        lead_status: "Walkin done",
        lead_status2: null,
        pro_status: "Normal",
        next_followup_date: "2024-03-12 15:16:00",
        is_duplicate: false,
        id: 4110717,
        lead_name: "apgd",
        is_dormant: false,
        in_dormant: false,
        is_regen: true,
        is_enquiry: false,
        lead_status_id: 47,
        lead_status_l2_id: null,
        is_parent_updated: false,
        pro_status_id: 10,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "ORCHIDS Bannerghata",
        call_count: null,
        city: "Bangalore",
        zone: "South Bangalore - Zonal Warehouse",
        contact_source: "PRO Data - Field Data",
        lead_created_date: "2024-03-07 12:58:57",
        lead_status: "Call picked up",
        lead_status2: "Not Interested",
        pro_status: "Normal",
        next_followup_date: "2024-03-11 15:16:38",
        is_duplicate: false,
        id: 4110715,
        lead_name: "route",
        is_dormant: false,
        in_dormant: true,
        is_regen: true,
        is_enquiry: false,
        lead_status_id: 29,
        lead_status_l2_id: 33,
        is_parent_updated: false,
        pro_status_id: 10,
        is_boarding: true,
        is_live: true,
      },
      {
        branch: "ORCHIDS Ambegaon",
        call_count: null,
        city: "Pune",
        zone: "JP Nagar Zone",
        contact_source: "Branch",
        lead_created_date: "2024-03-05 17:07:10",
        lead_status: "Not Responding",
        lead_status2: "Invalid Number",
        pro_status: null,
        next_followup_date: "",
        is_duplicate: false,
        id: 4110699,
        lead_name: "Automation Lead",
        is_dormant: false,
        in_dormant: true,
        is_regen: false,
        is_enquiry: false,
        contact_source__sub_name: null,
        lead_status_id: 30,
        lead_status_l2_id: 38,
        is_parent_updated: false,
        pro_status_id: null,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "ORCHIDS BTM Layout",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "Branch",
        lead_created_date: "2024-03-05 17:04:39",
        lead_status: "Virtual counselling cancel",
        lead_status2: "Walkin scheduled",
        pro_status: null,
        next_followup_date: "2024-03-15 15:16:00",
        is_duplicate: false,
        id: 4110698,
        lead_name: "Automation Lead",
        is_dormant: false,
        in_dormant: false,
        is_regen: false,
        is_enquiry: false,
        contact_source__sub_name: null,
        lead_status_id: 92,
        lead_status_l2_id: 55,
        is_parent_updated: false,
        pro_status_id: null,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "ORCHIDS BTM Layout",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "Branch",
        lead_created_date: "2024-03-05 16:59:15",
        lead_status: "Virtual counselling cancel",
        lead_status2: "Walkin scheduled",
        pro_status: null,
        next_followup_date: "2024-03-15 15:28:00",
        is_duplicate: false,
        id: 4110697,
        lead_name: "Automation Lead",
        is_dormant: false,
        in_dormant: false,
        is_regen: true,
        is_enquiry: false,
        contact_source__sub_name: null,
        lead_status_id: 92,
        lead_status_l2_id: 55,
        is_parent_updated: false,
        pro_status_id: null,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "ORCHIDS BTM Layout",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "Branch",
        lead_created_date: "2024-03-05 16:57:14",
        lead_status: "Virtual counselling cancel",
        lead_status2: "Walkin scheduled",
        pro_status: null,
        next_followup_date: "2024-03-15 12:24:00",
        is_duplicate: false,
        id: 4110696,
        lead_name: "Automation Lead",
        is_dormant: false,
        in_dormant: false,
        is_regen: false,
        is_enquiry: false,
        contact_source__sub_name: null,
        lead_status_id: 92,
        lead_status_l2_id: 55,
        is_parent_updated: false,
        pro_status_id: null,
        is_boarding: false,
        is_live: true,
      },
      {
        branch: "ORCHIDS BTM Layout",
        call_count: null,
        city: "Bangalore",
        zone: "JP Nagar Zone",
        contact_source: "Branch",
        lead_created_date: "2024-03-05 16:52:28",
        lead_status: "Virtual counselling done",
        lead_status2: "Walkin scheduled",
        pro_status: null,
        next_followup_date: "2024-03-15 16:22:00",
        is_duplicate: false,
        id: 4110695,
        lead_name: "Automation Lead",
        is_dormant: false,
        in_dormant: false,
        is_regen: true,
        is_enquiry: false,
        contact_source__sub_name: null,
        lead_status_id: 42,
        lead_status_l2_id: 55,
        is_parent_updated: false,
        pro_status_id: null,
        is_boarding: false,
        is_live: true,
      },
    ]);
    setPageData({
      current: page,
      pageSize: page_size,
      total: 15,
    });
  };

  useEffect(() => {
    getLeadData(pageData?.current, pageData?.pageSize);
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
        className="search-input-lead"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
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
          <Typography style={{ fontWeight: 500, fontSize: 12, marginTop: 2 }}>
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
        {!filterData?.lead_status?.includes(0) ? (
          <Col>
            <RenderFilterTag
              label="Lead Status"
              value={getArrayValues(
                dropdownData?.leadStatus?.filter((each) =>
                  filterData?.lead_status?.includes(each?.value)
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
          <Col className="pl-2">{getClearFilters()}</Col>
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
                    fontSize: 12,
                    whiteSpace:
                      record?.lead_name?.length <= 30 ? "nowrap" : "normal",
                  }}
                >
                  {record?.lead_name || "NA"}
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
            <Typography style={{ fontSize: 12 }}>{"+917937363636"}</Typography>
          </Col>
          <Col>
            <Typography style={{ fontSize: 10, whiteSpace: "nowrap" }}>
              {"anik.chowdhury@orchids.edu.in"}
            </Typography>
          </Col>
        </Row>
      ),
    },
    {
      title: "Source",
      key: "source",
      dataIndex: "contact_source",
      render: (text) => (text ? text : "--"),
      align: "center",
    },
    {
      title: "Branch",
      key: "branch",
      dataIndex: "branch",
      render: (text) => (text ? text : "--"),
      align: "center",
    },
    {
      title: "Lead Status",
      key: "lead_status",
      render: (record) => (
        <span>
          {record.lead_status}
          {record.lead_status2 ? ` -> ${record.lead_status2}` : ""}
        </span>
      ),
      align: "center",
    },
    {
      title: "Next Follow Up Date",
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
      title: "Action",
      key: "action",
      render: (record) => (
        <Tooltip title="View">
          <Button
            type="text"
            icon={<IoMdEye size={20} />}
            onClick={() => {
              navigate("/lead-management/lead-details/1");
            }}
          />
        </Tooltip>
      ),
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
                  <CustomBreadCrumbs data={["Follow Up"]} />
                </Col>
                <Col>
                  <Row className="d-flex flex-row" gutter={[8, 4]}>
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
                        <Col xs={24} md={22} lg={12}>
                          {getSearchInput()}
                        </Col>
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
              {showFilterView ? (
                <Col xs={24} className={"mt-1"}>
                  {renderFilterView()}
                </Col>
              ) : null}
              {leadData ? (
                <Col xs={24} className={"mt-1"}>
                  <Row gutter={[6, 6]}>
                    {followUpPendingList?.map((each) => (
                      <Col xs={12} sm={8} md={4}>
                        <CustomCard
                          className={
                            selectedCardType === each?.id
                              ? "follow-up-stats-card-selected"
                              : "follow-up-stats-card"
                          }
                          onClick={() => {
                            if (selectedCardType === each.id) {
                              setSelectedCardType(null);
                            } else {
                              setSelectedCardType(each.id);
                            }
                          }}
                        >
                          <Row>
                            <Col xs={24}>
                              <Row className="d-flex flex-row justify-content-between">
                                <Col>
                                  <Typography
                                    style={{ fontSize: 18, fontWeight: 600 }}
                                  >
                                    {each.value}
                                  </Typography>
                                </Col>
                                <Col>
                                  <div
                                    style={{
                                      backgroundColor: each.color,
                                    }}
                                    className="card-stats-icon-div"
                                  >
                                    <HiMiniUser
                                      size="20"
                                      style={{ color: "white" }}
                                    />
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
              ) : null}
              {leadData ? (
                isList ? (
                  <Col xs={24} className={"mt-2"}>
                    <Table
                      dataSource={leadData || []}
                      columns={columns}
                      bordered={true}
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
                                              <Typography className="lead-card-header-name">
                                                {each?.lead_name || "NA"}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="lead-card-subheader-text">
                                                {"+917937363636"}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography
                                                className="lead-card-subheader-text"
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
                                            <Tooltip title="View">
                                              <Button
                                                type="iconbutton"
                                                icon={<IoMdEye size={25} />}
                                                onClick={() => {
                                                  navigate(
                                                    "/lead-management/lead-details/1"
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
                                      <Row className={"d-flex"} gutter={[4, 4]}>
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
                                          "Next Follow Up Date",
                                          dayjs(each?.lead_created_date).format(
                                            "DD MMM YYYY hh:mm a"
                                          )
                                        )}
                                      </Row>
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
          getLeadData(1, pageData?.pageSize);
        }}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, data: null });
        }}
      />
    </div>
  );
};

export default FollowUp;
