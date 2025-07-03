import { Vehicle } from "@/models/vehicle.model";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface VehicleCardProps {
  vehicle: Vehicle;
  selectedVehicleTypeID: number;
  setSelectedVehicleTypeID: (id: number) => void;
}

export default function VehicleCard({
  vehicle,
  selectedVehicleTypeID,
  setSelectedVehicleTypeID,
}: VehicleCardProps) {
  const isSelected = vehicle.id === selectedVehicleTypeID;

  const animatedValue = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isSelected ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [isSelected]);

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "green"],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255,255,255,0)", "rgba(34,197,94,0.1)"],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setSelectedVehicleTypeID(vehicle.id)}
      style={{ width: "100%" }}
    >
      <Animated.View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          gap: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor,
          backgroundColor,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {vehicle.isPlus && (
          <Image
            source={require("../assets/images/vehicle/star.png")}
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              top: 5,
              left: 10,
              zIndex: 10,
            }}
          />
        )}

        <Image
          source={vehicle.image}
          style={{
            width: 35,
            height: 35,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "500" }}>{vehicle.name}</Text>
          <Text
            style={{
              color: "#71717a",
              fontSize: 14,
            }}
          >
            {vehicle.bio}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>
            {vehicle.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
