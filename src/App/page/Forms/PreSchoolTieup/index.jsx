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
import AddEditPreSchoolTieup from "./AddEditPreSchoolTieup";

const PreSchoolTieup = () => {
  const defaultFilters = {
    city: [0],
    branch: [0],
    principal_remarks: 0,
    date_range: [],
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
  const [preSchoolData, setPreSchoolData] = useState(null);
  const [isList, setIsList] = useState(true);
  const searchIconRef = useRef(null);
  const { width } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState("");
  const [previewData, setPreviewData] = useState({ show: false, urls: [] });
  const dropdownData = {
    city: [
      { label: "All", value: 0 },
      { label: "City 1", value: "city 1" },
      { label: "City 1A", value: "city 1A" },
      { label: "City 2", value: "city 2" },
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
      },
      {
        ...filterData,
        ...(filterData?.date_range?.length
          ? {
              date_range: [
                dayjs(filterData?.date_range[0]).format("YYYY-MM-DD"),
                dayjs(filterData?.date_range[1]).format("YYYY-MM-DD"),
              ],
            }
          : {}),
      }
    );
  };

  const [searchFetched, setSearchFetched] = useState(false);

  const getPreSchoolData = (page, page_size, params = {}) => {
    // setLoading(true);
    setPreSchoolData([
      {
        id: 1,
        pre_school_name: "Test Pre School",
        location: "Test Location",
        branch: { id: 1, name: "Test Branch" },
        principal_name: "Test Principal",
        principal_contact_no: 3232342342,
        bdm_remarks: "Test BDM Remarks",
        principal_remarks: "Test Principal Remarks",
        insertedBy: { name: "Anik Chowdhury", erp: 24713623634 },
        insertedOn: "02/02/2024",
      },
      {
        id: 2,
        pre_school_name: "Test Pre School",
        location: "Test Location",
        branch: { id: 1, name: "Test Branch" },
        principal_name: "Test Principal",
        principal_contact_no: 3232342342,
        bdm_remarks: "Test BDM Remarks",
        principal_remarks: "Test Principal Remarks",
        insertedBy: { name: "Anik Chowdhury", erp: 24713623634 },
        insertedOn: "02/02/2024",
      },
    ]);
    setPageData({
      current: page,
      pageSize: page_size,
      total: 2,
    });
  };

  useEffect(() => {
    getPreSchoolData(pageData?.current, pageData?.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    window.scrollTo(0, 0);
    getPreSchoolData(pagination?.current, pagination?.pageSize);
  };

  const handleCardChange = (page) => {
    window.scrollTo(0, 0);
    getPreSchoolData(page, pageData?.pageSize);
  };

  const getSearchInput = () => {
    return (
      <Input
        placeholder="Search Pre School"
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
          getPreSchoolData(1, pageData?.pageSize);
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
                getPreSchoolData(1, pageData?.pageSize);
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
          getPreSchoolData(1, pageData?.pageSize);
        }}
      >
        Clear Filters
      </Button>
    );
  };

  const renderFilterView = () => {
    return (
      <>
        {checkFilterDifference() ? (
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
                  label="Zone"
                  value={getArrayValues(
                    dropdownData?.city?.filter((each) =>
                      filterData?.city?.includes(each?.value)
                    ),
                    "label"
                  )?.join(", ")}
                />
              </Col>
            ) : null}
            {filterData?.date_range?.length ? (
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
            ) : null}
            {filterData?.principal_remarks !== 0 ? (
              <Col>
                <RenderFilterTag
                  label="Principal Remarks"
                  value={filterData?.principal_remarks}
                />
              </Col>
            ) : null}
            {checkFilterDifference() && width > 768 ? (
              <Col className="pl-2" style={{ marginTop: 4 }}>
                {getClearFilters()}
              </Col>
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
      title: "Pre School Name",
      key: "pre_school_name",
      render: (record) => <span>{record?.pre_school_name || "--"}</span>,
      align: "center",
    },
    {
      title: "Location",
      key: "location",
      render: (record) => <span>{record?.location || "--"}</span>,
      align: "center",
    },
    {
      title: "Branch",
      key: "branch",
      render: (record) => <span>{record?.branch?.name || "--"}</span>,
      align: "center",
    },
    {
      title: "Owner/Principal Name",
      key: "branch",
      render: (record) => <span>{record?.principal_name || "--"}</span>,
      align: "center",
    },
    {
      title: "Owner/Principal Mobile No.",
      key: "branch",
      render: (record) => <span>{record?.principal_contact_no || "--"}</span>,
      align: "center",
    },
    {
      title: "Added By",
      key: "inserted_by",
      render: (record) => (
        <>
          <span>{record?.insertedBy?.name}</span>
          <br />
          <span>({record?.insertedBy?.erp})</span>
        </>
      ),
      align: "center",
    },
    {
      title: "Added On",
      key: "added_on",
      render: (record) => (
        <>
          <span>{record?.insertedOn}</span>
        </>
      ),
      align: "center",
    },
    {
      title: "BDM Remarks",
      key: "bdm_remarks",
      render: (record) => (
        <>
          <span>{record?.bdm_remarks || "--"}</span>
        </>
      ),
      align: "center",
    },
    {
      title: "Principal Remarks",
      key: "principal_remarks",
      render: (record) => (
        <>
          <span>{record?.principal_remarks || "--"}</span>
        </>
      ),
      align: "center",
    },
    {
      title: "File",
      key: "file",
      render: (record) => (
        <>
          <Button
            size="small"
            type="text"
            onClick={() => {
              setPreviewData({
                show: true,
                urls: [
                  "https://kinsta.com/wp-content/uploads/2017/05/how-to-optimize-images-for-web-and-performance-1024x512.jpg",
                  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                ],
              });
            }}
            icon={<GoFileDirectoryFill size={20} />}
          />
        </>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Button
            size="small"
            type="text"
            onClick={() => {
              setDrawerData({
                show: true,
                data: record,
                type: "Update Pre School",
              });
            }}
            icon={<MdEdit size={20} />}
          />
        </>
      ),
      align: "center",
    },
  ];

  const renderAddPreSchool = () => {
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
                  type: "Add Pre School",
                });
              }}
            >
              + Pre School
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
                  <CustomBreadCrumbs data={["Pre School Tieup"]} />
                </Col>
                <Col>
                  <Row className="d-flex flex-row" gutter={[8, 4]}>
                    {width < 768 ? renderAddPreSchool() : null}
                    <Col>
                      <Tooltip title="Refresh">
                        <Button
                          size="small"
                          type="text"
                          disabled={loading}
                          icon={<MdRefresh size={20} />}
                          onClick={() => {
                            getPreSchoolData(1, pageData.pageSize);
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
                      {width >= 768 ? renderAddPreSchool() : null}
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
              {width <= 768 && checkFilterDifference() ? (
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
              {preSchoolData ? (
                isList ? (
                  <Col xs={24} className={"mt-2"}>
                    <Table
                      dataSource={preSchoolData || []}
                      columns={columns}
                      pagination={preSchoolData?.length > 0 ? pageData : false}
                      onChange={handleTableChange}
                    />
                  </Col>
                ) : (
                  <>
                    {preSchoolData?.length === 0 ? (
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
                    {preSchoolData?.length > 0 ? (
                      <>
                        <Col xs={24} className={"mt-2"}>
                          <Row className={"d-flex"} gutter={[8, 8]}>
                            {preSchoolData?.map((each, index) => (
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
                                                {each?.pre_school_name || "NA"}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="th-12">
                                                {each?.branch?.name}
                                              </Typography>
                                            </Col>
                                          </Row>
                                        </Col>
                                        <Col xs={6}>
                                          <Row
                                            className="d-flex flex-row justify-content-end"
                                            gutter={[4, 4]}
                                          >
                                            <Col>
                                              <Button
                                                type="iconbutton"
                                                icon={
                                                  <GoFileDirectoryFill
                                                    size={20}
                                                  />
                                                }
                                                onClick={() => {
                                                  setPreviewData({
                                                    show: true,
                                                    urls: [
                                                      "https://kinsta.com/wp-content/uploads/2017/05/how-to-optimize-images-for-web-and-performance-1024x512.jpg",
                                                      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                                                    ],
                                                  });
                                                }}
                                              />
                                            </Col>
                                            <Col>
                                              <Button
                                                type="iconbutton"
                                                icon={<MdEdit size={20} />}
                                                onClick={() => {
                                                  setDrawerData({
                                                    show: true,
                                                    data: each,
                                                    type: "Update Pre School",
                                                  });
                                                }}
                                              />
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Divider />
                                    <Col xs={24}>
                                      <Descriptions column={1}>
                                        {getCardDataText(
                                          "Location",
                                          each?.location || "--"
                                        )}
                                        {getCardDataText(
                                          "Owner/Principal Name",
                                          each?.principal_name || "--"
                                        )}
                                        {getCardDataText(
                                          "Owner/Principal Mobile No.",
                                          each?.principal_contact_no || "--"
                                        )}
                                        {getCardDataText(
                                          "Inserted By",
                                          <>
                                            <span>
                                              {each?.insertedBy?.name}&nbsp;
                                            </span>
                                            <br />
                                            <span>
                                              ({each?.insertedBy?.erp})
                                            </span>
                                          </>
                                        )}
                                        {getCardDataText(
                                          "Inserted On",
                                          <>
                                            <span>
                                              {each?.insertedOn}&nbsp;
                                            </span>
                                          </>
                                        )}
                                        {getCardDataText(
                                          "BDM Remarks",
                                          <>
                                            <span>
                                              {each?.bdm_remarks || "--"}
                                              &nbsp;
                                            </span>
                                          </>
                                        )}
                                        {getCardDataText(
                                          "Principal Remarks",
                                          <>
                                            <span>
                                              {each?.principal_remarks || "--"}
                                              &nbsp;
                                            </span>
                                          </>
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
          getPreSchoolData(1, pageData?.pageSize);
        }}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
      />
      <AddEditPreSchoolTieup
        modalData={drawerData}
        handleAddEditPreSchoolTieup={() => {}}
        closeModal={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
        dropdownData={dropdownData}
      />
      <PreviewMedia
        modalData={previewData}
        closeModal={() => {
          setPreviewData({ show: false, urls: [] });
        }}
      />
    </CustomCard>
  );
};

export default PreSchoolTieup;
