let BASE;
let HOSTERP;
let BASEERP;
let HOSTCRM;
let BASECRM;
let XDTSHOST;
let HOSTMARKETING;
let BASEMARKETING;
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
  HOSTMARKETING = "mgmt-stage.stage-gke.letseduvate.com";
  BASEERP = `${PROTO_HTTPS}://${HOSTERP}/qbox`;
  BASECRM = `${PROTO_HTTPS}://${HOSTCRM}/qbox`;
  BASEMARKETING = `${PROTO_HTTPS}://${HOSTMARKETING}/qbox`;
  XDTSHOST = "test.letseduvate.com";
} else {
  // HOSTNAME = "localhost";
  // PORT = "8000";
  // BASE = `${PROTO}://${HOSTNAME}:${PORT}/qbox`;
  HOSTERP = "orchids-stage.stage-vm.letseduvate.com";
  HOSTCRM = "crm-new.stage-gke.letseduvate.com";
  HOSTMARKETING = "mgmt-stage.stage-gke.letseduvate.com";
  BASEERP = `${PROTO_HTTPS}://${HOSTERP}/qbox`;
  BASECRM = `${PROTO_HTTPS}://${HOSTCRM}/qbox`;
  BASEMARKETING = `${PROTO_HTTPS}://${HOSTMARKETING}/qbox`;
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
    source: `${BASECRM}/user_management/source/`,
    addLead: `${BASECRM}/lead_mgmt/lead_info/`,
    cityList: `${BASEERP}/erp_user/city-list/`,
    zoneList: `${BASEERP}/erp_user/zone-list/`,
    branchList: `${BASEERP}/erp_user/branch-view/`,
    gradeList: `${BASEERP}/erp_user/grademapping/`,
    userDataList: `${BASEERP}/communication/v1/view-users/`,
    userLevelList: `${BASEMARKETING}/central-admin/user_level_list/`,
    bulkUpload: `${BASECRM}/lead_mgmt/lead_bulk_upload/`,
  },
};

export default urls;
