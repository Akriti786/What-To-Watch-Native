// frontend/api.js
import axios from "axios";

// For Android Emulator
export const API = "https://movies-backend-2twf.onrender.com";

export const api = axios.create({
  baseURL: API,
  timeout: 30000,
});
