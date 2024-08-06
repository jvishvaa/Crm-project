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
  Form,
  Modal,
  Select,
  Popconfirm
} from "antd";
import "./index.css";
import { MdFilterAlt, MdListAlt, MdRefresh } from "react-icons/md";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import { CloseOutlined, SearchOutlined, EditFilled, FireFilled } from "@ant-design/icons";
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
import UpdateLeadDetails from "../LeadDetails/UpdateLeadDetails";
import axios from "axios";
import urls from "../../../utils/urls";

const LeadManagement = () => {
  const defaultFilters = {
    academic_year: ["2024-25"],
    school_type: 0,
    city: [0],
    zone: [0],
    branch: [0],
    source_type: [0],
    lead_source: [0],
    lead_status: [0],
    lead_type: [0],
    lead_category: [0],
    date_type: "lead_created_date",
    date_range: [dayjs(), dayjs()],
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    ...defaultFilters,
  });
  const [searchValue, setSearchValue] = useState("");
  const [leadType, setLeadType] = useState("fresh");
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
  const [leadData, setLeadData] = useState(null);
  const [isList, setIsList] = useState(true);
  const searchIconRef = useRef(null);
  const { width } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    type: null,
    data: null,
  });
  
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
    city: [
      { label: "All", value: 0 },
      { label: "Bangallore", value: "bangalore" },
      { label: "Kolkata", value: "kolkata" },
      { label: "Chennal", value: "chennai" },
    ],
    zone: [
      { label: "All", value: 0 },
      { label: "Zone 1A", value: "zone-1a" },
      { label: "Zone 1B", value: "zone-1b" },
      { label: "Zone 2", value: "zone-2" },
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
      { label: "Next Followup Date", value: "next_followup_date" },
      { label: "ReEnquiry Date", value: "re_enquiry_date" },
      { label: "Regen Date", value: "regen_date" },
    ],
  };

  // useEffect(() => {
  //   if (modalData?.show) {
  //     if (modalData?.type === "Branch") {
  //       form.setFieldsValue({ branch: modalData?.data?.branch });
  //     }
  //     if (modalData?.type === "Source") {
  //       form.setFieldsValue({ source: modalData?.data?.source });
  //     }
  //   }
  // }, [modalData]);

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

  const onFinish = (values) => {
    setModalData({ show: false, type: null, data: null });
    form.resetFields();
  };

  const getBranchList = () => {
    let params = { session_year: 4 };
    axios
      .get(`${urls.masterData.branchList}`, {
        params: params,
      })
      .then((res) => {
        let response = res.data;
        setBranchList(response?.result);
      })
      .catch(() => {})
      .finally(() => {});
  };

  const [searchFetched, setSearchFetched] = useState(false);

  const leadTypeList = [
    { label: "Fresh", value: "fresh" },
    { label: "Duplicate", value: "duplicate" },
  ];

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
    getBranchList();
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

  const handleUpdateLeadDetails = (data) => {
    setModalData({ show: true, type: "UpdateLeadDetails", data: data });
  };
  

  const columns = [
    {
      title: "Sr. No.",
      key: "index",
      render: (text, record, index) =>
        index + 1 + (pageData?.current - 1) * pageData?.pageSize,
      align: "center",
      width: 50
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
                      record?.lead_name?.length <= 30 ? "nowrap" : "normal",
                  }}
                  className="th-12"
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
      width: 180,
    },
    {
      title: "Lead Contact Details",
      key: "lead",
      render: (record) => (
        <Row className={"d-flex flex-column flex-nowrap"}>
          <Col>
            <Typography className="th-12">{"+917937363636"}</Typography>
          </Col>
          <Col>
            <Typography className="th-10">
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
      align: "center",
      render: (text) => (
        <div
          onClick={() => {
            setModalData({
              show: true,
              type: "Source",
              data: { source: 1 },
            });
          }}
          style={{ cursor: 'pointer' }}
        >
          {text ? text : "--"}
        </div>
      ),
    },
    {
      title: "Branch",
      key: "branch",
      dataIndex: "branch",
      align: "center",
      render: (text) => (
        <div
          onClick={() => {
            setModalData({
              show: true,
              type: "Branch",
              data: { branch: 1 },
            })
          }}
          style={{ cursor: 'pointer' }}
        >
          {text ? text : "--"}
        </div>
      ),
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
        <>
        <Tooltip title="Mark as Hot">
          <Popconfirm title="Are you to mark lead as Hot?">
            <Button
              type="text"
              icon={<FireFilled size={20} style={{color:'#BB2139'}}/>}
            />
          </Popconfirm>
        </Tooltip>
        <Tooltip title="Update Lead Details">
          <Button
            type="text"
            icon={<EditFilled size={20} />}
            onClick={() => {
              handleUpdateLeadDetails(record);
            }}
          />
        </Tooltip>
        <Tooltip title="View Lead">
          <Button
            type="text"
            icon={<IoMdEye size={20} />}
            onClick={() => {
              navigate("/lead-management/lead-details/1");
            }}
          />
        </Tooltip>
        </>
      ),
      align: "center",
      width: 130
    },
  ];

  const renderAddLead = () => {
    return (
      <>
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
                setDrawerData({
                  show: true,
                  type: "Add Lead",
                  data: null,
                });
              }}
            >
              + Add Lead
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
                  <CustomBreadCrumbs data={["All Leads"]} />
                </Col>
                <Col>
                  <Row
                    className="d-flex flex-row align-items-center"
                    gutter={[8, 4]}
                  >
                    {width <= 840 ? renderAddLead() : null}
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
                    <Col xs={24} sm={8} md={14} lg={14}>
                      <Row
                        className="d-flex flex-row align-items-center"
                        gutter={[8, 8]}
                      >
                        <Col>{getSearchInput()}</Col>
                        {width > 840 ? renderAddLead() : null}
                      </Row>
                    </Col>
                  ) : null}
                  <Col xs={24} sm={16} md={10} lg={10}>
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
          setDrawerData({ show: false, type: null, data: null });
          setFilterData({ ...filterData, ...values });
          getLeadData(1, pageData?.pageSize);
        }}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
      />
      <Drawer
        title={
          <CustomDrawerHeader
            label="Add Lead"
            onClose={() =>
              setDrawerData({
                show: false,
                type: null,
                data: null,
              })
            }
          />
        }
        placement="right"
        onClose={() =>
          setDrawerData({
            show: false,
            type: null,
            data: null,
          })
        }
        open={drawerData?.show && drawerData?.type === "Add Lead"}
        size="large"
        closable={false}
        maskClosable={false}
        className="lead-filter-drawer"
      >
        <AddLead
          onClose={() =>
            setDrawerData({
              show: false,
              type: null,
              data: null,
            })
          }
        />
      </Drawer>
      {
        
          modalData.show && modalData.type !== "UpdateLeadDetails" && (
          
      <Modal
        centered
        open={modalData?.show}
        onCancel={() => {
          setModalData({ show: false, type: null, data: null });
          form.resetFields();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModalData({ show: false, type: null, data: null });
              form.resetFields();
            }}
            size="small"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
            size="small"
          >
            Update
          </Button>,
        ]}
      >
        <Row>
          <Col xs={24}>
            <Typography className="th-14 th-fw-600">
              {`Update ${modalData?.type}`}
            </Typography>
            <Divider />
          </Col>
          <Col xs={24}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                  {
                    modalData?.type === "Branch" ? ( 
                    <>
                      <Form.Item
                        name={modalData?.type === "Branch" ? "branch" : "source"}
                        label={modalData?.type === "Branch" ? "Branch" : "Source"}
                        rules={[
                          {
                            required: true,
                            message: `Please Enter Branch`
                            
                          },
                        ]}
                          >
                            <Select
                            style={{ width: "100%" }}
                            className="add-lead-select"
                            placeholder="Select Branch"
                            showSearch
                            filterOption={(input, option) =>
                              option.label.toLowerCase().includes(input.toLowerCase())
                            }
                            options={branchList?.map((item, ind) => {
                              return {
                                label: item?.branch_name,
                                value: item?.id,
                              };
                            })}
                          />
                      </Form.Item>
                        <Form.Item name={"school_type"} label={"School Type"}
                          rules={[
                            {
                              required: true,
                              message: `Please Enter School type`
                              
                            },
                          ]}
                        >
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select School Type"
                            filterOption={(input, option) =>
                              option.label.toLowerCase().includes(input.toLowerCase())
                            }
                                options={[
                                  { label: "Day", value: 1 },
                                  { label: "Boarding", value: 2 },
                            ]}
                            disabled={loading}
                          />
                            </Form.Item>
                    </>

                    ) : (
                    <Form.Item
                      name="source"
                      label="Lead Source"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Lead Source",
                        },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        className="add-lead-select"
                        placeholder="Select Lead Source"
                        showSearch
                        filterOption={(input, option) =>
                          option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                          { label: "DM-Direct", value: "dm-direct" },
                          {
                            label: "PRO Data - Field Data",
                            value: "pro data -field data",
                          },
                        ]}
                      />
                    </Form.Item>
                    )
                  }
            </Form>
          </Col>
        </Row>
      </Modal>
        )
      }
      {modalData.show && modalData.type === "UpdateLeadDetails" && (
        <UpdateLeadDetails
          modalData={modalData}
          handleUpdateLeadDetails={() => { }}
          closeModal={() => {
            setModalData({ show: false, type: null, data: null });
          }}
        />
      ) 
      }
    </CustomCard>
  );
};

export default LeadManagement;
