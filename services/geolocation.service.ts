import { SystemConstants } from "@/constants/SystemConstants";
import {
  CoordinatesDTO,
  Location,
  LocationApiResponse,
} from "@/models/location.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ExpoLocation from "expo-location";
import { Alert, Linking } from "react-native";
import { client } from "./client";

const apiKey = process.env.EXPO_PUBLIC_GOONG_MAP_API;

export const searchAddressByCoords = ({
  latitude,
  longitude,
}: CoordinatesDTO): Promise<LocationApiResponse> => {
  return client
    .get("https://rsapi.goong.io/geocode", {
      params: {
        latlng: `${latitude},${longitude}`,
        api_key: apiKey,
      },
    })
    .then((response) => response.data);
};

export const searchLocationByAddress = (
  address: string
): Promise<LocationApiResponse> => {
  return client
    .get("https://rsapi.goong.io/geocode", {
      params: {
        address: address,
        api_key: apiKey,
      },
    })
    .then((response) => response.data);
};

export const onSaveLocation = async (location: Location) => {
  try {
    await AsyncStorage.setItem(
      SystemConstants.LOCATION,
      JSON.stringify(location)
    );
  } catch (error) {
    console.error("Failed to save location:", error);
  }
};

export const getCurrentLocation = async (): Promise<Location | null> => {
  try {
    const locationString = await AsyncStorage.getItem(SystemConstants.LOCATION);
    return locationString ? (JSON.parse(locationString) as Location) : null;
  } catch (error) {
    console.error("Failed to get location:", error);
    return null;
  }
};

export const clearAllAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage đã được xóa sạch!");
  } catch (e) {
    console.error("Lỗi khi xóa AsyncStorage:", e);
  }
};

export const requestLocationPermission = async (): Promise<any> => {
  const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Yêu cầu quyền truy cập",
      "Ứng dụng cần quyền truy cập vị trí để hoạt động",
      [
        {
          text: "Mở cài đặt",
          onPress: () => Linking.openSettings(),
        },
        { text: "Hủy", style: "cancel" },
      ]
    );
    return null;
  }

  const location = await ExpoLocation.getCurrentPositionAsync({})
    .then((res) => res)
    .catch(() => null);

  return location ? location.coords : null;
};
