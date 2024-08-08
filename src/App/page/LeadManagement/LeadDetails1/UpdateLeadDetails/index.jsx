import { Button, Col, Drawer, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import "../index.scss";
import Map from "./gMap";
import CustomDrawerHeader from "../../../../component/UtilComponents/CustomDrawerHeader";

const { TextArea } = Input;

const UpdateLeadDetails = ({
  modalData,
  handleUpdateLeadDetails,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [googleData, setGoogleData] = useState({
    google_lat: "",
    google_lng: "",
    google_address: "",
  });

  const defaultCenter = {
    lat: 13.0342708,
    lng: 77.56816509999999,
  };

  const setMapData = (mapData) => {
    if (mapData) {
      setGoogleData({
        ...googleData,
        google_lat: mapData?.mapPosition?.lat,
        google_lng: mapData?.mapPosition?.lng,
        ...(mapData?.mapPosition?.lat !== defaultCenter.lat ||
        mapData?.mapPosition?.lng !== defaultCenter.lng
          ? { google_address: mapData.address }
          : {}),
      });
    }
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleUpdateLeadDetails(values);
    form.resetFields();
  };

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={"Update Lead Details"}
          onClose={() => {
            closeModal();
            form.resetFields();
          }}
        />
      }
      onClose={() => {
        closeModal();
        form.resetFields();
      }}
      open={modalData.show && modalData.type === "UpdateLeadDetails"}
      size="large"
      closable={false}
      maskClosable={false}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            key="back"
            style={{ marginRight: 10 }}
            onClick={() => {
              closeModal();
              form.resetFields();
            }}
            size="small"
          >
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
            size="small"
          >
            Update
          </Button>
        </div>
      }
    >
      <Row>
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[16, 4]}>
              <Col xs={24} sm={12}>
                <Form.Item name="lead_name" label="Lead Name">
                  <Input
                    maxLength={48}
                    autoComplete="off"
                    disabled={loading}
                    onChange={(e) => {
                      form.setFieldsValue({
                        lead_name: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="lead_email"
                  label="Lead Email"
                  rules={[
                    {
                      type: "email",
                      message: "Invalid Email",
                    },
                  ]}
                >
                  <Input
                    maxLength={48}
                    autoComplete="off"
                    disabled={loading}
                    onChange={(e) => {
                      form.setFieldsValue({
                        lead_email: e.target.value?.trim(),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="lead_address" label="Lead Address">
                  <TextArea
                    rows={3}
                    disabled={loading}
                    onChange={(e) => {
                      form.setFieldsValue({
                        lead_address: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="lead_remarks" label="Lead Remarks">
                  <TextArea
                    rows={3}
                    disabled={loading}
                    onChange={(e) => {
                      form.setFieldsValue({
                        lead_remarks: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Typography className="mt-3 th-10 th-fw-400">
                  Google Address
                </Typography>
                <Map
                  google={googleData?.google_address}
                  center={{
                    lat: +googleData?.google_lat || +defaultCenter.lat,
                    lng: +googleData?.google_lng || +defaultCenter.lng,
                  }}
                  height="300px"
                  setMapData={setMapData}
                  zoom={15}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
};

export default UpdateLeadDetails;
