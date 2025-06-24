import CustomMarker from "@/components/CustomMarker";
import { searchAddressByCoords } from "@/services/geolocation.service";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [moving, setMoving] = useState<boolean>(false);
  const router = useRouter();

  const snapPoint = useMemo(() => ["50%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [addresses, setAddresses] = useState<string[]>([]);

  const [region, setRegion] = useState({
    latitude: 10.748528025906648,
    longitude: 106.62654141594453,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleRegionChangeComplete = (region: any) => {
    searchAddressByCoords({
      latitude: region.latitude,
      longitude: region.longitude,
    }).then((res) => {
      const newAddresses = res.results.map(
        (item: any) => item.formatted_address
      );
      setAddresses(newAddresses);
    });

    setMoving(false);
  };

  function handleRegionChange() {
    setMoving(true);
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
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
          handleStyle={{
            height: 40,
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 1,
          }}
        >
          <BottomSheetScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 20,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={true}
          >
            {addresses &&
              addresses.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="py-3 border-b border-gray-100"
                  onPress={() => console.log(`Selected address ${index + 1}`)}
                >
                  <Text className="text-base py-2 line-clamp-1">📍{item}</Text>
                </TouchableOpacity>
              ))}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>

      <View className="absolute bottom-0 z-10 bg-white w-full h-[12%] shadow-lg flex-row items-center justify-center px-10">
        <TouchableOpacity className="bg-primary p-4 w-full rounded-full flex-row">
          <Text className="text-white mx-auto">Chọn địa điểm này</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}
