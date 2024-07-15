import React from "react";
import { Footer as AntdFooter } from "antd/es/layout/layout";
import "./index.css";
import { Divider, Typography } from "antd";
const Footer = () => {
  return (
    <React.Fragment>
      <AntdFooter className="p-0 pt-1 m-0 pb-1">
        <div className="text-center">
          <Divider className="m-0 w-100 footer-divider" />
          <Typography style={{ fontSize: 12 }}>
            Copyright © 2024 K12 Techno Services Pvt. Ltd
          </Typography>
        </div>
      </AntdFooter>
    </React.Fragment>
  );
};

export default Footer;
