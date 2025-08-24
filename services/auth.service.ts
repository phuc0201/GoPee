import { SystemConstants } from "@/constants/SystemConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./client";

export class AuthService {
  signinWithPhoneNumber(phone: string): Promise<any> {
    return axiosInstance.post<any>("/auth/otp", {
      phone: "+84" + phone,
    });
  }

  verifyOTP(phone: string, OTP: string): Promise<any> {
    return axiosInstance.post<any>("/auth/otp/verify", {
      phone: "+84" + phone,
      code: OTP,
    });
  }

  async onSaveToken(accessToken: string, refreshToken: string) {
    try {
      await AsyncStorage.setItem(SystemConstants.ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(SystemConstants.REFRESH_TOKEN, refreshToken);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAccessToken() {
    try {
      const accessToken = await AsyncStorage.getItem(
        SystemConstants.ACCESS_TOKEN
      );
      return accessToken ?? null;
    } catch (error) {
      console.error("Failed to get access token:", error);
      return null;
    }
  }

  async getRefreshToken() {
    try {
      const refreshToken = await AsyncStorage.getItem(
        SystemConstants.REFRESH_TOKEN
      );
      return refreshToken ?? null;
    } catch (error) {
      console.error("Failed to get refresh token:", error);
      return null;
    }
  }
}
