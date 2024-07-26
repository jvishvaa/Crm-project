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

const LeadManagement = () => {
  const defaultFilters = {
    city: [0],
    branch: [0],
    hotspot_type: [0],
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
  const [leadData, setLeadData] = useState(null);
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
        id: 1,
        hotspot_name: "Test",
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
        placeholder="Search Hotspot"
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
      <>
        {!(
          filterData?.city[0] === 0 &&
          filterData?.branch[0] === 0 &&
          filterData?.hotspot_type[0] === 0
        ) ? (
          <Row className="d-flex flex-row align-items-center" gutter={[4, 4]}>
            <Col>
              <Typography
                style={{ fontWeight: 500, fontSize: 12, marginTop: 2 }}
              >
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

            {checkFilterDifference() && width > 768 ? (
              <Col className="pl-2">{getClearFilters()}</Col>
            ) : null}
          </Row>
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
      title: "Action",
      key: "action",
      render: (record) => (
        <Tooltip title="View">
          <Button
            type="text"
            icon={<IoMdEye size={20} />}
            onClick={() => {
              // navigate("/lead-management/lead-details/1");
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
                  <CustomBreadCrumbs data={["Hotspots"]} />
                </Col>
                <Col>
                  <Row className="d-flex flex-row" gutter={[8, 4]}>
                    {getRoutePathDetails().add ? (
                      <Col>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            // navigate("/lead-management/add-lead");
                          }}
                        >
                          + Add Hotspots
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
                                          </Row>
                                        </Col>
                                        <Col xs={6}>
                                          <Row className="d-flex flex-row justify-content-end">
                                            <Tooltip title="View">
                                              <Button
                                                type="iconbutton"
                                                icon={<IoMdEye size={25} />}
                                                onClick={() => {
                                                  // navigate(
                                                  //   "/lead-management/lead-details/1"
                                                  // );
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
                                        {/* {getCardDataText(
                                          "Source",
                                          each?.contact_source || "--"
                                        )} */}
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
          setDrawerData({ show: false, type: null, data: null });
        }}
      />
    </div>
  );
};

export default LeadManagement;
