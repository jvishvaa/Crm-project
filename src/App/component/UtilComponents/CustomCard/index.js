import React from "react";
import { Card } from "antd";
import "./index.css";

const CustomCard = ({ children, style, className, onClick }) => {
  return (
    <Card
      className={`card-component ${className || ""}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
