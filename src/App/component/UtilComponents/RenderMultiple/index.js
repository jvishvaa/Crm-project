import React from "react";
import { Tag } from "antd";
import "./index.css";

const RenderTagMultiple = ({ label, value, showCloseIcon, onClose }) => {
  return (
    <Tag
      className={
        showCloseIcon
          ? "render-tag-not-all-multiple"
          : "render-tag-not-all-single"
      }
      closable={showCloseIcon}
      onClose={() => onClose(value)}
    >
      {label}
    </Tag>
  );
};

export default RenderTagMultiple;
