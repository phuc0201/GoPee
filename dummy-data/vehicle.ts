import { ServiceLevel, VehicleType } from "@/models/order.model";
import { Vehicle } from "@/models/vehicle.model";

export const Vehicles: Vehicle[] = [
  {
    id: 1,
    image: require("../assets/images/vehicle/scooter.png"),
    isPlus: false,
    name: "GoBike",
    bio: "Giá siêu tốt",
    price: 99000,
    vehicleType: VehicleType.Bike,
    serviceLevel: ServiceLevel.Standard,
  },
  {
    id: 2,
    image: require("../assets/images/vehicle/scooter.png"),
    isPlus: true,
    name: "GoBike Plus",
    bio: "Xe tay ga cao cấp",
    price: 199000,
    vehicleType: VehicleType.Bike,
    serviceLevel: ServiceLevel.Plus,
  },
  {
    id: 3,
    image: require("../assets/images/vehicle/suv.png"),
    isPlus: false,
    name: "GoCar",
    bio: "Giá siêu tốt",
    price: 299000,
    vehicleType: VehicleType.Car,
    serviceLevel: ServiceLevel.Standard,
  },
  {
    id: 4,
    image: require("../assets/images/vehicle/suv.png"),
    isPlus: true,
    name: "GoCar Plus",
    bio: "Xe sang siêu rộng",
    price: 599000,
    vehicleType: VehicleType.Car,
    serviceLevel: ServiceLevel.Plus,
  },
];
