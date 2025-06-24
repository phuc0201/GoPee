import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Location {
  address: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export default function Fallback() {
  const newLocation = {
    address: "",
    coords: {
      lat: 0,
      lng: 0,
    },
  };
  const [locations, setLocations] = useState<Location[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const searchAddress = async (query: string) => {
    setLoading(true);
    setSearch(query);

    setLocations([...locations, newLocation]);
    // try {
    //   // Replace this with your address search API
    //   // Example: const res = await fetch(`https://api.example.com/search?query=${encodeURIComponent(query)}`);
    //   // const data = await res.json();
    //   // setLocations(data.results);
    // } catch (error) {
    //   // Handle error
    // } finally {
    //   setLoading(false);
    // }
  };

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
          onPress={() => router.replace("/location/map-selector")}
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
            {locations.map((_, index) => (
              <Text key={index}>Địa chỉ số {index}</Text>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
