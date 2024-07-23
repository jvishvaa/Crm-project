import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import getArrayValues from "../../utils/getArrayValues";

const RenderNumber = ({ count }) => {
  function abbreviateNumber(value) {
    if (value >= 1.0e9) {
      return (value / 1.0e9).toFixed(1) + "B";
    } else if (value >= 1.0e6) {
      return (value / 1.0e6).toFixed(1) + "M";
    } else {
      return value?.toString();
    }
  }

  return (
    <div
      className="d-flex flex-row align-items-center"
      style={{ minHeight: 100 }}
    >
      <Typography style={{ fontSize: 60 }} className="pl-2">
        {abbreviateNumber(count)}
      </Typography>
    </div>
  );
};

export default RenderNumber;
