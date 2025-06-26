import { Location } from "@/models/location.model";
import {
  getCurrentLocation,
  onSaveLocation,
  requestLocationPermission,
  searchAddressByCoords,
} from "@/services/geolocation.service";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AutoGetLocation() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedAddress, setSelectedAddress] = useState<Location>();
  const [isSplashScreen, setInSplashScreen] = useState<boolean>(true);

  useEffect(() => {
    requestLocationPermission().then((currLocation) => {
      if (currLocation) {
        searchAddressByCoords({
          latitude: currLocation.latitude,
          longitude: currLocation.longitude,
        }).then((res) => {
          if (res.results.length > 0) {
            const location = {
              place_id: res.results[0].place_id,
              address: res.results[0].formatted_address,
              coordinates: {
                latitude: res.results[0].geometry.location.lat,
                longitude: res.results[0].geometry.location.lng,
              },
            };
            setSelectedAddress(location);

            onSaveLocation(location);

            router.replace("/(tabs)/home");
          }
        });
      } else {
        getCurrentLocation().then((currLocation) => {
          if (currLocation) {
            setInSplashScreen(false);
            setSelectedAddress(currLocation);
          } else {
            router.replace("/location/fallback");
          }
        });
      }
    });
  }, []);

  function handleUsePreviousAddress() {
    router.replace("/(tabs)/home");
  }

  function onEditLocation() {
    router.replace("/location/fallback");
  }

  if (isSplashScreen) {
    return (
      <View className="flex-1 bg-primary/90 items-center justify-center">
        <Text className="text-6xl font-bold text-zinc-200">GoPee</Text>
        <Image
          source={require("../../assets/images/splashscreens.png")}
          className="absolute bottom-0 left-0 right-0 w-full h-auto"
        ></Image>
      </View>
    );
  } else
    return (
      <View
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          flex: 1,
        }}
      >
        <View className="flex-1 flex justify-between items-center py-20 px-5">
          <View>
            <Text className="text-4xl">
              Rất tiếc, chúng tôi không thể xác định vị trí của bạn
            </Text>
            <Text className="text-gray-500">
              Vui lòng cập nhật địa chỉ của bạn bằng cách thủ công để có thể
              tiếp tục sử dụng ứng dụng
            </Text>
            <TouchableOpacity
              onPress={onEditLocation}
              className="my-16 flex-row items-center border border-gray-500 rounded-lg p-4 gap-3"
            >
              <Text className="flex-1 line-clamp-1">
                {selectedAddress?.address}
              </Text>
              <FontAwesome5 name="edit" size={16} color="black" />
            </TouchableOpacity>
          </View>
          <Pressable
            className="bg-primary rounded-full p-4 w-full flex items-center justify-center"
            onPress={handleUsePreviousAddress}
          >
            <Text className="text-white text-xl">Sử dụng vị trí này</Text>
          </Pressable>
        </View>
      </View>
    );
}
