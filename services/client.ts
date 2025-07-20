import axios from "axios";

export const client = axios.create();

export const goongEndpoint = axios.create({
  baseURL: "https://rsapi.goong.io",
});
