import React, { useEffect, useState } from "react";
import { Typography, Drawer, Button, Form } from "antd";
import { MdClose } from "react-icons/md";
import FilterForm from "./filterForm";

const CustomHeader = ({ onClose }) => (
  <div className="d-flex flex-row justify-content-between align-items-center">
    <Typography>Filter</Typography>
    <Button
      type="link"
      size="small"
      onClick={onClose}
      icon={<MdClose size={20} />}
    />
  </div>
);

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
      title={<CustomHeader onClose={closeDrawer} />}
      onClose={closeDrawer}
      open={drawerData?.show}
      size="large"
      closable={false}
      maskClosable={false}
      bodyStyle={{ paddingBottom: 80 }}
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
