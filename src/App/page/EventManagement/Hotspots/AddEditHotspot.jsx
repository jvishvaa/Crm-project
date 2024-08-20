import {
  Button,
  Checkbox,
  Col,
  Descriptions,
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
import Map from "./gMap";
import UploadFile from "../../../component/UtilComponents/UploadFile";
import { MdClose, MdDelete, MdEdit, MdLink } from "react-icons/md";
import getRoutePathDetails from "../../../utils/getRoutePathDetails";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import getExtensions from "../../../utils/getExtensions";
import axios from "axios";
import urls from "../../../utils/urls";
import RenderTagMultiple from "../../../component/UtilComponents/RenderMultiple";

const { TextArea } = Input;

const CustomDrawerHeader = ({ label, onClose, isEdit, setIsEdit }) => (
  <div className="d-flex flex-row justify-content-between align-items-center">
    <Typography>{label}</Typography>
    <div className="d-flex flex-row justify-content-end align-items-center">
      {getRoutePathDetails().modify ? (
        <>
          {!isEdit ? (
            <Button
              type="link"
              size="small"
              className="mr-2"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
              icon={<MdEdit size={20} />}
            />
          ) : null}
        </>
      ) : null}
      <Button
        type="link"
        size="small"
        onClick={onClose}
        icon={<MdClose size={20} />}
      />
    </div>
  </div>
);

const AddEditHotspot = ({
  modalData,
  handleAddEditHotspot,
  closeModal,
  dropdownData,
  getHotspotData,
  setLoading
}) => {
  const [form] = Form.useForm();
  const hotspotType = Form.useWatch("hotspot_type", form);
  const [googleData, setGoogleData] = useState({
    google_lat: "",
    google_lng: "",
    google_address: "",
  });
  const { width } = useWindowDimensions();
  const [selectedFile, setSelectedFile] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  // const [loading, setLoading] = useState(false);

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

  const onChangeMultiple = (value, key) => {
    if (
      value?.length === 0 ||
      (value.length > 0 && value[value.length - 1] === 0)
    ) {
      form.setFieldsValue({ [key]: [0] });
    } else {
      form.setFieldsValue({ [key]: value.filter((each) => each !== 0) });
    }
  };

  const renderTagAll = (label, value, index, key) => {
    let selectedItems = form.getFieldsValue()?.[key];
    const showCloseIcon = !selectedItems?.includes(0);
    return (
      <RenderTagMultiple
        label={label}
        value={value}
        showCloseIcon={showCloseIcon}
        onClose={(closeValue) => {
          if (selectedItems?.length === 1) {
            form.setFieldsValue({ [key]: [0] });
          } else {
            form.setFieldsValue({
              [key]: selectedItems.filter((each) => each !== closeValue),
            });
          }
        }}
      />
    );
  };

  const onFinish = (values) => {
    console.log("values", values);

    setLoading(true);
    if (!modalData?.data) {
      if (
        !googleData?.google_lat ||
        !googleData?.google_lng ||
        !googleData?.google_address
      ) {
        message.error("Please Select Google Address");
        return;
      }
      let params = {
        ...values,
        google_lat: googleData?.google_lat,
        google_lng: googleData?.google_lng,
        google_address: googleData?.google_address,
      }
      axios
        .post(`${urls.eventManagement.hotspot}`, params)
        .then((res) => {
          const data = res?.data;
          console.log(data, "data");
          message.success(data?.message);
        })
        .catch((err) => {
          console.log(err);
          message.error("Something went wrong");
        })
        .then(() => {
          getHotspotData();
          closeModal();
          setLoading(false);
        })
    }
    else {
      let hotspot_id = modalData?.data?.id;
      let params = {
        ...values,
        google_lat: googleData?.google_lat,
        google_lng: googleData?.google_lng,
        google_address: googleData?.google_address,
      }
      axios
        .put(`${urls.eventManagement.hotspot}${hotspot_id}/`, params)
        .then((res) => {
          const data = res?.data;
          console.log(data, "data");
          message.success(data?.message);
        })
        .catch((err) => {
          console.log(err);
          message.error("Something went wrong");
        })
        .then(() => {
          getHotspotData();
          closeModal();
          setLoading(false)
        })
    }
    if (modalData?.type === "Add Hotspot") {
      handleAddEditHotspot(values);
    } else if (modalData?.data?.is_edit) {
      handleAddEditHotspot(values);
    } else {
      handleAddEditHotspot(values);
      setIsEdit(false);
    }
    form.resetFields();
  };

  const clearData = () => {
    setIsEdit(false);
    setGoogleData({
      google_lat: "",
      google_lng: "",
      google_address: "",
    });
    setSelectedFile([]);
  };

  useEffect(() => {
    if (
      modalData?.data &&
      ["View Hotspot"].includes(modalData?.type) &&
      modalData?.data?.is_edit
    ) {
      setIsEdit(true);
    }
  }, [modalData]);

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        hotspot_name: modalData?.data?.hotspot_name,
        branch: modalData?.data?.branch_data?.map((item) => item?.branch_name),
        hotspot_type: modalData?.data?.hotspot_type,
        hotspot_address: modalData?.data?.hotspot_address,
        contact_name: modalData?.data?.contact_name,
        email: modalData?.data?.email,
        contact_number: modalData?.data?.contact_number,
        event_cost: modalData?.data?.event_cost,
        no_of_kids: modalData?.data?.no_of_kids,
        no_of_flats: modalData?.data?.no_of_flats,
        no_of_blocks: modalData?.data?.no_of_blocks,
        flat_series: modalData?.data?.flat_series,
        block_series: modalData?.data?.block_series,
        community_gathering_area: modalData?.data?.community_gathering_area,
        estimated_footfall: modalData?.data?.estimated_footfall,
        remarks: modalData?.data?.remarks,
      });
      setGoogleData({
        google_lat: modalData?.data?.google_lat,
        google_lng: modalData?.data?.google_lng,
        google_address: modalData?.data?.google_address,
      });
    } else {
      form.resetFields();
      setGoogleData({
        google_lat: "",
        google_lng: "",
        google_address: "",
      });
      setSelectedFile([]);
    }
  }, [isEdit]);

  const fileUploadChangeHandler = (e) => {
    console.log(e.target.files, 'fileUploadChangeHandler')
    if (
      ![...getExtensions("image")].includes(
        `.${e.target.files[i]?.name?.split(".")?.pop()}`
      )
    ) {
      message.error("Invalid File Extension");
      return;
    }
    setSelectedFile(Array.from(e.target.files));
  };

  const renderViewDetails = (label, data, span = 1) => {
    return (
      <Descriptions.Item label={label} span={span}>
        {data}
      </Descriptions.Item>
    );
  };

  console.log(modalData, 'dropdownData')

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={
            modalData?.data
              ? isEdit
                ? "Edit Hotspot"
                : "View Hotspot"
              : "Add Hotspot"
          }
          onClose={() => {
            closeModal();
            clearData();
            form.resetFields();
          }}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      }
      onClose={() => {
        closeModal();
        clearData();
        form.resetFields();
      }}
      open={
        modalData?.show &&
        ["Add Hotspot", "View Hotspot"].includes(modalData?.type)
      }
      size="large"
      closable={false}
      maskClosable={false}
      footer={
        ["Add Hotspot"].includes(modalData?.type) ||
          (["View Hotspot"].includes(modalData?.type) && isEdit) ? (
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              size="small"
              onClick={() => {
                if (
                  ["Add Hotspot"].includes(modalData?.type) ||
                  (["View Hotspot"].includes(modalData?.type) &&
                    modalData?.data?.is_edit)
                ) {
                  closeModal();
                }
                clearData();
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
        ) : null
      }
    >
      <Row>
        {["Add Hotspot"].includes(modalData?.type) ||
          (["View Hotspot"].includes(modalData?.type) && isEdit) ? (
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
                    <Input
                      maxLength={48}
                      autoComplete="off"
                      onChange={(e) => {
                        form.setFieldsValue({
                          hotspot_name: e.target.value
                            ?.trimStart()
                            ?.replace("  ", " "),
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="branch"
                    label="Branch"
                    rules={[
                      { required: true, message: "Please Select Branch" },
                    ]}
                  >
                    <Select
                      className="w-100"
                      mode="multiple"
                      options={dropdownData?.branch?.map((item, ind) => {
                        return {
                          value: item?.id,
                          label: item?.branch_name,
                        };
                      })}
                      tagRender={(props) =>
                        renderTagAll(
                          props.label,
                          props.value,
                          props.index,
                          "branch"
                        )
                      }
                      onChange={(value) => {
                        onChangeMultiple(value, "branch");
                      }}
                      showSearch
                      allowClear
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
                    name="hotspot_address"
                    label="Address"
                    rules={[
                      { required: true, message: "Please Enter Address" },
                    ]}
                  >
                    <TextArea
                      rows={2}
                      onChange={(e) => {
                        form.setFieldsValue({
                          address: e.target.value
                            ?.trimStart()
                            ?.replace("  ", " "),
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Typography className="mt-2 th-10 th-fw-400">
                    Google Address <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Map
                    google={googleData?.google_address}
                    center={{
                      lat: +googleData?.google_lat || +defaultCenter.lat,
                      lng: +googleData?.google_lng || +defaultCenter.lng,
                    }}
                    height="200px"
                    isEdit={true}
                    setMapData={setMapData}
                    zoom={15}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="contact_name" label="Contact Name">
                    <Input
                      maxLength={48}
                      autoComplete="off"
                      onChange={(e) => {
                        form.setFieldsValue({
                          contact_name: e.target.value
                            ?.trimStart()
                            ?.replace("  ", " "),
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="event_cost" label="Entry Cost">
                    <Input
                      type="number"
                      autoComplete="off"
                      onKeyDown={(e) => {
                        ["e", "E", "+", "-", "."].includes(e.key) &&
                          e.preventDefault();
                      }}
                      onChange={(e) => {
                        if (Number(e.target.value) <= 99999999999999) {
                          form.setFieldsValue({
                            entry_cost: e.target.value,
                          });
                        } else {
                          form.setFieldsValue({
                            entry_cost: Number(
                              e.target.value?.toString()?.slice(0, -1)
                            ),
                          });
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Contact No" name="contact_number">
                    <Input
                      type="number"
                      autoComplete="off"
                      onKeyDown={(e) => {
                        ["e", "E", "+", "-", "."].includes(e.key) &&
                          e.preventDefault();
                      }}
                      onChange={(e) => {
                        if (Number(e.target.value) <= 9999999999) {
                          form.setFieldsValue({
                            contact_no: e.target.value,
                          });
                        } else {
                          form.setFieldsValue({
                            contact_no: Number(
                              e.target.value?.toString()?.slice(0, -1)
                            ),
                          });
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Contact Email"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Invalid Email",
                      },
                    ]}
                  >
                    <Input
                      type="email"
                      maxLength={48}
                      autoComplete="off"
                      onChange={(e) => {
                        form.setFieldsValue({
                          contact_email: e.target.value
                            ?.trimStart()
                            ?.replace("  ", " "),
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} className="mt-2">
                  <Divider />
                </Col>
                <Col xs={24} className="mt-2">
                  <Typography S className="th-12 th-fw-500">
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
                          onChange={(e) => {
                            if (Number(e.target.value) <= 99999999999999) {
                              form.setFieldsValue({
                                no_of_flats: e.target.value,
                              });
                            } else {
                              form.setFieldsValue({
                                no_of_flats: Number(
                                  e.target.value?.toString()?.slice(0, -1)
                                ),
                              });
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} md={8}>
                      <Form.Item label="Flat Series " name="flat_series">
                        <Input
                          maxLength={48}
                          autoComplete="off"
                          onChange={(e) => {
                            form.setFieldsValue({
                              flat_series: e.target.value
                                ?.trimStart()
                                ?.replace("  ", " "),
                            });
                          }}
                        />
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
                          onChange={(e) => {
                            if (Number(e.target.value) <= 99999999999999) {
                              form.setFieldsValue({
                                no_of_blocks: e.target.value,
                              });
                            } else {
                              form.setFieldsValue({
                                no_of_blocks: Number(
                                  e.target.value?.toString()?.slice(0, -1)
                                ),
                              });
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} md={8}>
                      <Form.Item label="Block Series" name="block_series">
                        <Input
                          maxLength={48}
                          autoComplete="off"
                          onChange={(e) => {
                            form.setFieldsValue({
                              block_series: e.target.value
                                ?.trimStart()
                                ?.replace("  ", " "),
                            });
                          }}
                        />
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
                          onChange={(e) => {
                            if (Number(e.target.value) <= 99999999999999) {
                              form.setFieldsValue({
                                no_of_kids: e.target.value,
                              });
                            } else {
                              form.setFieldsValue({
                                no_of_kids: Number(
                                  e.target.value?.toString()?.slice(0, -1)
                                ),
                              });
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </>
                ) : null}
                <Col xs={12} md={8}>
                  <Form.Item
                    label="Community / Gathering Area"
                    name="community_gathering_area"
                  >
                    <Radio.Group>
                      <Radio value={"yes"}>Yes</Radio>
                      <Radio value={"no"}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item
                    label="Estimated No. of Footfall Per day"
                    name="estimated_footfall"
                  >
                    <Input
                      type="number"
                      autoComplete="off"
                      onKeyDown={(e) => {
                        ["e", "E", "+", "-", "."].includes(e.key) &&
                          e.preventDefault();
                      }}
                      onChange={(e) => {
                        if (Number(e.target.value) <= 99999999999999) {
                          form.setFieldsValue({
                            no_of_footfall: e.target.value,
                          });
                        } else {
                          form.setFieldsValue({
                            no_of_footfall: Number(
                              e.target.value?.toString()?.slice(0, -1)
                            ),
                          });
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="remarks" label="Remarks/Additional Info">
                    <TextArea
                      rows={2}
                      onChange={(e) => {
                        form.setFieldsValue({
                          remarks: e.target.value
                            ?.trimStart()
                            ?.replace("  ", " "),
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <UploadFile
                    selectedFile={selectedFile}
                    fileUploadChangeHandler={fileUploadChangeHandler}
                    accept="video/*,image/*"
                    type="multiple"
                    label="Upload File"
                    labelClassName={"mt-3"}
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
                                  color: "#344767",
                                  textDecoration: "underline",
                                  lineHeight: 1.4,
                                }}
                                className="th-12"
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
                                  setSelectedFile(fileList);
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
        ) : null}
        {["View Hotspot"].includes(modalData?.type) &&
          !modalData?.data?.is_edit &&
          !isEdit ? (
          <Col xs={24} className="pb-2 mt-2">
            <Row gutter={[8, 8]}>
              <Descriptions
                column={2}
                layout="vertical"
                className="update-hotspot-description"
              >
                {renderViewDetails("Hotspot Name", modalData?.data?.hotspot_name)}
                {renderViewDetails("Branch", modalData?.data?.branch_data?.map((item) => item?.branch_name).join(", "))}
                {renderViewDetails("Hotspot Type", modalData?.data?.hotspot_type)}
                {renderViewDetails("Address", modalData?.data?.hotspot_address)}
              </Descriptions>
              <Col xs={24}>
                <Map
                  google={modalData?.data?.google_address || "Test Address"}
                  center={{
                    lat: +modalData?.data?.google_lat || +defaultCenter.lat,
                    lng: +modalData?.data?.google_lng || +defaultCenter.lng,
                  }}
                  height="200px"
                  setMapData={setMapData}
                  isEdit={false}
                  zoom={15}
                />
              </Col>
              <Descriptions
                column={2}
                layout="vertical"
                className="update-hotspot-description"
              >
                {renderViewDetails("Contact Name", modalData?.data?.contact_name)}
                {renderViewDetails("Entry Cost", modalData?.data?.event_cost)}
                {renderViewDetails("Contact No", modalData?.data?.contact_number)}
                {renderViewDetails("Contact Email", modalData?.data?.email)}
              </Descriptions>
              <Col xs={24} className="mt-2">
                <Divider />
              </Col>
              <Col xs={24} className="mt-2">
                <Typography className="th-12 th-fw-500">
                  Hotspot Details (Can be a estimation)
                </Typography>
              </Col>
              <Col xs={24}>
                <Descriptions
                  column={2}
                  layout="vertical"
                  className="update-hotspot-description"
                >
                  {renderViewDetails("No. Of Flats", modalData?.data?.no_of_flats ? modalData?.data?.no_of_flats : "NA")}
                  {renderViewDetails("Flat Series", modalData?.data?.flat_series ? modalData?.data?.flat_series : "NA")}
                  {renderViewDetails("No. Of Blocks", modalData?.data?.no_of_blocks ? modalData?.data?.no_of_blocks : "NA")}
                  {renderViewDetails("Block Series", modalData?.data?.block_series ? modalData?.data?.block_series : "NA")}
                  {renderViewDetails("No of Kids", modalData?.data?.no_of_kids ? modalData?.data?.no_of_kids : "NA", width < 768 ? 2 : 1)}
                  {renderViewDetails("Community / Gathering Area", modalData?.data?.community_gathering_area)}
                  {renderViewDetails("Estimated No. of Footfall Per day", modalData?.data?.estimated_footfall ? modalData?.data?.estimated_footfall : "NA")}
                  {renderViewDetails(
                    "Remarks",
                    modalData?.data?.remarks ? modalData?.data?.remarks : "NA",
                    width < 768 ? 2 : 1
                  )}
                </Descriptions>
              </Col>
            </Row>
          </Col>
        ) : null}
      </Row>
    </Drawer>
  );
};

export default AddEditHotspot;
