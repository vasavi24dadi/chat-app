import axios from "axios";

const api = axios.create({
  baseURL: "https://chat-app-be-ql2d.onrender.com",
});

export default api;