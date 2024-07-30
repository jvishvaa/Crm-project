import { message } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import urls from "../App/utils/urls";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localAuthDetails = JSON.parse(localStorage.getItem("loginDetails"));

  const [loginDetails, setLoginDetails] = useState(localAuthDetails);

  const [loginLoading, setLoginLoading] = useState(false);

  const loginHandler = async (values) => {
    const payload = {
      username: values?.erp,
      password: values?.password,
    };
    setLoginLoading(true);
    axios
      .post(urls.login.loginApi, payload)
      .then((res) => {
        let loginResponse = res.data;
        if (loginResponse?.status_code === 200) {
          setLoginDetails(loginResponse?.result);
          if (loginResponse?.result) {
            localStorage.setItem(
              "loginDetails",
              JSON.stringify(loginResponse?.result)
            );
          }
          message.success("Successfully Logged In");
        } else {
          message.error(loginResponse?.message);
        }
      })
      .catch((error) => {
        message.error(
          error?.response?.data?.message ??
            error?.response?.data?.detail ??
            "Something went wrong!"
        );
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  const logoutHandler = () => {
    setLoginDetails("");
    localStorage.clear();
  };

  if (loginDetails) {
    const decodedToken = jwtDecode(loginDetails?.user_details?.token);
    if (decodedToken.exp * 1000 < Date.now()) {
      logoutHandler();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loginDetails,
        loginHandler,
        logoutHandler,
        loginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
