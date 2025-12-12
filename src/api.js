// frontend/api.js
import axios from "axios";

// For Android Emulator
export const API = "http://192.168.1.23:5000/api";

export const api = axios.create({
  baseURL: API,
  timeout: 5000,
});
