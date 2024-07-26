import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import getArrayValues from "../../../utils/getArrayValues";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";
import Map from "./gMap";
import UploadFile from "../../../component/UtilComponents/UploadFile";
import { MdDelete, MdLink } from "react-icons/md";

const { TextArea } = Input;
const AddEditHotspot = ({
  modalData,
  handleAddEditHotspot,
  closeModal,
  dropdownData,
}) => {
  const [form] = Form.useForm();
  const hotspotType = Form.useWatch("hotspot_type", form);
  const [googleData, setGoogleData] = useState({
    google_lat: "",
    google_lng: "",
    google_address: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

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
    if (
      !googleData?.google_lat ||
      !googleData?.google_lng ||
      !googleData?.google_address
    ) {
      message.error("Please Select Google Address");
      return;
    }
    if (!selectedFile) {
      message.error("Please Select File");
      return;
    }
    handleAddEditHotspot(values);
    form.resetFields();
  };

  useEffect(() => {
    if (modalData?.data && ["CRUD Hotspot"].includes(modalData?.type)) {
      form.setFieldsValue({
        hotspot_name: modalData?.data?.hotspot_name,
        branch: modalData?.data?.branch?.id,
        hotspot_type: modalData?.data?.hotspot_type?.id,
        address: modalData?.data?.address,
        contact_name: modalData?.data?.contact_name,
        contact_email: modalData?.data?.contact_email,
        contact_no: modalData?.data?.contact_no,
        entry_cost: modalData?.data?.entry_cost,
        no_of_kids: modalData?.data?.other_detail?.no_of_kids,
        no_of_flats: modalData?.data?.other_detail?.no_of_flats,
        no_of_blocks: modalData?.data?.other_detail?.no_of_blocks,
        flat_series: modalData?.data?.other_detail?.flat_series,
        block_series: modalData?.data?.other_detail?.block_series,
        community: modalData?.data?.other_detail?.community,
        no_of_footfall: modalData?.data?.other_detail?.no_of_footfall,
        remarks: modalData?.data?.other_detail?.remarks,
      });
      setGoogleData({
        google_lat: modalData?.data?.google_lat,
        google_lng: modalData?.data?.google_lng,
        google_address: modalData?.data?.google_address,
      });
    }
  }, [modalData]);

  const fileUploadChangeHandler = (e) => {
    setSelectedFile(Array.from(e.target.files));
  };

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={modalData?.data ? "Edit Hotspot" : "Add Hotspot"}
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
      open={modalData?.show && modalData?.type === "CRUD Hotspot"}
      size="large"
      closable={false}
      maskClosable={false}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            size="small"
            onClick={() => {
              closeModal();
              form.resetFields();
            }}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            onClick={() => {
              form.submit();
            }}
            type="primary"
          >
            {modalData?.data ? "Update" : "Save"}
          </Button>
        </div>
      }
    >
      <Row>
        <Col xs={24} className="pb-2">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[8, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="hotspot_name"
                  label="Hotspot Name"
                  rules={[
                    { required: true, message: "Please Enter Hotspot Name" },
                  ]}
                >
                  <Input maxLength={48} autoComplete="off" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="branch"
                  label="Branch"
                  rules={[{ required: true, message: "Please Select Branch" }]}
                >
                  <Select
                    className="w-100"
                    options={dropdownData?.branch?.filter(
                      (each) => each.value !== 0
                    )}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="hotspot_type"
                  label="Hotspot Type"
                  rules={[
                    { required: true, message: "Please Select Hotspot Type" },
                  ]}
                >
                  <Select
                    className="w-100"
                    options={dropdownData?.source?.filter(
                      (each) => each.value !== 0
                    )}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: "Please Enter Address" }]}
                >
                  <TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Typography
                  style={{ fontSize: 10, fontWeight: 400 }}
                  className="mt-2"
                >
                  Google Address <span style={{ color: "red" }}>*</span>
                </Typography>
                <Map
                  google={googleData?.google_address}
                  center={{
                    lat: +googleData?.google_lat || +defaultCenter.lat,
                    lng: +googleData?.google_lng || +defaultCenter.lng,
                  }}
                  height="200px"
                  setMapData={setMapData}
                  zoom={15}
                />
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="contact_name" label="Contact Name">
                  <Input maxLength={48} autoComplete="off" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="entry_cost" label="Entry Cost">
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Contact No" name="contact_no">
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Contact Email"
                  name="contact_email"
                  rules={[
                    {
                      type: "email",
                      message: "Invalid Email",
                    },
                  ]}
                >
                  <Input type="email" maxLength={48} autoComplete="off" />
                </Form.Item>
              </Col>
              <Col xs={24} className="mt-2">
                <Divider />
              </Col>
              <Col xs={24} className="mt-2">
                <Typography style={{ fontSize: 12, fontWeight: 500 }}>
                  Hotspot Details (Can be a estimation)
                </Typography>
              </Col>
              {hotspotType === "apartment" ? (
                <>
                  <Col xs={12} md={8}>
                    <Form.Item label="No. of flats " name="no_of_flats">
                      <Input
                        type="number"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          ["e", "E", "+", "-", "."].includes(e.key) &&
                            e.preventDefault();
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={8}>
                    <Form.Item label="Flat Series " name="flat_series">
                      <Input maxLength={48} autoComplete="off" />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={8}>
                    <Form.Item label="No. of Blocks" name="no_of_blocks">
                      <Input
                        type="number"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          ["e", "E", "+", "-", "."].includes(e.key) &&
                            e.preventDefault();
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={8}>
                    <Form.Item label="Block Series" name="block_series">
                      <Input maxLength={48} autoComplete="off" />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={8}>
                    <Form.Item label="No. of Kids" name="no_of_kids">
                      <Input
                        type="number"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          ["e", "E", "+", "-", "."].includes(e.key) &&
                            e.preventDefault();
                        }}
                      />
                    </Form.Item>
                  </Col>
                </>
              ) : null}
              <Col xs={12} md={8}>
                <Form.Item label="Community / Gathering Area" name="community">
                  <Radio.Group>
                    <Radio value={"yes"}>Yes</Radio>
                    <Radio value={"no"}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={12} md={8}>
                <Form.Item
                  label="Estimated No. of Footfall Per day"
                  name="no_of_footfall"
                >
                  <Input
                    type="number"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="remarks" label="Remarks/Additional Info">
                  <TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <UploadFile
                  selectedFile={selectedFile}
                  fileUploadChangeHandler={fileUploadChangeHandler}
                  accept="video/*,image/*"
                  type="multiple"
                  label="Upload File"
                  // disabled={submitLoading}
                />

                {selectedFile?.length ? (
                  <Row className={"d-flex flex-column mt-2"} gutter={[2, 2]}>
                    {selectedFile?.map((each, index) => (
                      <Col xs={24}>
                        <Row
                          className={
                            "d-flex flex-row align-items-center flex-nowrap"
                          }
                          gutter={[12, 12]}
                        >
                          <Col>
                            <MdLink size={20} />
                          </Col>
                          <Col style={{ maxWidth: "80%" }}>
                            <Typography
                              style={{
                                fontSize: 12,
                                color: "#344767",
                                textDecoration: "underline",
                                lineHeight: 1.4,
                              }}
                            >
                              {each.name || "NA"}
                            </Typography>
                          </Col>
                          <Col>
                            <Popconfirm
                              title="Are you sure to remove file?"
                              onConfirm={() => {
                                let fileList = [...selectedFile];
                                fileList.splice(index, 1);
                                selectedFile(fileList);
                              }}
                            >
                              <Button
                                type="text"
                                size="small"
                                icon={<MdDelete size={18} />}
                              />
                            </Popconfirm>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                ) : null}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AddEditHotspot;
