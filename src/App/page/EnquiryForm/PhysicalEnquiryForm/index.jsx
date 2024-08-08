import {
  CloudUploadOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Empty,
  Pagination,
  Radio,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BiIdCard } from "react-icons/bi";
import { IoEye, IoPencil, IoPlay } from "react-icons/io5";
import { MdFilterAlt, MdListAlt } from "react-icons/md";
import getCardDataText from "../../../component/UtilComponents/CardDataText";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import RenderFilterTag from "../../../component/UtilComponents/RenderFilterTag";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import getChangedCountValues from "../../../utils/getChangeCountObject";
import DrawerFilter from "./drawerFilter";
import EnquiryFormModal from "./enquiryFormModal";
const defaultFilters = {
  branch: [0],
  zone: [0],
  date_range: [dayjs(), dayjs()],
};
const dropdownData = {
  zone: [{ label: "All", value: 0 }],
  branch: [
    { label: "All", value: 0 },
    { label: "Orchids BTM Layout", value: "btm-layout" },
    { label: "Orchids Banerghata", value: "banerghata" },
    { label: "Orchids Newtown", value: "newtown" },
  ],
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
  leadType: [{ name: "All", id: 0 }],
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
};
const fakeData = [
  {
    id: 83,
    lead_id: 4083556,
    enquiry_no: "ENQ8048798265530",
    state: 0,
    files: [],
    form_medium: 0,
    created_at: "2023-10-17T16:12:23.031153",
    updated_at: "2023-10-17T16:12:23.040526",
    submitted_at: null,
  },
  {
    id: 82,
    lead_id: 4083555,
    enquiry_no: "ENQ39493550266020",
    state: 0,
    files: [],
    form_medium: 0,
    created_at: "2023-10-17T16:09:53.062198",
    updated_at: "2023-10-17T16:09:53.074176",
    submitted_at: null,
  },
  {
    id: 80,
    lead_id: 4083553,
    enquiry_no: "ENQ82978304454835",
    state: 0,
    files: [],
    form_medium: 0,
    created_at: "2023-10-17T16:07:29.076565",
    updated_at: "2023-10-17T16:07:29.086196",
    submitted_at: null,
  },
  {
    id: 79,
    lead_id: 4083552,
    enquiry_no: "ENQ64897622733065",
    state: 0,
    files: [],
    form_medium: 0,
    created_at: "2023-10-17T16:01:12.872335",
    updated_at: "2023-10-17T16:01:12.883878",
    submitted_at: null,
  },
  {
    id: 77,
    lead_id: 4083550,
    enquiry_no: "ENQ80350158230846",
    state: 0,
    files: [],
    form_medium: 0,
    created_at: "2023-10-17T15:55:30.218334",
    updated_at: "2023-10-17T15:55:30.227643",
    submitted_at: null,
  },
  {
    id: 47,
    lead_id: 4083525,
    enquiry_no: "ENQ9203925176954",
    state: 0,
    files: [],
    form_medium: 0,
    created_at: "2023-10-16T16:18:40.274646",
    updated_at: "2023-10-16T16:18:40.430333",
    submitted_at: null,
  },
  {
    id: 30,
    lead_id: 4083460,
    enquiry_no: "ENQ6101707757099",
    state: 0,
    files: [
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2024-25/Orchids/ORCHIDS_Ambegaon/aUTUN_._image_%2853%29.png",
    ],
    form_medium: 0,
    created_at: "2023-10-13T15:20:34.946958",
    updated_at: "2023-10-13T15:33:12.987816",
    submitted_at: null,
  },
  {
    id: 24,
    lead_id: 4083437,
    enquiry_no: "ENQ49787149240151",
    state: 1,
    files: [
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/3wyva_._Enquiry_Form_page-0001.jpg",
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/LYcdr_._Enquiry_Form_page-0002.jpg",
    ],
    form_medium: 0,
    created_at: "2023-10-12T10:27:28.536592",
    updated_at: "2023-10-12T10:28:50.674913",
    submitted_at: null,
  },
  {
    id: 23,
    lead_id: 4083434,
    enquiry_no: "ENQ9610466219831",
    state: 1,
    files: [
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/KE9vb_._Screenshot_from_2023-06-30_09-35-35.png",
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/L0KHM_._Screenshot_from_2023-09-28_15-11-08.png",
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/L0RuO_._Screenshot_from_2023-09-27_13-31-51.png",
    ],
    form_medium: 0,
    created_at: "2023-10-11T18:20:50.078351",
    updated_at: "2023-10-11T18:47:40.622385",
    submitted_at: null,
  },
  {
    id: 22,
    lead_id: 4083419,
    enquiry_no: "ENQ77353286721144",
    state: 0,
    files: [
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/5Pesq_._Enquiry_Form_page-0001.jpg",
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/u1zp7_._Enquiry_Form_page-0002.jpg",
    ],
    form_medium: 0,
    created_at: "2023-10-10T18:04:16.908293",
    updated_at: "2023-10-10T18:04:17.374043",
    submitted_at: null,
  },
  {
    id: 21,
    lead_id: 4083417,
    enquiry_no: "ENQ1817972210158",
    state: 1,
    files: [
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/GEG9Q_._Enquiry_Form_page-0001.jpg",
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/V4fw9_._Enquiry_Form_page-0002.jpg",
    ],
    form_medium: 0,
    created_at: "2023-10-10T17:15:22.339294",
    updated_at: "2023-10-10T17:36:30.373231",
    submitted_at: null,
  },
  {
    id: 20,
    lead_id: 4083392,
    enquiry_no: "81718_ENQ",
    state: 0,
    files: [
      "https://storage.googleapis.com/letseduvate-marketing-stage/CounsellorEnquiryForms/2023-24/Orchids/ORCHIDS_Bannerghata/Ro6sh_._Screenshot_from_2023-09-28_15-11-08.png",
    ],
    form_medium: 0,
    created_at: "2023-10-09T17:43:56.401365",
    updated_at: "2023-10-10T17:12:08.146073",
    submitted_at: null,
  },
];
const PhysicalEnquiryForm = () => {
  const [loading, setLoading] = useState(false);
  const [drawerData, setDrawerData] = useState({ show: false, data: null });
  const [showFilterView, setShowFilterView] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [enquiryModalData, setEnquiryModalData] = useState({
    open: false,
    data: null,
  });
  const [filterData, setFilterData] = useState({
    ...defaultFilters,
  });
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [isList, setIsList] = useState(true);
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width <= 991) {
      setShowFilterView(false);
      setIsList(false);
    } else {
      setShowFilterView(true);
      setIsList(true);
    }
  }, [width]);
  const getDataList = () => {
    setLoading(true);
    setTimeout(() => {
      setDataList(fakeData);
    }, 500);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "id",
      key: "id",
      render: (x, y, z) => z + 1,
    },
    {
      title: "Enquiry No.",
      dataIndex: "enquiry_no",
      key: "enquiry_no",
    },
    {
      title: "System Entry",
      dataIndex: "state",
      key: "state",
      render: (state) => (state === 1 ? "Yes" : "No"),
    },
    {
      title: "Upload Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tag>
            <EyeOutlined />
          </Tag>
          {record.state === 0 && (
            <Tag>
              <EditOutlined
                onClick={() => {
                  setEnquiryModalData({
                    open: true,
                    details: record,
                  });
                }}
              />
            </Tag>
          )}
        </Space>
      ),
    },
  ];
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
  const renderFilterView = () => {
    return (
      <Row className="d-flex flex-row align-items-center" gutter={[4, 4]}>
        <Col>
          <Typography style={{ marginTop: 4 }} className="th-12 th-fw-500">
            Filter:
          </Typography>
        </Col>
        {!filterData?.branch?.includes(0) && (
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
        )}

        {!filterData?.zone?.includes(0) ? (
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
  const getClearFilters = () => {
    return (
      <Button
        size="small"
        type="link"
        style={{ whiteSpace: "normal" }}
        onClick={() => {
          setFilterData({ ...defaultFilters });
          getDataList();
        }}
      >
        Clear Filters
      </Button>
    );
  };
  const onCloseEnquiryModal = () => {
    setEnquiryModalData({
      open: false,
      details: null,
    });
  };
  return (
    <>
      <CustomCard>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Row className="d-flex flex-column" gutter={[2, 2]}>
              <Col xs={24}>
                <Row className="d-flex flex-row justify-content-between">
                  <Col>
                    <CustomBreadCrumbs data={["Physical Enquiry Form"]} />
                  </Col>
                  <Col>
                    <Row
                      className="d-flex flex-row align-items-center"
                      gutter={[8, 4]}
                    >
                      <Col>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            setEnquiryModalData({
                              open: true,
                              details: null,
                            });
                          }}
                          icon={<CloudUploadOutlined size={18} />}
                        >
                          Enquiry Form
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={24}>
                <Divider className="mt-2" />
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Spin spinning={loading} tip="Loading">
              <Row
                className="d-flex flex-column flex-nowrap"
                style={{ minHeight: "60vh" }}
              >
                <Col xs={24} sm={24} md={24} lg={24}>
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
                {width <= 768 ? (
                  <Col xs={24} className={width < 576 ? "mt-2" : "mt-0"}>
                    <Row
                      className="d-flex flex-row justify-content-end align-items-center"
                      gutter={[4, 4]}
                    >
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
                {dataList?.length > 0 ? (
                  isList ? (
                    <Col xs={24} className={"mt-2"}>
                      <Table
                        columns={columns}
                        dataSource={dataList}
                        rowKey="id"
                        pagination={{
                          ...pageData,
                        }}
                      />
                    </Col>
                  ) : (
                    <>
                      <Col xs={24} className={"mt-2"}>
                        <Row className={"d-flex"} gutter={[8, 8]}>
                          {dataList?.map((each, index) => (
                            <Col xs={24} sm={12} lg={8} key={each?.id}>
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
                                              {each?.enquiry_no || "NA"}
                                            </Typography>
                                          </Col>
                                          <Col xs={24}>
                                            <Typography className="th-12">
                                              {each.lead_id}
                                            </Typography>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col xs={6}>
                                        <Row className="d-flex flex-row justify-content-end">
                                          <Space>
                                            <Tooltip title="View">
                                              <Button
                                                type="iconbutton"
                                                icon={<IoEye size={25} />}
                                              />
                                            </Tooltip>
                                            {each?.state == 0 && (
                                              <Tooltip title="Edit">
                                                <Button
                                                  onClick={() => {
                                                    setEnquiryModalData({
                                                      open: true,
                                                      details: each,
                                                    });
                                                  }}
                                                  type="iconbutton"
                                                  icon={<IoPencil size={25} />}
                                                />
                                              </Tooltip>
                                            )}
                                          </Space>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Divider />
                                  <Col xs={24}>
                                    <Descriptions column={1}>
                                      {getCardDataText(
                                        "System Entry",
                                        each?.state == 0 ? "NO" : "YES"
                                      )}
                                      {getCardDataText(
                                        "Upload Date",
                                        dayjs(each?.created_at).format(
                                          "DD MMM YYYY hh:mm a"
                                        )
                                      )}
                                      {getCardDataText(
                                        "Updated At",
                                        dayjs(each?.updated_at).format(
                                          "DD MMM YYYY hh:mm a"
                                        )
                                      )}
                                    </Descriptions>
                                  </Col>
                                  <Divider />
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
                          // onChange={handleCardChange}
                          total={pageData?.total}
                        />
                      </Col>
                    </>
                  )
                ) : (
                  <Col xs={24} className={"mt-2"}>
                    <CustomCard
                      style={{ minHeight: 200 }}
                      className={
                        "d-flex justify-content-center align-items-center h-100"
                      }
                    >
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </CustomCard>
                  </Col>
                )}
              </Row>
            </Spin>
          </Col>
        </Row>
        <DrawerFilter
          drawerData={drawerData}
          onSubmit={(values) => {
            setDrawerData({ show: false, data: null });
            setFilterData({ ...filterData, ...values });
            getDataList();
          }}
          dropdownData={dropdownData}
          closeDrawer={() => {
            setDrawerData({ show: false, data: null });
          }}
        />
        <EnquiryFormModal
          modalData={enquiryModalData}
          onClose={onCloseEnquiryModal}
        />
      </CustomCard>
    </>
  );
};

export default PhysicalEnquiryForm;
