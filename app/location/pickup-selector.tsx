import MapSelector from "@/components/MapSelector";
import { useNavigationState } from "@react-navigation/native";
import React from "react";

export default function PickupSelector() {
  const routes = useNavigationState((state) => state.routes);
  const previousRoute = routes?.[routes.length - 2];
  return <MapSelector isBack={previousRoute?.name !== "fallback"} />;
}
