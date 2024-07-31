import React, { useEffect, useState } from "react";
import { Row, Col, Drawer, Button, Form, Select, DatePicker } from "antd";
import RenderTagMultiple from "../../../component/UtilComponents/RenderMultiple";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";

const { RangePicker } = DatePicker;

const DrawerFilter = ({ drawerData, onSubmit, closeDrawer, dropdownData }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  useEffect(() => {
    if (drawerData?.show & (drawerData?.type === "Filter")) {
      setVisible(true);
    } else {
      setTimeout(() => {
        setVisible(false);
      }, [100]);
    }
    if (drawerData.data && drawerData?.type === "Filter") {
      form.setFieldsValue({
        city: drawerData?.data?.city,
        branch: drawerData?.data?.branch,
        hotspot_type: drawerData?.data?.hotspot_type,
        assigned_user: drawerData?.data?.assigned_user,
        date_range: drawerData?.data?.date_range,
      });
    }
  }, [drawerData]);

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

  return (
    <Drawer
      className="lead-filter-drawer"
      title={<CustomDrawerHeader label="Filter" onClose={closeDrawer} />}
      onClose={closeDrawer}
      open={drawerData?.show && drawerData?.type === "Filter"}
      size="small"
      closable={false}
      maskClosable={false}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              form.submit();
            }}
            type="primary"
          >
            Apply Filters
          </Button>
        </div>
      }
    >
      {visible ? (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[12, 0]}>
            <Col xs={24}>
              <Form.Item name="city" label="City">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.city}
                  tagRender={(props) =>
                    renderTagAll(props.label, props.value, props.index, "city")
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "city");
                    form.setFieldsValue({ branch: [0] });
                  }}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item name="branch" label="Branch">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.branch}
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

            <Col xs={24}>
              <Form.Item name="hotspot_type" label="Hotspot Type">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.source}
                  tagRender={(props) =>
                    renderTagAll(
                      props.label,
                      props.value,
                      props.index,
                      "hotspot_type"
                    )
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "hotspot_type");
                  }}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="assigned_user" label="BDE">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={[{ label: "All", value: 0 }]}
                  tagRender={(props) =>
                    renderTagAll(
                      props.label,
                      props.value,
                      props.index,
                      "assigned_user"
                    )
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "assigned_user");
                  }}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="date_range"
                label="Date Range"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date Range",
                  },
                ]}
              >
                <RangePicker
                  className="w-100"
                  format={"DD MMM YYYY"}
                  inputReadOnly
                  allowClear={false}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : null}
    </Drawer>
  );
};

export default DrawerFilter;
