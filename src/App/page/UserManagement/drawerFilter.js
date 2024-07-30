import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Divider,
  Drawer,
  Button,
  Form,
  Select,
  Tag,
  DatePicker,
} from "antd";
import RenderTagMultiple from "../../component/UtilComponents/RenderMultiple";
import CustomDrawerHeader from "../../component/UtilComponents/CustomDrawerHeader";

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
        user_level: drawerData?.data?.user_level,
        zone: drawerData?.data?.zone,
        branch: drawerData?.data?.branch,
        status: drawerData?.data?.status,
        pip_tagged: drawerData?.data?.pip_tagged,
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
              <Form.Item name="user_level" label="User Level">
                <Select
                  className="w-100"
                  mode="multiple"
                  options={dropdownData?.userLevel}
                  tagRender={(props) =>
                    renderTagAll(
                      props.label,
                      props.value,
                      props.index,
                      "user_level"
                    )
                  }
                  onChange={(value) => {
                    onChangeMultiple(value, "user_level");
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
              <Form.Item name="status" label="Status">
                <Select
                  className="w-100"
                  options={dropdownData?.status}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="pip_tagged" label="PIP">
                <Select
                  className="w-100"
                  options={dropdownData?.pip_tagged}
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
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
