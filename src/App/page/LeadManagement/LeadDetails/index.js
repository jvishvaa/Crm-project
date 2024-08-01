import React, { useState } from "react";
import {
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Popconfirm,
  Tooltip,
  Spin,
} from "antd";
import "./index.scss";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import LeadDetailsCard from "./LeadDetailsCard";
import AssigningDetailsCard from "./AssigningDetailsCard";
import ActivityHistory from "./ActivityHistory";
import ChildDetails from "./ChildDetails";
import ReassignPRM from "./ReassignPRM";
import { MdArrowBack, MdRefresh } from "react-icons/md";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import UpdateLeadDetails from "./UpdateLeadDetails";
import { useLocation, useNavigate } from "react-router-dom";
import CustomCard from "../../../component/UtilComponents/CustomCard";

const LeadDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({
    show: false,
    type: null,
    data: null,
  });
  const { width } = useWindowDimensions();

  return (
    <CustomCard>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between align-items-center">
                <Col>
                  <Row className="d-flex flex-row" gutter={[4, 4]}>
                    {location?.state?.is_back ? (
                      <Col>
                        <Button
                          type="text"
                          size="small"
                          icon={<MdArrowBack size={20} />}
                          onClick={() => {
                            navigate(-1);
                          }}
                        />
                      </Col>
                    ) : null}
                    <Col>
                      <CustomBreadCrumbs data={["Lead Details"]} />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Tooltip title="Refresh">
                    <Button
                      size="small"
                      type="text"
                      disabled={loading}
                      icon={<MdRefresh size={20} />}
                      onClick={() => {}}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Divider />
            </Col>
          </Row>
        </Col>
        <Spin spinning={loading} tip="Loading">
          <Col xs={24}>
            <Row className="d-flex flex-row" gutter={[8, 4]}>
              <Col>
                <Popconfirm title="Are you to mark lead as Hot?">
                  <Button
                    size="small"
                    type="primary"
                    className="lead-details-hot-lead-button"
                  >
                    Mark as Hot
                  </Button>
                </Popconfirm>
              </Col>
              <Col>
                <Button
                  size="small"
                  type="primary"
                  className="lead-details-reassign-prm"
                  onClick={() => {
                    setModalData({
                      show: true,
                      type: "Reassign PRM",
                      data: null,
                    });
                  }}
                >
                  Reassign PRM
                </Button>
              </Col>
              <Col>
                <Button
                  size="small"
                  type="primary"
                  className="lead-details-update-details-button"
                  onClick={() => {
                    setModalData({
                      show: true,
                      type: "Update Lead Details",
                      data: null,
                    });
                  }}
                >
                  Update Lead Details
                </Button>
              </Col>
              <Col>
                <Button size="small" type="primary" onClick={() => {}}>
                  Check Admission
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={24} className="mt-2">
            <Row gutter={[8, 8]}>
              <Col xs={24} md={12} lg={8}>
                <Row className="d-flex flex-column" gutter={[8, 8]}>
                  <Col xs={24}>
                    <LeadDetailsCard />
                  </Col>
                  {width >= 768 && width <= 991 ? (
                    <Col xs={24}>
                      <ChildDetails />
                    </Col>
                  ) : null}
                </Row>
              </Col>
              <Col xs={24} md={12} lg={9}>
                <Row className="d-flex flex-column" gutter={[8, 8]}>
                  <Col xs={24}>
                    <ActivityHistory />
                  </Col>
                  {width >= 768 && width <= 991 ? (
                    <Col xs={24}>
                      <AssigningDetailsCard />
                    </Col>
                  ) : null}
                </Row>
              </Col>
              {!(width >= 768 && width <= 991) ? (
                <Col xs={24} md={24} lg={7}>
                  <Row className="d-flex flex-row" gutter={[8, 8]}>
                    <Col xs={24} md={12} lg={24}>
                      <ChildDetails />
                    </Col>
                    <Col xs={24} md={12} lg={24}>
                      <AssigningDetailsCard />
                    </Col>
                  </Row>
                </Col>
              ) : null}
            </Row>
          </Col>
        </Spin>
      </Row>
      <ReassignPRM
        modalData={modalData}
        handleReassignPRM={() => {}}
        closeModal={() => {
          setModalData({ show: false, type: null, data: null });
        }}
      />
      <UpdateLeadDetails
        modalData={modalData}
        handleUpdateLeadDetails={() => {}}
        closeModal={() => {
          setModalData({ show: false, type: null, data: null });
        }}
      />
    </CustomCard>
  );
};

export default LeadDetails;
