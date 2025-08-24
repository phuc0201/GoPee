import { Coordinates } from "./location.model";

export enum VehicleType {
  Bike = "Bike",
  Car = "Car",
}

export enum ServiceLevel {
  Standard = "Standard",
  Plus = "Plus",
}

export enum PaymentMethod {
  Cash = "cash",
  Online = "online",
}

export interface QuoteDTO {
  pickupLocation: Coordinates;
  dropoffLocation: Coordinates;
  vehicle: VehicleType;
}

export interface OrderDTO {
  pickupLocation: Coordinates;
  dropoffLocation: Coordinates;
  pickupAddress: string;
  dropoffAddress: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  tip?: number;
  vehicle: VehicleType;
  serviceLevel: ServiceLevel;
}

export interface Order {}
