import { Button, Typography } from "antd";
import React from "react";
import { MdClose } from "react-icons/md";

const CustomDrawerHeader = ({ label, onClose }) => (
  <div className="d-flex flex-row justify-content-between align-items-center">
    <Typography>{label}</Typography>
    <Button
      type="link"
      size="small"
      onClick={onClose}
      icon={<MdClose size={20} />}
    />
  </div>
);

export default CustomDrawerHeader;