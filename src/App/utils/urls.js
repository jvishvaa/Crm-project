let BASE;
let HOSTERP;
let BASEERP;
let HOSTCRM;
let BASECRM;
let XDTSHOST;
const PROTO_HTTPS = "https";
const PROTO = "http";
let PORT;
let process = {
  env: {
    REACT_APP_UI_ENV: "dev",
  },
};
if (process.env.REACT_APP_UI_ENV === "stage") {
  HOSTERP = "orchids-stage.stage-vm.letseduvate.com";
  HOSTCRM = "crm-new.stage-gke.letseduvate.com";
  BASEERP = `${PROTO_HTTPS}://${HOSTERP}/qbox`;
  BASECRM = `${PROTO_HTTPS}://${HOSTCRM}/qbox`;
  XDTSHOST = "test.letseduvate.com";
} else {
  // HOSTNAME = "localhost";
  // PORT = "8000";
  // BASE = `${PROTO}://${HOSTNAME}:${PORT}/qbox`;
  HOSTERP = "orchids-stage.stage-vm.letseduvate.com";
  HOSTCRM = "crm-new.stage-gke.letseduvate.com";
  BASEERP = `${PROTO_HTTPS}://${HOSTERP}/qbox`;
  BASECRM = `${PROTO_HTTPS}://${HOSTCRM}/qbox`;
  XDTSHOST = "test.letseduvate.com";
}

const urls = {
  XDTSHOST,
  HOSTCRM,
  login: {
    loginApi: `${BASEERP}/erp_user/login/`,
    accessTokenApi: `${BASEERP}/erp_user/access-token/`,
  },
  masterData: {
    sourceType: `${BASECRM}/user_management/source_types/`,
  },
};

export default urls;
