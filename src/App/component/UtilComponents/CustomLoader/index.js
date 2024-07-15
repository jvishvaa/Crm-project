import { Spin } from "antd";
import React from "react";
import "./index.css";

const CustomLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center text-center"
      style={{ minHeight: "40vh" }}
    >
      <Spin tip="Loading" className={"spin-loading"}>
        {""}
      </Spin>
    </div>
  );
};

export default CustomLoader;
