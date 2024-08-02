import React, { useEffect, useState } from "react";
import "./index.css";
import {
  Row,
  Col,
  Divider,
  Table,
  Spin,
  Popconfirm,
  Switch,
  Button,
  Select,
  Form,
  Tag,
} from "antd";
import CustomBreadCrumbs from "../../../component/UtilComponents/CustomBreadCrumbs";
import CustomCard from "../../../component/UtilComponents/CustomCard";
import getRoutePathDetails from "../../../utils/getRoutePathDetails";
import { EditOutlined } from "@ant-design/icons";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
import AddEditSourceType from "./addEditSourceType";
import CustomFilterText from "../../../component/UtilComponents/CustomFilterText";
import getColour from "../../../utils/getColour";

const SourceType = () => {
  const [form] = Form.useForm();
  const [sourceTypeData, setSourceTypeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoverKey, setHoverKey] = useState(null);
  const [modalData, setModalData] = useState({ show: false, data: null });

  useEffect(() => {
    form.setFieldsValue({ is_active: true });
  }, []);

  const { width } = useWindowDimensions();

  const getSourceTypeData = () => {
    // setLoading(true);
    setSourceTypeData([
      { id: 1, source_type: "Digital Marketing", is_active: true },
      {
        id: 2,
        source_type: "Field Marketing",
        is_active: true,
      },
      {
        id: 3,
        source_type: "Affiliate Marketing",
        is_active: false,
      },
    ]);
  };

  useEffect(() => {
    getSourceTypeData();
  }, []);

  const handleStatusChange = (data) => {};

  const handleHover = (record) => {
    if (getRoutePathDetails().modify) {
      setHoverKey(record.id);
    }
  };

  const handleOnChange = () => {
    setSourceTypeData(null);
  };

  const columns = [
    {
      title: "Sr No.",
      key: "index",
      render: (text, record, index) => index + 1,
      align: "center",
      width: 70,
    },
    {
      title: "Source Type",
      key: "source_type",
      render: (record) => (
        <div
          className="d-flex justify-content-center align-items-center flex-nowrap"
          onMouseEnter={() => handleHover(record)}
          onMouseLeave={() => setHoverKey("")}
        >
          <Button
            type="link"
            size="small"
            className="edit-button"
            style={{
              visibility: "hidden",
            }}
            icon={<EditOutlined style={{ paddingRight: 5, marginLeft: 5 }} />}
          />
          <span>{record?.source_type}</span>
          <Button
            type="link"
            size="small"
            className="edit-button"
            style={{
              visibility:
                getRoutePathDetails().modify &&
                ((width >= 768 && hoverKey === record.id) || width < 768)
                  ? "visible"
                  : "hidden",
            }}
            onClick={() => {
              setModalData({ show: true, data: record });
            }}
            icon={<EditOutlined style={{ paddingRight: 5, marginLeft: 5 }} />}
          />
        </div>
      ),
      align: "center",
    },
    {
      title: "Status",
      key: "is_active",
      render: (record) => (
        <>
          {getRoutePathDetails().modify ? (
            <Popconfirm
              title={`Are you sure to update "${record?.source_type}" as ${
                record?.is_active ? "inactive" : "active"
              }?`}
              onConfirm={() => handleStatusChange(record)}
              okText="Yes"
              cancelText="No"
            >
              <Switch
                checked={record?.is_active}
                style={{
                  backgroundColor: record.is_active
                    ? getColour("active")
                    : getColour("inactive"),
                }}
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </Popconfirm>
          ) : (
            <Tag
              color={
                record?.is_active ? getColour("active") : getColour("inactive")
              }
            >
              {record?.is_active ? "Active" : "Inactive"}
            </Tag>
          )}
        </>
      ),
      align: "center",
      width: 120,
    },
  ];

  return (
    <CustomCard>
      <Row gutter={[8, 0]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Source Type"]} />
                </Col>
                {getRoutePathDetails().add ? (
                  <Col>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => {
                        setModalData({ show: true, data: null });
                      }}
                    >
                      + Add Source Type
                    </Button>
                  </Col>
                ) : null}
              </Row>
            </Col>
            <Col xs={24}>
              <Divider
                style={{ borderColor: "#DFE3E8", padding: 0, margin: 0 }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} style={{ marginTop: -10 }}>
          <Spin spinning={loading} tip="Loading">
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={() => {
                    getSourceTypeData();
                  }}
                >
                  <Row gutter={[8, 8]}>
                    <Col xs={12} sm={8} xl={6}>
                      <Form.Item
                        className="w-100"
                        name="is_active"
                        label="Status"
                      >
                        <Select
                          className="w-100"
                          onChange={() => {
                            handleOnChange();
                          }}
                          options={[
                            {
                              value: 0,
                              label: "All",
                            },
                            {
                              value: true,
                              label: "Active",
                            },
                            {
                              value: false,
                              label: "Inactive",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-end">
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Filter
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              {sourceTypeData ? (
                <Col xs={24}>
                  <Table
                    dataSource={sourceTypeData || []}
                    columns={columns}
                    bordered={true}
                    pagination={false}
                  />
                </Col>
              ) : (
                <Col xs={24}>
                  <CustomFilterText />
                </Col>
              )}
            </Row>
          </Spin>
        </Col>
      </Row>
      <AddEditSourceType
        modalData={modalData}
        handleAddEditSourceType={() => {}}
        closeModal={() => {
          setModalData({ show: false, data: null });
        }}
      />
    </CustomCard>
  );
};

export default SourceType;