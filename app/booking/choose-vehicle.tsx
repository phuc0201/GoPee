import ChooseVehicleBottomSheet from "@/components/ChooseVehicleBottomSheet";
import MapDirection from "@/components/MapDirection";
import { Location } from "@/models/location.model";
import {
  getCurrentDropoffLocation,
  getCurrentLocation,
} from "@/services/geolocation.service";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChooseVehicle() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState<Location>();
  const [dropoffLocation, setDropoffLocation] = useState<Location>();

  useFocusEffect(
    useCallback(() => {
      const fetchLocation = async () => {
        const [pickup, dropoffs] = await Promise.all([
          getCurrentLocation(),
          getCurrentDropoffLocation(),
        ]);

        if (pickup) setPickupLocation(pickup);
        if (dropoffs) setDropoffLocation(dropoffs[dropoffs.length - 1]);
      };
      fetchLocation();
    }, [])
  );

  return (
    <GestureHandlerRootView className="flex-1">
      <MapDirection
        pickupLocation={pickupLocation}
        dropoffLocation={dropoffLocation}
      ></MapDirection>

      <View
        style={{
          position: "absolute",
          top: insets.top + 10,
          left: 16,
          right: 16,
          zIndex: 10,
          elevation: 5,
        }}
        className="bg-white rounded-lg flex-row justify-between px-3 items-center gap-2 py-2"
      >
        <Pressable
          onPress={() => router.back()}
          className="bg-white h-12 rounded-full flex items-center justify-center"
        >
          <AntDesign name="arrowleft" size={20} color="black" />
        </Pressable>
        <View
          style={{
            height: "100%",
            width: 10,
            paddingTop: 13,
            paddingBottom: 9,
          }}
          className="flex-col"
        >
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#ef4444",
              borderRadius: 100000,
            }}
          ></View>
          <View className="flex-1 flex-col gap-2 items-center">
            {Array.from({ length: 3 }).map((_, idx) => (
              <View
                key={idx}
                style={{
                  width: 1,
                  height: 4,
                  backgroundColor: "#E9E9E9",
                }}
              ></View>
            ))}
          </View>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#58BC6B",
              borderRadius: 100000,
            }}
          ></View>
        </View>
        <View className="flex-1">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="py-2 border-b border-gray-100"
          >
            {pickupLocation?.address}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" className="py-2">
            {dropoffLocation?.address}
          </Text>
        </View>
      </View>

      <ChooseVehicleBottomSheet />
    </GestureHandlerRootView>
  );
}
