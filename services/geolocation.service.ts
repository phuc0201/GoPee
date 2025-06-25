import { SystemConstants } from "@/constants/SystemConstants";
import {
  CoordinatesDTO,
  Location,
  LocationApiResponse,
} from "@/models/location.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export const onSaveLocation = async (location: Location) => {
  try {
    await AsyncStorage.setItem(
      SystemConstants.LOCATION,
      JSON.stringify(location)
    );
    console.log("Location saved:", location);
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
