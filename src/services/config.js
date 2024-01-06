import axios from "axios";
import { getDataLocal } from "../utils/localStore";

const BASE_URL = "http://localhost:8080";

const tokenAuthorization = getDataLocal("userLocal");

const configHeaderAxios = () => {
  return {
    Authorization: "Bearer " + tokenAuthorization?.access_token,
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
});
