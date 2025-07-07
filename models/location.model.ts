export interface Coordinates {
  latitude: number;
  longitude: number;
}
export class Location {
  place_id?: string;
  address?: string;
  coordinates: Coordinates;

  constructor(
    place_id: string,
    address: string = "",
    coordinates: Coordinates = {
      latitude: 0,
      longitude: 0,
    }
  ) {
    this.place_id = place_id;
    this.address = address;
    this.coordinates = coordinates;
  }
}

export class CoordinatesDTO {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export interface IAddressComponent {
  long_name: string;
  short_name: string;
}

export interface IGeometryLocation {
  lat: number;
  lng: number;
}

export interface IGeometry {
  location: IGeometryLocation;
}

export interface IPlusCode {
  compound_code: string;
  global_code: string;
}

export interface ISearchResultByCoords {
  address_components: IAddressComponent[];
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  reference: string;
  plus_code: IPlusCode;
  types: string[];
}

export interface LocationApiResponse {
  plus_code: Record<string, unknown>;
  results: ISearchResultByCoords[];
  status: string;
}
