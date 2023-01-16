import axios from "axios";

// https://stockhub.onrender.com/api
const instance = axios.create({
  baseURL: "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default instance;