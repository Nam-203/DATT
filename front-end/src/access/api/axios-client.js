import axios from "axios";
import { API } from "../../constant";

const accessToken = localStorage.getItem("user_token");
const axiosClient = axios.create({
  // baseURL: API.DEVELOP,
  baseURL: "http://localhost:3080/api/",
  timeout: 15000,
});

axiosClient.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
axiosClient.defaults.headers.get["X-Requested-With"] = "XMLHttpRequest";
axiosClient.defaults.headers.put["X-Requested-With"] = "XMLHttpRequest";
axiosClient.defaults.headers.delete["X-Requested-With"] = "XMLHttpRequest";
axiosClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

export { axiosClient };
