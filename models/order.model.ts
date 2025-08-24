import { Coordinates } from "./location.model";

export interface QuoteDTO {
  pickupLocation: Coordinates;
  dropoffLocation: Coordinates;
  vehicle: "Bike" | "Car";
}
