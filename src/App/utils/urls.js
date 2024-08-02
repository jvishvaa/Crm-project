let BASE;
let HOSTERP;
let BASEERP;
const PROTO_HTTPS = "https";
const PROTO = "http";
let PORT;
let process = {
  env: {
    REACT_APP_UI_ENV: "dev",
  },
};
if (process.env.REACT_APP_UI_ENV === "stage") {
  HOSTERP = window.location.hostname?.replace(".finance", "");
  BASEERP = `${PROTO_HTTPS}://${HOSTERP}/qbox`;
} else {
  // HOSTNAME = "localhost";
  // PORT = "8000";
  // BASE = `${PROTO}://${HOSTNAME}:${PORT}/qbox`;
  HOSTERP = "orchids-stage.stage-vm.letseduvate.com";
  BASEERP = `${PROTO_HTTPS}://${HOSTERP}/qbox`;
}

const urls = {
  login: {
    loginApi: `${BASEERP}/erp_user/login/`,
    accessTokenApi: `${BASEERP}/erp_user/access-token/`,
  },
};

export default urls;
