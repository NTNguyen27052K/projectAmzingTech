import axios from "axios";
import { getDataLocal } from "../utils/localStore";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:8080";

const tokenAuthorization = getDataLocal("userLocal");
// console.log(
//   jwtDecode(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6Ik5ndXnhu4VuIFRydW5nIE5ndXnDqm4iLCJlbWFpbCI6Im50bmd1eWVuQGdtYWlsLmNvbSIsInBob25lIjoiMTIzLTQ1Ni03ODkwIiwicGFzc3dvcmQiOiIxMjMiLCJ1c2VyX2RlbGV0ZWQiOmZhbHNlLCJwb3NpdGlvbl9pZCI6bnVsbCwiY29tcGFueV9pZCI6bnVsbCwiZGVwYXJ0bWVudF9pZCI6bnVsbCwicm9sZXNfbmFtZSI6ImFkbWluIn0sImlhdCI6MTcwMzc3MTM1OSwiZXhwIjoxNzA0MjAzMzU5fQ.RFhc-bR1vftBM9k_NxwlzZlcaYvN5SWxCcBpjkw0ViY"
//   )
// );

const configHeaderAxios = () => {
  return {
    Authorization: "Bearer " + tokenAuthorization?.accessToken,
  };
};
export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
});
