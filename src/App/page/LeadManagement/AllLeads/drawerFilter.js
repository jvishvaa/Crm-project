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
      size="large"
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
            <Col xs={24} sm={12}>
              <Form.Item name="academic_year" label="Academic Year">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.academicYear}
                  allowClear
                  onChange={(value) => {
                    if (value.length === 0) {
                      form.setFieldsValue({ academic_year: ["2024-25"] });
                    }
                  }}
                  tagRender={(props) =>
                    renderTagNotAll(
                      props.label,
                      props.value,
                      props.index,
                      "academic_year"
                    )
                  }
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="school_type" label="School Type">
                <Select
                  className="w-100"
                  options={dropdownData?.schoolType}
                  onChange={() => {
                    form.setFieldsValue({
                      city: [0],
                      zone: [0],
                      branch: [0],
                    });
                  }}
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
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
                    form.setFieldsValue({ zone: [0], branch: [0] });
                  }}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="zone" label="Zone">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.zone}
                  tagRender={(props) =>
                    renderTagAll(props.label, props.value, props.index, "zone")
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "zone");
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
            <Col xs={24} sm={12}>
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
            <Col xs={24} sm={12}>
              <Form.Item name="source_type" label="Source Type">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.sourceType}
                  tagRender={(props) =>
                    renderTagAll(
                      props.label,
                      props.value,
                      props.index,
                      "source_type"
                    )
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "source_type");
                    form.setFieldsValue({ source: [0] });
                  }}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="lead_source" label="Lead Source">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.source}
                  tagRender={(props) =>
                    renderTagAll(
                      props.label,
                      props.value,
                      props.index,
                      "lead_source"
                    )
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "lead_source");
                  }}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="lead_status" label="Lead Status">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.leadStatus}
                  tagRender={(props) =>
                    renderTagAll(
                      props.label,
                      props.value,
                      props.index,
                      "lead_status"
                    )
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "lead_status");
                  }}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="lead_type" label="Lead Type">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.leadType}
                  tagRender={(props) =>
                    renderTagAll(
                      props.label,
                      props.value,
                      props.index,
                      "lead_type"
                    )
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "lead_type");
                  }}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="lead_category" label="Lead Category">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.leadCategory}
                  tagRender={(props) =>
                    renderTagAll(
                      props.label,
                      props.value,
                      props.index,
                      "lead_category"
                    )
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "lead_category");
                  }}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="date_type" label="Date Type">
                <Select
                  className="w-100"
                  options={dropdownData?.dateType}
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
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
