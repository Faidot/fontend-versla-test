import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-test-deploy-lm9h.onrender.com",
});

export default api;
