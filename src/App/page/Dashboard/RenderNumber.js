import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import getArrayValues from "../../utils/getArrayValues";

const RenderNumber = ({ series }) => {
  const [countNumber, setCountNumber] = useState(0);
  function abbreviateNumber(value) {
    if (value >= 1.0e9) {
      return (value / 1.0e9).toFixed(1) + "B";
    } else if (value >= 1.0e6) {
      return (value / 1.0e6).toFixed(1) + "M";
    } else if (value >= 1.0e3) {
      return (value / 1.0e3).toFixed(1) + "K";
    } else {
      return value.toString();
    }
  }

  function sumArray(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }

  useEffect(() => {
    let total = 0;
    series.map((each) => {
      total += sumArray(each.data);
    });
    setCountNumber(total);
  }, [series]);

  return (
    <div
      className="d-flex flex-row align-items-center"
      style={{ minHeight: 100 }}
    >
      <Typography style={{ fontSize: 60 }} className="pl-2">
        {abbreviateNumber(countNumber)}
      </Typography>
    </div>
  );
};

export default RenderNumber;
