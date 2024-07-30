import { message } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import urls from "../App/utils/urls";
import dayjs from "dayjs";

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
          localStorage.setItem(
            "loginDetails",
            JSON.stringify(loginResponse?.result)
          );
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

  const MINUTE_MS = 5000;
  useEffect(() => {
    if (loginDetails) {
      const interval = setInterval(() => {
        isJwtExpired(loginDetails);
      }, MINUTE_MS);

      return () => clearInterval(interval);
    }
  }, [loginDetails]);

  function isJwtExpired(loginDetails) {
    const { token, refresh_token } = loginDetails?.user_details;
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      throw new Error("Invalid JWT format");
    }
    let payload = JSON.parse(atob(tokenParts[1]));

    var dateString = dayjs.unix(payload?.exp);
    var currentTimeSrting = dayjs();
    if (currentTimeSrting && dateString && refresh_token) {
      var duration = dayjs.duration(dateString.diff(currentTimeSrting));
      var getMinutes = duration?.get("minutes");
      var getSeconds = duration?.get("seconds");
      if (getMinutes <= 0 && getSeconds <= 50) {
        generateAccessToken(refresh_token);
      }
    }
  }

  const generateAccessToken = (refreshToken) => {
    axios
      .post(
        urls?.login?.accessTokenApi,
        {
          refresh: refreshToken,
        },
        {
          headers: {
            Authorization: null,
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          let ud = {
            ...loginDetails,
            token: response?.data?.data,
            force_update: response?.data?.force_update,
          };
          setLoginDetails(ud);
          localStorage.setItem("loginDetails", JSON.stringify(ud));
        } else {
          localStorage.clear();
          logoutHandler();
        }
      })
      .catch((error) => {
        console.log("Error fetching config data:", error);
      });
  };

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
