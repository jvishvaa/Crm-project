import React from "react";
import "./index.css";
import { Descriptions } from "antd";

const getCardDataText = (label, value) => {
  return <Descriptions.Item label={label}>{value}</Descriptions.Item>;
};

export default getCardDataText;
