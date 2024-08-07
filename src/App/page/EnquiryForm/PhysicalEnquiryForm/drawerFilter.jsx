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
    if (drawerData?.show) {
      setVisible(true);
    } else {
      setTimeout(() => {
        setVisible(false);
      }, [100]);
    }
    if (drawerData.data) {
      form.setFieldsValue({
        academic_year: drawerData?.data?.academic_year,
        school_type: drawerData?.data?.school_type,
        city: drawerData?.data?.city,
        zone: drawerData?.data?.zone,
        branch: drawerData?.data?.branch,
        source_type: drawerData?.data?.source_type,
        lead_source: drawerData?.data?.lead_source,
        lead_status: drawerData?.data?.lead_status,
        lead_type: drawerData?.data?.lead_type,
        lead_category: drawerData?.data?.lead_category,
        date_type: drawerData?.data?.date_type,
        date_range: drawerData?.data?.date_range,
      });
    }
  }, [drawerData]);

  const renderTagNotAll = (label, value, index, key) => {
    let selectedItems = form.getFieldsValue()?.[key];
    const showCloseIcon = selectedItems?.length > 1;
    return (
      <RenderTagMultiple
        label={label}
        value={value}
        showCloseIcon={showCloseIcon}
        onClose={(closeValue) => {
          form.setFieldsValue({
            [key]: selectedItems?.filter((each) => each !== closeValue),
          });
        }}
      />
    );
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
      open={drawerData?.show}
      // size="large"
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
              <Form.Item name="zone" label="Zone">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.zone}
                  allowClear
                  onChange={(value) => {
                    onChangeMultiple(value, "zone");
                  }}
                  tagRender={(props) =>
                    renderTagAll(
                      props.label,
                      props.value,
                      props.index,
                      "branch"
                    )
                  }
                  showSearch
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
