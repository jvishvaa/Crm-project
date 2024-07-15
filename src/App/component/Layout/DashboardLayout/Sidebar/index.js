import React, { useEffect, useRef, useState } from "react";
import {
  Layout,
  Menu,
  Drawer,
  Divider,
  Select,
  Row,
  Button,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import MyDesktop from "../../../UtilComponents/MyDesktop";
import MyMobile from "../../../UtilComponents/MyMobile";
import "./index.css";
import menu from "../DashbordMenu";
import { useAuth } from "../../../../../context/auth-context";
import CrmLogo from "../../../../assest/images/CRMLogoTransparent.png";
import { SearchOutlined } from "@ant-design/icons";
import useWindowDimensions from "../../../UtilComponents/useWindowDimensions";

const { Sider } = Layout;
const Sidebar = ({ collapsed, setCollapsed, colorBgContainer }) => {
  const navigate = useNavigate();
  const authData = useAuth();
  const selectRef = useRef(null);

  const { width } = useWindowDimensions();

  const [defaultSelectedMenu, setDefaultSelectedMenu] = useState([1]);
  const [menuSearchData, setMenuSearchData] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const findSelectedMenu = (pathname) => {
    for (let i = 0; i < menu?.length; i++) {
      let obj = menu[i];
      if (obj?.children && obj?.children?.length > 0) {
        for (let j = 0; j < obj?.children?.length; j++) {
          let obj1 = obj?.children[j];
          if (obj1?.children && obj1?.children?.length > 0) {
            let selectedChildren1 = obj1?.children?.filter(
              (e1) => e1.route === pathname
            );
            if (selectedChildren1?.length > 0) {
              return [obj?.key, obj1?.key, selectedChildren1[0]?.key];
            }
          } else if (obj1.route === pathname) {
            return [obj?.key, obj1?.key];
          }
        }
      } else if (obj.route === pathname) {
        return [obj?.key];
      }
    }
    return [-1];
  };

  const getMenuSearchData = () => {
    const myMenu = [];
    menu
      ?.filter((each) =>
        each?.user_level?.includes(authData?.currUser?.user_level?.id)
      )
      ?.map((each) => {
        if (each.children) {
          each?.children
            ?.filter((each1) =>
              each1?.user_level?.includes(authData?.currUser?.user_level?.id)
            )
            ?.map((each1) => {
              if (each1?.children) {
                each1?.children
                  ?.filter((each2) =>
                    each2?.user_level?.includes(
                      authData?.currUser?.user_level?.id
                    )
                  )
                  ?.map((each2) => {
                    myMenu.push(each2);
                  });
              } else {
                myMenu.push(each1);
              }
            });
        } else {
          myMenu.push(each);
        }
      });
    setMenuSearchData(myMenu);
  };

  useEffect(() => {
    getMenuSearchData();
  }, []);

  useEffect(() => {
    if (!collapsed && selectRef.current && searchClicked) {
      setSearchClicked(false);
      selectRef.current.focus();
    }
  }, [searchClicked, collapsed]);

  useEffect(() => {
    let pathname = window.location.pathname;
    setDefaultSelectedMenu(findSelectedMenu(pathname));
  }, [window.location.pathname]);

  let menus = [];
  for (let i = 0; i < menu?.length; i++) {
    let obj = menu[i];
    if (menu[i]?.children) {
      let children = menu[i]?.children;
      for (let j = 0; j < children?.length; j++) {
        if (children[j].children) {
          let children1 = children[j]?.children;
          for (let k = 0; j < children1?.length; k++) {
            children1[k].onClick = () => {
              navigate(children1[k].route);
            };
          }
        } else if (children[j]?.route) {
          children[j].onClick = () => {
            navigate(children[j].route);
          };
        }
      }
    } else if (menu[i]?.route) {
      menu[i].onClick = () => {
        navigate(menu[i].route);
      };
    }
    if (obj?.user_level?.includes(authData?.currUser?.user_level?.id))
      menus.push(obj);
  }

  return (
    <React.Fragment>
      {width >= 992 ? (
        <Sider
          width={220}
          collapsedWidth={65}
          collapsible
          collapsed={collapsed}
          onCollapse={() => {
            setCollapsed(!collapsed);
          }}
          className={"position-fixed h-100"}
          style={{
            zIndex: 20,
          }}
        >
          <div className="text-white text-center p-2 d-flex justify-content-center align-items-center flex-column">
            <img
              src={CrmLogo}
              style={{
                width: collapsed ? 35 : 60,
                height: collapsed ? 35 : 60,
                transition: "width 0.2s ease-in-out, height 0.2s ease-in-out",
              }}
            />
          </div>
          {!collapsed ? (
            <Select
              ref={selectRef}
              className="mx-2 my-1 search-module fade-in"
              placeholder="Search Module"
              onChange={(e) => {
                navigate(e);
                setCollapsed(!collapsed);
              }}
              showSearch
              allowClear
              options={menuSearchData
                ?.filter(
                  (each) =>
                    each.route !==
                    (window.location.pathname !== "/" &&
                    window.location.pathname?.endsWith("/")
                      ? window.location.pathname?.slice(0, -1)
                      : window.location.pathname)
                )
                ?.map((each) => {
                  return { label: each?.label, value: each?.route };
                })}
              style={{ width: 205 }}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          ) : (
            <Row className="d-flex justify-content-center align-items-center mb-1 fade-in">
              <Tooltip title="Search Module" placement="right">
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#F6F6F6",
                    borderRadius: 5,
                  }}
                  onClick={() => {
                    setCollapsed(!collapsed);
                    setSearchClicked(true);
                  }}
                >
                  <SearchOutlined style={{ padding: "5px 6px" }} />
                </div>
              </Tooltip>
            </Row>
          )}
          <Divider className="sider-desktop-divider" />
          <Menu
            onClick={() => {
              if (!collapsed) {
                setCollapsed(!collapsed);
              }
            }}
            selectedKeys={defaultSelectedMenu}
            items={menus}
            mode="inline"
          />
        </Sider>
      ) : null}
      {width < 992 ? (
        <Drawer
          style={{
            maxWidth: "256px",
            padding: 0,
            zIndex: 20,
          }}
          placement="left"
          open={!collapsed}
          className="th-mobile-sidebar"
          onClose={() => {
            setCollapsed(!collapsed);
          }}
          closeIcon={null}
          contentWrapperStyle={{ width: "240px" }}
          title={
            <div className="text-white text-center d-flex justify-content-center align-items-center flex-column">
              <img
                src={CrmLogo}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              {!collapsed ? (
                <Select
                  className="search-module fade-in mt-2 text-left"
                  placeholder="Search Module"
                  onChange={(e) => {
                    navigate(e);
                    setCollapsed(!collapsed);
                  }}
                  showSearch
                  allowClear
                  options={menuSearchData
                    ?.filter(
                      (each) =>
                        each.route !==
                        (window.location.pathname?.endsWith("/")
                          ? window.location.pathname?.slice(0, -1)
                          : window.location.pathname)
                    )
                    ?.map((each) => {
                      return { label: each?.label, value: each?.route };
                    })}
                  style={{ width: 210 }}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              ) : null}
            </div>
          }
        >
          <Divider className="sider-desktop-divider" />
          <Menu
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            selectedKeys={defaultSelectedMenu}
            items={menus}
            mode="inline"
          />
        </Drawer>
      ) : null}
    </React.Fragment>
  );
};

export default Sidebar;
