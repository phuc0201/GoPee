import CustomMarker from "@/components/CustomMarker";
import { Location } from "@/models/location.model";
import {
  getCurrentLocation,
  onSaveLocation,
  searchAddressByCoords,
} from "@/services/geolocation.service";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-simple-toast";

export default function MapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const insets = useSafeAreaInsets();
  const [isSearchingAddressSuggestion, setIsSearchingAddressSuggestion] =
    useState<boolean>(true);
  const [moving, setMoving] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<Location>();
  const snapPoint = useMemo(() => ["50%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [addresses, setAddresses] = useState<Location[]>([]);

  const [region, setRegion] = useState({
    latitude: 10.748528025906648,
    longitude: 106.62654141594453,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    getCurrentLocation().then((location) => {
      if (!location) return;

      setSelectedAddress(location);
      setRegion({
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    });
  }, []);

  const handleRegionChangeComplete = (region: any) => {
    if (isSearchingAddressSuggestion) {
      searchAddressByCoords({
        latitude: region.latitude,
        longitude: region.longitude,
      }).then((res) => {
        const newAddresses = res.results.map((item) => {
          return {
            place_id: item.place_id,
            address: item.formatted_address,
            coordinates: {
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
            },
          };
        });
        setAddresses(newAddresses);
      });
    }
    setMoving(false);
  };

  function handleRegionChange() {
    setMoving(true);
  }

  function selectAddress(location: Location) {
    setIsSearchingAddressSuggestion(false);

    setSelectedAddress(location);

    const newRegion = {
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };

    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);

    setTimeout(() => {
      setIsSearchingAddressSuggestion(true);
    }, 100);
  }

  function onSubmitSelectAddress() {
    if (!selectedAddress) {
      Toast.show("Vui lòng chọn địa chỉ!", Toast.SHORT);
      return;
    }

    onSaveLocation(selectedAddress);

    router.replace("/(tabs)/home");
  }

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View className="flex-1 -mb-[80%]">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          region={region}
          onRegionChangeComplete={(region) =>
            handleRegionChangeComplete(region)
          }
          onRegionChange={handleRegionChange}
        ></MapView>
        <TouchableOpacity
          onPress={() => router.replace("/location/fallback")}
          className="bg-white w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            position: "absolute",
            top: 10,
            left: 16,
            zIndex: 10,
            elevation: 5,
          }}
        >
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <CustomMarker isMoving={moving} />
      </View>

      <View className="flex-1 relative mb-[20%]">
        <BottomSheet
          snapPoints={snapPoint}
          ref={bottomSheetRef}
          enablePanDownToClose={false}
          handleStyle={{
            height: 40,
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
            elevation: 1,
          }}
        >
          <BottomSheetScrollView
            contentContainerStyle={{
              paddingBottom: 20,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={true}
          >
            {addresses &&
              addresses.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className={`py-3 border-b border-gray-100 ${selectedAddress?.place_id === item.place_id ? "bg-primary/10" : ""}`}
                  onPress={() => selectAddress(item)}
                >
                  <View className="text-base py-2 flex-row gap-2 items-center px-4 ">
                    <MaterialIcons
                      name="my-location"
                      size={18}
                      color="#ee6352"
                    />
                    <Text className="line-clamp-1 pr-6">{item.address}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>

      <View className="absolute bottom-0 z-10 bg-white w-full h-[12%] shadow-lg flex-row items-center justify-center px-10">
        <TouchableOpacity
          onPress={onSubmitSelectAddress}
          className="bg-primary p-4 w-full rounded-full flex-row"
        >
          <Text className="text-white mx-auto">Chọn địa điểm này</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}
