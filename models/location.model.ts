export interface Coordinates {
  lng: number;
  lat: number;
}
export class Location {
  place_id?: string;
  address?: string;
  coordinates: Coordinates;

  constructor(
    place_id: string,
    address: string = "",
    coordinates: Coordinates = {
      lng: 0,
      lat: 0,
    }
  ) {
    this.place_id = place_id;
    this.address = address;
    this.coordinates = coordinates;
  }
}

export class CoordinatesDTO {
  lng: number;
  lat: number;

  constructor(lat: number, lng: number) {
    this.lng = lng;
    this.lat = lat;
  }
}

export interface IAddressComponent {
  long_name: string;
  short_name: string;
}

export interface IGeometryLocation {
  lng: number;
  lat: number;
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
