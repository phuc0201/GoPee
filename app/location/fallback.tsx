import { Location } from "@/models/location.model";
import {
  getCurrentLocation,
  onSaveLocation,
  searchLocationByAddress,
} from "@/services/geolocation.service";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-simple-toast";

export default function Fallback() {
  const [locations, setLocations] = useState<Location[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedAddress, setSelectedAddress] = useState<Location>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation().then((location) => {
      if (!location) return;
      setSelectedAddress(location);
    });
  }, []);

  const debouncedSearch = React.useRef(
    debounce((query: string) => {
      searchLocationByAddress(query).then((res) => {
        const newLocations = res.results.map((item) => {
          return {
            place_id: item.place_id,
            address: item.formatted_address,
            coordinates: {
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
            },
          };
        });
        setLocations(newLocations);
      });
      setLoading(false);
    }, 300)
  ).current;

  const searchAddress = (query: string) => {
    setLoading(true);
    setSearch(query);
    debouncedSearch(query);
  };

  function selectAddress(selectedAddress: Location) {
    if (!selectedAddress) {
      Toast.show("Vui lòng chọn địa chỉ!", Toast.SHORT);
      return;
    }

    onSaveLocation(selectedAddress);

    router.replace("/(tabs)/home");
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
      }}
    >
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.replace("/location")}>
          <MaterialIcons name="arrow-back-ios-new" size={20} color="black" />
        </TouchableOpacity>
        <Text>Vị trí của bạn</Text>
        <TouchableOpacity
          onPress={() => router.push("/location/pickup-selector")}
        >
          <SimpleLineIcons name="map" size={18} color={"#6b7280"} />
        </TouchableOpacity>
      </View>
      <View className="border-b border-gray-200 p-4 py-3">
        <Text className="text-sm text-gray-500">
          Đang tìm khắp
          <Text className="text-gray-700 font-medium"> Việt Nam</Text>
        </Text>
      </View>
      <View className="border-b border-gray-200 p-4 py-3">
        <Text className="text-sm text-gray-500">
          Địa chỉ hiện tại:
          <Text className="text-gray-700 font-medium">
            {selectedAddress?.address}
          </Text>
        </Text>
      </View>
      <View className="flex-row items-center border-b py-1 pr-4 border-gray-200">
        <View className="px-4">
          <MaterialIcons name="my-location" size={18} color="#ee6352" />
        </View>
        <TextInput
          value={search}
          onChangeText={searchAddress}
          className="flex-1 placeholder:text-gray-400"
          placeholder="Nhập địa chỉ hiện tại"
        />
      </View>
      {locations && locations.length === 0 && (
        <View className="w-full">
          <Image
            source={require("../../assets/images/distribution.png")}
            className="w-52 h-52 object-contain mt-10 mx-auto"
          />
          <Text className="mx-auto text-gray-500 text-sm text-center max-w-72">
            Vui lòng cho chúng tôi biết vị trí của bạn. Bạn có thể cập nhật lại
            sau mục
          </Text>
          <Text className="text-black font-medium text-center text-sm">
            Tài khoản {" > "} Cài đặt
          </Text>
        </View>
      )}
      {locations && locations.length > 0 && (
        <ScrollView>
          <View className="p-4 pt-2">
            {locations.map((item) => (
              <TouchableOpacity
                key={item.place_id}
                onPress={() => selectAddress(item)}
                className="flex-row items-center gap-2 w-full"
              >
                <EvilIcons name="location" size={20} />
                <Text className="text-sm py-2 flex-1 ">{item.address}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
