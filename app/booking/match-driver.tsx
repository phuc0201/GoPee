import DriverMatching from "@/components/DriverMatching";
import MapDirection from "@/components/MapDirection";
import { RegionDefault } from "@/constants/RegionDefault";
import { Location } from "@/models/location.model";
import {
  getCurrentDropoffLocation,
  getCurrentLocation,
} from "@/services/geolocation.service";
import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MatchDriver() {
  const [region, setRegion] = useState(RegionDefault);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [pickupLocation, setPickupLocation] = useState<Location>();
  const [dropoffLocation, setDropoffLocation] = useState<Location>();

  const [enableControlMap, setEnableControlMap] = useState<boolean>(false);
  const [circleRadiusPx, setCircleRadiusPx] = useState<number | null>(null);
  const [driverMatching, setDriverMatching] = useState<boolean>(true);

  const mapRef = useRef<MapView>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchLocation = async () => {
        const [pickupLocation, dropoffLocations] = await Promise.all([
          getCurrentLocation(),
          getCurrentDropoffLocation(),
        ]);

        if (pickupLocation) {
          setPickupLocation(pickupLocation);
        }
        if (dropoffLocations && dropoffLocations.length > 0) {
          setDropoffLocation(dropoffLocations[dropoffLocations.length - 1]);
        }

        setRegion({
          latitude:
            pickupLocation?.coordinates.latitude || RegionDefault.latitude,
          longitude:
            pickupLocation?.coordinates.longitude || RegionDefault.longitude,
          latitudeDelta: RegionDefault.latitudeDelta,
          longitudeDelta: RegionDefault.longitudeDelta,
        });
      };
      fetchLocation();
    }, [])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnableControlMap(true);
      setDriverMatching(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: insets.top + 10,
          left: 16,
          zIndex: 1,
        }}
        className="w-12 h-12 bg-white rounded-full"
      >
        <AntDesign
          style={{ margin: "auto" }}
          name="close"
          size={24}
          color="black"
        />
      </Pressable>

      {!driverMatching && (
        <>
          <MapDirection
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
          />

          <View
            style={{
              elevation: 1,
            }}
            className="absolute bottom-4 left-4 right-4 bg-white rounded-lg"
          >
            <View className="flex-row items-center justify-between border-b border-gray-100 p-4">
              <View className="flex-row items-center gap-4">
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10000,
                  }}
                  source={require("../../assets/images/avatar-default.png")}
                ></Image>
                <View>
                  <Text className="font-medium">Trinh Hoang Phuc</Text>
                  <View className="flex-row items-center gap-2">
                    <AntDesign name="star" size={24} color="#FFCC00" />
                    <Text className="font-medium">4.5</Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <Pressable className="bg-[#4252FF] w-12 h-12 rounded-full items-center justify-center">
                  <MaterialCommunityIcons
                    name="message-processing"
                    size={24}
                    color="white"
                  />
                </Pressable>
                <Pressable className="bg-[#4CE5B1] w-12 h-12 rounded-full items-center justify-center">
                  <FontAwesome6 name="phone" size={22} color="white" />
                </Pressable>
              </View>
            </View>

            <View className="p-4 px-5 flex-row gap-4 border-b border-gray-100">
              <View className="items-center">
                <FontAwesome6 name="circle-dot" size={24} color="#4CE5B1" />
                <View className="gap-1">
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
                <FontAwesome6 name="location-dot" size={24} color="#F52D56" />
              </View>
              <View style={{ flex: 1 }} className="pt-1">
                <Text className="line-clamp-1 mb-7">
                  {pickupLocation?.address}
                </Text>
                <Text className="line-clamp-1">{dropoffLocation?.address}</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between p-4 px-5">
              <View>
                <Image
                  style={{
                    width: 35,
                    height: 35,
                  }}
                  source={require("../../assets/images/vehicle/suv.png")}
                />
              </View>
              <View>
                <Text className="text-[#C8C7CC] font-semibold">
                  Khoảng cách
                </Text>
                <Text className="text-[#242E42] font-semibold">1 km</Text>
              </View>
              <View>
                <Text className="text-[#C8C7CC] font-semibold">Thời gian</Text>
                <Text className="text-[#242E42] font-semibold">2 phút</Text>
              </View>
              <View>
                <Text className="text-[#C8C7CC] font-semibold">Giá</Text>
                <Text className="text-[#242E42] font-semibold">12.000 đ</Text>
              </View>
            </View>

            <Pressable
              style={{
                elevation: 5,
              }}
              className="p-4 pt-0"
            >
              <View className="bg-[#242E42] w-full p-3 rounded-lg">
                <Text className="text-white w-full text-center font-medium">
                  Hủy chuyến
                </Text>
              </View>
            </Pressable>
          </View>
        </>
      )}

      {driverMatching && <DriverMatching region={region} />}
    </GestureHandlerRootView>
  );
}
