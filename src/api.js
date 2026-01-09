// frontend/api.js
// import axios from "axios";

// // For Android Emulator
// export const API = "https://movies-backend-2twf.onrender.com";

// export const api = axios.create({
//   baseURL: API,
//   timeout: 60000,
// });

import axios from "axios";

export const API = "https://movies-backend-2twf.onrender.com";

export const api = axios.create({
  baseURL: API,
  timeout: 60000, // ✅ 60 seconds (Render cold start safe)
});

// Optional: log errors
api.interceptors.response.use(
  res => res,
  err => {
    console.log("API ERROR:", err.message);
    return Promise.reject(err);
  }
);
