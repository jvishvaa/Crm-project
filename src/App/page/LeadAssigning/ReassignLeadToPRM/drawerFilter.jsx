import React, { useEffect, useState } from "react";
import { Drawer, Button, Form } from "antd";
import FilterForm from "./filterForm";
import CustomDrawerHeader from "../../../component/UtilComponents/CustomDrawerHeader";

const DrawerFilter = ({
  drawerData,
  onSubmit,
  closeDrawer,
  dropdownData,
  handleFilterFormValue,
}) => {
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
      handleFilterFormValue(drawerData?.data, form);
    }
  }, [drawerData]);

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
          <FilterForm form={form} dropdownData={dropdownData} isDrawer={true} />
        </Form>
      ) : null}
    </Drawer>
  );
};

export default DrawerFilter;
