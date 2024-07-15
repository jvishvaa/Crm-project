import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import React from "react";
import RenderTagMultiple from "../../../component/UtilComponents/RenderMultiple";
import useWindowDimensions from "../../../component/UtilComponents/useWindowDimensions";
const { RangePicker } = DatePicker;

const FilterForm = ({ form, dropdownData, isDrawer }) => {
  const { width } = useWindowDimensions();
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
    <Row gutter={[12, 0]}>
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
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
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
        <Form.Item name="school_type" label="School Type">
          <Select
            className="w-100"
            options={dropdownData?.schoolType}
            onChange={() => {
              form.setFieldsValue({
                branch: null,
              });
            }}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
        <Form.Item
          name="branch"
          label="Branch"
          rules={[{ required: true, message: "Please Select Branch" }]}
        >
          <Select
            className="w-100"
            options={dropdownData?.branch}
            showSearch
            allowClear
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
        <Form.Item name="source_type" label="Source Type">
          <Select
            className="w-100"
            mode="multiple"
            options={dropdownData?.sourceType}
            tagRender={(props) =>
              renderTagAll(props.label, props.value, props.index, "source_type")
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
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
        <Form.Item name="lead_source" label="Lead Source">
          <Select
            className="w-100"
            mode="multiple"
            options={dropdownData?.source}
            tagRender={(props) =>
              renderTagAll(props.label, props.value, props.index, "lead_source")
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
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
        <Form.Item name="lead_status" label="Lead Status">
          <Select
            className="w-100"
            mode="multiple"
            options={dropdownData?.leadStatus}
            tagRender={(props) =>
              renderTagAll(props.label, props.value, props.index, "lead_status")
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
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
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
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
        <Form.Item name="event_name" label="Search Event Name">
          <Select
            className="w-100"
            mode="multiple"
            options={dropdownData?.eventList}
            tagRender={(props) =>
              renderTagAll(props.label, props.value, props.index, "event_name")
            }
            onChange={(value) => {
              onChangeMultiple(value, "event_name");
            }}
            showSearch
            allowClear
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
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
      <Col xs={24} sm={12} md={isDrawer ? 12 : 6}>
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
      {!isDrawer ? (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="ml-1"
            style={{ marginTop: width < 576 ? 0 : 23, height: 30 }}
          >
            Filter
          </Button>
        </Form.Item>
      ) : null}
    </Row>
  );
};

export default FilterForm;
