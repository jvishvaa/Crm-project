import React from "react";
import "./index.scss";
import { Row, Col, Typography, Divider, Avatar } from "antd";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";
import CustomCard from "../../component/UtilComponents/CustomCard";
import useWindowDimensions from "../../component/UtilComponents/useWindowDimensions";
import DefaultProfile from "../../assest/images/profile.png";

const Profile = () => {
  const { width } = useWindowDimensions();
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <CustomBreadCrumbs data={["Profile"]} />
            </Col>
            <Col xs={24}>
              <Divider />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={9} md={7} lg={6} xl={5}>
              <CustomCard
                className="profile-card"
                style={width >= 576 ? { position: "sticky", top: 60 } : {}}
              >
                <Row
                  className={`d-flex ${
                    width >= 576
                      ? "flex-column justify-content-center"
                      : "flex-row"
                  } align-items-center p-3`}
                  gutter={[16, 8]}
                  style={{ minHeight: width >= 576 ? 250 : 10 }}
                >
                  <Col>
                    <Avatar
                      size={width >= 576 ? 120 : 50}
                      src={DefaultProfile}
                    />
                  </Col>
                  <Col>
                    <Row className="d-flex flex-column">
                      <Typography
                        className={`profile-name ${
                          width >= 576 ? "text-center" : "text-left"
                        }`}
                      >
                        Anik Chowdhury
                      </Typography>
                      <Typography
                        className={`profile-userlevel ${
                          width >= 576 ? "text-center" : "text-left"
                        }`}
                      >
                        Superadmin
                      </Typography>
                      <Typography
                        className={`profile-erp ${
                          width >= 576 ? "text-center" : "text-left"
                        }`}
                      >
                        @20210000204_OLV
                      </Typography>
                    </Row>
                  </Col>
                </Row>
              </CustomCard>
            </Col>

            <Col xs={24} sm={15} md={17} lg={18} xl={19}>
              <Row className="d-flex flex-column flex-nowrap" gutter={[8, 8]}>
                <Col xs={24}>
                  <CustomCard className="profile-card">
                    <Row
                      className="d-flex flex-column p-3 flex-nowrap"
                      gutter={[8, 16]}
                    >
                      <Col xs={24}>
                        <Typography className="header-profile">
                          Contact Information
                        </Typography>
                      </Col>
                      <Col xs={24}>
                        <Row gutter={[8, 16]}>
                          <Col xs={24} md={12}>
                            <Row gutter={[2, 2]}>
                              <Col xs={24}>
                                <Typography className="profile-sub-header">
                                  Phone
                                </Typography>
                              </Col>
                              <Col xs={24}>
                                <Typography className="profile-value">
                                  7846453553
                                </Typography>
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={24} md={12}>
                            <Row gutter={[2, 2]}>
                              <Col xs={24}>
                                <Typography className="profile-sub-header">
                                  Email
                                </Typography>
                              </Col>
                              <Col xs={24}>
                                <Typography className="profile-value">
                                  anik.chowdhury@orchids.edu.in
                                </Typography>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CustomCard>
                </Col>
                <Col xs={24}>
                  <CustomCard className="profile-card">
                    <Row
                      className="d-flex flex-column p-3 flex-nowrap"
                      gutter={[8, 16]}
                    >
                      <Col xs={24}>
                        <Typography className="header-profile">
                          Organizational Information
                        </Typography>
                      </Col>
                      <Col xs={24}>
                        <Row gutter={[8, 16]}>
                          <Col xs={24} lg={12}>
                            <Row gutter={[2, 2]}>
                              <Col xs={24}>
                                <Typography className="profile-sub-header">
                                  Marketing Type
                                </Typography>
                              </Col>
                              <Col xs={24}>
                                <Typography className="profile-value">
                                  Field Marketing, Affiliate Marketing, Digital
                                  Marketing
                                </Typography>
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={24} lg={12}>
                            <Row gutter={[2, 2]}>
                              <Col xs={24}>
                                <Typography className="profile-sub-header">
                                  Zone
                                </Typography>
                              </Col>
                              <Col xs={24}>
                                <Typography className="profile-value">
                                  Zone 1A, Zone 1B, Zone 2, Zone 3, Zone 4, Zone
                                  5, Zone 6
                                </Typography>
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={24} lg={12}>
                            <Row gutter={[2, 2]}>
                              <Col xs={24}>
                                <Typography className="profile-sub-header">
                                  Branch
                                </Typography>
                              </Col>
                              <Col xs={24}>
                                <Typography className="profile-value">
                                  Orchids BTM Layout, Orchids Banerghata,
                                  Orchids BTM Layout, Orchids Banerghata
                                </Typography>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CustomCard>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
