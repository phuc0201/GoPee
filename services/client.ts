import axios from "axios";
export const goongInstance = axios.create({
  baseURL: "https://rsapi.goong.io",
});

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_ENTPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     // Gắn token nếu có
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // handle refresh
//     return Promise.reject(error);
//   }
// );
