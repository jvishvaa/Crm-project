import { Empty } from "antd";
import React from "react";

const CustomEmpty = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "40vh" }}
    >
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
};

export default CustomEmpty;
