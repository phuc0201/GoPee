import { SystemConstants } from "@/constants/SystemConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const goongInstance = axios.create({
  baseURL: "https://rsapi.goong.io",
});

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_ENTPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem(
      SystemConstants.ACCESS_TOKEN
    );
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // handle refresh
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
