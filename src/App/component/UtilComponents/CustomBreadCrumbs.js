import { Breadcrumb, Typography } from "antd";
import React from "react";

const CustomBreadCrumbs = ({ data }) => {
  return (
    <Breadcrumb style={{ fontSize: 16, fontWeight: 500 }}>
      {data?.map((each) => (
        <Breadcrumb.Item>
          <Typography>{each}</Typography>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadCrumbs;
