import axios from "axios";

// ⚠️ Replace with your PC IPv4 address
const BASE_URL = "http://10.216.52.234:8000/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
