import React, { useState } from "react";
import {
  Table,
  Button,
  Select,
  Input,
  Modal,
  Form,
  Space,
  Row,
  Col,
} from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import CustomCard from "../../component/UtilComponents/CustomCard";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";

const { Option } = Select;

const SourceDataList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "S.no",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Source Name",
      dataIndex: "sourceName",
      key: "sourceName",
    },
    {
      title: "Sub Name",
      dataIndex: "subName",
      key: "subName",
    },
    {
      title: "Utm Source",
      dataIndex: "utmSource",
      key: "utmSource",
    },
    {
      title: "Utm Medium",
      dataIndex: "utmMedium",
      key: "utmMedium",
    },
    {
      title: "Field Name",
      dataIndex: "fieldName",
      key: "fieldName",
    },
    {
      title: "Update",
      key: "update",
      render: () => <EditOutlined style={{ color: "#1890ff" }} />,
    },
  ];

  const data = [
    {
      key: "1",
      sno: 1,
      sourceName: "PRO Data",
      subName: "Apartment",
      utmSource: "",
      utmMedium: "",
      fieldName: "Event Marketing",
    },
    // ... add more data as needed
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <CustomCard>
      <Row gutter={[8, 0]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Source Data List"]} />
                </Col>
                <Button type="primary" onClick={showModal}>
                  ADD SOURCE
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>

        <Space style={{ marginTop: "16px" }}>
          <Select defaultValue="All" style={{ width: 120 }}>
            <Option value="All">All</Option>
            {/* Add more options as needed */}
          </Select>
          <Button type="primary">GET</Button>
          <Button>CSV DOWNLOAD</Button>
          <Input
            placeholder="Search"
            suffix={<SearchOutlined />}
            style={{ width: 200 }}
          />
        </Space>
        <Table className="w-100 mt-3" columns={columns} dataSource={data} />

        <Modal
          title="Add Source"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="sourceName"
              label="Source Name"
              rules={[
                { required: true, message: "Please fill in this field." },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="subName" label="Sub Name">
              <Input />
            </Form.Item>
            <Form.Item
              name="product"
              label="Product"
              rules={[{ required: true }]}
            >
              <Form.Item
                name="product"
                label="Product"
                rules={[{ required: true }]}
              >
                <Select>{/* Add options */}</Select>
              </Form.Item>
            </Form.Item>
            <Form.Item name="utmSource" label="UTM Source">
              <Input />
            </Form.Item>
            <Form.Item
              name="marketingType"
              label="Marketing Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="digital">Digital Marketing</Option>
                <Option value="brand">Brand Marketing</Option>
                <Option value="event">Event Marketing</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </CustomCard>
  );
};

export default SourceDataList;
