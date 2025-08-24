import { ServiceLevel, VehicleType } from "./order.model";

export interface Vehicle {
  id: number;
  name: string;
  image: any;
  isPlus: boolean;
  bio: string;
  price: number;
  vehicleType: VehicleType;
  serviceLevel: ServiceLevel;
}
