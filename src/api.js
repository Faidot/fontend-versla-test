import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://backend-test-deploy-lm9h.onrender.com",
});

export default api;
