import axios from "axios";

const instance = axios.create({
  baseURL: "https://mini-auth.onrender.com/api/auth/",
  //   baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // ✅ Send cookies with every request
});

export default instance;
