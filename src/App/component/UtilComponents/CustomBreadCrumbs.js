import { Breadcrumb, Typography } from "antd";
import React from "react";

const CustomBreadCrumbs = ({ data }) => {
  return (
    <Breadcrumb className="th-16 th-fw-500">
      {data?.map((each) => (
        <Breadcrumb.Item>
          <Typography>{each}</Typography>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadCrumbs;
