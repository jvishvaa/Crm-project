import { message } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import urls from "../App/utils/urls";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localAuthToken = localStorage.getItem("token");
  const localCurrentUser = JSON.parse(localStorage.getItem("user"));

  const [token, setToken] = useState(localAuthToken);
  const [currUser, setCurrUser] = useState(localCurrentUser);

  const [loginLoading, setLoginLoading] = useState(false);

  const getCurrentUser = (authToken) => {
    setCurrUser({
      name: "Anik",
      email: "test@gmail.com",
      phone: "1234567890",
      erp: "1234567890_OLV",
      user_level: { id: 1, name: "superadmin" },
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Anik",
        email: "test@gmail.com",
        phone: "1234567890",
        erp: "1234567890_OLV",
        user_level: { id: 1, name: "superadmin" },
      })
    );
    // axios
    //   .get(urls.login.currUser, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${
    //         authToken ?? localStorage?.getItem("token")
    //       }`,
    //     },
    //   })
    //   .then((res) => {
    //     let currUserResponse = res.data;
    //     if (currUserResponse?.status_code === 200) {
    //       setCurrUser(currUserResponse?.result);
    //       if (currUserResponse) {
    //         localStorage.setItem(
    //           "user",
    //           JSON.stringify(currUserResponse?.result)
    //         );
    //       } else {
    //         message.error(currUserResponse?.description);
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    if (token) {
      getCurrentUser(token);
    }
  }, [token]);

  const loginHandler = async (values) => {
    setToken(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NCwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6NjcxODE3MDg4OCwiZW1haWwiOiJhbmtpdC5iaGFydGlAb3JjaGlkcy5lZHUuaW4ifQ.MZSVc5vhiN9ZoWzQMnT7kngHwGMrIYnStPtr4QEOi0A"
    );
    localStorage.setItem(
      "token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NCwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6NjcxODE3MDg4OCwiZW1haWwiOiJhbmtpdC5iaGFydGlAb3JjaGlkcy5lZHUuaW4ifQ.MZSVc5vhiN9ZoWzQMnT7kngHwGMrIYnStPtr4QEOi0A"
    );
    // const payload = {
    //   username: values?.username,
    //   password: values?.password,
    // };
    // setLoginLoading(true);
    // axios
    //   .post(urls.login.loginApi, payload)
    //   .then((res) => {
    //     let loginResponse = res.data;
    //     setToken(loginResponse?.access);
    //     if (loginResponse?.access) {
    //       localStorage.setItem("token", loginResponse?.access);
    //     }
    //   })
    //   .catch((error) => {
    //     message.error(
    //       error?.response?.data?.message ??
    //         error?.response?.data?.detail ??
    //         "Something went wrong!"
    //     );
    //   })
    //   .finally(() => {
    //     setLoginLoading(false);
    //   });
  };

  const logoutHandler = () => {
    setToken("");
    setCurrUser(null);
    localStorage.clear();
  };

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      logoutHandler();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        currUser,
        getCurrentUser,
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
