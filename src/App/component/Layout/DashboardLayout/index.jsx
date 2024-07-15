import React, { useState } from "react";
import { Layout, theme } from "antd";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import "./index.css";
import useWindowDimensions from "../../UtilComponents/useWindowDimensions";

const { Content } = Layout;
const DashboardLayout = ({ children, visible }) => {
  const { width } = useWindowDimensions();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return visible ? (
    <Layout className={"min-vh-100 layout-style"}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        colorBgContainer={colorBgContainer}
      />
      <Layout>
        <Topbar
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />
        <Content
          className={`m-2 mx-2 pt-5 ${
            width >= 992
              ? collapsed
                ? "content-wrapper-collapsed"
                : "content-wrapper"
              : ""
          } content-style`}
          style={{
            ...(width >= 992
              ? { paddingLeft: collapsed ? 65 : 220 }
              : { paddingLeft: 0 }),
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  ) : (
    children
  );
};

export default DashboardLayout;
