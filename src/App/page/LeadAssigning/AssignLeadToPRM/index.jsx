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
  Form,
  Checkbox,
  Descriptions,
} from "antd";
import "./index.css";
import { MdFilterAlt, MdListAlt, MdRefresh } from "react-icons/md";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import DrawerFilter from "./drawerFilter";
import dayjs from "dayjs";
import getArrayValues from "../../../utils/getArrayValues";
import RenderFilterTag from "../../../component/UtilComponents/RenderFilterTag";
import { BiIdCard } from "react-icons/bi";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import getChangedCountValues from "../../../utils/getChangeCountObject";
import FilterForm from "./filterForm";
import CustomFilterText from "../../../component/UtilComponents/CustomFilterText";
import getCardDataText from "../../../component/UtilComponents/CardDataText";
import SelectAssign from "./selectAssign";

const AssignLeadToPRM = () => {
  const [form] = Form.useForm();
  const defaultFilters = {
    academic_year: ["2024-25"],
    school_type: 0,
    branch: null,
    source_type: [0],
    lead_source: [0],
    lead_status: [0],
    lead_type: [0],
    lead_category: [0],
    event_name: [0],
    date_type: "lead_created_date",
    date_range: [dayjs(), dayjs()],
  };
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({
    ...defaultFilters,
  });
  const [searchValue, setSearchValue] = useState("");
  const [drawerData, setDrawerData] = useState({ show: false, data: null });
  const [modalData, setModalData] = useState({ show: false, data: null });
  const [showFilterView, setShowFilterView] = useState(false);
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isSelectAllPages, setIsSelectAllPages] = useState(false);
  const [isFetchData, setIsFetchData] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const [isList, setIsList] = useState(true);
  const searchIconRef = useRef(null);
  const { width } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState("");
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
    eventList: [{ label: "All", value: 0 }],
    leadStatus: [
      { label: "All", value: 0 },
      { label: "Call Not Made", value: "call-not-made" },
      { label: "Home Counselling Scheduled", value: "hc-scheduled" },
      {
        label: "Admission Done",
        value: "admission-done",
      },
    ],
    leadCategory: [
      { label: "All", value: 0 },
      { label: "Normal", value: "normal" },
      { label: "Interested", value: "interested" },
      { label: "Hot", value: "hot" },
    ],
    dateType: [
      { label: "Lead Created Date", value: "lead_created_date" },
      { label: "Regen Date", value: "regen_date" },
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

  const handleApplyFilter = (values) => {
    setDrawerData({ show: false, data: null });
    setFilterData({ ...filterData, ...values });
    setIsSelectAllPages(false);
    getLeadData(1, pageData?.pageSize);
  };

  const onFinish = (values) => {
    handleApplyFilter(values);
    form.resetFields();
  };

  const handleFilterFormValue = (formData, formRef) => {
    formRef.setFieldsValue({
      academic_year: formData?.academic_year,
      school_type: formData?.school_type,
      branch: formData?.branch,
      source_type: formData?.source_type,
      lead_source: formData?.lead_source,
      lead_status: formData?.lead_status,
      lead_category: formData?.lead_category,
      date_type: formData?.date_type,
      date_range: formData?.date_range,
      event_name: formData?.event_name,
    });
  };

  useEffect(() => {
    handleFilterFormValue(filterData, form);
  }, []);

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
    setIsFetchData(true);
    form.resetFields();
    setSelectedRowKeys([]);
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
    ]);
    setPageData({
      current: page,
      pageSize: page_size,
      total: 10,
    });
  };

  const handleTableChange = (pagination) => {
    window.scrollTo(0, 0);
    getLeadData(pagination?.current, pagination?.pageSize);
  };

  const handleCardChange = (page) => {
    window.scrollTo(0, 0);
    getLeadData(page, pageData?.pageSize);
  };

  const handleCardPageSizeChange = (current, size) => {
    window.scrollTo(0, 0);
    getLeadData(1, size);
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
          setIsSelectAllPages(false);
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
                setIsSelectAllPages(false);
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
          handleFilterFormValue(defaultFilters, form);
          setIsFetchData(false);
          setLeadData(null);
          setPageData({ current: 1, pageSize: 20, total: 0 });
          setSearchValue("");
          setSearchFetched(false);
          setIsSelectAllPages(false);
          setSearchInput("");
          setSelectedRowKeys([]);
          if (width <= 991) {
            setShowFilterView(false);
          }
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
        {filterData?.branch ? (
          <Col>
            <RenderFilterTag
              label="Branch"
              value={getArrayValues(
                dropdownData?.branch?.filter(
                  (each) => filterData?.branch === each.value
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
        {each?.is_regen ? <Tag color="magenta">Regen</Tag> : null}
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
      width: 200,
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
            <Typography style={{ whiteSpace: "nowrap" }} className="th-10">
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
      title: "Lead Category",
      key: "lead_category",
      dataIndex: "lead_category",
      render: (text) => (text ? text : "--"),
      align: "center",
    },
    {
      title: "Event Name",
      key: "event_name",
      dataIndex: "event_name",
      render: (text) => (text ? text : "--"),
      align: "center",
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: isSelectAllPages
      ? getArrayValues(leadData, "id")
      : selectedRowKeys,
    onChange: onSelectChange,
    selections: false, // Disable the "Select All" option
    hideSelectAll: true,
    fixed: true,
    getCheckboxProps: (record) => ({
      disabled: isSelectAllPages ? true : false, // Disable checkbox based on record property
    }),
  };

  const handleCardCheckboxChange = (each) => {
    let mySelectedRowsKeys = [...selectedRowKeys];
    if (mySelectedRowsKeys?.includes(each?.id)) {
      setSelectedRowKeys(
        mySelectedRowsKeys?.filter((item) => item !== each?.id)
      );
    } else {
      mySelectedRowsKeys.push(each.id);
      setSelectedRowKeys(mySelectedRowsKeys);
    }
  };

  const onChangeSelectAll = () => {
    if (
      selectedRowKeys?.length &&
      selectedRowKeys?.length === leadData?.length
    ) {
      setSelectedRowKeys([]);
      setIsSelectAllPages(false);
    } else if (
      selectedRowKeys?.length &&
      selectedRowKeys?.length !== leadData?.length
    ) {
      setSelectedRowKeys([]);
      setIsSelectAllPages(false);
    } else if (isSelectAllPages) {
      setSelectedRowKeys([]);
      setIsSelectAllPages(false);
    } else {
      setSelectedRowKeys(getArrayValues(leadData, "id"));
    }
  };

  return (
    <CustomCard>
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Row className="d-flex flex-column" gutter={[2, 2]}>
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Assign Leads To PRM"]} />
                </Col>
                <Col>
                  <Row className="d-flex flex-row" gutter={[8, 4]}>
                    <Col>
                      {isFetchData ? (
                        <Tooltip title="Refresh">
                          <Button
                            size="small"
                            type="text"
                            icon={<MdRefresh size={20} />}
                            disabled={loading}
                            onClick={() => {
                              setIsSelectAllPages(false);
                              getLeadData(1, pageData.pageSize);
                            }}
                          />
                        </Tooltip>
                      ) : null}
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
              {isFetchData ? (
                <>
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
                  {leadData ? (
                    <>
                      {leadData?.length ? (
                        <Col xs={24} className={"mt-2"}>
                          <Row
                            className="d-flex flex-row justify-content-between align-items-center"
                            gutter={[4, 4]}
                          >
                            <Col
                              xs={
                                pageData?.total > leadData?.length &&
                                !isSelectAllPages
                                  ? 24
                                  : 10
                              }
                              sm={12}
                            >
                              <Row
                                className="d-flex flex-row align-content-center"
                                gutter={[12, 4]}
                              >
                                <Col>
                                  <Checkbox
                                    checked={
                                      leadData?.length ===
                                        selectedRowKeys?.length ||
                                      isSelectAllPages
                                    }
                                    indeterminate={
                                      selectedRowKeys?.length &&
                                      leadData?.length !==
                                        selectedRowKeys?.length
                                    }
                                    className="pl-3"
                                    onChange={onChangeSelectAll}
                                  >
                                    <Typography
                                      style={{ lineHeight: 1.2 }}
                                      className="th-12"
                                    >
                                      {selectedRowKeys?.length &&
                                      leadData?.length !==
                                        selectedRowKeys?.length
                                        ? "Deselect All"
                                        : "Select All"}

                                      {!isSelectAllPages ? (
                                        <>
                                          <br />
                                          <span className="th-9">
                                            (Current Page)
                                          </span>
                                        </>
                                      ) : null}
                                    </Typography>
                                  </Checkbox>
                                </Col>
                                {pageData?.total > leadData?.length &&
                                !isSelectAllPages ? (
                                  <Col>
                                    <Button
                                      type="text"
                                      size="small"
                                      style={{ lineHeight: 1.2 }}
                                      onClick={() => {
                                        setIsSelectAllPages(true);
                                      }}
                                    >
                                      Select All Leads <br />{" "}
                                      <span className="th-9">(All Pages)</span>
                                    </Button>
                                  </Col>
                                ) : null}
                              </Row>
                            </Col>
                            {isSelectAllPages || selectedRowKeys?.length ? (
                              <Col
                                xs={
                                  pageData?.total > leadData?.length &&
                                  !isSelectAllPages
                                    ? 24
                                    : 14
                                }
                                sm={12}
                              >
                                <Row
                                  className="d-flex flex-row justify-content-end align-items-center"
                                  gutter={[12, 4]}
                                >
                                  <Col>
                                    <Typography className="th-12 th-fw-500">
                                      {isSelectAllPages
                                        ? "Selected All Leads"
                                        : `Selected ${
                                            selectedRowKeys?.length
                                          } Lead${
                                            selectedRowKeys?.length > 1
                                              ? "s"
                                              : ""
                                          }`}{" "}
                                      {width < 576 ? <br /> : null}
                                      {selectedRowKeys?.length
                                        ? "on current page"
                                        : ""}
                                    </Typography>
                                  </Col>
                                  <Col>
                                    <Button
                                      size="small"
                                      type="primary"
                                      onClick={() => {
                                        setModalData({
                                          show: true,
                                          data: null,
                                        });
                                      }}
                                    >
                                      Assign
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            ) : null}
                          </Row>
                        </Col>
                      ) : null}
                      {isList ? (
                        <Col xs={24} className={leadData?.length ? "mt-2" : ""}>
                          <Table
                            rowKey="id"
                            className="assign-list-table"
                            dataSource={leadData || []}
                            columns={columns}
                            rowSelection={rowSelection}
                            pagination={
                              leadData?.length > 0
                                ? {
                                    ...pageData,
                                    showSizeChanger: true, // Enable page size changer
                                    pageSizeOptions: [
                                      "10",
                                      "20",
                                      "30",
                                      "40",
                                      "50",
                                      "100",
                                      "150",
                                      "200",
                                    ],
                                  }
                                : false
                            }
                            onChange={handleTableChange}
                          />
                        </Col>
                      ) : (
                        <>
                          {leadData?.length === 0 ? (
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
                          {leadData?.length > 0 ? (
                            <>
                              <Col xs={24} className={"mt-2"}>
                                <Row className={"d-flex"} gutter={[8, 8]}>
                                  {leadData?.map((each, index) => (
                                    <Col xs={24} sm={12} lg={8} key={index}>
                                      <CustomCard
                                        style={{
                                          height: "100%",
                                          cursor: "pointer",
                                          backgroundColor:
                                            isSelectAllPages ||
                                            selectedRowKeys.includes(each?.id)
                                              ? "#FBFBFB"
                                              : "white",
                                        }}
                                        onClick={() => {
                                          handleCardCheckboxChange(each);
                                        }}
                                      >
                                        <Row
                                          gutter={[4, 4]}
                                          className={"d-flex"}
                                        >
                                          <Col xs={24}>
                                            <Row
                                              gutter={[4, 4]}
                                              className={"d-flex flex-nowrap"}
                                            >
                                              <Col xs={20}>
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
                                              <Col xs={4}>
                                                <Row className="d-flex  flex-row justify-content-end">
                                                  <Checkbox
                                                    checked={
                                                      isSelectAllPages ||
                                                      selectedRowKeys.includes(
                                                        each?.id
                                                      )
                                                    }
                                                    onChange={() => {
                                                      handleCardCheckboxChange(
                                                        each
                                                      );
                                                    }}
                                                    disabled={isSelectAllPages}
                                                  />
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
                                                "Event Name",
                                                each?.event_name || "--"
                                              )}
                                              {getCardDataText(
                                                "Lead Category",
                                                each?.lead_category || "--"
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
                                  showSizeChanger={true} // Enable page size changer
                                  pageSizeOptions={[
                                    "10",
                                    "20",
                                    "30",
                                    "40",
                                    "50",
                                    "100",
                                    "150",
                                    "200",
                                  ]}
                                  onShowSizeChange={handleCardPageSizeChange}
                                />
                              </Col>
                            </>
                          ) : null}
                        </>
                      )}
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <Col xs={24} style={{ marginTop: -10 }}>
                    <Row gutter={[8, 8]}>
                      <Col xs={24}>
                        <Form form={form} layout="vertical" onFinish={onFinish}>
                          <FilterForm
                            form={form}
                            dropdownData={dropdownData}
                            isDrawer={false}
                          />
                        </Form>
                      </Col>
                      <Col xs={24}>
                        <CustomFilterText />
                      </Col>
                    </Row>
                  </Col>
                </>
              )}
            </Row>
          </Spin>
        </Col>
      </Row>
      <DrawerFilter
        drawerData={drawerData}
        onSubmit={(values) => {
          handleApplyFilter(values);
        }}
        handleFilterFormValue={handleFilterFormValue}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, data: null });
        }}
      />
      <SelectAssign
        modalData={modalData}
        handleAssign={() => {}}
        closeModal={() => {
          setModalData({ show: false, data: null });
        }}
      />
    </CustomCard>
  );
};

export default AssignLeadToPRM;
