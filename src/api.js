import axios from "axios";

export const api = axios.create({
  baseURL: "https://job-app-backend-eight.vercel.app" 
});
