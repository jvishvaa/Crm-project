import React from "react";
import "./index.css";
import { Col, Typography } from "antd";

const getCardDataText = (label, value) => {
  return (
    <Col xs={24}>
      <Typography className="lead-card-data-text">
        <span>{label} :</span> {value || "--"}
      </Typography>
    </Col>
  );
};

export default getCardDataText;
