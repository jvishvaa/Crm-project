import React from "react";
import { Tag, Tooltip } from "antd";
import "./index.scss";
import getTruncateString from "../../../utils/getTruncateString";

const RenderFilterTag = ({ label, value }) => {
  return (
    <Tooltip title={value?.length > 30 ? value : ""}>
      <Tag className="filter-tag">
        <span style={{ fontWeight: 600, fontSize: 11 }}>{label}:</span>{" "}
        {getTruncateString(value)}
      </Tag>
    </Tooltip>
  );
};

export default RenderFilterTag;
