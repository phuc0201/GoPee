import { Location } from "@/models/location.model";
import {
  getCurrentDropoffLocation,
  getCurrentLocation,
  onSaveDropoffLocation,
  onSaveLocation,
  searchLocationByAddress,
} from "@/services/geolocation.service";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useFocusEffect, useRouter } from "expo-router";
import debounce from "lodash.debounce";
import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchByAddress() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isPickup, setIsPickup] = useState<boolean>(false);
  const [pickupSearchValue, setPickupSearchValue] = useState<string>("");
  const [dropoffSearchValue, setDropoffSearchValue] = useState<string>("");
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recentDropoffLocations, setRecentDropoffLocations] = useState<
    Location[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      const fetchLocation = async () => {
        const [pickup, dropoffs] = await Promise.all([
          getCurrentLocation(),
          getCurrentDropoffLocation(),
        ]);

        if (pickup) {
          setPickupSearchValue(pickup.address ?? "");
        }
        if (dropoffs) {
          setRecentDropoffLocations(dropoffs);
        }
      };
      fetchLocation();
    }, [])
  );

  function handleFocusInput(isPickup: boolean = true) {
    setIsFocusInput(true);
    setIsPickup(isPickup);
  }

  function handleBlurInput() {
    setIsFocusInput(false);
  }

  const debouncedSearch = useRef(
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
      setIsLoading(false);
    }, 300)
  ).current;

  function handleSearch(searchValue: string) {
    if (isPickup) setPickupSearchValue(searchValue);
    else setDropoffSearchValue(searchValue);

    if (searchValue.trim() === "") {
      setLocations([]);
    }

    debouncedSearch(searchValue);
  }

  async function handleSelectAddress(location: Location) {
    if (isPickup) {
      await onSaveLocation(location);
      setPickupSearchValue(location.address ?? "");
    } else {
      await onSaveDropoffLocation(location);
      setDropoffSearchValue(location.address ?? "");

      router.push("/booking/choose-vehicle");
    }
  }

  function selectFromMap() {
    router.push(
      isPickup ? "/location/pickup-selector" : "/destination/dropoff-selector"
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        ...(!isFocusInput ? { flexGrow: 1 } : {}),
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            paddingTop: insets.top,
            flex: 1,
          }}
          className="bg-white"
        >
          <View className="flex-row justify-between border-b border-gray-100 py-3 px-4">
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text className="font-medium">
              {isPickup ? "Điểm đón" : "Điểm đến"}
            </Text>
            <Text className="w-8"></Text>
          </View>

          <View className="px-4 py-2">
            <View className="bg-[#F5F5F5] rounded-xl">
              <View className="flex-row items-center p-1 px-4 rounded-lg gap-2 border-b border-gray-200">
                <FontAwesome6 name="circle-dot" size={15} color="#37B6ED" />
                <TextInput
                  value={pickupSearchValue}
                  onChangeText={handleSearch}
                  onFocus={() => handleFocusInput()}
                  onBlur={handleBlurInput}
                  placeholder="Nhập địa chỉ đón"
                  className="placeholder:text-gray-400 flex-1"
                ></TextInput>
                <Pressable onPress={() => handleSearch("")}>
                  <AntDesign name="closecircle" size={15} color="#6b7280" />
                </Pressable>
              </View>
              <View className="flex-row items-center p-1 px-4 rounded-lg gap-2">
                <FontAwesome6 name="circle-dot" size={15} color="#F95134" />
                <TextInput
                  value={dropoffSearchValue}
                  onChangeText={handleSearch}
                  onFocus={() => handleFocusInput(false)}
                  onBlur={handleBlurInput}
                  placeholder="Nhập địa chỉ bạn muốn đến"
                  className="placeholder:text-gray-400 flex-1"
                ></TextInput>
                <Pressable onPress={() => handleSearch("")}>
                  <AntDesign name="closecircle" size={15} color="#6b7280" />
                </Pressable>
              </View>
            </View>
          </View>

          <ScrollView className="flex-1 px-4">
            {locations.length > 0 &&
              locations.map((item, idx) => (
                <Pressable
                  onPress={() => handleSelectAddress(item)}
                  key={idx}
                  className={`flex-row items-center gap-3  ${idx === locations.length - 1 ? "" : "border-b"} border-gray-100 py-4`}
                >
                  <View className="w-12 h-12 bg-primary/10 flex-row items-center justify-center rounded-full">
                    <Image
                      style={{
                        objectFit: "contain",
                      }}
                      source={require("../../assets/images/location-v2.png")}
                      className="w-6 h-6"
                    ></Image>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-500 text-base line-clamp-2">
                      {item.address}
                    </Text>
                  </View>
                </Pressable>
              ))}

            {locations.length === 0 &&
              [...recentDropoffLocations].reverse().map((item, idx) => (
                <Pressable
                  onPress={() => handleSelectAddress(item)}
                  key={idx}
                  className={`flex-row items-center gap-3 ${idx === recentDropoffLocations.length - 1 ? "" : "border-b"} border-gray-100 py-4`}
                >
                  <View className="w-12 h-12 bg-gray-100 flex-row items-center justify-center rounded-full">
                    <AntDesign name="clockcircle" size={18} color="#37B6ED" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-500 text-base line-clamp-2">
                      {item.address}
                    </Text>
                  </View>
                </Pressable>
              ))}
          </ScrollView>

          <TouchableOpacity
            onPress={selectFromMap}
            style={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            className="absolute z-10 bg-white bottom-0 left-0 right-0 flex-row items-center gap-2 h-12 justify-center rounded-t-2xl"
          >
            <MaterialIcons name="map" size={15} color="black" />
            <Text>Chọn trên GoPeeMaps</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
