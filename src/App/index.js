/** @format */

// eslint-disable-next-line
import React, { Suspense, useEffect } from "react";
import "./assest/css/general.css";
import "./assest/css/style.scss";
import "./assest/css/antd/buttons.scss";
import "./assest/css/antd/inputs.scss";
import "./assest/css/antd/tables.scss";
import "./assest/css/antd/forms.scss";
import "./assest/css/antd/typographys.scss";
import "./assest/css/antd/menus.scss";
import "./assest/css/antd/modal.scss";
import "./assest/css/antd/select.scss";
import "./assest/css/antd/switch.scss";
import "./assest/css/antd/tabs.scss";
import "./assest/css/antd/checkbox.scss";
import "./assest/css/antd/radiobutton.scss";
import "./assest/css/antd/tag.scss";
import "./assest/css/antd/step.scss";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import PublicRoutes from "./utils/PublicRoutes";
import { Spin, message } from "antd";
import DashboardLayout from "./component/Layout/DashboardLayout";
import axios from "axios";
import urls from "./utils/urls";
import PrivateRoutes from "./utils/PrivateRoutes";
import { useAuth } from "../context/auth-context";
import routes from "./utils/routes";
import ForgetPassword from "./page/LoginPage/ForgetPassword";
import ResetPassword from "./page/LoginPage/ResetPassword";

axios.defaults.baseURL = urls.baseUrl;

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    console.log("execute");
    if (error.code === "ECONNABORTED") {
      message.error("Connection Timed Out");
    } else {
      if (error.response.status === 401) {
        message.error("Session Expired. Please log in again");
        localStorage.clear();
        window.location.replace(`${window.location.origin}/login`);
      } else {
        try {
          if (error.response.data.message) {
            message.error(error.response.data.message);
          } else if (error.response.data?.description) {
            message.error(error.response.data?.description);
          } else {
            message.error("Failed To Complete Action");
          }
        } catch (e) {
          message.error("Failed To Complete Action");
        }
      }
    }
    return Promise.reject(error);
  }
);

function App() {
  const location = useLocation();
  const currUserData = useAuth();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = currUserData.token
      ? `Bearer ${currUserData.token}`
      : "";
  }, [currUserData]);

  return (
    <React.Fragment>
      <DashboardLayout visible={currUserData?.token && currUserData.currUser}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/forgot-password" element={<ForgetPassword />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            {routes.map(({ path, Component, exact, user_levels }, index) => (
              <Route
                path={path}
                key={path}
                exact={exact}
                element={
                  <Suspense
                    fallback={
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "60vh" }}
                      >
                        <Spin />
                      </div>
                    }
                  >
                    {user_levels?.includes(
                      Number(currUserData?.currUser?.user_level?.id)
                    ) && <Component />}
                  </Suspense>
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </DashboardLayout>
    </React.Fragment>
  );
}

export default App;
