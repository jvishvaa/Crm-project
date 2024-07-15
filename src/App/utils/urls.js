let BASE;
let HOST;
let HOSTNAME;
const PROTO_HTTPS = "https";
const PROTO = "http";
let PORT;

if (process.env.REACT_APP_UI_ENV === "stage") {
  HOST = "marketing-b2b.stage-gke.letseduvate.com";
  HOSTNAME = `${HOST}/qbox`;
  BASE = `${PROTO_HTTPS}://${HOSTNAME}`;
} else {
  // HOSTNAME = "localhost";
  // PORT = "8000";
  // BASE = `${PROTO}://${HOSTNAME}:${PORT}/qbox`;
  HOST = "marketing-b2b.stage-gke.letseduvate.com";
  HOSTNAME = `${HOST}/qbox`;
  BASE = `${PROTO_HTTPS}://${HOSTNAME}`;
}

const urls = {
  baseUrl: `${BASE}`,
};

export default urls;
