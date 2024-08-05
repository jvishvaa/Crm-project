import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Progress,
  Radio,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import getArrayValues from "../../../utils/getArrayValues";
import { MdClose, MdDelete, MdEdit, MdLink } from "react-icons/md";
import getRoutePathDetails from "../../../utils/getRoutePathDetails";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";
import dayjs from "dayjs";
import UploadFile from "../../../component/UtilComponents/UploadFile";
import getExtensions from "../../../utils/getExtensions";
import VideoPreview from "../../../assest/images/video-thumbnail.png";

const { TextArea } = Input;

const AddEditNewspaperInsert = ({
  modalData,
  handleAddEditNewspaperInsert,
  closeModal,
  dropdownData,
}) => {
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState([]);
  const fileUploadLimit = 25;
  const [fileSize, setFileSize] = useState([]);
  const { width } = useWindowDimensions();

  const onFinish = (values) => {
    handleAddEditNewspaperInsert(values);

    form.resetFields();
  };

  const clearData = () => {};

  useEffect(() => {
    if (modalData?.data) {
      form.setFieldsValue({
        date: modalData.data?.date,
        newspaper: getArrayValues(modalData.data?.newspaper, "id"),
        branch: modalData.data?.branch?.id,
        target_area: modalData.data?.target_area,
        amount_paid: modalData.data?.amount_paid,
      });
    }
    if (!modalData?.data) {
      form.setFieldsValue({ date: dayjs("2022-02-02", "YYYY-MM-DD") });
    }
  }, [modalData]);

  const fileUploadChangeHandler = (e) => {
    if (
      fileSize.reduce((acc, curr) => acc + curr, 0) +
        [...Array.from(e.target.files).map((files) => files.size)].reduce(
          (acc, curr) => acc + curr,
          0
        ) >
      fileUploadLimit * 1024 * 1024
    ) {
      message.error("File Size Limit Exceeded");
      return;
    }
    let isValidFileExtension = true;
    for (let i = 0; i < e.target.files.length; i++) {
      if (
        ![...getExtensions("image"), ...getExtensions("video")].includes(
          `.${e.target.files[i]?.name?.split(".")?.pop()}`
        )
      ) {
        isValidFileExtension = false;
      }
    }
    if (!isValidFileExtension) {
      message.error("Invalid File Extension");
      return;
    }
    setSelectedFile([...selectedFile, ...Array.from(e.target.files)]);
    setFileSize([
      ...fileSize,
      ...getArrayValues(Array.from(e.target.files), "size"),
    ]);
  };

  return (
    <Drawer
      className="lead-filter-drawer"
      title={
        <CustomDrawerHeader
          label={
            modalData?.data ? "Update Newspaper Insert" : "Add Newspaper Insert"
          }
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
      open={
        modalData?.show &&
        ["Add Newspaper Insert", "Update Newspaper Insert"].includes(
          modalData?.type
        )
      }
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
                <Form.Item name="date" label="Date">
                  <DatePicker
                    className="w-100"
                    format={"DD/MM/YYYY"}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="branch" label="Branch">
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
                <Form.Item name="newspaper" label="Newspaper">
                  <Select
                    className="w-100"
                    mode="multiple"
                    options={dropdownData?.newspaper?.filter(
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
                <Form.Item name="target_area" label="Target Area">
                  <Input
                    maxLength={64}
                    autoComplete="off"
                    onChange={(e) => {
                      form.setFieldsValue({
                        target_area: e.target.value
                          ?.trimStart()
                          ?.replace("  ", " "),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="amount_paid" label="Amount Paid(Rs.)">
                  <Input
                    type="number"
                    onKeyDown={(e) => {
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} className="mt-3">
                <Row className="d-flex flex-column flex-nowrap">
                  <Col>
                    <Typography className="th-11 th-fw-400">
                      Upload File(only image and video total size limit of{" "}
                      {fileUploadLimit}MB)
                    </Typography>
                  </Col>
                  <Col xs={24} sm={18}>
                    <Row
                      className="d-flex flex-row align-items-center"
                      gutter={[8, 8]}
                    >
                      <Col xs={16}>
                        <Progress
                          percent={
                            (fileSize.reduce((acc, curr) => acc + curr, 0) /
                              (fileUploadLimit * 1024 * 1024)) *
                            100
                          }
                          showInfo={false}
                        />
                      </Col>
                      <Col xs={8}>
                        <Typography
                          className="th-10 th-fw-400"
                          style={{ marginTop: 2 }}
                        >
                          {(
                            (fileSize.reduce((acc, curr) => acc + curr, 0) ||
                              0) /
                            (1024 * 1024)
                          ).toFixed(2)}{" "}
                          MB / {fileUploadLimit} MB
                        </Typography>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} sm={12}>
                    <UploadFile
                      selectedFile={selectedFile}
                      fileUploadChangeHandler={fileUploadChangeHandler}
                      accept="image/*, video/*"
                      type={"multiple"}
                    />
                  </Col>
                  <Col xs={24} className="mt-3">
                    <Row className="d-flex flex-row" gutter={[16, 8]}>
                      {selectedFile?.map((each, index) => (
                        <Col style={{ position: "relative" }}>
                          <Image
                            width={75}
                            height={75}
                            style={{ objectFit: "contain" }}
                            preview={{
                              ...(getExtensions("video").includes(
                                typeof each === "string"
                                  ? `.${each?.split(".")?.pop()}`
                                  : `.${each?.name?.split(".")?.pop()}`
                              )
                                ? {
                                    imageRender: () => (
                                      <video
                                        width="90%"
                                        height="90%"
                                        controls
                                        autoPlay
                                        src={URL.createObjectURL(each)}
                                      />
                                    ),
                                  }
                                : {}),
                              toolbarRender: () => null,
                            }}
                            src={
                              typeof each === "string"
                                ? getExtensions("video").includes(
                                    `.${each?.split(".")?.pop()}`
                                  )
                                  ? VideoPreview
                                  : each
                                : getExtensions("video").includes(
                                    `.${each?.name?.split(".")?.pop()}`
                                  )
                                ? VideoPreview
                                : URL.createObjectURL(each)
                            }
                          />
                          <Popconfirm
                            title="Are you sure to remove selected file?"
                            onConfirm={() => {
                              let mySelectedFile = selectedFile?.filter(
                                (eachItem, eachIndex) => eachIndex !== index
                              );
                              let myFileSize = fileSize?.filter(
                                (eachItem, eachIndex) => eachIndex !== index
                              );
                              setSelectedFile(mySelectedFile);
                              setFileSize(myFileSize);
                            }}
                          >
                            <Button
                              type="text"
                              size="small"
                              style={{
                                position: "absolute",
                                top: -12,
                                right: -2,
                              }}
                              icon={<MdClose size={20} />}
                            />
                          </Popconfirm>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AddEditNewspaperInsert;
