import axios from "axios";
export const searchAddressByCoords = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const apiKey = process.env.EXPO_PUBLIC_GOONG_MAP_API;

  return axios
    .get("https://rsapi.goong.io/geocode", {
      params: {
        latlng: `${latitude},${longitude}`,
        api_key: apiKey,
      },
    })
    .then((response) => response.data);
};
