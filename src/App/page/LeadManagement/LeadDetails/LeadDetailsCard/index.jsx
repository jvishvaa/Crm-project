import React, { useEffect, useState } from "react";
import CustomCard from "../../../../component/UtilComponents/CustomCard";
import {
  Button,
  Col,
  Divider,
  Form,
  Modal,
  Popconfirm,
  Row,
  Select,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import "../index.scss";
import { MdCall } from "react-icons/md";
import useWindowDimensions from "../../../../component/UtilComponents/useWindowDimensions";
import Map from "./gMap";

const LeadDetailsCard = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({
    show: false,
    type: null,
    data: null,
  });
  const [isShowMore, setIsShowMore] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (modalData?.show) {
      if (modalData?.type === "Branch") {
        form.setFieldsValue({ branch: modalData?.data?.branch });
      }
      if (modalData?.type === "Source") {
        form.setFieldsValue({ source: modalData?.data?.source });
      }
    }
  }, [modalData]);

  useEffect(() => {
    if (width < 768) {
      setIsShowMore(false);
    } else {
      setIsShowMore(true);
    }
  }, [width]);

  const onFinish = (values) => {
    setModalData({ show: false, type: null, data: null });
    form.resetFields();
  };

  return (
    <>
      <CustomCard>
        <Row className="d-flex flex-column flex-nowrap" gutter={[4, 4]}>
          <Col xs={24}>
            <Row className="d-flex flex-row ">
              <Col xs={16} lg={14} xl={16}>
                <Row className="d-flex flex-column">
                  <Col xs={24}>
                    <Typography className="lead-details-card-name">
                      Anik Chowdhury
                    </Typography>
                  </Col>
                  <Col xs={24}>
                    <Typography className="lead-details-card-contact">
                      +91 7484664646
                    </Typography>
                  </Col>
                  <Col xs={24}>
                    <Typography className="lead-details-card-contact">
                      ENQ50517343223458
                    </Typography>
                  </Col>
                </Row>
              </Col>
              <Col xs={8} lg={10} xl={8}>
                <Row
                  className="d-flex justify-content-end align-items-center"
                  gutter={[8, 8]}
                >
                  <Col>
                    <Popconfirm title="Are you sure to check in?">
                      <Button size="small" type="primary">
                        Check In
                      </Button>
                    </Popconfirm>
                  </Col>
                  <Col>
                    <Tooltip title="Call">
                      <Button
                        type="iconbutton"
                        size="small"
                        icon={<MdCall size={22} />}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Row className={"d-flex flex-row"} gutter={[4, 4]}>
              <Tag color="gold">Dormant</Tag>
              <Tag color="magenta">Regen</Tag>
              <Tag color="red">Hot</Tag>
              <Tag color="green">ReEnquiry</Tag>
            </Row>
          </Col>
          <Divider />
          <Col xs={24}>
            <Row className={"d-flex"} gutter={[16, 8]}>
              <Col xs={12}>
                <Typography className="lead-details-card-data-text">
                  <span>Alt. Contact No. :</span>
                  <br />
                  {"+91 4663664646"}
                </Typography>
              </Col>
              <Col xs={12}>
                <Typography className="lead-details-card-data-text">
                  <span>Academic Year :</span>
                  <br />
                  {"2023-24"}
                </Typography>
              </Col>
              <Col xs={24}>
                <Typography className="lead-details-card-data-text">
                  <span>Status :</span>
                  <br />
                  {"Home Counselling Cancel -> Home Counselling Scheduled"}
                </Typography>
              </Col>
              <Col xs={24}>
                <Row
                  className="d-flex flex-row align-items-center"
                  gutter={[2, 2]}
                >
                  <Col xs={17} md={16} xl={17}>
                    <Typography className="lead-details-card-data-text">
                      <span>Branch :</span>
                      <br />
                      {"Orchids BTM Layout"}
                    </Typography>
                  </Col>
                  <Col xs={7} md={8} xl={7}>
                    <Row className="d-flex justify-content-end">
                      <Button
                        type="link"
                        color="primary"
                        className="lead-details-card-update-button"
                        onClick={() => {
                          setModalData({
                            show: true,
                            type: "Branch",
                            data: { branch: 1 },
                          });
                        }}
                      >
                        Update Branch
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={24}>
                <Typography className="lead-details-card-data-text">
                  <span>School Type :</span> <br />
                  {"Day"}
                </Typography>
              </Col>
              <Col xs={24}>
                <Row
                  className="d-flex flex-row align-items-center"
                  gutter={[2, 2]}
                >
                  <Col xs={17} md={16} xl={17}>
                    <Typography className="lead-details-card-data-text">
                      <span>Source :</span> <br />
                      {"DM - Direct"}
                    </Typography>
                  </Col>
                  <Col xs={7} md={8} xl={7}>
                    <Row className="d-flex justify-content-end">
                      <Button
                        type="link"
                        color="primary"
                        className="lead-details-card-update-button"
                        onClick={() => {
                          setModalData({
                            show: true,
                            type: "Source",
                            data: { source: 1 },
                          });
                        }}
                      >
                        Update Source
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Typography className="lead-details-card-data-text">
                  <span>Lead Created Date :</span> <br />
                  {"31/05/2022"}
                </Typography>
              </Col>
              <Col xs={12}>
                <Typography className="lead-details-card-data-text">
                  <span>Lead Age :</span> <br />
                  {"36 days"}
                </Typography>
              </Col>
              {isShowMore ? (
                <>
                  <Col xs={24}>
                    <Typography className="lead-details-card-data-text">
                      <span>Lead Email :</span>
                      <br />
                      {"anik.chowdhury@orchids.edu.in"}
                    </Typography>
                  </Col>
                  <Col xs={12}>
                    <Typography className="lead-details-card-data-text">
                      <span>Lead Occupation :</span> <br />
                      {"NA"}
                    </Typography>
                  </Col>
                  <Col xs={12}>
                    <Typography className="lead-details-card-data-text">
                      <span>Lead Income :</span> <br />
                      {"NA"}
                    </Typography>
                  </Col>
                  <Col xs={24}>
                    <Typography className="lead-details-card-data-text">
                      <span>Event Name :</span> <br />
                      {"ProField-AY 24-25 NR windgates"}
                    </Typography>
                  </Col>
                  <Col xs={24}>
                    <Typography className="lead-details-card-data-text">
                      <span>Lead Address : </span> <br />
                      {"Test Address"}
                    </Typography>
                  </Col>
                  <Col xs={24}>
                    <Typography className="lead-details-card-data-text">
                      <span>Google Address : </span> <br />
                    </Typography>
                    <Map
                      google={"Test Address"}
                      center={{
                        lat: +28.07575,
                        lng: +-81.885078,
                      }}
                      height="250px"
                      zoom={15}
                    />
                  </Col>
                  <Col xs={24}>
                    <Typography className="lead-details-card-data-text">
                      <span>Remarks : </span> <br />
                      {"Test Remarks"}
                    </Typography>
                  </Col>
                </>
              ) : null}
              {width < 768 ? (
                <Col xs={24} className="text-right">
                  <Button
                    type="link"
                    onClick={() => {
                      setIsShowMore(!isShowMore);
                    }}
                    style={{ whiteSpace: "normal", height: 22 }}
                  >
                    {isShowMore ? "Show Less" : "Show More"}
                  </Button>
                </Col>
              ) : null}
            </Row>
          </Col>
        </Row>
      </CustomCard>
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
              <Form.Item
                name={modalData?.type === "Branch" ? "branch" : "source"}
                label={modalData?.type === "Branch" ? "Branch" : "Source"}
                rules={[
                  {
                    required: true,
                    message: `Please Enter ${
                      modalData?.type === "Branch" ? "Branch" : "Source"
                    }`,
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                  disabled={loading}
                  options={[]}
                />
              </Form.Item>
              {modalData?.type === "Branch" ? (
                <Form.Item name={"school_type"} label={"School Type"}>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={[]}
                    disabled={loading}
                  />
                </Form.Item>
              ) : null}
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default LeadDetailsCard;
