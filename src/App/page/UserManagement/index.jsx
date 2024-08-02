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
  Popconfirm,
  Switch,
  Descriptions,
} from "antd";
import "./index.scss";
import { MdEdit, MdFilterAlt, MdListAlt, MdRefresh } from "react-icons/md";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { IoMdEye } from "react-icons/io";
import useWindowDimensions from "../../component/UtilComponents/useWindowDimensions";
import DrawerFilter from "./drawerFilter";
import dayjs from "dayjs";
import getArrayValues from "../../utils/getArrayValues";
import RenderFilterTag from "../../component/UtilComponents/RenderFilterTag";
import { BiIdCard, BiUser, BiUserCheck, BiUserX } from "react-icons/bi";
import CustomCard from "../../component/UtilComponents/CustomCard";
import { useLocation, useNavigate } from "react-router-dom";
import getChangedCountValues from "../../utils/getChangeCountObject";
import getRoutePathDetails from "../../utils/getRoutePathDetails";
import getCardDataText from "../../component/UtilComponents/CardDataText";
import UpdateUser from "./updateUser";
import getColour from "../../utils/getColour";

const UserManagement = () => {
  const defaultFilters = {
    user_level: [0],
    zone: [0],
    branch: [0],
  };
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    ...defaultFilters,
  });
  const [selectedStatus, setSelectedStatus] = useState(true);
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
  const [userData, setUserData] = useState(null);
  const [isList, setIsList] = useState(true);
  const searchIconRef = useRef(null);
  const { width } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState("");
  const dropdownData = {
    userLevel: [
      { label: "All", value: 0 },
      { label: "Admin", value: "Admin" },
      { label: "PRM", value: "PRM" },
    ],
    zone: [
      { label: "All", value: 0 },
      { label: "Zone 1", value: "Zone 1" },
      { label: "Zone 2", value: "Zone 2" },
    ],
    branch: [
      { label: "All", value: 0 },
      { label: "Branch 1", value: "Branch 1" },
      { label: "Branch 2", value: "Branch 2" },
    ],
    status: [
      { label: "All", value: 0 },
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
  };

  const userCountData = [
    {
      filterValue: 0,
      label: "Total Users",
      value: 1000,
      color: getColour("grayMedium"),
      icon: <BiUser size={24} style={{ color: getColour("grayMedium") }} />,
    },
    {
      filterValue: true,
      label: "Active Users",
      value: 800,
      color: getColour("active"),
      icon: <BiUserCheck size={26} style={{ color: getColour("active") }} />,
    },
    {
      filterValue: false,
      label: "Inactive Users",
      value: 200,
      color: getColour("inactive"),
      icon: <BiUserX size={26} style={{ color: getColour("inactive") }} />,
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
      },
      {
        ...filterData,
      }
    );
  };

  const [searchFetched, setSearchFetched] = useState(false);

  const getUserData = (page, page_size, params = {}) => {
    // setLoading(true);
    setUserData([
      {
        id: 1,
        first_name: "Anik",
        last_name: "Chowdhury",
        email: "anik@gmail.com",
        contact: "3646462736",
        erp: "2838373636_OLV",
        user_level: {
          id: 2,
          name: "Admin",
        },
        zone: [
          { id: 1, name: "Zone1" },
          { id: 2, name: "Zone2" },
        ],
        branch: [
          { id: 1, name: "Branch1" },
          { id: 2, name: "Branch2" },
        ],
        field_type: [
          { id: 1, name: "Field Marketing" },
          { id: 2, name: "Email Marketing" },
        ],
        is_active: true,
      },
      {
        id: 2,
        first_name: "Utpal",
        last_name: "Maji",
        email: "maji@gmail.com",
        contact: "3646462436",
        erp: "2838373636_OLV",
        user_level: {
          id: 1,
          name: "Super Admin",
        },
        zone: [
          { id: 1, name: "Zone1" },
          { id: 2, name: "Zone2" },
        ],
        branch: [
          { id: 1, name: "Branch1" },
          { id: 2, name: "Branch2" },
        ],
        field_type: [
          { id: 1, name: "Field Marketing" },
          { id: 2, name: "Email Marketing" },
        ],
        is_active: false,
      },
    ]);
    setPageData({
      current: page,
      pageSize: page_size,
      total: 2,
    });
  };

  useEffect(() => {
    getUserData(pageData?.current, pageData?.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    window.scrollTo(0, 0);
    getUserData(pagination?.current, pagination?.pageSize);
  };

  const handleCardChange = (page) => {
    window.scrollTo(0, 0);
    getUserData(page, pageData?.pageSize);
  };

  const getSearchInput = () => {
    return (
      <Input
        placeholder="Search User"
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
          getUserData(1, pageData?.pageSize);
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
                getUserData(1, pageData?.pageSize);
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
          getUserData(1, pageData?.pageSize);
        }}
      >
        Clear Filters
      </Button>
    );
  };

  const handleStatusChange = (data) => {};

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
            {!filterData?.user_level?.includes(0) ? (
              <Col>
                <RenderFilterTag
                  label="User Level"
                  value={getArrayValues(
                    dropdownData?.userLevel?.filter(
                      (each) => filterData?.user_level === each?.value
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
      title: "Name & ERP",
      key: "name",
      render: (record) => (
        <Row className={"d-flex flex-column flex-nowrap"}>
          <Col>
            <Typography className="th-12">
              {record.first_name} {record.last_name}
            </Typography>
          </Col>
          <Col>
            <Typography style={{ whiteSpace: "nowrap" }} className="th-10">
              ({record?.erp})
            </Typography>
          </Col>
        </Row>
      ),
      align: "center",
    },
    {
      title: "User Contact Details",
      key: "user",
      render: (record) => (
        <Row className={"d-flex flex-column flex-nowrap"}>
          <Col>
            <Typography className="th-12">{record?.contact}</Typography>
          </Col>
          <Col>
            <Typography style={{ whiteSpace: "nowrap" }} className="th-10">
              {record?.email}
            </Typography>
          </Col>
        </Row>
      ),
      align: "center",
    },
    {
      title: "UserLevel",
      key: "userlevel",
      render: (record) => <span>{record.user_level?.name}</span>,
      align: "center",
    },
    {
      title: "Branch",
      key: "branch",
      render: (record) => (
        <span>{getArrayValues(record?.branch, "name")?.join(", ")}</span>
      ),
      align: "center",
    },
    {
      title: "Marketing Type",
      key: "field_type",
      render: (record) => (
        <span>{getArrayValues(record?.field_type, "name")?.join(", ")}</span>
      ),
      align: "center",
    },
    {
      title: "Status",
      key: "is_active",
      render: (record) => (
        <>
          {getRoutePathDetails().modify ? (
            <Popconfirm
              title={`Are you sure to update "${record?.erp}" user as ${
                record?.is_active ? "inactive" : "active"
              }?`}
              onConfirm={() => handleStatusChange(record)}
              okText="Yes"
              cancelText="No"
            >
              <Switch
                checked={record?.is_active}
                style={{
                  backgroundColor: record.is_active
                    ? getColour("active")
                    : getColour("inactive"),
                }}
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </Popconfirm>
          ) : (
            <Tag
              color={
                record?.is_active ? getColour("active") : getColour("inactive")
              }
            >
              {record?.is_active ? "Active" : "Inactive"}
            </Tag>
          )}
        </>
      ),
      align: "center",
      width: 120,
    },
    ...(getRoutePathDetails().modify
      ? [
          {
            title: "Action",
            key: "action",
            render: (record) => (
              <Row
                className={
                  "d-flex flex-row justify-content-center align-items-center flex-nowrap"
                }
                gutter={[4, 4]}
              >
                <Col>
                  <Tooltip title="Update User">
                    <Button
                      type="text"
                      size="small"
                      icon={<MdEdit size={18} />}
                      onClick={() => {
                        setDrawerData({
                          show: true,
                          type: "Update User",
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
                  <CustomBreadCrumbs data={["User Manangement"]} />
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
                            getUserData(1, pageData.pageSize);
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
                <Row className="d-flex flex-row" gutter={[8, 8]}>
                  {userCountData?.map((each) => (
                    <Col xs={8}>
                      <CustomCard
                        className={
                          selectedStatus === each?.filterValue
                            ? "user-count-card-selected"
                            : "user-count-card"
                        }
                        onClick={() => {
                          setSelectedStatus(each.filterValue);
                        }}
                      >
                        <Row
                          className={`d-flex  ${
                            width < 576
                              ? "flex-column justify-content-center"
                              : "flex-row justify-content-between"
                          } align-item-center`}
                          gutter={[2, 0]}
                        >
                          <Col>
                            <Row
                              className={`d-flex  ${
                                width < 576
                                  ? "flex-column justify-content-center"
                                  : "flex-row justify-content-between"
                              } align-item-center`}
                              gutter={[4, 0]}
                            >
                              <Col className="text-center">{each?.icon}</Col>
                              <Col>
                                <Typography
                                  className={`${
                                    width < 576 ? "text-center" : "text-left"
                                  }  mt-1 ${width < 576 ? "th-11" : "th-12"}`}
                                >
                                  {each?.label}
                                </Typography>
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Typography
                              className={`${
                                width < 576 ? "text-center" : "text-right"
                              } user-count-value`}
                              style={{ color: each?.color }}
                            >
                              {each.value}
                            </Typography>
                          </Col>
                        </Row>
                      </CustomCard>
                    </Col>
                  ))}
                </Row>
              </Col>
              {userData ? (
                isList ? (
                  <Col xs={24} className={"mt-2"}>
                    <Table
                      dataSource={userData || []}
                      columns={columns}
                      bordered={true}
                      pagination={userData?.length > 0 ? pageData : false}
                      onChange={handleTableChange}
                    />
                  </Col>
                ) : (
                  <>
                    {userData?.length === 0 ? (
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
                    {userData?.length > 0 ? (
                      <>
                        <Col xs={24} className={"mt-2"}>
                          <Row className={"d-flex"} gutter={[8, 8]}>
                            {userData?.map((each, index) => (
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
                                                {`${each?.first_name} ${each?.last_name}` ||
                                                  "NA"}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="th-12">
                                                {each?.erp}
                                              </Typography>
                                            </Col>
                                            <Col xs={24}>
                                              <Typography className="th-12">
                                                {each?.user_level?.name}
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
                                                <Tooltip title="Update User">
                                                  <Button
                                                    type="iconbutton"
                                                    icon={<MdEdit size={20} />}
                                                    onClick={() => {
                                                      setDrawerData({
                                                        show: true,
                                                        type: "Update User",
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
                                      <Row className={"d-flex"} gutter={[4, 4]}>
                                        <Descriptions column={1}>
                                          {getCardDataText(
                                            "Contact",
                                            each?.contact || "--"
                                          )}
                                          {getCardDataText(
                                            "Email",
                                            each?.email || "--"
                                          )}
                                          {getCardDataText(
                                            "Zone",
                                            getArrayValues(
                                              each?.zone,
                                              "name"
                                            )?.join(", ")
                                          )}
                                          {getCardDataText(
                                            "Branch",
                                            getArrayValues(
                                              each?.branch,
                                              "name"
                                            )?.join(", ")
                                          )}
                                          {getCardDataText(
                                            "Marketing Type",
                                            getArrayValues(
                                              each?.field_type,
                                              "name"
                                            )?.join(", ")
                                          )}
                                        </Descriptions>
                                        <Col xs={24}>
                                          <Row
                                            className="d-flex flex-row align-items-center"
                                            gutter={[4, 4]}
                                          >
                                            <Col>
                                              <Typography
                                                style={{
                                                  color:
                                                    getColour("grayMedium"),
                                                }}
                                                className="th-12 th-fw-500"
                                              >
                                                Status :
                                              </Typography>
                                            </Col>
                                            <Col>
                                              {getRoutePathDetails().modify ? (
                                                <Popconfirm
                                                  title={`Are you sure to update "${
                                                    each?.erp
                                                  }" user as ${
                                                    each?.is_active
                                                      ? "inactive"
                                                      : "active"
                                                  }?`}
                                                  onConfirm={() =>
                                                    handleStatusChange(each)
                                                  }
                                                  okText="Yes"
                                                  cancelText="No"
                                                >
                                                  <Switch
                                                    checked={each?.is_active}
                                                    style={{
                                                      backgroundColor:
                                                        each.is_active
                                                          ? getColour("active")
                                                          : getColour(
                                                              "inactive"
                                                            ),
                                                    }}
                                                    checkedChildren="Active"
                                                    unCheckedChildren="Inactive"
                                                  />
                                                </Popconfirm>
                                              ) : (
                                                <Tag
                                                  color={
                                                    each?.is_active
                                                      ? getColour("active")
                                                      : getColour("inactive")
                                                  }
                                                >
                                                  {each?.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                                </Tag>
                                              )}
                                            </Col>
                                          </Row>
                                        </Col>
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
          getUserData(1, pageData?.pageSize);
        }}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
      />
      <UpdateUser
        modalData={drawerData}
        handleUpdateUser={() => {}}
        closeModal={() => {
          setDrawerData({ show: false, type: null, data: null });
        }}
        dropdownData={dropdownData}
      />
    </CustomCard>
  );
};

export default UserManagement;
