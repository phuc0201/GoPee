import axios from "axios";

export const searchAddressByCoords = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const apiKey = "";

  return axios
    .get("https://rsapi.goong.io/geocode", {
      params: {
        latlng: `${latitude},${longitude}`,
        api_key: apiKey,
      },
    })
    .then((response) => response.data);
};
