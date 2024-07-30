import React, { useState } from "react";
import {
  CloseOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";
import {
  Layout,
  Button,
  Avatar,
  Popover,
  Typography,
  Divider,
  Menu,
  Row,
  Col,
  Input,
  Select,
  Dropdown,
  Spin,
  Empty,
  Tag,
} from "antd";
import { useAuth } from "../../../../../context/auth-context";
import useWindowDimensions from "../../../UtilComponents/useWindowDimensions";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import getCountryCode from "../../../../utils/getCountryCode";
import moment from "moment/moment";
import { IoMdEye } from "react-icons/io";
const { Header } = Layout;

const { Option } = Select;
const { Group: InputGroup } = Input;
const Topbar = ({ colorBgContainer, setCollapsed, collapsed }) => {
  const authValue = useAuth();
  const navigate = useNavigate();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const { width } = useWindowDimensions();
  const [searchData, setSearchData] = useState(null);
  const [search, setSearch] = useState("");
  const [searchSelect, setSearchSelect] = useState("+91");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menu = [
    {
      label: (
        <Button
          type="text"
          className="p-0 logout-buttton-style text-left"
          style={{ width: "100%" }}
          icon={<LogoutOutlined />}
          onClick={authValue?.logoutHandler}
        >
          Logout
        </Button>
      ),
      key: "1",
    },
  ];

  const content = (
    <div className="d-flex flex-column " style={{ width: 200 }}>
      <div className="d-flex align-items-center flex-column p-2 py-3">
        <Avatar
          shape="square"
          size={45}
          icon={
            <MdPerson
              style={{
                height: 35,
                width: 35,
              }}
            />
          }
        />
        <Typography className="mt-2 name-text">
          {authValue?.loginDetails?.user_details?.first_name}{" "}
          {authValue?.loginDetails?.user_details?.last_name}
        </Typography>
        <Typography className="user-level-text">
          {authValue?.loginDetails?.user_details?.user_level}
        </Typography>
        <Typography className="username-text">
          @{authValue?.loginDetails?.user_details?.erp}
        </Typography>
        {!["/profile", "/profile/"].includes(window.location.pathname) ? (
          <Button
            size="small"
            type="primary"
            className="mt-1"
            onClick={() => {
              setPopoverVisible(false);
              navigate("/profile");
            }}
          >
            View Profile
          </Button>
        ) : null}
      </div>
      <Divider />
      <div className="py-1">
        <Menu
          style={{ width: "100%" }}
          mode="inline"
          items={menu}
          className="profile-menu"
        />
      </div>
    </div>
  );

  const handleSearchLead = () => {
    setDropdownOpen(true);
    setTimeout(() => {
      setSearchData([
        {
          id: 14826363,
          enquiry_no: "ENQ84795141430341",
          lead_name: "vikas",
          next_follow_date: null,
          academic_year: "2024-25",
          lead_created_date: "2024-07-02",
          is_regen: false,
          in_dormant: false,
          is_enquiry: false,
          is_live: true,
          lead_status: {
            id: 28,
            status_name: "Call not made",
          },
          lead_status_l2: null,
          tagging: null,
          contact_source: {
            id: 20,
            source_name: "PRO Data - Field Data",
          },
          branch: {
            id: 196,
            branch_name: "ORCHIDS Hinjewadi",
          },
        },
        {
          id: 14826364,
          enquiry_no: "ENQ84795141430341",
          lead_name: "vikas",
          next_follow_date: null,
          academic_year: "2023-24",
          lead_created_date: "2024-07-02",
          is_regen: true,
          in_dormant: true,
          is_enquiry: false,
          is_live: true,
          lead_status: {
            id: 28,
            status_name: "Not Responding",
          },
          lead_status_l2: {
            id: 29,
            status_name: "Invalid Number",
          },
          tagging: null,
          contact_source: {
            id: 20,
            source_name: "PRO Data - Field Data",
          },
          branch: {
            id: 196,
            branch_name: "ORCHIDS Hinjewadi",
          },
        },
      ]);
    }, 1000);
  };

  const getOverLayData = () => {
    return (
      <Menu
        style={{
          maxHeight: 300,
          overflow: "auto",
          maxWidth: width < 576 ? 210 : 285,
        }}
      >
        <Spin tip="Loading" spinning={searchData === null}>
          <div style={{ minHeight: !searchData ? 80 : null }}>
            {searchData?.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : null}
            {searchData?.length > 0 ? (
              <Row className="d-flex flex-column px-1 py-1" gutter={[6, 6]}>
                {searchData?.map((each, index) => (
                  <>
                    <Col
                      xs={24}
                      className="global-search-div"
                      onClick={() => {
                        navigate("/lead-management/lead-details/1");
                      }}
                    >
                      <Row className="d-flex flex-column">
                        <Col xs={24}>
                          <Row
                            className="d-flex flex-column p-1"
                            gutter={[1, 1]}
                          >
                            <Col xs={24}>
                              <Row className="d-flex flex-row">
                                <Col xs={21}>
                                  <Row className="d-flex flex-column">
                                    <Col xs={24}>
                                      <Typography className="global-search-card-header-name">
                                        {each?.lead_name || "NA"}
                                      </Typography>
                                    </Col>
                                    <Col xs={24}>
                                      <Typography className="global-search-card-subheader-text">
                                        {"+917937363636"}
                                      </Typography>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col xs={3} style={{ textAlign: "right" }}>
                                  <Button
                                    type="text"
                                    icon={<IoMdEye size={20} />}
                                    onClick={() => {
                                      navigate(
                                        "/lead-management/lead-details/1"
                                      );
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>

                            <Divider />
                            <Col xs={24}>
                              <Typography className="global-search-card-data-text">
                                <span>Source:</span>{" "}
                                {each?.contact_source?.source_name || "--"}
                              </Typography>
                            </Col>
                            <Col xs={24}>
                              <Typography className="global-search-card-data-text">
                                <span>Branch:</span>{" "}
                                {each?.branch?.branch_name || "--"}
                              </Typography>
                            </Col>
                            <Col xs={24}>
                              <Typography className="global-search-card-data-text">
                                <span>Academic Year:</span>{" "}
                                {each?.academic_year || "--"}
                              </Typography>
                            </Col>
                            <Col xs={24}>
                              <Typography className="global-search-card-data-text">
                                <span>Alt. Contact No:</span> {"+917937363636"}
                              </Typography>
                            </Col>
                            <Col xs={24}>
                              <Typography className="global-search-card-data-text">
                                <span>Lead Status:</span>{" "}
                                {each.lead_status?.status_name}
                                {each.lead_status_l2
                                  ? ` -> ${each.lead_status_l2?.status_name}`
                                  : ""}
                              </Typography>
                            </Col>
                            <Col xs={24}>
                              <Typography className="global-search-card-data-text">
                                <span>Next Followup Date:</span>{" "}
                                {each?.next_follow_date
                                  ? moment(each?.next_follow_date).format(
                                      "DD/MM/YYYY hh:mm a"
                                    )
                                  : "--"}
                              </Typography>
                            </Col>
                            {each?.is_enquiry ||
                            each?.is_regen ||
                            each?.in_dormant ? (
                              <>
                                <Divider />
                                <Col xs={24} className="mt-1">
                                  {each?.is_enquiry ? (
                                    <Tag color="green">ReEnquiry</Tag>
                                  ) : null}
                                  {each?.is_regen ? (
                                    <Tag color="magenta">Regen</Tag>
                                  ) : null}
                                  {each?.in_dormant ? (
                                    <Tag color="gold">Dormant</Tag>
                                  ) : null}
                                </Col>
                              </>
                            ) : null}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    {index !== searchData?.length - 1 ? <Divider /> : null}
                  </>
                ))}
              </Row>
            ) : null}
          </div>
        </Spin>
      </Menu>
    );
  };

  const handleSearchDropdownOpen = () => {
    const maxLength =
      [{ country_code: "ENQ", max_length: 14 }, ...getCountryCode()].find(
        (each) => each.country_code === searchSelect
      )?.max_length || Infinity;
    if (searchSelect === "ENQ") {
      if (search?.length === maxLength - 1 || search?.length === maxLength) {
        return true;
      }
      return false;
    } else {
      if (search?.length === maxLength) {
        return true;
      }
      return false;
    }
  };

  return (
    <React.Fragment>
      <Header
        className={`d-flex justify-content-between align-items-center ${
          width >= 992
            ? collapsed
              ? "header-wrapper-collapsed"
              : "header-wrapper"
            : ""
        } header-style`}
        style={{
          background: colorBgContainer,
          ...(width >= 992
            ? {
                paddingLeft: collapsed ? 65 : 220,
              }
            : { paddingLeft: 0 }),
        }}
      >
        <Button
          type="text"
          style={{
            fontSize: 16,
            width: 54,
            height: 54,
            border: "none",
            outline: "none",
          }}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Row className="d-flex flex-row justify-content-end" gutter={[8, 8]}>
          <Col>
            <Dropdown
              overlay={getOverLayData()}
              onOpenChange={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              open={handleSearchDropdownOpen() && dropdownOpen}
            >
              <InputGroup
                compact
                style={{
                  height: 30,
                  maxWidth: width < 576 ? 210 : 285,
                  marginTop: 18,
                }}
                onFocus={() => {
                  setDropdownOpen(true);
                }}
              >
                <Select
                  style={{ width: width < 576 ? "33%" : "25%" }}
                  className="country-code-lead-select-global"
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                  value={searchSelect}
                  onChange={(value) => {
                    setSearchSelect(value);
                    setSearch("");
                    setSearchData(null);
                  }}
                  options={[
                    { country_code: "ENQ", max_length: 14 },
                    ...getCountryCode(),
                  ].map((each) => ({
                    label: each.country_code,
                    value: each.country_code,
                  }))}
                />
                <Input
                  style={{
                    width: width < 576 ? "67%" : "75%",
                    height: "30px",
                  }}
                  className="search-input-lead-global"
                  placeholder="Search Lead Contact or Enquiry"
                  value={search}
                  onChange={(e) => {
                    const maxLength =
                      [
                        { country_code: "ENQ", max_length: 14 },
                        ...getCountryCode(),
                      ].find((each) => each.country_code === searchSelect)
                        ?.max_length || Infinity;
                    let filterValue =
                      e.target.value.match(/\d+/g)?.join("") || "";
                    if (filterValue.length <= maxLength) {
                      setSearch(filterValue);
                      setSearchData(null);
                      if (searchSelect === "ENQ") {
                        if (
                          filterValue.length === maxLength - 1 ||
                          filterValue.length === maxLength
                        ) {
                          handleSearchLead();
                        }
                      } else {
                        if (filterValue.length === maxLength) {
                          handleSearchLead();
                        }
                      }
                    }
                  }}
                  suffix={
                    searchData ? (
                      <CloseOutlined
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.preventDefault();
                          setSearchData(null);
                          setSearch("");
                        }}
                      />
                    ) : (
                      <SearchOutlined
                        style={{
                          cursor: "pointer",
                          visibility:
                            ([
                              { country_code: "ENQ", max_length: 14 },
                              ...getCountryCode(),
                            ].find((each) => each.country_code === searchSelect)
                              ?.max_length || Infinity) === search?.length
                              ? "visible"
                              : "hidden",
                        }}
                        onClick={() => {}}
                      />
                    )
                  }
                />
              </InputGroup>
            </Dropdown>
          </Col>
          <Col>
            <Popover
              content={content}
              trigger="click"
              open={popoverVisible}
              onOpenChange={() => {
                setPopoverVisible(!popoverVisible);
              }}
              overlayClassName="avatar-popover"
            >
              <Avatar
                size={30}
                shape="square"
                className="avatar-style"
                onClick={() => {
                  setPopoverVisible(!popoverVisible);
                }}
                icon={<UserOutlined size={50} />}
              />
            </Popover>
          </Col>
        </Row>
      </Header>
    </React.Fragment>
  );
};

export default Topbar;
