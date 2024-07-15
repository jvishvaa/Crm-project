import { Typography } from "antd";
import React from "react";
import { MdFilterAlt } from "react-icons/md";

const CustomFilterText = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "30vh" }}
    >
      <MdFilterAlt style={{ color: "#a9a7a7", height: 50, width: 50 }} />
      <Typography style={{ color: "#a9a7a7", fontSize: "16px" }}>
        Click on filter to fetch data
      </Typography>
    </div>
  );
};

export default CustomFilterText;
