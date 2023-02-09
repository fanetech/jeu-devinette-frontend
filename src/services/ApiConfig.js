import axios from "axios";
import { API_BASIC_ENDPOINT } from "./Constant";

const BasicUrl = axios.create({
  baseURL: API_BASIC_ENDPOINT,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

BasicUrl.interceptors.request.use((request) => {

  return request;
});
BasicUrl.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default BasicUrl;
