import CustomMarker from "@/components/CustomMarker";
import { Location } from "@/models/location.model";
import {
  getCurrentLocation,
  onSaveDropoffLocation,
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

interface MapSelectorProps {
  isDropoff?: boolean;
  isBack?: boolean;
}

export default function MapSelector({
  isDropoff,
  isBack = false,
}: MapSelectorProps) {
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
    const fetchLocation = async () => {
      const location = await getCurrentLocation();
      console.log(location);

      if (!location) return;

      setSelectedAddress(location);
      setRegion({
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    };
    fetchLocation();
  }, [isDropoff]);

  const handleRegionChangeComplete = (region: any) => {
    if (isSearchingAddressSuggestion) {
      searchAddressByCoords({
        lat: region.latitude,
        lng: region.longitude,
      }).then((res) => {
        const newAddresses = res.results.map((item) => {
          return {
            place_id: item.place_id,
            address: item.formatted_address,
            coordinates: {
              lat: item.geometry.location.lat,
              lng: item.geometry.location.lng,
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
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };

    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);

    setTimeout(() => {
      setIsSearchingAddressSuggestion(true);
    }, 100);
  }

  async function onSubmitSelectAddress() {
    if (!selectedAddress) {
      Toast.show("Vui lòng chọn địa chỉ!", Toast.SHORT);
      return;
    }

    if (isDropoff) {
      await onSaveDropoffLocation(selectedAddress);
      router.push("/booking/choose-vehicle");
      return;
    } else await onSaveLocation(selectedAddress);

    if (isBack) {
      router.back();
    } else router.replace("/(tabs)/home");
  }

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        style={{
          marginBottom: "-80%",
        }}
        className="flex-1"
      >
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
          onPress={() => router.back()}
          className="bg-white w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            position: "absolute",
            top: insets.top + 10,
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

      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingLeft: 40,
          paddingRight: 40,
          height: 80,
        }}
        className="z-10 bg-white w-full shadow-lg flex-row items-center justify-center"
      >
        <TouchableOpacity
          onPress={onSubmitSelectAddress}
          className="bg-primary p-4 w-full rounded-full flex-row"
        >
          <Text className="text-white mx-auto">
            {isDropoff ? "Chọn điểm đến" : "Chọn điểm đón khách"}
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}
